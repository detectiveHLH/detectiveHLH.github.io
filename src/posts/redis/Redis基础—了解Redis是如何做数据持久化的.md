---
date: 2023-08-17
permalink: /posts/230816.html
category:
- redis
---

# Redis基础—了解Redis是如何做数据持久化的

之前的文章介绍了Redis的简单数据结构的相关使用和底层原理，这篇文章我们就来聊一下Redis应该如何保证高可用。



## 数据持久化

我们知道虽然单机的Redis虽然性能十分的出色， 单机能够扛住10w的QPS，这是得益于其基于内存的快速读写操作，那如果某个时间Redis突然挂了怎么办？我们需要一种**持久化**的机制，来保存内存中的数据，否则数据就会直接丢失。

Redis有两种方式来实现数据的持久化，分别是**RDB**（Redis Database）和**AOF**（Append Only File)，你可以先简单的把RDB理解为某个时刻的Redis内存中的数据快照，而AOF则是所有记录了所有修改内存数据的指令的集合（也就是Redis指令的集合），而这两种方式都会生成相应的文件落地到磁盘上，实现数据的持久化，方便下次恢复使用。

接下来就分别来聊聊这两种持久化方案。



## RDB

在redis中生成RDB快照的方式有两种，一种是使用`save`，另一种是`bgsave`，但是底层实现上，其调用的是同一个函数，叫`rdbsave`，只是其调用的方式不同而已。



### 生成方法

#### save

save命令直接调用`rdbsave`方法，此时会**阻塞Redis主进程**，直至快照文件生成。

```c
void saveCommand(client *c) {
    if (server.rdb_child_pid != -1) {
        addReplyError(c,"Background save already in progress");
        return;
    }
    rdbSaveInfo rsi, *rsiptr;
    rsiptr = rdbPopulateSaveInfo(&rsi);
    if (rdbSave(server.rdb_filename,rsiptr) == C_OK) {
        addReply(c,shared.ok);
    } else {
        addReply(c,shared.err);
    }
}
```



#### bgsave

bgsave命令会fork出一个子进程，由fork出来的子进程调用`rdbsave`。父进程会继续响应来自客户端的读写请求。子进程完成RDB文件生成之后会给父进程发送信号，通知父进程保存完成。

```c
/* BGSAVE [SCHEDULE] */
void bgsaveCommand(client *c) {
    int schedule = 0;

    /* The SCHEDULE option changes the behavior of BGSAVE when an AOF rewrite
     * is in progress. Instead of returning an error a BGSAVE gets scheduled. */
    if (c->argc > 1) {
        if (c->argc == 2 && !strcasecmp(c->argv[1]->ptr,"schedule")) {
            schedule = 1;
        } else {
            addReply(c,shared.syntaxerr);
            return;
        }
    }

    rdbSaveInfo rsi, *rsiptr;
    rsiptr = rdbPopulateSaveInfo(&rsi);

    if (server.rdb_child_pid != -1) {
        addReplyError(c,"Background save already in progress");
    } else if (hasActiveChildProcess()) {
        if (schedule) {
            server.rdb_bgsave_scheduled = 1;
            addReplyStatus(c,"Background saving scheduled");
        } else {
            addReplyError(c,
            "Another child process is active (AOF?): can't BGSAVE right now. "
            "Use BGSAVE SCHEDULE in order to schedule a BGSAVE whenever "
            "possible.");
        }
    } else if (rdbSaveBackground(server.rdb_filename,rsiptr) == C_OK) {
        addReplyStatus(c,"Background saving started");
    } else {
        addReply(c,shared.err);
    }
}
```

这也就是为什么Redis是单线程的，但却能够在生成RDB文件的同时对外提供服务。`fork`是unix系统上创建进程的主要方法，会把父进程的所有数据拷贝到子进程中，父子进程共享内存空间。

fork之后，操作系统内核会把父进程中的所有内存设置为只读，只有当发生写数据时，会发生页异常中断，内核会把对应的内存页拷贝一份，父子进程各持有一份，所以在生成RDB过程中，由于使用了COW，内存脏页会逐渐和子进程分开。



> 那么有没有可能在调用`bgsave`的过程中，我再调用`save`命令呢，这个时候岂不是会生成两份RDB文件？

实际上在调用`save`命令时，Redis会判断`bgsave`是否正在执行，如果正在执行服务器就不能再调用底层的`rdbsave`函数了，这样做可以避免两个命令之间出现资源竞争的情况。

例如，在`save`命令中，有如下的判断：

```c
if (server.rdb_child_pid != -1) {
  addReplyError(c,"Background save already in progress");
  return;
}
```

而在`bgsave`中又有如下的判断：

```c
if (server.rdb_child_pid != -1) {
  addReplyError(c,"Background save already in progress");
} else if (hasActiveChildProcess()) {
  ...
}
```

可以看到都是对同一个变量的判断，如下：

```c
pid_t rdb_child_pid; /* PID of RDB saving child */
```

换句话说，在调用save、bgsave命令的时候，会提前去判断`bgsave`是否仍然在运行当中，如果在运行当中，则不会继续执行bgsave命令。而save命令本身就是阻塞的，如果此时有其他的命令过来了都会被阻塞， 直到save执行完毕，才会去处理。



