---
title: 深入了解 MySQL 主从复制的原理
permalink: /articles/23082.html
---

## 0. 主从复制

首先主从复制是什么？简单来说是让一台MySQL服务器去复制另一台MySQL的数据，使两个服务器的数据保持一致。

这种方式与Redis的主从复制的思路没有太大的出入。如果你对Redis的主从复制感兴趣可以去看看[《Redis的主从复制》](https://mp.weixin.qq.com/s/VJTBmAB-A1aRT9DR6v5gow)。那既然Redis和MySQL都采用了**复制**这种方式，主从复制所带来的意义是什么呢？

通过复制功能，构建一个或者多个从库，可以提高数据库的**高可用性**、**可扩展性**，同时实现**负载均衡**。当主库发生故障时，可以快速的切到其某一个从库，并将该从库提升为主库，因为数据都一样，所以不会影响系统的运行；当MySQL服务器需要扛住更多的读请求时，可以把读请求的流量分流到各个从库上去，写请求则转发给主库，形成读写分离的架构，来提供更好的读扩展和请求的负载均衡。

读写分离的架构应用的其实非常广泛，就比如MySQL，还有Redis，以及我们熟悉的Zookeeper，Zookeeper的Follower收到读请求不会自己处理，而是会将读请求转发给Leader，感兴趣的可以自己下来了解一下，这里就不偏题了。





## 1. 复制原理

MySQL的主从复制支持两种方式：

- 基于**行**
- 基于**语句**

基于语句的复制在MySQL3.23中就已经有了，而基于语句的方式则在5.1中才实现。其本质都是基于主库的**binlog**来实现的，主库记录binlog，然后从库将binlog在自己的服务器上重放，从而保证了主、从的数据一致性。



### 1.1 binlog

MySQL中日志分为两个维度，一个是**MySQL服务器**的，一个是底层**存储引擎**的。而上文提到的binlog就是属于MySQL服务器的日志，binlog也叫二进制日志，记录了所有对MySQL所做的更改。



基于行、语句的复制方式跟binlog的存储方式有关系。 binlog有三种存储格式，分别是Statement、Row和Mixed。

- **Statement** 基于语句，只记录对数据做了修改的SQL语句，能够有效的减少binlog的数据量，提高读取、基于binlog重放的性能
- **Row** 只记录被修改的行，所以Row记录的binlog日志量一般来说会比Statement格式要多。基于Row的binlog日志非常完整、清晰，记录了所有数据的变动，但是缺点是可能会非常多，例如一条`update`语句，有可能是所有的数据都有修改；再例如`alter table`之类的，修改了某个字段，同样的每条记录都有改动。
- **Mixed** Statement和Row的结合，怎么个结合法呢。例如像`update`或者`alter table`之类的语句修改，采用Statement格式。其余的对数据的修改例如`update`和`delete`采用Row格式进行记录。

为什么会有这么多方式呢？因为Statement只会记录SQL语句，但是并不能保证所有情况下这些语句在从库上能够正确的被重放出来。因为可能顺序不对。

MySQL什么时候会记录binlog呢？是在事务提交的时候，并不是按照语句的执行顺序来记录，当记录完binlog之后，就会通知底层的存储引擎提交事务，所以有可能因为语句顺序错误导致语句出错。



### 1.2 查看binlog

这里拿MySQL 5.6举例子，binlog默认是处于关闭状态的。我们可以通过命令`show variables like '%log_bin%'` 来查看关于binlog的配置。

![默认配置](/images/mysql/23082/binlog-default-setting.jpeg)

`log_bin`代表是否开启了binlog，其默认值为`OFF`。

- **log_bin** 代表是否开启了binlog，其默认值为`OFF`
- **log_bin_basename** binlog存储文件的完整名称，会在默认的文件名后面添加上**递增**的序号，就例如`mysql-bin.000001`
- **log_bin_index** binlog索引文件名称，例如`mysql-bin.index`
- **sql_log_bin** 在binlog开启的时候，可以禁用当前session的binlog



你可以在MySQL中通过命令`show binary logs`查看所有的binlog文件

![查看binlog](/images/mysql/23082/show-all-binlog.jpeg)



知道了有哪些文件之后我们可以来看看binlog文件中的内容，可以在MySQL通过`show binlog events`命令来查看。

> show binglog events 查看第一个binlog文件，我们也可以通过`in`参数来指定，假设我们想看的文件名是`mysql-bin.000001`，那么可以使用命令`show binlog events in 'mysql-bin.000001'`来查看指定的binlog文件

![查看binlog](/images/mysql/23082/find-specify-binlog-file.jpeg)



接下来我们来看看我们在MySQL中的操作所对应的binlog内容分别是什么。

> 初始化

我们上面提到过，binlog是由一个一个的event组成的。从MySQL 5.0开始，binlog的**第一个**event都为`Format_desc`，位于图中的`Event_type`那一列。可以看到内容为`Server ver;5.6.50-log, Binlog ver: 4`，说明当前使用的MySQL版本为5.6.50，Binlog的版本是V4。

> 创建数据库

然后我创建了一个名为`student`的DB，其Event_type是`Query`，这个event的内容为`CREATE DATABASE student DEFAULT CHARACTER SET = utf8mb4`，一个建库语句。

> 新建表

然后我创建了一个名为`student`的表，Event_type也是`Query`，内容为`use student; CREATE TABLE student (id INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT)`，一个建表语句。

> 插入数据

然后我们执行INSERT语句给该表插入两行数据，再次查看binlog。

```sql
INSERT INTO `student` (`id`, `name`) VALUES (NULL, '张三');
INSERT INTO `student` (`id`, `name`) VALUES (NULL, '李四');
```

![image-20210106123550397](/images/mysql/23082/new-transaction-per-insert.jpeg)

可以看到每次INSERT都会开启一个事务，你可能会疑惑，我们只是简单的执行了INSERT语句，没有显示的开启事务。那为什么会有事务产生呢？

这是因为MySQL采用了自动提交（AUTOCOMMIT）的机制，我使用的InnoDB存储引擎，是支持事务的，所有的用户活动都发生在事务中。我们可以通过`show variables like '%AUTOCOMMIT%';`命令查看，如果结果是`ON`则代表是开启的。





### 1.3 复制的核心步骤

我们假设主库已经开启了binlog，并正常的记录binlog。

首先从库启动**I/O线程**，跟主库建立客户端连接。

主库启动**binlog dump**线程，读取主库上的binlog event发送给从库的I/O线程，I/O线程获取到binlog event之后将其写入到自己的Relay Log中。

然后从库启动**SQL线程**，将Relay中的数据进行重放，完成从库的数据更新。

总结来说，主库上只会有一个线程，而从库上则会有两个线程。

![主从复制流程](/images/mysql/23082/core-copy-steps.jpeg)



### 1.4 Relay Log

relay log其实和binlog没有太大的区别，在MySQL 4.0 之前是没有Relay Log这部分的，整个过程中只有两个线程。但是这样也带来一个问题，那就是复制的过程需要同步的进行，很容易被影响，而且效率不高。例如主库必须要等待从库读取完了才能发送下一个binlog事件。这就有点类似于一个阻塞的信道和非阻塞的信道。

![阻塞信道](/images/mysql/23082/demo-for-relay-log.jpeg)

**阻塞信道**就跟你在柜台一样，你要递归柜员一个东西，但是你和柜员之间没有可以放东西的地方，你就只能一直把文件拿着，直到柜员接手；而**非阻塞信道**就像你们之间有个地方可以放文件，你就直接放上去就好了，不用等柜员接手。

引入了Relay Log之后，让原本同步的获取事件、重放事件解耦了，两个步骤可以异步的进行，Relay Log充当了缓冲区的作用。Relay Log有一个`relay-log.info`的文件，用于记录当前复制的进度，下一个事件从什么Pos开始写入，该文件由SQL线程负责更新。



### 1.5 Relay Log核心参数

接下来让我们了解一下Relay Log的核心参数。

- **max_relay_log_size**  中继日志的最大size，默认值0，如果为0就会取默认的size 1G，否则就为设置的值

- **relay_log** 定义relay的名称，默认为主机名+relay-bin，例如像`hostname-relay-bin`

- **relay_log_basename** 中继日志的全路径，即路径 + 文件名，例如`/path/to/hostname-relay-bin`，最大长度为256

- **relay_log_index** 定义中继日志的索引文件的全路径，同样其最大的长度为256.  其默认值为hostname + relay-bin.index，例如`/path/to/hostname-relay-bin.index`

- **relay_log_info_file** 定义relay-log.info文件的名称

- **relay_log_info_repository** 存放relay log重放的数据的方式，可以设置为`FILE`和`TABLE`。FILE代表将中继日志重放的数据记录在relay-info.log中，TABLE则将其存放在`slave_relay_log_info`这张表里。

- **relay_log_purge** 是否自动清空不需要的中继日志，默认值为`ON`

- **relay_log_recovery** 当从库宕机后，如果relay log损坏了导致部分的中继日志没有进行同步，则自动放弃所有未进行重放的中继日志，并从主库重新获取，默认值为`OFF`

- **relay_log_space_limit** 设置中继日志的最大值，防止写满磁盘。但是不建议设置这个值，建议还是给中继日志需要的空间，`0`就是不限制，`0`也是默认值

- **sync_relay_log**  用于控制中继日志写入磁盘的变量，假设值为n，那么在中继日志每接受n次binlog事件之后就会调用fdatasync()函数将中继日志强制的刷入磁盘；相反，如果值为0，则写入OS的缓冲区内，由OS调度决定何时将中继日志刷入磁盘，这样一来如果在没有刷入之前报错了，那么中继日志就会丢失。默认值是`10000`，也就是每向中继日志中写入1w次binlog事件就将中继日志强制的刷入磁盘。

- **sync_relay_log_info** 该参数的影响跟参数`relay_log_info_repository`有一定关系，同时也跟是否使用支持事务的存储引擎有关系。该值默认也是`10000`.

    - 当`sync_relay_log_info`为0时

        - `relay_log_info_repository`为FILE，MySQL不会调用fdatasync()，而是将刷入磁盘的调度交给OS；
        - `relay_log_info_repository`为TABLE，如果使用了支持事务的存储引擎，则每次事务的时候该表都会被更新；如果没有使用事务引擎，则永远不会被更新

    - 当`sync_relay_log_info`大于0时

        - `relay_log_info_repository`为FILE，假设设置的值为N，那么**每N次事务**都会都会调用fdatasync()强制将relay-log.info刷入磁盘
        - `relay_log_info_repository`为TABLE，如果使用了支持事务的引擎，则该表**每次事务**结束都会被更新；如果没有使用事务引擎则会在**写入N个binlog事件**的时候更新该表。



## 2. 复制模型

平常的开发中，其实很少说一上来就直接搞主从架构的。费时间、费钱还引入了额外的复杂度，最后发现投入了这么多一个单MySQL服务器就完全能handle。

这就跟一个产品的架构迭代是一样的，刚刚起步的时候一个单体应用足够了。当你的业务扩展，请求膨胀，单体无法抗住压力了，就会考虑开始部署多实例，开始采用微服务架构去做横向扩展、负载均衡。



### 2.1 一主多从

当然你也可以把它当成**一主一从**。

这是最简单的模型，特别适合少量写、大量读的情况。读请求被分到了各个从库上，有效的帮主库分散了压力，能够提升**读并发**。当然，你也可以只是把从库当成一个灾备库，除了**主从复制**之外，没有其他任何的请求和数据传输。

甚至你可以把其中一个备库作为你的预发环境的数据库，当然，这说到底还是直接动了生产环境的数据库，是一种过于理想的用途，因为这还涉及到生产环境数据库的数据敏感性。不是所有人都能够接触到的，需要有完善的权限机制。

![MySQL一主多从](/images/mysql/23082/one-master-multi-follower.jpeg)

值得注意的是，如果有n个从库，那么主库上就会有n个binlog dump线程。如果这个n比较大的话在复制的时候可能会造成主库的性能抖动。所以在从库较多的情况下可以采用级联复制。



### 2.2 级联复制

级联复制用大白话说就是**套娃**。

本来从库B、C、D、E、F、G都是复制的主库A，但是现在由于A的压力比较大，就不这么干了，调整成了如下的模式。

- B、C复制A
- D、E复制B
- F、G复制C

![MySQL级联复制](/images/mysql/23082/cascade-replication.jpeg)

这就叫级联复制，开启疯狂套娃模式。你甚至会觉得这种套娃很眼熟，在Redis主从复制中也可以采用级联模式， slave去复制另一个slave。

级联复制的好处在于很大程度上减轻了主库的压力，主库只需要关心与其有直接复制关系的从库，剩下的复制则交给从库即可。相反，由于是这种层层嵌套的关系，如果在较上层出现了错误，会影响到挂在该服务器下的所有子库，这些错误的影响效果被放大了。



### 2.3 主主复制

顾名思义，就是两个主库相互复制，客户端可以对任意一台主库进行写操作。任何一台主库服务器上的数据发生了变化都会同步到另一台服务器上去。有点类似于Eureka Server的双节点模式，两个注册中心相互注册。这样一来，任何一台挂了都不会对系统产生影响。

而且主主复制可以打破数据库性能瓶颈，一个很酷的功能——横向扩展。为什么说很酷呢，如果DB能做到横向扩展，那很多被数据库并发所限制的瓶颈都可以被突破，然而...

但是主主复制其实并不可靠，两边的数据冲突的可能性很大。例如复制停止了，系统仍然在向两个主库中写入数据，也就是说一部分数据在A，另一部分的数据在B，但是没有相互复制，且数据也不同步了。要修复这部分数据的难度就会变得相当大。

所以我认为双主的更多的意义在于HA，而不是负载均衡。



### 2.4 主、被动的主主复制

同样还是双主的结构，但是区别在于其中一台是**只读**的被动服务器，客户端不会向该库进行写操作。

其用途在哪里呢？例如我们要在不中断服务的前提下对MySQL进行维护、优化，举个例子——**修改表结构**。假设我们有两个数据库，主库A和被动主库B，注意此处的被动主库是**只读**的，我们先停止A对B的复制，也就是停掉A上的SQL线程。

![主主停止复制](/images/mysql/23082/master-master-replication.jpeg)

这样一来，我们之后在B上执行的非常耗时、可能需要锁表的操作就不会立即同步到A上来。因为此时A正在对外提供服务，所以不能使其收到影响，但是由于采用的是异步的复制模式，所以Relay Log还是继续由I/O线程写入，只是不去进行重放。

然后我们在B上执行此次的维护操作，注意，此时A上面发生的更新还是会正常的同步到B来。执行完后**交换读写的角色**。也就是让A变成只读的被动主库，而B变为主动主库对外提供服务。

![重新开启SQL线程](/images/mysql/23082/restart-sql-thread.jpeg)

然后重新开启SQL线程，A开始去对之前Relay Log中积累的event进行重放。虽然A此时可能会阻塞住，但是A已经没有对外提供服务了，所以没有问题。

主、被动下的主主模式的好处大家也就清楚了，可以在不停止服务的情况下去做数据库的结构更新，其次可以在主库发生故障的情况下，快速的切换，保证数据库的HA。



## 3. 复制方式

上文我们不止一次的提到了`复制是异步的`，接下来我们来了解一下MySQL的主从复制都有哪些方式。



### 3.1 异步复制

首先就是异步，这也是MySQL默认的方式。在异步复制下，主库不会主动的向从库发送消息，而是等待从库的I/O线程建立连接，然后主库创建`binlog dump`线程，把binlog event发送给I/O线程，流程如下图。

![MySQL复制模式](/images/mysql/23082/async-replication.jpeg)

主库在执行完自己的事务、记录完binlog之后就会直接返回，不会与客户端确认任何结果。然后后续由binlog dump线程异步的读取binlog，然后发送给从库。**处理请求**和**主从复制**是两个完全异步化的过程。



### 3.2 同步复制

同步模式则是，主库执行一个事务，那么主库必须等待所有的从库全部执行完事务返回commit之后才能给客户端返回成功，

![同步复制](/images/mysql/23082/sync-replication.jpeg)

值得注意的是，主库会直接提交事务，而不是等待所有从库返回之后再提交。MySQL只是延迟了对客户端的返回，并没有延后事务的提交。

同步模式用脚趾头想知道性能会大打折扣，它把客户端的请求和主从复制耦合在了一起，如果有某个从库复制线程执行的慢，那么对客户端的响应也会慢很多。



### 3.3 半同步复制

半同步相对于同步的区别在于，同步需要等待所有的从库commit，而半同步只需要一个从库commit就可以返回了。如果超过默认的时间仍然没有从库commit，就会切换为异步模式再提交。客户端也不会一直去等待了。

![MySQL复制模式](/images/mysql/23082/half-sync-replication.jpeg)

因为即使后面主库宕机了，也能至少保证有一个从库节点是可以用的，此外还减少了同步时的等待时间。



## 4. 复制中的数据一致性

我们在1.3中讨论了复制的核心步骤，看似很简单的一个流程，主库的binlog dump去读取binlog，然后从库的I/O线程去读取、写入Relay Log，进而从库的SQL线程再读取Relay Log进行重放。

那如果I/O线程复制到一半自己突然挂掉了呢？又或者复制到一半主库宕机了呢？如果和保证数据一致性的呢？

我们上面提到过，有一个`relay-log.info`的文件，用于记录当前从库正在复制的binlog和写入的Relay Log的Pos，只要这个文件还在，那么当从库意外重启之后，就会重新读取文件，从上次复制的地方开始继续复制。这就跟Redis中的主从复制类似，双方要维护一个offset，通过对比offset，来进行psync增量数据同步。

但是在MySQL 5.5以及之前，都只能将复制的进度记录在`relog-log.info`文件中。换句话说，参数`relay_log_info_repository`只支持`FILE`，可以再回到上面的`1.5 Relay Log核心参数`看一下。所以只有在`sync_relay_log_info`次事务之后才会把`relay-log.info`文件刷入磁盘。

如果在刷入磁盘之前从库挂了，那么重启之后就会发现SQL线程实际执行到位置和数据库记录的不一致，数据一致性的问题就这么产生了。

所以在MySQL 5.6时，参数`relay_log_info_repository`支持了`TABLE`，这样一来我们就可以将复制的进度放在系统的`mysql.slave_relay_log_info`表里去，并且把更新进度、SQL线程执行用户事务绑定成一个事务执行。即使slave宕机了，我们也可以通过MySQL内建的崩溃恢复机制来使实际执行的位置和数据库保存的进度恢复到一致。



其次还有上面提到的半同步复制，主库会先提交事务，然后等待从库的返回，再将结果返回给客户端，但是如果在主库等待的时候，从库挂了呢？

此时主库上由于事务已经提交了，但是从库上却没有这个数据。所以在MySQL 5.7时引入了**无损半同步复制**，增加了参数`rpl_semi_sync_master_wait_point`的值，在MySQL 5.7中值默认为`after_sync`，在MySQL 5.6中默认值为`after_commit`。

- **after_sync** 主库先不提交事务，等待某一个从库返回了结果之后，再提交事务。这样一来，如果从库在没有任何返回的情况下宕机了，master这边也无法提交事务。主从仍然是一致的
- **after_commit** 与之前讨论的一样，主库先提交事务，等待从库返回结果再通知客户端


