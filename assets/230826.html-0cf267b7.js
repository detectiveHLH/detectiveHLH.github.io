import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as p,a as s,b as n,d as t,f as a}from"./app-1ec8768a.js";const r="/images/230826/simple-consume-model.jpeg",l="/images/230826/consumer-start-process.jpeg",u="/images/230826/consume-from-where.jpeg",d="/images/230826/cache-subscription-data.jpeg",g="/images/230826/offical-github-commit.jpeg",m="/images/230826/offical-commit-detail.jpeg",k="/images/230826/build-client-ip.jpeg",h="/images/230826/default-rebalance-strategy.jpeg",f="/images/230826/register-consumer.jpeg",b="/images/230826/throw-exception.jpeg",_="/images/230826/init-nameserver-address.jpeg",v="/images/230826/init-netty-client.jpeg",C={},S=a('<h1 id="rocketmq-consumer-启动时都干了些啥" tabindex="-1"><a class="header-anchor" href="#rocketmq-consumer-启动时都干了些啥" aria-hidden="true">#</a> RocketMQ Consumer 启动时都干了些啥？</h1><p>可能我们对 RocketMQ 的消费者认知乍一想很简单，就是一个拿来消费消息的客户端而已，你只需要指定对应的 Topic 和 ConsumerGroup，剩下的就是只需要：</p><ul><li>接收消息</li><li>处理消息</li></ul><p>就完事了。</p><figure><img src="'+r+'" alt="简略消费模型" width="600" tabindex="0" loading="lazy"><figcaption>简略消费模型</figcaption></figure><p>当然，可能在实际业务场景下，确实是这样。但是如果我们不清楚 Consumer 启动之后到底会做些什么，底层的实现的一些细节，在面对复杂业务场景时，排查起来就会如同大海捞针般迷茫。</p><p>相反，你如果了解其中的细节，那么在排查问题时就会有更多的上下文，就有可能会提出更多的解决方案。</p>',7),T={href:"https://mp.weixin.qq.com/s/6pBlK_h0PEHfFXjXFgqMDQ",target:"_blank",rel:"noopener noreferrer"},x=a(`<h2 id="简单示例" tabindex="-1"><a class="header-anchor" href="#简单示例" aria-hidden="true">#</a> 简单示例</h2><h3 id="整体逻辑" tabindex="-1"><a class="header-anchor" href="#整体逻辑" aria-hidden="true">#</a> 整体逻辑</h3><p>首先我们还是从一个简单的例子来看一下，RocketMQ Consumer 的基本使用。从使用入手，一点点了解细节。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">,</span> <span class="token class-name">MQClientException</span> <span class="token punctuation">{</span>
        <span class="token class-name">DefaultMQPushConsumer</span> consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultMQPushConsumer</span><span class="token punctuation">(</span><span class="token string">&quot;please_rename_unique_group_name_4&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        consumer<span class="token punctuation">.</span><span class="token function">setConsumeFromWhere</span><span class="token punctuation">(</span><span class="token class-name">ConsumeFromWhere</span><span class="token punctuation">.</span><span class="token constant">CONSUME_FROM_FIRST_OFFSET</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        consumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token string">&quot;TopicTest&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        consumer<span class="token punctuation">.</span><span class="token function">registerMessageListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MessageListenerConcurrently</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">ConsumeConcurrentlyStatus</span> <span class="token function">consumeMessage</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageExt</span><span class="token punctuation">&gt;</span></span> msgs<span class="token punctuation">,</span>
                <span class="token class-name">ConsumeConcurrentlyContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s Receive New Messages: %s %n&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> msgs<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token class-name">ConsumeConcurrentlyStatus</span><span class="token punctuation">.</span><span class="token constant">CONSUME_SUCCESS</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        consumer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Consumer Started.%n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码看着肯定有些难度，下面的流程图和上面的代码逻辑等价，可以结合着一起看。</p><figure><img src="`+l+'" alt="Consumer使用示例" width="650" tabindex="0" loading="lazy"><figcaption>Consumer使用示例</figcaption></figure><h3 id="消费点策略" tabindex="-1"><a class="header-anchor" href="#消费点策略" aria-hidden="true">#</a> 消费点策略</h3><p>这里除了像 Topic、注册消息监听器这种常规的内容之外，<code>setConsumeFromWhere</code> 值得我们更多的关注。它决定了消费者将从哪里开始消费，可选的值有三个：</p><figure><img src="'+u+'" alt="三个可选的 ConsumeFromWhere 的值" tabindex="0" loading="lazy"><figcaption>三个可选的 ConsumeFromWhere 的值</figcaption></figure><p>实际上 <code>ConsumeFromWhere</code> 的枚举类源码中还有另外三个值，但是已经被<strong>弃用</strong>了。但是这个配置仅对新的 ConsumerGroup 有效，已经存在的 ConsumerGroup 会继续按照上次消费到的 Offset 继续消费。</p><p>其实也很好理解，假设有 1000 条消息，你的服务已经消费到了 500 条了，然后你上线新的东西将服务重新启动，然后又从头开始消费了？这不扯吗？</p><h3 id="缓存订阅的-topic-信息" tabindex="-1"><a class="header-anchor" href="#缓存订阅的-topic-信息" aria-hidden="true">#</a> 缓存订阅的 Topic 信息</h3><p>看起来就一行 <code>consumer.subscribe(&quot;TopicTest&quot;, &quot;*&quot;)</code>，实际上背后做了很多事情，这里先给大家把简单的流程画出来。</p><figure><img src="'+d+'" alt="subscribe_topic" tabindex="0" loading="lazy"><figcaption>subscribe_topic</figcaption></figure><p><code>subscribe</code> 函数的<strong>第一个参数</strong>就是我们<strong>需要消费的 Topic</strong>，这个自不必多说。第二个参数说复杂点叫<strong>过滤表达式字符串</strong>，说简单点其实就是你要<strong>订阅的消息的 Tag</strong>。</p><blockquote><p>每个消息都会有一个自己的 Tag 这个如果你不清楚的话，可以考虑去看看上面那篇文章</p></blockquote><p>这里我们传的是 <code>*</code>，代表订阅所有类别的消息。当然我们也可以传入 <code>tagA || tagB || tagC</code> 这种，代表我们只消费打了这三种 Tag 的消息。</p><p>RocketMQ 会根据我们传入的这两个参数，构造出 <code>SubscriptionData</code> ，放入一个位于内存的 ConcurrentHashMap 中维护起来，简单来说就一句话，把这个订阅的 Topic 缓存下来。</p><p>在缓存完之后会进行一个比较关键的操作，那就是开始<strong>向所有的 Broker 发送心跳</strong>。Consumer 客户端会将：</p><ul><li><strong>消费者的名称</strong></li><li><strong>消费类型</strong> 代表是通过 Push 或者 Pull 的模式消费消息</li><li><strong>消费模型</strong> 指集群消费（<strong>CLUSTERING</strong>）或者是广播消费（<strong>BROADCASTING</strong>）</li><li><strong>消费点策略</strong> 也就是类似 <code>CONSUME_FROM_LAST_OFFSET</code> 这种</li><li><strong>消费者的订阅数据集合</strong> 一个消费者可以监听多个 Topic</li><li><strong>生产者的集合</strong> 当前实例上注册的生产的集合</li></ul><p>没错，在 Consumer 实例启动之后还会去运行 Producer 的相关代码。此外，如果一个客户端即没有配置生产者、也没有配置消费者，那么是不会执行心跳的逻辑的，因为没有意义。</p><h3 id="启动消费者实例" tabindex="-1"><a class="header-anchor" href="#启动消费者实例" aria-hidden="true">#</a> 启动消费者实例</h3><p>上文提到的核心逻辑其实都在这里，我们在下面详细讨论，所以简单示例到这里就结束了。</p><h2 id="进入启动核心逻辑" tabindex="-1"><a class="header-anchor" href="#进入启动核心逻辑" aria-hidden="true">#</a> 进入启动核心逻辑</h2><p>在启动的核心入口类中，总共对 4 种状态进行了分别处理，分别是：</p><ul><li>CREATE_JUST</li><li>RUNNING</li><li>START_FAILED</li><li>SHUTDOWN_ALREADY</li></ul><p>但我们由于是刚刚创建，会走到 <code>CREATE_JUST</code> 的逻辑中来，我们就重点来看 Consumer 刚刚启动时会做些什么。</p><h3 id="检查配置" tabindex="-1"><a class="header-anchor" href="#检查配置" aria-hidden="true">#</a> 检查配置</h3><p>基操，跟我们平时写的业务代码没有什么两样，检查配置中的各种参数是否合法。</p><p>配置项太多了就不赘述，大家只需要知道 RocketMQ 启动的时候会对配置中的参数进行校验就知道了。</p><p>算了，还是列一列吧：</p><ul><li>消费者组的名称是不是空</li><li>消费者组的名称不能是被 RocketMQ 保留使用的名称，即 —— <code>DEFAULT_CONSUMER</code></li><li>消费模型（CLUSTERING、BROADCASTING）是否有配置</li><li>消费点策略（例如 CONSUME_FROM_LAST_OFFSET）是否配置</li><li>判断消费的方式是否合法，只能是<strong>顺序消费</strong>或者<strong>并发消费</strong></li><li>消费者组的最小消费线程、最大消费线程数量是否在规定的范围内，这个范围是指(1, 1000)，左开右开。还有就是最小不能大于最大这种判断</li><li>......等等等等</li></ul><p>所以你看到了， 即使是牛X的开源框架也会有这种繁琐的、常见的业务代码。</p><h3 id="改变实例名称" tabindex="-1"><a class="header-anchor" href="#改变实例名称" aria-hidden="true">#</a> 改变实例名称</h3><p><code>instanceName</code> 会从系统的配置项 <code>rocketmq.client.name</code> 中获取，如果没有配置就会设置为 <code>DEFAULT</code>。，并且消费模型是 CLUSTERING（默认情况就是），就会将 <code>DEFAULT</code> 改成 <code>${PID}#${System.nanoTime()}</code> 的字符串，这里举个例子。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>instanceName <span class="token operator">=</span> <span class="token string">&quot;90762#75029316672643&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为什么要单独把这个提出来讲呢？这相当于是给每个实例一个<strong>唯一标识</strong>，这个唯一标识其实很重要，如果一个消费者组的 instanceName 相同，那么可能就会造成<strong>重复消费</strong>、或者<strong>消息堆积的问题</strong>的问题，造成消息堆积的这个点比较有意思，后续我有时间应该会单独写一篇文章来讨论。</p><p>但眼尖的同学可能已经看到了，instanceName 的组成不是 PID 和 <code>System.nanoTime</code>？PID 可能由于获取的是 Docker 容器宿主机器的 PID，可能是一样的，可以理解。那 <code>System.nanoTime</code> 呢？这也能重复？</p>',38),y={href:"https://github.com/apache/rocketmq/commit/44736c3760b9caa0aad21b8df7a3e53bebfd07b8",target:"_blank",rel:"noopener noreferrer"},R=a('<figure><img src="'+g+'" alt="RocketMQ 官方 Github 的提交记录" tabindex="0" loading="lazy"><figcaption>RocketMQ 官方 Github 的提交记录</figcaption></figure><p>RocketMQ 官方在 <strong>3月16号</strong>的提交修复了这个问题，给大家看看改了啥：</p><figure><img src="'+m+'" alt="提交具体内容" tabindex="0" loading="lazy"><figcaption>提交具体内容</figcaption></figure><p>在原来的版本中，instanceName 就只由 PID 组成，就完全可能造成不同的消费者实例拥有<strong>相同的 instanceName</strong>。</p><p>熟悉的 RocketMQ 的同学有疑问，在 Broker 侧对 Consumer 的唯一标识不是 clientID 吗？没错，但 clientID 是由 clientIP 和 instanceName 一起组成的。</p><figure><img src="'+k+'" alt="" width="550" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而 clientIP 上面也提到过了，可能由于 Docker 的原因获取到相同的，会最终导致 clientID 相同。</p><p>OK，关于改变实例的名称就到这，确实没想到讲了这么多。</p><h3 id="实例化消费者" tabindex="-1"><a class="header-anchor" href="#实例化消费者" aria-hidden="true">#</a> 实例化消费者</h3><p>关键变量名为 <code>mQClientFactory</code></p><p>接下来就会实例化消费者实例，在上面 <strong>改变实例名称</strong> 中讲到的 <code>clientID</code> 就是在这一步做的初始化。这里就不给大家列源码了，你就需要知道这个地方会实例化出来一个消费者就 OK 了，不要过多的纠结于细节。</p><p>然后会给 Rebalance 的实现设置上一些属性，例如消费者组名称、消息模型、Rebalance 采取的策略、刚刚实例化出来的消费者实例。</p><p>这个 Rebalance 的策略默认为：</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>AllocateMessageQueueAveragely</code> 就是一个把 Messsage Queue 平均分配给消费者的策略，更多的细节也可以参考我上面的那篇文章。</p><p>除此之外，还会初始化<strong>拉取消息的核心实现 PullAPIWrapper</strong>。</p><h3 id="初始化-offsetstore" tabindex="-1"><a class="header-anchor" href="#初始化-offsetstore" aria-hidden="true">#</a> 初始化 offsetStore</h3><p>这里会根据不同的消息模型（即 BROADCASTING 或者 CLUSTERING），实例化不同的 offsetStore 实现。</p><ul><li><strong>BROADCASTING</strong> 采用的实现为 LocalFileOffsetStore</li><li><strong>CLUSTERING</strong> 采用的实现为 RemoteBrokerOffsetStore</li></ul><p>区别就是 LocalFileOffsetStore 是在本地管理 Offset，而 RemoteBrokerOffsetStore 则是将 offset 交给 Broker 进行原</p><h3 id="启动-consumemessageservice" tabindex="-1"><a class="header-anchor" href="#启动-consumemessageservice" aria-hidden="true">#</a> 启动 ConsumeMessageService</h3><h3 id="缓存消费者组" tabindex="-1"><a class="header-anchor" href="#缓存消费者组" aria-hidden="true">#</a> 缓存消费者组</h3><p>接下来会将消费者组在当前的客户端实例中缓存起来，具体是在一个叫 consumerTable 的内存 concurrentHashMap 中。</p><p>其实源码中叫 registerConsumer：</p><figure><img src="'+f+'" alt="registerConsumer 源码" tabindex="0" loading="lazy"><figcaption>registerConsumer 源码</figcaption></figure><p>但我认为给大家「翻译」成缓存更合理，因为它就只是把构建好的 consumer 实例给缓存到 map 中，仅此而已。哦对，还做了个如果存在就返回 false，代表<strong>实际上</strong>并没有注册成功。</p><p>那为啥需要返回 false 呢？你如果存在了不执行缓存逻辑就好吗？甚至外面还要根据这个 false 来抛出 MQClientException 异常？</p><figure><img src="'+b+'" alt="如果注册失败，抛出异常" tabindex="0" loading="lazy"><figcaption>如果注册失败，抛出异常</figcaption></figure><p>为啥呢？假设你同事 A 已经使用了名称 <code>consumer_group_name_for_a</code> ，线上正在正常的运行消费消息。得，你加了个功能需要监听 MQ，也使用了 <code>consumer_group_name_for_a</code>，你想想如果 RocketMQ 不做校验，你倒是注册成功了，但是你同事 A 估计要骂娘了：“咋回事？咋开始重复消费了？”</p><h2 id="启动-mqclientfactory" tabindex="-1"><a class="header-anchor" href="#启动-mqclientfactory" aria-hidden="true">#</a> 启动 mQClientFactory</h2><p>这个 <code>mQClientFactory</code> 就是在 <strong>实例化消费者</strong> 步骤中创建的消费者实例，最后会通过调用 <code>mQClientFactory.start()</code>。</p><p>这就是最后的核心逻辑了。</p><h3 id="初始化-nameserver-地址" tabindex="-1"><a class="header-anchor" href="#初始化-nameserver-地址" aria-hidden="true">#</a> 初始化 NameServer 地址</h3><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="初始化用于通信的-netty-客户端" tabindex="-1"><a class="header-anchor" href="#初始化用于通信的-netty-客户端" aria-hidden="true">#</a> 初始化用于通信的 Netty 客户端</h3><figure><img src="'+v+'" alt="初始化 Netty 客户端" tabindex="0" loading="lazy"><figcaption>初始化 Netty 客户端</figcaption></figure><h3 id="启动一堆定时任务" tabindex="-1"><a class="header-anchor" href="#启动一堆定时任务" aria-hidden="true">#</a> 启动一堆定时任务</h3><p>这个一堆没有夸张，确实很多，举个例子：</p><ul><li>刚刚上面那一步，如果 NameServer 没有获取到，就会启动一个定时任务隔一段时间去拉一次</li><li>比如，还会启动定时任务隔一段时间去 NameServer 拉一次指定 Topic 的路由数据。这个<strong>路由数据</strong>具体是指像 MessageQueue 相关的数据，例如有多少个写队列、多少个读队列，还有就是该 Topic 所分布的 Broker 的 brokerName、集群和 IP 地址等相关的数据，这些大致就叫路由数据</li><li>再比如，启动发送心跳的定时任务，不启动这个心跳不动</li><li>再比如，Broker 有可能会挂对吧？客户端这边是不是需要及时的把 offline 的 Broker 给干掉呢？所以 RocketMQ 有个 cleanOfflineBroker 方法就是专门拿来干这个的</li><li>然后有一个比较关键的就是持久化 offset，这里由于是采用的 CLUSTERING 消费，故会定时将当前消费者消费的情况上报给 Broker</li></ul><h2 id="eof" tabindex="-1"><a class="header-anchor" href="#eof" aria-hidden="true">#</a> EOF</h2><p>EOF</p>',41);function M(N,E){const e=i("ExternalLinkIcon");return c(),p("div",null,[S,s("blockquote",null,[s("p",null,[n("关于 RocketMQ 的一些基础概念、一些底层实现之前都已在文章 "),s("a",T,[n("RocketMQ基础概念剖析&源码解析"),t(e)]),n(" 中写过了，没有相关上下文的可以先去补齐一部分。")])]),x,s("p",null,[n("实际上从 RocketMQ 的 Github 这个"),s("a",y,[n("提交记录"),t(e)]),n("来看，至少在 2021年3月16号之前，这个问题还是有可能存在的。")]),R])}const I=o(C,[["render",M],["__file","230826.html.vue"]]);export{I as default};