> 那我把RDB文件生成了之后怎么使用呢？

Redis在启动服务器的时候会调用`rdbLoad`函数，会把生成的RDB文件给加载到内存中来，在载入的期间，每载入**1000**个键就会处理一次已经到达的请求，但是只会处理publish、subscribe、psubscribe、unsubscribe、punsubscribe这个五个命令。其余的请求一律返回错误，直到载入完成。



> 你吹的这么好，RDB的优缺点分别是啥？

### 优点

RDB策略可以灵活配置周期，取决于你想要什么样的备份策略。例如：

- 每小时生成一次最近24小时的数据
- 每天生成最近一周的数据
- 每天生成最近一个月的数据

基于这个策略，可以快速的恢复之前某个时间段的数据。

其次，RDB非常的适合做**冷备份**，你可以把RDB文件存储后转移到其他的存储介质上。甚至可以做到**跨云存储**，例如放到OSS上的同时，又放到S3上，跨云存储让数据备份更加的健壮。

而且，基于RDB模式的恢复速度比AOF更快，因为AOF是一条一条的Redis指令，RDB则是数据最终的模样。数据量大的话所有AOF指令全部**重放**要比RDB更慢。



### 缺点

RDB作为一个**数据持久化**的方案是可行的，但是如果要通过RDB做到Redis的**高可用**，RDB就不那么合适了。

因为如果Redis此时还没有来得及将内存中的数据生成RDB文件，就先挂了，那么距离上次成功生成RDB文件时新增的这部分数据就会全部丢失，而且无法找回。

而且，如果内存的数据量很大的话，RDB即使是通过fork子进程来做的，但是也需要占用到机器的**CPU资源**，也可能会发生很多的也异常中断，也可能造成整个Redis停止响应几百毫秒。



## AOF

上面提到过RDB不能满足Redis的高可用。因为在某些情况下，会永久性的丢失一段时间内的数据，所以我们来聊聊另一种解决方案AOF。首先我们得有个概念，那就是RDB是对当前Redis Server中的数据快照，而AOF是对变更指令的记录（所有的获取操作不会记录，因为对当前的Redis数据没有改变）。

但是也正因为如此，AOF文件要比RDB文件更大。下面聊一下一个Redis命令请求从客户端到AOF文件的过程。



### AOF记录过程

首先Redis的客户端和服务器之间需要通信，客户端发送的不是我们写入的字符串，而是专门的**协议文本**。如果你可以熟悉Thrift或者Protobuf的话应该就能理解这个协议。

例如执行命令 `SET KEY VALUE`，传到服务器就变成了`"*3\r\n$3\r\nSET\r\n$3\r\nKEY\r\n$5\r\nVALUE\r\n"`。

然后Redis服务器就会根据协议文本的内容，选择适当的handler进行处理。当客户端将指令发送到Redis服务器之后，只要命令成功执行，就会将这个命令传播到AOF程序中。

注意，传播到AOF程序中之后不会马上写入磁盘，因为频繁的IO操作会带来巨大的开销，会大大降低Redis的性能，协议文本会被写到Redis服务器中的aof_buf中去，也叫AOF的**写入缓冲区**。



> 你这全部都写到缓冲区去了，啥时候落地？

每当`serverCron`（先有一个**定时任务**的概念，下面马上就会讲serverCron是啥）被执行的时候，`flushAppendOnlyFile` 这个函数就被调用。

这个命令会调用 `write`将写入缓冲区的数据写入到AOF文件中，但是这个时候还是**没有**真正的**落到磁盘上**。这是OS为了提高写入文件的效率，会将数据暂时写入到OS的内存的缓冲区内，等到缓冲区被填满了或超过了指定的时间，才会调用`fsync`或者`sdatasync`真正的将缓冲区的内容写入到磁盘中。

但是如果在这期间机器宕了，那么**数据仍然会丢失**。所以如果想要真正的将AOF文件保存在磁盘上，必须要调用上面提到的两个函数才行。



### ServerCron

#### 作用

现在我们就来具体聊一下serverCron函数，它主要是用于处理Redis中的**常规任务**。

> 什么叫常规任务？

就比如上面提到的AOF写入缓冲区，每次serverCron执行的时候就会把缓冲区内的AOF写入文件（当然，OS会写入自己的buffer中）。其余的就像AOF和RDB的持久化操作，主从同步和集群的相关操作，清理失效的客户端、过期键等等。

> 那这个cron间隔多久执行一次？

很多博客是直接给出的结论，`100ms`执行一次，口说无凭，我们直接撸源码。下面是serverCron的函数定义。

```c
/* This is our timer interrupt, called server.hz times per second.
 * .............
 */
int serverCron(struct aeEventLoop *eventLoop, long long id, void *clientData) {
  ...
  server.hz = server.config_hz;
}
```

为了避免影响大家的思路，我省略了暂时对我们没用的代码和注释。可以看到注释中有`called server.hz times per second`。意思就是serverCron这个函数将会在每一秒中调用server.hz次，那这个server.hz又是啥？



