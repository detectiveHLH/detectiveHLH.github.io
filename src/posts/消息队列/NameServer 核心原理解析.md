---
date: 2021-07-12
permalink: /posts/230825.html
category:
- 消息队列
tag:
- RocketMQ
- NameServer
---

# NameServer 核心原理解析

在[之前的文章](https://mp.weixin.qq.com/s/6pBlK_h0PEHfFXjXFgqMDQ)中，已经把 Broker、Producer 和 Conusmer 的部分源码和核心的机制介绍的差不多了，但是其实 RocketMQ 中还有一个比较关键但是我们平时很容易忽略的组件——**NameServer**。

在日常的使用中，我们接触的最多的还是 Producer 和 Consumer，而 NameServer 没有直接跟我们有交互。就像 Kafka 集群背后用于其集群元数据管理的 Zookeeper 集群一样，NameServer 也在背后支撑着 RocketMQ 正常工作。



## 你给翻译翻译，什么叫 NameServer

NameServer 你可以简单的把它理解成**注册中心**。

**Broker** 启动的时候会将自己注册到 NameServer 中，注册的同时还会将 Broker 的 IP 地址、端口相关的数据，以及保存在 Broker 中的 RocketMQ 集群路由的数据一并跟随**心跳**发送到 NameServer。这里的**路由信息**是指 Topic 下的 MessageQueue 分别都在哪台 Broker 上。

![](/images/230825/broker-send-data-to-nameserver.jpeg)

而 **Producer** 则会从 NameServer 中获取元数据，从而将 Message 发到对应的 Broker 中去。

相应的，**Consumer** 也需要从 NameServer 中获取数据。平常我们配置消费者，里面重要的信息主要就两个，分别是你要消费的 **Topic** 和当前的 **Consumer Group**。根据配置，Consumer 会去 NameServer 获取对应的 Topic 都有哪些 Broker，其真实的 IP 地址和端口是多少，拿到了这个之后就可以开始进行消息消费了。



## 注册 Broker 都做了什么

这里我们先通过注册 Broker 的源码来预热一下，为后面阅读整个部分的源码做准备，直接上代码。

![](/images/230825/register-broker-code.jpeg)

首先这里做了一个对 **Broker** 版本的区分，不同的版本采用不同的处理方式，鉴于官网现在最新的版本都已经到了 `4.9.0` 了，就暂时先不考虑低版本的情况了，后面有时间再讨论。

![](/images/230825/different-version.jpeg)

> 只有向上面那种几行的代码会给大家贴出来，其余的代码我会尽量用流程图代替



### 校验 Body 的完整性

首先是校验 Broker 传过来的数据的完整性。很简单的一个判断，将 Broker 传过来的 Body 用 **CRC32算法** 加密之后，和请求中 Header 中所带的由 Broker 加密的值进行对比，不同的话就说明数据的完整性出了问题，接下来需要中断注册流程。

![](/images/230825/validate-data.jpeg)

### 解析Body

这里分成两种情况：

- Body为空
- Body不为空

如果 **Body 为空**，则会将当前要注册的 Broker 的 DataVersion 给重置；

而 **Body 不为空 **则会进行对 Body 进行解析，主要是从中解析出 `DataVersion` ，代表 Broker 中的数据版本。其次解析出这个 Broker 中存储的所有 Topic 及其相关的配置。

![](/images/230825/parse-body.jpeg)



### 执行注册逻辑

这里就是注册的**核心逻辑**了，这里为了更加容易理解，我们来分情况讨论，就不把两种情况揉在一起了。

- 首次注册
- 非首次注册



#### 维护集群中 Broker 的 Name

在整个操作开始之前，会先给 `RouteInfoManager` 加一把锁，这个 `RouteInfoManager` 里面就是 NameServer 存储数据的地方。这个锁是个读写锁，使用的是 Java 中的 `ReentrantReadWriteLock`。

![](/images/230825/maintain-cluster-addr.jpeg)

这里的 BrokerName 是在 RocketMQ 配置文件中配置的变量。就是用于标识一个 Broker 的名字，但我们知道 Broker 是有主从架构的，并且 RocketMQ 4.5 之后推出的 Dleger 可以实现一主多从，换句话说，一个 Broker Name 可能会对应多个 Broker 实例。

在 MQ 看来，Broker 是多实例部署的；而在 Producer 或者 Consumer 来看，Broker就只有一个。所以，这个步骤内所维护的就是在当前集群中，有多少个这样的 Broker Name。



#### 维护 Broker 的数据

然后，RocketMQ 会在 `brokerAddrTable` 中维护每个 Broker 的核心数据，包含：

- Broker 所处的集群
- Broker 的名字（上面刚刚讨论过）
- 所有 Broker 的 BrokerID 和 Address 的对应关系，是个 Map，Address 为 IP+端口



同一个 Broker Name 下，为什么会有多个地址信息已经在上个步骤解答过，不在此赘述。

![](/images/230825/maintain-broker-data.jpeg)

Broker 的数据维护主要有两个方面：

- 该 Broker 数据在 `brokerAddrTable` 中是否存在
- `brokerAddrTable ` 中维护的数据不能有重复的地址信息

第一个过于基础简单，就不再赘述。我们重点看第二个点，我们知道会有多个 Broker 地址，存在一个 Map 中，因为 Broker 是基于主从架构。那不知道你有没有想过，NameServer 如何区分 **主** 和 **从** 的呢？

答案是通过 Map 的 Key，如果是 `0` 则代表是 Master 节点，`1` 则代表 Slave 节点，因为 RocketMQ 自己实现的 Broker 主从架构是**一主一从**，而**一主多从**则是由 RocketMQ 4.5 之后加入的 Dleger 实现的，暂时先不讨论。区分的逻辑如下图：

![](/images/230825/master-slave.jpeg)



那什么时候会出现重复呢？

> 答案是主从切换

举个例子，假设某个 Slave Broker 的 Address 为 `192.168.1.101:8081` ，且已经注册。此时`brokerAddrs` 中已经有一个`key: 1 value: 192.168.1.101:8081` 记录了。

当集群中的 Master 宕机之后，会进行故障恢复，假设选中了上面这个 Broker 为新的 Master，在进行注册的时候会发现，`brokerAddrs` 中已经有一个同样的 Address 了，只是 Key 不同。但是由于它们从本质上来说就是同一台机器，如果不将 key 为1，也就是角色为 Slave 的记录去掉，就会造成数据一致性的问题。

简单总结一下来说，同一个 Adreess，在 `brokerAddrs` 中只能存在一个。感兴趣的可以看一下源码，其实跟上面文字描述的逻辑是一样的。

![](/images/230825/remove-broker-addr.jpeg)

去除了重复的 Address 数据之后，就会将本次注册的 Broker 的数据注册进 `brokerAddrs` 中。



#### 维护 MessageQueue 的数据

这里主要是根据 Broker 的数据更新其 MessageQueue 相关的数据。接下来，我们详细解析一下 Message Queue 的维护流程，同样会给出**源码**和流程图，两部分等价，可选择性观看。



当 Master 节点来注册时，如果是**首次注册**或者**数据有更新**，便会调用一个方法`createAndUpdateQueueData`去维护 MessageQueue 相关的数据。这里对数据是否更新的判断，是基于 `DataVersion` 的，代表 Broker 数据的版本。

此后通过 Topic 的 Name 拿到对应的 MessageQueue 的列表，这里可能会有点疑问，一个 Topic 难道不应该只有一个对 MessageQueue 相关的配置吗，为什么这里拿到的是个列表？

> 小了，格局小了

Topic 是个**逻辑**上的概念，一个 Topic 的 MessageQueue 会分布在不同的 Broker 上，所有这里是个列表。

![](/images/230825/update-process.jpeg)

更新的流程如上图，拿到了 MessageQueue 的列表之后，会和本次注册的 Broker 中的 MessageQueue 数据做一个对比，如果发现不同就进行全量的替换，没什么其他的复杂对比逻辑。源码等同上图，感兴趣的可以自行查看。

![](/images/230825/create-and-update-queue-data.jpeg)



#### 维护 Broker 的存活信息

到这里，MessageQueue 相关的逻辑就处理完了，接下来 NameServer 会再去更新 `brokerLiveTable` 中的数据，这里存放了当前正在活跃的所有 Broker。这块的作用后续会讲。



## NameServer 启动流程

上面通过了解**注册 Broker**的整个流程，对整个 NameServer 的架构有了个大概的了解，接下来再从整体视角来看一下 NameServer。

![NameServer的主要流程](/images/230825/nameserver-boot-process.jpeg)

整体的流程上面这张图已经给出来了，就不放源码了，意义不大。

这里说一下**扫描不再活跃的Broker**，这个后台线程会每 **10秒** 钟执行一次，这里会对上文提到的 `brokerLiveTable` 进行遍历处理，因为这里面维护了所有的正在活跃的 Broker。

如果某个 Broker 超过了 **120秒** 没有发送心跳给 NameServer，就会将其从 `brokerLiveTable` 中移除。



## NameServer 可处理的操作

上面简单了解了 **注册 Broker** 的流程，实际上 NameServer 还支持很多其他的操作，这里就不再这里列出来了，看了没有意义，感兴趣的可以自己去网上找，一大堆的资料。而且 `Register Broker` 这个操作中所涉及到源码中的数据结构，其他的操作都会用到，所以了解了 `Register Broker` 之后，再去阅读其他操作的源码会非常的顺。

