import{_ as a,r as i,o as t,c as s,a as r,b as e,d as n,f as d}from"./app-a9a3b51d.js";const c="/images/230825/broker-send-data-to-nameserver.jpeg",g="/images/230825/register-broker-code.jpeg",p="/images/230825/different-version.jpeg",l="/images/230825/validate-data.jpeg",u="/images/230825/parse-body.jpeg",k="/images/230825/maintain-cluster-addr.jpeg",m="/images/230825/maintain-broker-data.jpeg",h="/images/230825/master-slave.jpeg",f="/images/230825/remove-broker-addr.jpeg",b="/images/230825/update-process.jpeg",B="/images/230825/create-and-update-queue-data.jpeg",_="/images/230825/nameserver-boot-process.jpeg",v={},N=r("h1",{id:"nameserver-核心原理解析",tabindex:"-1"},[r("a",{class:"header-anchor",href:"#nameserver-核心原理解析","aria-hidden":"true"},"#"),e(" NameServer 核心原理解析")],-1),x={href:"https://mp.weixin.qq.com/s/6pBlK_h0PEHfFXjXFgqMDQ",target:"_blank",rel:"noopener noreferrer"},M=r("strong",null,"NameServer",-1),y=d('<p>在日常的使用中，我们接触的最多的还是 Producer 和 Consumer，而 NameServer 没有直接跟我们有交互。就像 Kafka 集群背后用于其集群元数据管理的 Zookeeper 集群一样，NameServer 也在背后支撑着 RocketMQ 正常工作。</p><h2 id="你给翻译翻译-什么叫-nameserver" tabindex="-1"><a class="header-anchor" href="#你给翻译翻译-什么叫-nameserver" aria-hidden="true">#</a> 你给翻译翻译，什么叫 NameServer</h2><p>NameServer 你可以简单的把它理解成<strong>注册中心</strong>。</p><p><strong>Broker</strong> 启动的时候会将自己注册到 NameServer 中，注册的同时还会将 Broker 的 IP 地址、端口相关的数据，以及保存在 Broker 中的 RocketMQ 集群路由的数据一并跟随<strong>心跳</strong>发送到 NameServer。这里的<strong>路由信息</strong>是指 Topic 下的 MessageQueue 分别都在哪台 Broker 上。</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而 <strong>Producer</strong> 则会从 NameServer 中获取元数据，从而将 Message 发到对应的 Broker 中去。</p><p>相应的，<strong>Consumer</strong> 也需要从 NameServer 中获取数据。平常我们配置消费者，里面重要的信息主要就两个，分别是你要消费的 <strong>Topic</strong> 和当前的 <strong>Consumer Group</strong>。根据配置，Consumer 会去 NameServer 获取对应的 Topic 都有哪些 Broker，其真实的 IP 地址和端口是多少，拿到了这个之后就可以开始进行消息消费了。</p><h2 id="注册-broker-都做了什么" tabindex="-1"><a class="header-anchor" href="#注册-broker-都做了什么" aria-hidden="true">#</a> 注册 Broker 都做了什么</h2><p>这里我们先通过注册 Broker 的源码来预热一下，为后面阅读整个部分的源码做准备，直接上代码。</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>首先这里做了一个对 <strong>Broker</strong> 版本的区分，不同的版本采用不同的处理方式，鉴于官网现在最新的版本都已经到了 <code>4.9.0</code> 了，就暂时先不考虑低版本的情况了，后面有时间再讨论。</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>只有向上面那种几行的代码会给大家贴出来，其余的代码我会尽量用流程图代替</p></blockquote><h3 id="校验-body-的完整性" tabindex="-1"><a class="header-anchor" href="#校验-body-的完整性" aria-hidden="true">#</a> 校验 Body 的完整性</h3><p>首先是校验 Broker 传过来的数据的完整性。很简单的一个判断，将 Broker 传过来的 Body 用 <strong>CRC32算法</strong> 加密之后，和请求中 Header 中所带的由 Broker 加密的值进行对比，不同的话就说明数据的完整性出了问题，接下来需要中断注册流程。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="解析body" tabindex="-1"><a class="header-anchor" href="#解析body" aria-hidden="true">#</a> 解析Body</h3><p>这里分成两种情况：</p><ul><li>Body为空</li><li>Body不为空</li></ul><p>如果 <strong>Body 为空</strong>，则会将当前要注册的 Broker 的 DataVersion 给重置；</p><p>而 **Body 不为空 **则会进行对 Body 进行解析，主要是从中解析出 <code>DataVersion</code> ，代表 Broker 中的数据版本。其次解析出这个 Broker 中存储的所有 Topic 及其相关的配置。</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="执行注册逻辑" tabindex="-1"><a class="header-anchor" href="#执行注册逻辑" aria-hidden="true">#</a> 执行注册逻辑</h3><p>这里就是注册的<strong>核心逻辑</strong>了，这里为了更加容易理解，我们来分情况讨论，就不把两种情况揉在一起了。</p><ul><li>首次注册</li><li>非首次注册</li></ul><h4 id="维护集群中-broker-的-name" tabindex="-1"><a class="header-anchor" href="#维护集群中-broker-的-name" aria-hidden="true">#</a> 维护集群中 Broker 的 Name</h4><p>在整个操作开始之前，会先给 <code>RouteInfoManager</code> 加一把锁，这个 <code>RouteInfoManager</code> 里面就是 NameServer 存储数据的地方。这个锁是个读写锁，使用的是 Java 中的 <code>ReentrantReadWriteLock</code>。</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里的 BrokerName 是在 RocketMQ 配置文件中配置的变量。就是用于标识一个 Broker 的名字，但我们知道 Broker 是有主从架构的，并且 RocketMQ 4.5 之后推出的 Dleger 可以实现一主多从，换句话说，一个 Broker Name 可能会对应多个 Broker 实例。</p><p>在 MQ 看来，Broker 是多实例部署的；而在 Producer 或者 Consumer 来看，Broker就只有一个。所以，这个步骤内所维护的就是在当前集群中，有多少个这样的 Broker Name。</p><h4 id="维护-broker-的数据" tabindex="-1"><a class="header-anchor" href="#维护-broker-的数据" aria-hidden="true">#</a> 维护 Broker 的数据</h4><p>然后，RocketMQ 会在 <code>brokerAddrTable</code> 中维护每个 Broker 的核心数据，包含：</p><ul><li>Broker 所处的集群</li><li>Broker 的名字（上面刚刚讨论过）</li><li>所有 Broker 的 BrokerID 和 Address 的对应关系，是个 Map，Address 为 IP+端口</li></ul><p>同一个 Broker Name 下，为什么会有多个地址信息已经在上个步骤解答过，不在此赘述。</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Broker 的数据维护主要有两个方面：</p><ul><li>该 Broker 数据在 <code>brokerAddrTable</code> 中是否存在</li><li><code>brokerAddrTable </code> 中维护的数据不能有重复的地址信息</li></ul><p>第一个过于基础简单，就不再赘述。我们重点看第二个点，我们知道会有多个 Broker 地址，存在一个 Map 中，因为 Broker 是基于主从架构。那不知道你有没有想过，NameServer 如何区分 <strong>主</strong> 和 <strong>从</strong> 的呢？</p><p>答案是通过 Map 的 Key，如果是 <code>0</code> 则代表是 Master 节点，<code>1</code> 则代表 Slave 节点，因为 RocketMQ 自己实现的 Broker 主从架构是<strong>一主一从</strong>，而<strong>一主多从</strong>则是由 RocketMQ 4.5 之后加入的 Dleger 实现的，暂时先不讨论。区分的逻辑如下图：</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>那什么时候会出现重复呢？</p><blockquote><p>答案是主从切换</p></blockquote><p>举个例子，假设某个 Slave Broker 的 Address 为 <code>192.168.1.101:8081</code> ，且已经注册。此时<code>brokerAddrs</code> 中已经有一个<code>key: 1 value: 192.168.1.101:8081</code> 记录了。</p><p>当集群中的 Master 宕机之后，会进行故障恢复，假设选中了上面这个 Broker 为新的 Master，在进行注册的时候会发现，<code>brokerAddrs</code> 中已经有一个同样的 Address 了，只是 Key 不同。但是由于它们从本质上来说就是同一台机器，如果不将 key 为1，也就是角色为 Slave 的记录去掉，就会造成数据一致性的问题。</p><p>简单总结一下来说，同一个 Adreess，在 <code>brokerAddrs</code> 中只能存在一个。感兴趣的可以看一下源码，其实跟上面文字描述的逻辑是一样的。</p><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>去除了重复的 Address 数据之后，就会将本次注册的 Broker 的数据注册进 <code>brokerAddrs</code> 中。</p><h4 id="维护-messagequeue-的数据" tabindex="-1"><a class="header-anchor" href="#维护-messagequeue-的数据" aria-hidden="true">#</a> 维护 MessageQueue 的数据</h4><p>这里主要是根据 Broker 的数据更新其 MessageQueue 相关的数据。接下来，我们详细解析一下 Message Queue 的维护流程，同样会给出<strong>源码</strong>和流程图，两部分等价，可选择性观看。</p><p>当 Master 节点来注册时，如果是<strong>首次注册</strong>或者<strong>数据有更新</strong>，便会调用一个方法<code>createAndUpdateQueueData</code>去维护 MessageQueue 相关的数据。这里对数据是否更新的判断，是基于 <code>DataVersion</code> 的，代表 Broker 数据的版本。</p><p>此后通过 Topic 的 Name 拿到对应的 MessageQueue 的列表，这里可能会有点疑问，一个 Topic 难道不应该只有一个对 MessageQueue 相关的配置吗，为什么这里拿到的是个列表？</p><blockquote><p>小了，格局小了</p></blockquote><p>Topic 是个<strong>逻辑</strong>上的概念，一个 Topic 的 MessageQueue 会分布在不同的 Broker 上，所有这里是个列表。</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>更新的流程如上图，拿到了 MessageQueue 的列表之后，会和本次注册的 Broker 中的 MessageQueue 数据做一个对比，如果发现不同就进行全量的替换，没什么其他的复杂对比逻辑。源码等同上图，感兴趣的可以自行查看。</p><figure><img src="'+B+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="维护-broker-的存活信息" tabindex="-1"><a class="header-anchor" href="#维护-broker-的存活信息" aria-hidden="true">#</a> 维护 Broker 的存活信息</h4><p>到这里，MessageQueue 相关的逻辑就处理完了，接下来 NameServer 会再去更新 <code>brokerLiveTable</code> 中的数据，这里存放了当前正在活跃的所有 Broker。这块的作用后续会讲。</p><h2 id="nameserver-启动流程" tabindex="-1"><a class="header-anchor" href="#nameserver-启动流程" aria-hidden="true">#</a> NameServer 启动流程</h2><p>上面通过了解<strong>注册 Broker</strong>的整个流程，对整个 NameServer 的架构有了个大概的了解，接下来再从整体视角来看一下 NameServer。</p><figure><img src="'+_+'" alt="NameServer的主要流程" tabindex="0" loading="lazy"><figcaption>NameServer的主要流程</figcaption></figure><p>整体的流程上面这张图已经给出来了，就不放源码了，意义不大。</p><p>这里说一下<strong>扫描不再活跃的Broker</strong>，这个后台线程会每 <strong>10秒</strong> 钟执行一次，这里会对上文提到的 <code>brokerLiveTable</code> 进行遍历处理，因为这里面维护了所有的正在活跃的 Broker。</p><p>如果某个 Broker 超过了 <strong>120秒</strong> 没有发送心跳给 NameServer，就会将其从 <code>brokerLiveTable</code> 中移除。</p><h2 id="nameserver-可处理的操作" tabindex="-1"><a class="header-anchor" href="#nameserver-可处理的操作" aria-hidden="true">#</a> NameServer 可处理的操作</h2><p>上面简单了解了 <strong>注册 Broker</strong> 的流程，实际上 NameServer 还支持很多其他的操作，这里就不再这里列出来了，看了没有意义，感兴趣的可以自己去网上找，一大堆的资料。而且 <code>Register Broker</code> 这个操作中所涉及到源码中的数据结构，其他的操作都会用到，所以了解了 <code>Register Broker</code> 之后，再去阅读其他操作的源码会非常的顺。</p>',66);function S(Q,R){const o=i("ExternalLinkIcon");return t(),s("div",null,[N,r("p",null,[e("在"),r("a",x,[e("之前的文章"),n(o)]),e("中，已经把 Broker、Producer 和 Conusmer 的部分源码和核心的机制介绍的差不多了，但是其实 RocketMQ 中还有一个比较关键但是我们平时很容易忽略的组件——"),M,e("。")]),y])}const A=a(v,[["render",S],["__file","230825.html.vue"]]);export{A as default};