#### server.hz

相信大家都知道HZ（赫兹）这个单位，它是频率的国际单位制单位，表示每一条周期性事件发生的次数。所以，我们知道这个配置项是用于控制周期性事件发生的频率的。

其赋值的地方在上面的函数中已经给出，可以看到其初始值是来源于`redis.conf`的配置文件。那让我们看一下具体的配置。

```
# Redis calls an internal function to perform many background tasks, like
# closing connections of clients in timeout, purging expired keys that are
# never requested, and so forth.
#
# Not all tasks are performed with the same frequency, but Redis checks for
# tasks to perform according to the specified "hz" value.
#
# By default "hz" is set to 10. Raising the value will use more CPU when
# Redis is idle, but at the same time will make Redis more responsive when
# there are many keys expiring at the same time, and timeouts may be
# handled with more precision.
#
# The range is between 1 and 500, however a value over 100 is usually not
# a good idea. Most users should use the default of 10 and raise this up to
# 100 only in environments where very low latency is required.
hz 10
```

简单的提取一下有用的信息，Redis会在内部调用函数来执行很多后台的任务，而调用这些函数的频率就由这个`hz`来决定的，其默认值为`10`。那也就是说，上面提到的 serverCron函数会在一秒钟执行10次，这样平均下来就是每100ms（1000ms/10）调用一次。





### 写入策略

上面说到，如果Redis的AOF已经位于OS的缓冲中，如果此时宕机，那么AOF的数据同样会丢失。

> 你这不行啊，那你这个持久化有什么意义？怎么样数据才能不丢失？

这得聊一下AOF日志的写入策略，它有三种策略，分别如下：

- **always** 每个命令都会写入文件并且同步到磁盘
- **everysec** 每秒钟同步一次数据到磁盘
- **no** 不强制写，等待OS自己去决定什么时候写

很明显`always`这种策略在真正的生产环境上是不可取的，每个命令都去写文件，会造成极大的IO开销，会占用Redis服务器的很多资源，降低Redis的服务效率。

而如果使用`everysec`策略的话，即使发生了断电，机器宕机了，我最多也只会丢失一秒钟的数据。

而`no`则完全交与操作系统去调度，可能会丢失较多的数据。



> 🐂🍺，那这AOF文件咋用的，怎么恢复？

上面提到过，AOF文件是记录了来自客户端的所有写命令，所以服务器只需要读入并重放一遍即可将Redis的状态恢复。

但是，Redis的命令只能在客户端中的上下文才能够执行，所以Redis搞了一个没有网络连接的伪客户端来执行命令，直到命令执行完毕。



> 老铁，你这不行啊，万一AOF日志数据量很大，你这岂不是要恢复很长时间，那服务岂不是不可用了？

的确，随着服务器的运行，AOF的数据量会越来越大，重放所需要的时间也会越来越多。所以Redis有一个**重写**（AOF Rewrite）机制，来实现对AOF文件的**瘦身**。

虽然名字叫对AOF文件的瘦身，但是实际上要做的操作跟之前已经生成的AOF文件没有一毛钱的关系。

所谓**瘦身**是通过读取Redis服务器当前的数据状态来实现的，当然，这里的当前是在服务器正常运行的时候。其实你也可以理解为快照，只不过不是实打实的二进制文件了，而是直接设置快照值的命令。

用人话举个例子，假设你Redis中有个键叫`test`，它的值的变化历史是1 -> 3 -> 5 -> 7 -> 9这样，那么如果是正常的AOF文件就会记录5条Redis指令。而AOF Rewrite此时介入，就只会记录一条`test=9`这样的数据。

而之前的AOF文件还是照常的写入，当新的AOF文件生成后替换即可。



> 你tm在逗我？你在rewrite的同时，服务器仍然在处理正常的请求，此时如果对服务器的状态做了更改，你这个瘦身之后的AOF文件数据不就不一致了？

这种情况的确会出现，但是Redis通过一个**AOF重写缓冲区**来解决了这个问题。

当**rewrite**开始后，Redis会fork一个子进程，让子进程来实现AOF的瘦身操作，父进程则可以正常处理请求。AOF重写缓冲区会在rewrite开始创建了子进程之后开始使用，此时Redis服务器会把写的指令同时发送到两个地方：

1. aof_buf，也就是上面提到的AOF文件的写入缓冲区
2. AOF重写缓冲区

你可能会问，为啥要记录到两个地方？上面提到过，Redis执行**瘦身**操作时，常规的AOF文件仍然是正常生成的，所以新的Redis指令一定会发送到写入缓冲区。

而发送到AOF重写缓冲区是为了重放在**瘦身**操作进行当中对Redis状态进行的更改，这样**瘦身**之后的AOF文件状态才能保证与Redis的状态一致。总的来说，就是为了保证**瘦身**的AOF文件中的数据状态与Redis当时的内存状态保持数据上的一致性。



## End

关于Redis数据持久化的问题，就先聊这么多，下一期的计划的应该就是聊一聊Redis的高可用的相关机制了，感兴趣的可以微信搜索「**SH的全栈笔记**」持续关注

