import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as n,f as r}from"./app-4842716a.js";const s="/images/230831/protocal-stack.jpeg",g="/images/230831/all-binary-data.jpeg",p="/images/230831/reduce-transmission-efficiency.jpeg",i="/images/230831/send-when-reach-threshold.jpeg",e="/images/230831/mtu-mss.jpeg",l="/images/230831/split-big-packets.jpeg",c="/images/230831/tcp-flow-control.jpeg",a={},d=r('<h1 id="请求数据包从发送到接收-都经历什么" tabindex="-1"><a class="header-anchor" href="#请求数据包从发送到接收-都经历什么" aria-hidden="true">#</a> 请求数据包从发送到接收，都经历什么？</h1><p>之前讲了「从输入 URL 再到浏览器成功看到界面」中的域名是如何变成 IP 地址的，了解了 DNS 相关的东西。这篇文章就聊聊发生在 DNS 解析之后的操作——建立连接。也就是我们常说的<strong>三次握手</strong>。</p><blockquote><p>看到三次握手你可能会说，这不是面试都被问烂了的题吗？</p></blockquote><p>三次握手不就是：</p><ol><li>服务器开始为 <code>CLOSE</code> 状态，然后监听某个端口，此时服务器会进入 <code>LISTEN</code> 状态</li><li>客户端最初也是 <code>CLOSE</code> 状态，客户端会向服务器发送一个带 <code>SYN</code> 标志位的数据包，主动发起连接。此时客户端会变成 <code>SYN-SENT</code> 状态</li><li>服务器接收到客户端的数据包之后，通过标志位判断出了客户端想要建立连接。然后返回一个 <code>SYN</code> 和 <code>ACK</code> ，此时服务器的状态变为了 <code>SYN-RCVD</code></li><li>客户端收到了服务器的 ACK 之后，会回一个 ACK 给服务器，回完这个 ACK 之后，服务器的状态就变为了 <code>ESTABLISH</code></li><li>服务器收到了客户端回复的 ACK 之后，服务器的状态也变成了 <code>ESTABLISH</code></li></ol><blockquote><p>这不就完了吗？还有什么好聊的？</p></blockquote><p>这篇文章不会涉及到上面提到的什么各种状态的变化，包内的标志位是什么，而是会更加关注于底层的东西，也就是<strong>上面那些发来发去的数据包是如何发送出去的</strong>。</p><p>其实不仅仅是建立连接时的三次握手，像浏览器中调用的很多 HTTP 接口，都会和服务器进行通信。</p><blockquote><p>那这些个请求到底都是怎么发送给服务器的呢？</p></blockquote><p>这还用问？不就是发个 HTTP 请求就过去了吗？</p><p>当然，这个答案可能是很多不了解<strong>网络</strong>的人可能会说出的答案。</p><p>其实更具体、更准确的说法是通过<strong>协议栈</strong>和<strong>网卡</strong>发送出去的。</p><p>其中，协议栈负责对数据进行打包，打包完成之后就由网卡将数据转换成电信号，通过光纤发送出去了。</p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>网卡自不必说，用来和其他的计算机进行通讯的硬件，我们常说的 MAC（<strong>M</strong>edium <strong>A</strong>ccess <strong>C</strong>ontrol） 地址，其实就是网卡的编号，从其被生产出来的那一刻就被确定的一个<strong>唯一编号</strong>。MAC 地址长为 <strong>48 个比特</strong>，也就是 6 个字节，用<strong>十六进制</strong>进行表示。</p><p>当我们知道了和我们通信的 IP 地址之后，就可以委托操作系统中的协议栈将来来自应用程序的数据，打包成数据包然后发送出去。那协议栈，具体是啥呢？协议栈其实是<strong>一系列网络协议的总和</strong>，例如：</p><ul><li>TCP</li><li>UDP</li><li>IP</li></ul><p>不同的应用程序在进行数据传输的时候，可能会选择不同的协议。例如我们使用的浏览器就是使用的 TCP 协议，而像之前讲过的 DNS 解析就用的 UDP 协议。</p><blockquote><p>那数据在协议栈中到底经历了什么？才变成了一个一个的数据包？</p></blockquote><p>就拿我们向服务器发送一个 HTTP 请求作为例子，我们知道 HTTP 请求中有：</p><ul><li>请求行</li><li>请求头</li><li>请求体</li></ul><p>HTTP 是属于<strong>应用层</strong>的协议，而应用层还有很多其他的协议，每个协议所涉及到的数据也都不同，协议栈要怎么去兼容不同协议之间的数据呢？</p><p>答案是<strong>不做兼容</strong>。对于协议栈来说，所有的数据<strong>都只不过是一堆二进制序列</strong>。</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>那协议栈收到了这一堆二进制序列之后是不是就直接交给网卡发送了呢？</p></blockquote><p>我都这么问了，那显然不是了...</p><p>其实协议栈在收到数据之后并不会马上就会就发送出去，而是会先写入<strong>位于内存的 Buffer</strong> 中。那为啥不直接发出呢？</p><blockquote><p>其实很简单，假设你现在正在公交车的<strong>起始站</strong>，你觉得公交车会来一个人就立马发车吗？</p><p>显然不是，它会等一段时间，有更多的乘客上车之后再发车。但是它又不能等太长的时间，不然后续站台的乘客就会等的很久。</p></blockquote><p>协议栈之所以不立即发出去，其实也是同样的道理。其实这背后无非基础两种考虑：</p><ol><li><strong>数据的长度</strong></li><li><strong>等待的时间</strong></li></ol><p>应用层的程序发送过来的数据可能长度都不太一样，有的可能一个字节一个字节的发， 有的可能一次性就传入所有的数据。</p><p>如果收到数据就发送出去，会导致在网络中传输着很多<strong>小包</strong>，而这会降低网络传输的效率。</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>所以，协议栈在收到数据之后会等待一段时间，等数据达到一定量之后，再执行发送操作。</p><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但是，协议栈又不能等的太久是吧？等太久了你让正在电脑面前操作的用户情何以堪，这种<strong>发送延迟</strong>会让用户体验刷刷的往下掉。</p><p>但是吧，想做到对这两者的平衡却不是一件简单的事。数据包太短，降低网络传输效率，等待太长时间，又会造成发送延迟。所以协议栈索性就把控制权交给了应用程序。</p><p>应用程序可以自己控制到底采取哪种措施，例如我们常用的浏览器，因为和用户实时的在进行交互，用户对整个页面的响应速度也相当敏感，所以一般都会采用直接发送数据的方式，即使其数据并没有达到「一定的量」</p><blockquote><p>这一个「一定的量」到底是啥？</p></blockquote><p>的确，上面都只说一定的量、一定的量，那这个量到底是多少？</p><p>要了解这个我们需要知道两个参数，分别是：</p><ol><li>MTU（<strong>M</strong>aximum <strong>T</strong>ransmission <strong>U</strong>nit）最大传输单元</li><li>MSS（<strong>M</strong>aximum <strong>S</strong>egment <strong>S</strong>ize）最大分段大小</li></ol><p>MTU 其实就代表了上面途中数据包的<strong>最大长度</strong>，一般来说是 1500 字节。而我们需要知道数据包是由以下部分组成的：</p><ol><li>各种头部信息</li><li>真实数据</li></ol><p>而从 MTU 中减去各种头部数据的大小，剩下的就是 MSS 了，也就是实际的数据。</p><figure><img src="'+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>知道了数据包的组成和 MTU、MSS 的概念之后，我们就可以继续接下来的步骤了。某次发送的数据，没有超过 MSS 还好，就可以直接发送出去了。</p><blockquote><p>那如果超过了 MSS 咋办？例如我发这篇文章时所发请求的数据长度就可能超过 MSS 。</p></blockquote><figure><img src="'+l+'" alt="过长数据包拆分" tabindex="0" loading="lazy"><figcaption>过长数据包拆分</figcaption></figure><p>此时就需要对数据<strong>进行拆分</strong>，按照 MSS 的长度为单位进行拆分，将拆出来的数据分别装进不同的数据包中。拆分好之后，就可以发送给目标服务器了。</p><p>TCP 会确保通信的服务器能够收到数据包。传输时对每个字节都进行了编号，举个例子，假设此次传输的数据是 <code>1 - 1000</code> 字节，然后服务器回的 ACK 就会是 1001，这就代表没有<strong>丢包</strong>。</p><p>这些发送过的包都会暂存在 Buffer 中，如果传输的过程中出错，则可以进行重发的补偿措施。这也是为什么在数据链路层（例如网卡、路由器、集线器）等等都<strong>没有补偿机制</strong>，它们一旦检测到错误会直接将包丢弃。然后由传输层重发就好。</p><blockquote><p>那要是网络很拥堵，服务器一直没有返回怎么办？</p></blockquote><p>在服务器端，我们去和其他第三发进行交互时，是不是都会设定一个超时的时间？如果不设置超时时间那难道一直在这等下去吗？</p><p>TCP 也同理。客户端在等待服务器响应时，会有一个时间叫 <strong>ACK 等待时间</strong>，其实也是超时时间。</p><p>当网络发生拥堵时，其实你完全也可以<strong>把网络拥堵理解成路上堵车</strong>。此时，ACK 的返回就会变慢。如果返回时间长到了让客户端认为服务器没有收到，就有可能会重发。</p><p>并且有可能刚刚重发完，ACK 就到了。虽然服务器端可以通过序号来对包进行判重，不会造成错误，但是这种没有意义的重复包，在本身网络负担已经很重的情况下，你还往里怼重复的无用的数据包，这不是扯淡吗？这明显不行的。</p><p>那怎么避免上面的这个情况呢？答案很简单，稍微延长一点 <strong>ACK等待时间</strong>，这样一来就能一定程度上避免上述的问题。但是用屁股想想应该也知道，这个时间肯定不是越长越好，再长用户那又该等爆炸了。</p><p>除了网络波动会影响到 ACK 的返回时间，通信的物理距离也是一个影响的因素。说白了就是这玩意儿不可能设置一个固定的时间。所以，<strong>实际上</strong>，这个<strong>等待时间</strong>是<strong>动态调整</strong>的，这次稍微返回慢了点，那我下次就稍微延长一点等待时间。返回 ACK 的速度如果很给力，那么就会相应的减少 <strong>等待</strong>。</p><p>上面的概念也有一个大家很熟悉的名字，叫——<strong>超时重传</strong>。</p><p>我们来设想一个更加极端的情况，假设你们通信的网线被挖断了，甚至机房起火了，这个时候无论你重发多少次都没用。那 TCP 不就一直无限循环的把请求发下去了？</p><p>当然 TCP 设计时也考虑到了这种情况，其在重传几次无效之后，就会强制中断通信，并抛出错误给应用程序。</p><blockquote><p>问题又来了，客户端在向服务器发送数据包之后，等待 ACK 的过程中，真的就只是等 ACK，其他的什么也不做吗？</p></blockquote><p>当然不是，这样极其的浪费资源，降低通信效率。发送完一个数据包之后，不用等待 ACK 的返回，会直接继续发送下一个包，这就是<strong>滑动窗口</strong>。</p><p>但是这样会有一个问题，应用程序发送包发送的过于频繁，导致服务器接收不过来了。</p><p>因为刚刚说过，应用程序发送的时候，会将发送过的数据存储在 buffer 中。而对于接收方也是一样的，接收方收到消息之后，会将数据存储在 Buffer 中，然后在 Buffer 中对收到的数据进行重组，还原成最初的应用程序发送的数据。</p><p>但是如果<strong>发送的数据太快</strong>，超过了重组的速度，<strong>缓冲区</strong>就会<strong>被填满</strong>。而缓冲区一旦被填满，后续的数据就无法再接收了，然后<strong>丢包</strong>就出现了。</p><p>那 TCP 是如何解决这个问题的呢？答案是 <code>流量控制</code>。为了防止传输方发送的过快直接造成丢包，继而触发上面的超时重传机制，根据接收方的接受能力，来决定发送方的传输速度，这个机制就是<strong>流量控制</strong>。</p><p>该机制作用于接受方。在TCP报文头部中会用一个16位的字段来表示<strong>窗口大小</strong>，<strong>非常重要的调优参数</strong>。这个数字<strong>越大</strong>，则说明接收方的缓冲区<strong>越大</strong>，能够接收更多的数据。接收方会在确认应答的时候，将自己的<strong>剩余窗口大小写入</strong>，随ACK一起发送给发送方。</p><figure><img src="'+c+'" alt="TCP流量控制" width="500" tabindex="0" loading="lazy"><figcaption>TCP流量控制</figcaption></figure><p>如果发送方接收到的大小为0，那么此时就会停止发送数据。这样会有一个问题，如果下一个应答（也就是窗口大小不为0）在过程中丢了，那么发送方就会进入死锁，相互等待。所以发送方会<strong>定期</strong>的向接收方发送<strong>窗口探测的数据段</strong>。</p><p>好了，关于数据包的发送就介绍到这里。之后有机会再聊聊 TCP 的<strong>拥塞控制</strong>相关的东西。</p>',72),u=[d];function f(m,C){return t(),n("div",null,u)}const _=o(a,[["render",f],["__file","230831.html.vue"]]);export{_ as default};
