import{_ as t,o as r,c as n,f as o}from"./app-55173bd2.js";const s="/images/230834/create-file.jpeg",g="/images/230834/inside-the-disk.jpeg",i="/images/230834/disk-plate.jpeg",e="/images/230834/trace-on-plate.jpeg",p="/images/230834/zone-bit-recording.jpeg",a="/images/230834/magnetic-sequence.jpeg",d={},l=o('<h1 id="磁盘原理简要分析" tabindex="-1"><a class="header-anchor" href="#磁盘原理简要分析" aria-hidden="true">#</a> 磁盘原理简要分析</h1><p>磁盘这玩意儿，即使不作为一个开发人员我们也会经常跟它打交道。比如你家里的台式机，或者拿来办公的电脑，再比如你装个操作系统，会涉及到对磁盘进行分区。</p><p>而作为开发人员，自然更加需要关注磁盘。</p><p>平时你开发的<strong>代码</strong>会暂存在磁盘上；开发中用的最多的数据库 <strong>MySQL</strong>，其数据是持久化到磁盘中的；<strong>Redis</strong> 的持久化数据是落到磁盘的；<strong>Zookeeper</strong> 内存中的数据、事务日志、快照会持久化到磁盘；像 <strong>RocketMQ</strong> 这种消息队列也会将收到的 Message 持久化到磁盘，<strong>Kafka</strong> 当然也不例外；</p><p>可以说，磁盘和我们的开发息息相关。但可能在平时的开发中，很多人会忽略掉磁盘的存在，因为虽然息息相关，但很遗憾，<strong>不是直接相关</strong>。因为上面提到的所有的和磁盘相关的内容，都已经由工具帮我们做了，甚至包括你的代码。</p><p>这种感觉就好像，鱼（可能）不怎么注意水，我们平时不太会注意氧气。</p><p>我们可能听过，磁盘 IO 慢，为什么？我们可能听过，磁盘顺序 IO 会快些，为什么？我们可能听过磁盘的顺序 IO 甚至比内存随机 IO 要快，为什么？</p><p>可能这些问题，我们都不一定能做个清晰的解释，这也是为什么我想聊聊磁盘。</p><h2 id="磁盘分类" tabindex="-1"><a class="header-anchor" href="#磁盘分类" aria-hidden="true">#</a> 磁盘分类</h2><p>首先，按照原理来分，磁盘可以分为三类：</p><ul><li>机械硬盘（HDD）</li><li>固态硬盘（SSD）</li><li>混合硬盘（SSHD）</li></ul><p>本篇文章的重点会放在 HDD 上。</p><h2 id="场景切入" tabindex="-1"><a class="header-anchor" href="#场景切入" aria-hidden="true">#</a> 场景切入</h2><p>首先还是通过一个很简单的场景来切入，如下：</p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>你在你的电脑上创建了个文件，然后写了点东西进去。然后你 N 天后打开电脑，看到这个文件还在（废话）。这实际上就是数据被持久化进了磁盘，下次需要文件时再从磁盘中取出来。</p><p>这个存、取的过程其实对我们完全无感知的，我们就知道装机的时候安了一块硬盘，其他的啥也不知道。</p><h2 id="磁盘结构" tabindex="-1"><a class="header-anchor" href="#磁盘结构" aria-hidden="true">#</a> 磁盘结构</h2><p>那磁盘里究竟长啥样呢？它是怎么样把文件存储起来的？以什么样的方式存储的？带着这样的问题来看一个图：</p><figure><img src="'+g+'" alt="图片来自 wikipedia" tabindex="0" loading="lazy"><figcaption>图片来自 wikipedia</figcaption></figure><p>结合上面的结构图可以看出来，现代主流的磁盘设计就是在一个 Spindle（<strong>主轴</strong>）上，有一些 platter（<strong>盘片</strong>），然后盘片会绕着主轴<strong>旋转</strong>，然后读数据、写数据则由<strong>读写磁头</strong>来实现，读写磁头会安装在<strong>磁头臂</strong>上，磁头臂可以转动，覆盖到盘片的所有的半径，再搭配主轴的旋转，从而使磁头可以获取到盘片上任何一个扇区的数据。</p><p>那你可能会好奇了，这个<strong>盘片</strong>到底要怎么做、怎么设计才能把上文提到的文件给存储下来呢？</p><p>要知道，现在的磁盘盘片大多都是由<strong>非磁性材料</strong>，通常是铝合金、玻璃或者陶瓷制成的，你的印象中，他们能够拿来存储文件吗（再次手动狗头）</p><p>既然提到了非磁性，那么答案肯定就跟磁性有点关系...</p><h2 id="盘片构造" tabindex="-1"><a class="header-anchor" href="#盘片构造" aria-hidden="true">#</a> 盘片构造</h2><p>没错，盘片的<strong>两个面</strong>会被涂上一层薄薄的<strong>磁性材料</strong>，有多薄呢？大概是 <strong>10-20 纳米</strong>，然后外面给包了层碳来作为保护，这层薄薄的磁性材料就是存储数据的<strong>关键</strong></p><figure><img src="'+i+'" alt="磁性材料" tabindex="0" loading="lazy"><figcaption>磁性材料</figcaption></figure><p>一个磁盘一般都会有多个盘片，并且刚刚提到的磁性材料<strong>盘片的两个面都有</strong>。换句话说，盘片的两个面都能用于存储、读取数据。</p><p>现在我们知道了，数据其实是存在磁性材料上的，那这里再思考一个问题：「<strong>磁盘怎么知道，数据该存在哪块磁性材料上？读取的时候又该从哪块材料上读？读多少？</strong>」</p><p>这个道理其实跟我们的地图是类似的，举个例子，中国这么大，我们要如何清晰、准确的描述某一个地方呢？这个答案其实大家都知道，那就是<strong>分层分级</strong>。</p><p>举个例子，网购让你填的收货地址就是这样，比如「四川省-成都市-xx区-xx街道-x栋x号-xxxx室」，这样的分层逻辑能够很直观的表示一个特定、具体的位置，而不用说大概那一块，先往中国西南走、走到城市之后继续往西走，大概走多久之后，再往南走，运气好的你就能找到那个地址了（再次手动狗头）。</p><p>盘片上也是做了类似的事情，先看个图：</p><figure><img src="'+e+'" alt="盘片的构造" tabindex="0" loading="lazy"><figcaption>盘片的构造</figcaption></figure><p>中间的黑点就是<strong>主轴</strong>，以主轴为圆心划分了多个磁道（为了方便理解图中只给出了 3 个磁道），每个磁道上又划分出了多个区域，每个区域叫做<strong>扇区</strong>，并且每个扇区的大小是<strong>固定的 512 字节</strong>。读取数据的时候，只需要通过这个划分就能够知道数据在哪个磁道、哪个扇区了。</p><p>但是通过上图还是能看出一个问题：那就是<strong>不同的磁道扇区数是相同的</strong>，扇区所在的磁道<strong>半径约大</strong>，则扇区的<strong>面积就越大</strong>。但无论面积比靠内磁道的扇区大多少，按照设计、规定只能存储 512 字节的数据，这样一来会<strong>浪费大量的存储空间</strong>。</p><p>为了优化这个问题，就有了 ZBR 技术方案。</p><p>ZBR，全称 <strong>Z</strong>one <strong>B</strong>it <strong>R</strong>ecording，用来解决传统盘片的磁道扇区存储空间浪费的问题。它是怎么做的呢？说起来也很简单，越靠外圈磁道的扇区由于面积会更大，所以 ZBR 会放置更多的扇区，从而将空间利用起来。</p><p>转换成图形可能就是这样：</p><figure><img src="'+p+'" alt="盘片的ZBR" tabindex="0" loading="lazy"><figcaption>盘片的ZBR</figcaption></figure><p>不同的磁道扇区数量不同了，外圈磁道上面的扇区会更多些，从而充分的利用空间，提升磁盘的总容量。</p><h2 id="存储原理" tabindex="-1"><a class="header-anchor" href="#存储原理" aria-hidden="true">#</a> 存储原理</h2><p>好，继续深入问题盘片存储相关的问题。</p><p>我们知道从宏观上来看，计算机并不会管你是谁，到它这都是 0101010101。那么当读取文件的时候，它是如何从这层磁性材料中识别出来 0101010101，然后还原成我们能看懂的文件的？</p><p>前面我们知道盘片上划分了磁道、扇区，相应的磁性材料也同理。现代磁盘就是通过磁化盘片两面的磁性材料来记录数据的，磁性材料序列的改变则代表了对应的二进制 0、1。</p><figure><img src="'+a+'" alt="磁性序列原理" tabindex="0" loading="lazy"><figcaption>磁性序列原理</figcaption></figure><p>可以看到，两个磁性 Region 的<strong>序列方向不同</strong>，则标记为 <strong>R</strong>（Reverse），相同则标记为 <strong>N</strong>（No Reverse），当读取的时候，如果探测到序列是 RR，则对应 1，而如果是 NR，则对应 0（或许这就是为什么它叫磁盘吧，再再次手动狗头）</p><p>所以，我们常说的写磁盘并不是说读写磁头在盘片上刻东西，而是改变磁性材料的序列，并且读写磁头和盘片<strong>没有直接接触</strong>，他们有个大概 10 nm 的距离。</p><p>并且，从上述现状我们可以简单推导，既然读写磁盘都是靠读取盘片上的磁性序列，并且盘片的两个面都能用于存储数据，那么必然<strong>盘片的每个面都有磁头</strong>。</p><h2 id="磁盘性能" tabindex="-1"><a class="header-anchor" href="#磁盘性能" aria-hidden="true">#</a> 磁盘性能</h2><p>了解完一些简单的原理之后，我们终于可以来了解磁盘性能相关的问题了，我们会深入的分析为什么磁盘 IO 是个非常昂贵的操作。</p><p>现在思考一个问题，我们要查询数据，底层会怎么做？是不是会：</p><ul><li>将磁头移动到目标文件所在的磁道</li><li>此时盘片正被主轴带着旋转，磁头需要等待对应的扇区旋转到磁头这才能读取数据</li><li>对应扇区到了之后，就需要等待读取数据&amp;传输</li></ul><p>总结一下，磁盘的 IO 请求耗时主要由三部分组成：</p><ul><li><strong>磁头寻道时间</strong>：这个延迟一般在 3-15 ms</li><li><strong>盘片旋转延迟</strong>：这个取决于主轴旋转的速度，随着速度的不同大概在 2-4 ms</li><li><strong>数据传输时间</strong>：这里平均只用 3 微秒，跟上面两个比起来这里的耗时可以忽略不计</li></ul><p>这里提到了旋转的问题，在<strong>盘片旋转延迟</strong>这里，盘片旋转越快，则对应扇区移动到磁头的速度也会越快。</p><p>现代磁盘的旋转速度在 5400 或者 7200 RPM（<strong>R</strong>evolutions <strong>P</strong>er <strong>M</strong>inute）不等，当然也有一些高性能的服务器转速会达到 1500 RPM。</p><p>盘片旋转延迟的确和转速相关，因为<strong>转速越快</strong>，对应<strong>扇区移动到磁头的位置就越快</strong>。但并不是转速越快越好，因为转速越高，发热约严重，磁盘的寿命也就越短。</p><p>下面给个不同的转速下对应的旋转延迟的参考：</p><table><thead><tr><th>旋转速度（单位 RPM）</th><th>平均旋转延迟（单位毫秒）</th></tr></thead><tbody><tr><td>4800</td><td>6.25</td></tr><tr><td>5400</td><td>5.55</td></tr><tr><td>7200</td><td>4.16</td></tr><tr><td>10000</td><td>3</td></tr><tr><td>15000</td><td>2</td></tr></tbody></table><p>（以上数据来自 wikipedia）</p><p>可能你看到几毫秒觉得还好，并不是那么慢，但是跟内存的速度一对比你就能立马明白。内存的随机读大概在<strong>几百纳秒</strong>，假设内存的速度是 200 ns、磁盘的速度是 2ms（按上表中转速最高的延迟来算），<strong>差了 10000 倍</strong>，也就是 <strong>4 个数量级</strong>。</p><p>到这里，我想我们也能理解为什么磁盘的顺序读写能够与内存随机读一战了。因为磁盘顺序读写几乎把前两个最耗时的操作给干掉了，磁头已经移动到了对应的磁道， 也找到了对应的扇区，直接写就完事了。</p><p>好了， 关于磁盘的原理就简单介绍到这里。</p>',63),c=[l];function h(f,u){return r(),n("div",null,c)}const _=t(d,[["render",h],["__file","230834.html.vue"]]);export{_ as default};
