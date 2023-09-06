import{_ as t,r as p,o as s,c as i,a,b as e,d as o,f as n}from"./app-a9a3b51d.js";const h="/images/230821/switch-context.jpeg",c={},l=a("h1",{id:"kafka-杂谈",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#kafka-杂谈","aria-hidden":"true"},"#"),e(" Kafka 杂谈")],-1),d=a("h2",{id:"开始之前",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#开始之前","aria-hidden":"true"},"#"),e(" 开始之前")],-1),k={href:"https://mp.weixin.qq.com/s/6pBlK_h0PEHfFXjXFgqMDQ",target:"_blank",rel:"noopener noreferrer"},u=n('<h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h2><h3 id="什么是-kafka" tabindex="-1"><a class="header-anchor" href="#什么是-kafka" aria-hidden="true">#</a> 什么是 Kafka？</h3><p>这里先给出结论，我不太希望在解释概念 X 的时候，说到「为了了解 X，我们需要先了解一下 Y」，阅读的人思绪会被迁到另一个地方。既然小标题里说了要解释什么是 Kafka，那么我们就只说什么是 Kafka。</p><p>专业点讲，Kafka 是一个开源的<strong>分布式事件流</strong>的平台。通俗点讲，Kafka 就是一个消息队列。</p><h3 id="事件流的定义" tabindex="-1"><a class="header-anchor" href="#事件流的定义" aria-hidden="true">#</a> 事件流的定义</h3><blockquote><p>这才是一个正常的抛概念的顺序，而不是「我们要了解 Kafka，就需要先了解一下 事件流...」</p></blockquote><p>怎么理解这个<strong>事件流</strong>呢？拿人来类比的话，你可以简单的把它理解成人的<strong>中枢神经系统</strong>，它是人体神经系统最主要的部分。中枢神经接收全身各个部位的信息输入，然后再发出命令，让身体执行适当的反应。甚至可以说，神经系统可以控制整个生物的行为。</p><p>通过这个类比相信你能够理解件流的重要性。</p><p>而切回到技术视角来看，事件流其实就是从各种类型的数据源<strong>收取实时数据</strong>。对应到我们平时对消息队列的用途来说，可以理解为有很多个不同的、甚至说不同种类的生产者，都能够向同一个 Topic 写入消息。</p><p>收集到这些事件流后，Kafka 会将它们<strong>持久化</strong>起来，然后根据需要，将这些事件路由给不同的目标。也换个角度理解，一个 Topic 中所存放的消息（或者说事件）可以被不同的消费者消费。</p><h3 id="事件流的用途" tabindex="-1"><a class="header-anchor" href="#事件流的用途" aria-hidden="true">#</a> 事件流的用途</h3><p>现在我们知道了事件流的重要性，上面也拿中枢神经系统做了对比，我们清楚中枢神经系统可以做些什么，那么事件流呢？它能拿来做啥呢？</p><p>举例来说，像我们平时网购东西，上面会显示你的快递现在走到哪里了。这就是通过事件流来实时跟踪、监控汽车、卡车或者船只，在物流、汽车行业这样用的比较多；比如，持续的捕获、分析来自物联网设备或者其他设备的传感器数据；通过监测住院病人的数据，来预测病人的病情变化等等这些。</p><p>那这个跟 kafka 有啥关系呢？因为除了这些，还有一个比较重要的用途那就是作为一个数据平台、事件驱动架构的基石，而 Kakfa 刚好就是这么一个平台。</p><h3 id="kafka-由来" tabindex="-1"><a class="header-anchor" href="#kafka-由来" aria-hidden="true">#</a> Kafka 由来</h3><blockquote><p>这块，之前的文章有过介绍，为了避免赘述我就直接贴过来了</p></blockquote><p>Kafka 最初来自于 LinkedIn，是用于做日志收集的工具，采用Java和Scala开发。其实那个时候已经有 ActiveMQ了，但是在当时 ActiveMQ 没有办法满足 LinkedIn 的需求，于是 Kafka 就应运而生。</p><p>在 2010 年底，Kakfa 的0.7.0被开源到了Github上。到了2011年，由于 Kafka 非常受关注，被纳入了 <strong>Apache Incubator</strong>，所有想要成为 Apache 正式项目的外部项目，都必须要经过 Incubator，翻译过来就是孵化器。旨在将一些项目<strong>孵化</strong>成完全成熟的 Apache 开源项目。</p><p>你也可以把它想象成一个学校，所有想要成为 Apache 正式开源项目的外部项目都必须要进入 Incubator 学习，并且拿到毕业证，才能走入社会。于是在 2012 年，Kafka 成功从 Apache Incubator 毕业，正式成为 Apache 中的一员。</p><p>Kafka 拥有<strong>很高的吞吐量</strong>，单机能够抗下<strong>十几w</strong>的并发，而且<strong>写入的性能也很高</strong>，能够达到<strong>毫秒</strong>级别。而且 Kafka的功能较为简单，就是简单的接收生产者的消息，消费者从 Kafka 消费消息。</p><p>既然 Kafka 作为一个高可用的平台，那么肯定需要对消息进行持久化，不然一旦重启，所有的消息就都丢了。那 Kafka 是怎么做的持久化呢？</p><h2 id="设计" tabindex="-1"><a class="header-anchor" href="#设计" aria-hidden="true">#</a> 设计</h2><h3 id="持久化" tabindex="-1"><a class="header-anchor" href="#持久化" aria-hidden="true">#</a> 持久化</h3><p>当然是磁盘了，并且还是<strong>强依赖磁盘</strong>。</p><p>不了解的可能会认为：「磁盘？不就是那个很慢很慢的磁盘？」这种速度级的存储设备是怎么样和 Kafka 这样的高性能数据平台沾上边的？</p><p>确实我们会看到大量关于磁盘的描述，就是慢。但实际上，磁盘<strong>同时集快、慢于一身</strong>，其表现具体是快还是慢，还得看我们如何使用它。</p><p>举个例子，我们可能都听过，内存的<strong>顺序 IO</strong> 是慢于内存的<strong>随机 IO</strong> 的，确实是这样。磁盘自身的随机 IO 和顺序 IO 也有非常大的差异。比如在某些情况下，磁盘顺序写的速度可能是 600MB/秒，而对于磁盘随机写的速度可能才 100KB/秒，这个差异达到了恐怖的 6000 倍。</p><blockquote><p>对磁盘的一些原理感兴趣可以看看我之前写的文章</p></blockquote><p>Kafka 其实就是用实际行动来告诉我们「<strong>Don&#39;t fear the filesystem</strong>」，现在顺序写、读的性能表现是很稳定的，并且我们的大哥操作系统也对此进行了大量的优化。</p><p>了解了持久化，解决了消息的存、取问题，还有什么更重要呢？</p><h3 id="效率" tabindex="-1"><a class="header-anchor" href="#效率" aria-hidden="true">#</a> 效率</h3><p>当然是效率，持久化能保证你的数据不丢，这可能只做到了一半，如果对消息的处理效率不高，仍然不能满足实际生产环境中海量的数据请求。</p><p>举个例子，现在请求一个系统的一个页面都有可能会产生好几十条消息，这个在复杂一些的系统里丝毫不夸张。如果投递、消费的效率不提上去，会影响到整个核心链路。</p><p>影响效率的大头一半来说有两个：</p><ul><li>大量零散的小 IO</li><li>大量的数据拷贝</li></ul><p>这也是为啥大家都要搞 Buffer，例如 MySQL 里有 Log Buffer，操作系统也有自己的 Buffer，这就是要把尽量减少和磁盘的交互，减少小 IO 的产生，提高效率。</p><p>比如说，Consumer 现在需要消费 Broker 上的某条消息，Broker 就需要将此消息从磁盘中读取出来，再通过 Socket 将消息发送给 Consumer。那通常拷贝一个文件再发送会涉及到哪些步骤？</p><ul><li>用户态<strong>切换</strong>到内核态，操作系统将消息从磁盘中读取到内核缓冲区</li><li>内核态<strong>切换</strong>到用户态，应用将内核缓冲区的数据 Copy 到用户缓冲区</li><li>用户态切换到内核态，应用将用户缓冲区的内容 Copy 到 Socket 缓冲区</li><li>将数据库 Copy 到网卡，网卡会将数据发送出去</li><li>内核态切换到用户态</li></ul><p>可能你看文字有点懵逼，简单总结就是，涉及到了 <strong>4 次态的切换，4 次数据的拷贝，2次系统调用</strong>。</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>红色</strong>的是态的切换，<strong>绿色</strong>的是数据拷贝。</p>',41),g={href:"https://mp.weixin.qq.com/s/OJRybC7uamkkizPcfPoC7w",target:"_blank",rel:"noopener noreferrer"},f=n('<p>态的切换、数据的拷贝，都是耗时的操作，那 Kafka 是怎么解决这个问题的呢？</p><p>其实就是我们常说的<strong>零拷贝</strong>了，但是不要看到零就对零拷贝有误解，认为就是一次都没有拷贝，那你想想，不拷贝怎么样把磁盘的数据读取出来呢？</p><p>所谓的零拷贝是指<strong>数据在用户态、内核态之间的拷贝次数是 0</strong>。</p><p>最初，从磁盘读取数据的时候是在内核态。</p><p>最后，将读取到的数据发送出去的时候也在内核态。</p><p>那读取——发送这中间，是不是就没有必要再将数据从内核态拷贝到用户态了？Linux 里封装好的<strong>系统调用 sendfile</strong> 就已经帮我们做了这件事了。</p><p>简单描述一下：「在从磁盘将数据读取到内核态的缓冲区内之后（也就是 pagecache），直接将其拷贝到网卡里，然后发送。」</p><blockquote><p>这里严格上来说还有 offset 的拷贝，但影响太小可以忽略不就，就先不讨论</p></blockquote><p>你会发现，这里也应证了我上面说的「<strong>零拷贝并不是说没有拷贝</strong>」。算下来，零拷贝总共也有 2 次态的切换，2 次数据的拷贝。但这已经能大大的提升效率了。</p><p>到此为止，我们聊到了消息已经被发送出去了，接下来就是消费者接收到这条消息然后开始处理了。那这部分会有效率问题吗？</p><p>答案是肯定的，随着现在的计算机发展，系统的瓶颈很多时候已经不是 CPU 或者磁盘了，而是网络带宽。对带宽不理解的你就把带宽理解成一条路的宽度。路宽了，就能同时容纳更多的车行进，堵车的概率也会小一些。</p><p>那在路宽不变的基础上，我们要怎么样跑更多的车呢？让车变小（现实中别这么干，手动狗头）。</p><p>换句话说，就是要对发送给 Consumer 的信息进行压缩。并且，还不能是来一条压缩一条，为啥呢？因为同类型的一批消息之间会有大量的重复，将这一批进行压缩能够极大的减少重复，而相反，压缩单条消息效果并不理想，因为你没有办法提取公共冗余的部分。Kafka 通过批处理来对消息进行批量压缩。</p><h3 id="push-vs-pull" tabindex="-1"><a class="header-anchor" href="#push-vs-pull" aria-hidden="true">#</a> Push vs Pull</h3><p>关于这个老生常谈的问题，确实可以简单的聊聊。我们都知道 Consumer 消费数据，无非就是 pull 或者 push。可能在大多数的情况下，这两个没啥区别，但实际上大多数情况下还是用的 pull 的方式。</p><p>那为啥是 pull？</p><p>假设现在是采取的 push 的方式，那么当 Broker 内部出现了问题，向 Consumer push 的频率降低了，此时作为消费方是不是只能干着急。想象一下，现在产生了消息堆积，我们确啥也干不了，只能等着 Broker 恢复了继续 push 消息到 Consumer。</p><p>那如果是 pull 我们怎么解决呢？我们可以<strong>新增消费者</strong>，以此来增加消费的速率。当然新增消费者并不总是有效，例如在 RocketMQ 中，消费者的数量如果大于了 MessageQueue 的数量，多出来的这部分消费者是无法消费消息的，资源就被白白浪费了。</p><p>Kafka 中的 Partition 也是同理，在新增消费者的时候，也需要注意消费者、Partition 的数量。</p><p>除此之外，采用 pull 能使 Consumer 更加的灵活，能够根据自己的情况决定什么时候消费，消费多少。</p><h3 id="关于消费" tabindex="-1"><a class="header-anchor" href="#关于消费" aria-hidden="true">#</a> 关于消费</h3><p>这个问题其实在消息系统里也很经典。</p><p>Consumer 从 Broker 里拉取数据消费，那 Consumer 如何知道自己消费到哪儿了？Broker 如何知道 Consumer 消费到哪儿了？双方如何达成共识？</p><p>我们假设，Broker 在收到 Consumer 的拉取消息请求并发送之后，就将刚刚发送的消息给删除了，这样 OK 吗？</p><p>废话，这当然不行，假设 Broker 把消息发给 Consumer 了，但由于 Consumer 挂了并没有收到这些消息，那这些消息就会丢失。</p><p>所以才有了我们都熟悉的 ACK（<strong>Ack</strong>nowlegement）机制，Broker 在将消息发出后，将其标识为「<strong>已发送｜未消费</strong>」，Broker 会等待 Consumer 返回一个 ACK，然后再将刚刚的消息标识为「已消费」。</p><p>这个机制在一定程度上解决了上面说的消息丢失的问题，但事情总有双面性， ACK 机制又引入了新的问题。</p><p>举个例子，假设 Consumer 收到了、并且正确的消费了消息，但偏偏就是在返回 ACK 时出了问题，导致 Broker 没有收到。则在 Broker 侧，消息的状态仍然是「<strong>已发送｜未消费</strong>」，下次 Consumer 来拉，仍然会拉取到这条消息，此时就发生了<strong>重复消费</strong>。</p>',28);function m(K,_){const r=p("ExternalLinkIcon");return s(),i("div",null,[l,d,a("p",null,[e("首先，此篇文章会有很多地方会和 RocketMQ 比较，不太熟悉 RocketMQ 可以去看看我之前写的"),a("a",k,[e("RocketMQ基础概念剖析&源码解析"),o(r)]),e("，先有个大概的印象，可能会帮助你更好的理解 Kafka。")]),u,a("blockquote",null,[a("p",null,[e("不清楚什么是用户态、内核态的可以去看看"),a("a",g,[e("《用户态和内核态的区别》"),o(r)])])]),f])}const C=t(c,[["render",m],["__file","230821.html.vue"]]);export{C as default};
