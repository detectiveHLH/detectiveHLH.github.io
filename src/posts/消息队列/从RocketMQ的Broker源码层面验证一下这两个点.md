---
date: 2021-03-15
permalink: /posts/230823.html
category:
- 消息队列
tag:
- RocketMQ
---

# 从RocketMQ的Broker源码层面验证一下这两个点

> 本篇博客会从源码层面，验证在[RocketMQ基础概念剖析，并分析一下Producer的底层源码](https://mp.weixin.qq.com/s/tTlLsHpdAiRnlnzrnCusAw)中提到的结论，分别是：
>
> - Broker在启动时，会将自己注册到所有的NameServer上
> - Broker在启动之后，会每隔30S向NameServer发送心跳



之前的文章中，我们知道了RocketMQ中的一些核心概念，例如**Broker**、NameServer、**Topic**和**Tag**等等。Producer从启动到发送消息的整个过程，从源码级别分析了Producer在发送消息到Broker的时候，是如何拿到Broker的数据的，如何从多个MessageQueue中选择对应的Queue发送消息。

但是由于篇幅原因，文章开头提到的两个**已知结论**在上篇博客里并没没有对其进行验证，这次就从源码层面来验证一下。



## 一开头就看到Broker主从架构相关的源码

在上篇博客中提到过，Broker为了保证自身的高可用，会采取一主一从的架构。即使Master Broker因为意外原因挂了，Slave Broker上还有一份完整的数据，Broker可以继续提供服务。

![](/images/messagequeue/230823/register-all-broker.jpeg)

`isEnableDLegerCommitLog`中提到的DLeger可以先不管，我们目前只需要知道其默认返回的结果是`false`。所以Broker首次启动的时候，就会执行被If包裹住的逻辑。

RocketMQ本身是有主从架构的，但是功能不够完善，如果Master Broker出现了故障，需要人工的将Slave Broker切换成Master。

就有点类似于手动的将一台Redis设置成另一台Redis的Slave节点，如果此时Redis的Master挂了，还需要手动的进行切换一样。为了解决这个问题，Redis搞出了**Sentinel**，可以在发生故障的时候自动的实现故障转移。所以RocketMQ在4.5版本之后推出的**Dleger**差不多也是这么个东西，除此之外，Dleger还可以实现多副本。



## 不使用Dleger时，主从数据如何进行同步

先给出结论，在RocketMQ的主从架构下，主从同步采取的是Slave**主动拉取**的方式。

如果当前执行注册的Broker角色是`Slave`，那就会使用`ScheduledExecutorService`启动一个周期性的定时任务，每隔10秒就会去Master同步一次，同步的数据包括Topic的相关配置、Consumer的消费偏移量、延迟消息的Offset、订阅组的相关数据和配置。

![](/images/messagequeue/230823/sync-master-data.jpeg)

`ScheduledExecutorService`的作用和原理下面会做简单介绍。



## 首次启动时强制进行Broker注册

![](/images/messagequeue/230823/force-register-broker.jpeg)

因为是首次启动，所以参数`forceRegister`被直接设置成了true。



## 使用ScheduledExecutorService启动定时任务

通过入口进来之后，Broker会启动一个定时任务，**周期性**的去注册。`ScheduledExecutorService`底层就是一个`newSingleThreadScheduledExecutor`，只有一个线程的线程池，其关键的参数`corePoolSize`值为`1`，然后按照指定的**频率**周期性的执行某个任务。

![](/images/messagequeue/230823/use-scheduled-executor.jpeg)

ScheduledExecutorService主要的功能有两个，分别是：

- `ScheduledExecutorService` 以固定的**频率**执行任务
- `ScheduledExecutorService` 执行完之后，间隔制定的时间后再执行下一个任务



## 使用scheduleAtFixedRate实现心跳机制

此处我们使用的是`scheduleAtFixedRate`，如下图。

![](/images/messagequeue/230823/start-to-heart-beat.jpeg)

至于执行的频率，我们能够配置的范围最大不能超过一分钟，也就是说这个范围是在10-60秒之间，默认30秒执行一次，这也就验证了每30秒，Broker会向NameServer发送一次心跳。

获取执行频率的这个判断有点意思，甚至看起来有那么一丝丝简洁，但是理解其具体可配置的时间范围可能需要花点时间。在实际**业务性代码**中，个人建议还是不要这么写，业务中代码的**可读性**和**可维护性**我认为是需要放在首位的。

值得注意的是，此处启动心跳，给了一个10秒的延迟，因为在不使用Dleger的情况下，在之前的逻辑中已经执行过一次**注册**了。如果不做延迟，那么几乎是同一个时间就会有**两次**注册操作，而这明显是不符合预期的；同时`forceRegister`也从`true`变成了通过函数`isForceRegister`来进行获取。



## 调用registerBrokerAll注册

定时任务注册完成之后，之后的每次触发都会执行`registerBrokerAll`方法来执行注册，你可能会有疑问，我当前不就是一个Broker吗，怎么名字有个后缀`All`？那是因为NameServer会有多个，Broker启动的时候会将自己注册到所有的NameServer上去。当然，口说无凭，我们继续看下去。

继续往里走，如果当前满足注册条件，则会实际的执行注册操作。那具体满足什么条件呢？由变量`forceRegister`和一个`needRegister`方法来决定，`forceRegister`默认是`true`，所以当第一执行这个逻辑的时候是一定会执行注册操作的。

![](/images/messagequeue/230823/do-register.jpeg)



## 通过对比数据版本判断当前Broker是否需要进行注册

感兴趣的话，可以继续跟随文章了解一下，`needRegister`是根据什么来判断是否需要注册的。

首先，Broker一旦注册到了NameServer之后，由于Producer不停的在写入数据，Consumer也在不停的消费数据，Broker也可能因为故障导致MessageQueue等关键路由信息发生变动，NameServer中的数据和Broker中实际的数据就会不一致，如果不及时更新，Producer拉取到的路由数据就可能有误。

所以每次定时任务触发的时候会去对比NameServer和Broker的数据，如果发现数据版本不一致，Broker会重新进行注册，将最新的数据更新到NameServer。说直白一点，就是做一个数据定时更新。以下红框中的代码就是数据对比的核心代码。

![](/images/messagequeue/230823/compare-version.jpeg)



当Broker和所有的NameServer节点一一完成数据对比之后，就会进行结果判定，但凡有一个节点数据不一致，都需要进行重新注册，把最新的数据更新到NameServer，核心判断逻辑同样用红框标出。

![](/images/messagequeue/230823/get-value-for-need-register.jpeg)



至此，其实我们就已经完成了 *Broker在启动的时候会向所有NameServer进行注册* 的验证。但是由于后续仍然有值得关注发光点，我们继续后续的源码阅读。



## 使用CountDownLatch获取所有注册异步任务的返回结果

除此之外，还值得注意的是在`needRegister`中，对于和多个NameServer的交互，RocketMQ是通过线程池异步实现的，同时使用了CountDownLatch来等待所有的请求结束，返回结果给主线程。

![](/images/messagequeue/230823/use-countdown-latch.jpeg)

既然聊到了CountDownLatch，就顺带提一下。假设我们有5个互不依赖的计算任务，如果快速的计算出结果并返回呢？那当然是5个任务并发执行，这就需要通过新开线程实现，结果就无法一起返回了。

而CountDownLatch可以让主线程等待，等待这5个计算任务全部结束之后，唤醒主线程再继续后面的逻辑。这就是CountDownLatch的作用，如果平时只是单纯的CRUD功能的话，可能连CountDownLatch是什么都做不知道，这也是为什么大厂面试会问这些问题，因为在大厂的复杂业务背景下，你必须要会使用它们。



指定需要注册之后，接下来就是核心的注册方法了，核心逻辑由`registerBrokerAll`来实现。Broker同样会去每一个NameServer节点上注册自己，并且为了提前执行的效率，同样开线程采用了异步的方式。在获取所有结果时，同样的使用了CountDownLatch。

![](/images/messagequeue/230823/use-countdown-latch-again.jpeg)



## 使用CopyOnWriteArrayList存储注册请求的返回

除此之外，用于保存注册结果的列表，使用的是`CopyOnWriteArrayList`，被面试虐过的同学应该熟悉。我们知道此处开启了多线程去不同的NameServer注册，写入注册结果的时候，多线程对同一个列表进行写入，会产生线程安全的问题。

![](/images/messagequeue/230823/use-copy-on-write-array-list.jpeg)

而我们知道`ArrayList`是非线程安全的，这也是为什么此处要使用`CopyOnWriteArrayList`来保存注册结果。为什么`CopyOnWriteArrayList`能够保证线程安全？

这归功于COW（Copy On Write），**读请求**时共用同一个List，涉及到**写请求**时，会复制出一个List，并在写入数据的时候加入独占锁。比起直接对所有操作加锁，读写锁的形式分离了读、写请求，使其互不影响，只对写请求加锁，降低了加锁的消耗，提升了整体操作的并发。



上面并发执行的**注册**操作，具体做了哪些事情呢？先看代码。

![](/images/messagequeue/230823/invoke-one-way-request.jpeg)

上面就是单个注册的所有逻辑，可以看到在构建完请求之后，有一个`oneway`的判断。

`oneway`值为false，表示单向通信，Broker不关心NameServer的返回，也不会触发任何回调函数。接下来Broker就会把已经写进request body的所有数据发送给NameServer。请求数据统一由一个叫`TopicConfigSerializeWrapper`的Wrapper给包裹住。

![](/images/messagequeue/230823/build-wrapper.jpeg)

其可以看为两部分：

- 存在该Broker节点上的**所有Topic的数据**
- 数据版本



然后带着这些数据，Broker会同步的调用`invokeSync`发送请求给NameServe，并且在执行之后触发实现特定功能的回调函数。



## EOF

至此，我们完成了对开篇所提结论的验证，同时也发现了RocketMQ的主从架构、Master和Slave同步数据的方式、心跳机制的实现等等，也基本从源码中看完了Broker启动的所有流程。看这些老哥写的源码还是挺有意思的，之后有时间随缘再看看NameServer端相关的源码吧。