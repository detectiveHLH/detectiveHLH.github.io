import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as a,f as i}from"./app-ced13c27.js";const p="/images/230829/img-1.jpeg",o="/images/230829/three-handshake.jpeg",r="/images/230829/img-2.jpeg",d="/images/230829/img-3.jpeg",l={},n=i('<h1 id="【俗话说】换个角度理解tcp的三次握手和四次挥手" tabindex="-1"><a class="header-anchor" href="#【俗话说】换个角度理解tcp的三次握手和四次挥手" aria-hidden="true">#</a> 【俗话说】换个角度理解TCP的三次握手和四次挥手</h1><blockquote><p>PS：通俗一点的解释都会在引用块中</p><p>Nothing is true, Everything is permitted.</p></blockquote><h2 id="_0-什么是tcp" tabindex="-1"><a class="header-anchor" href="#_0-什么是tcp" aria-hidden="true">#</a> 0. 什么是TCP</h2><p>TCP，全称Transmission Control Protocol，是一种面向连接、可靠的、基于字节流的<strong>单播</strong>协议。与我们常说的TCP/IP协议不同，TCP/IP是一个协议族，涉及到OSI模型中的网络层、应用层和应用层。而我们要聊的TCP就是在传输层的协议，现在应用的特别广泛的HTTP请求，就是基于TCP的。</p><h2 id="_1-三次握手" tabindex="-1"><a class="header-anchor" href="#_1-三次握手" aria-hidden="true">#</a> 1. 三次握手</h2><blockquote><p>所谓面向连接很好理解，就像我们要对远程服务器发出一个指令，首先我们需要登录上去。这个登录就是一个连接的过程。</p></blockquote><p>在做数据交换之前，通信双方必须在彼此建立一条连接。也就是通信双方都维护了一份对方的信息，比如IP地址和端口号。说到建立连接，就不得不提到经典的三次握手和四次挥手。</p><h3 id="_1-1-为什么不两次握手" tabindex="-1"><a class="header-anchor" href="#_1-1-为什么不两次握手" aria-hidden="true">#</a> 1.1 为什么不两次握手</h3><p>三次握手让通信双方都明确有一个连接正在建立，也为了确保客户端和服务器同时具有<strong>发送</strong>和<strong>接收</strong>的能力。而两次握手做不到这一点。我们现在从另外一个角度来看一下三次握手，那就是为什么要<strong>三次握手</strong>？我<strong>两次握手</strong>它不香吗？让我们用一段对话来模拟如果真的采用两次握手，会带来什么问题。</p><blockquote><p>朋友：喂，喂？听得到吗</p><p>你：听得到...你声音能不能小点</p><p>这就是两次握手。</p></blockquote><p>按照人的逻辑来说，这已经是一次正常的对话了是吧，下一步难道不是建立连接吗？说下一步之前，需要先了解做三次握手的目的是什么。三次握手让通信双方都明确有一个连接正在建立，也为了确保客户端和服务器同时具有<strong>发送</strong>和<strong>接收</strong>的能力。</p><p>我们来分析一下上面的那段对话。</p><blockquote><p>朋友问你能不能听到，说明朋友具有<strong>发送</strong>能力；你听到了朋友的问题，说明你具有<strong>接收</strong>能力</p><p>如果只有两次握手，问题在哪儿呢？</p><p>站在<strong>朋友</strong>的角度，他知道你同时具有<strong>发送</strong>和<strong>接收</strong>能力</p><p>但站在<strong>你（服务器）<strong>的角度，你只知道朋友具有</strong>发送</strong>能力，因为你不知道你发的<em>声音能不能小点</em>，他到底有没有收到</p></blockquote><p>服务器不清楚客户端是否有接收能力的情况下，就算数据包真的发出去了，但无法知道客户端是否收到了数据。这样的就是<strong>不可靠</strong>的连接了。</p><p>而且，真实的网络传输中，出现网络延迟是常有的事，如果客户端发送了请求建立连接的数据包，由于网络延迟，数据包没有到达，客户端又发了一次，服务器收到之后建立了连接。</p><p>但是当前的连接关闭后，由于网络延迟的没有到达的包到了服务器，服务器又建立了连接，但是此时客户端已经断开了，这样就白白浪费了服务器的资源。</p><p>如果觉得上面的例子还是不能让你理解， 为什么两次握手不行。请看下面这个终极例子。</p><blockquote><p>朋友：快借我点钱，XX宝账号123XXXXXXXX</p><p>你：好的， 你的帐号是123XXXXXXXX吗</p><p>。。。。。。（无应答）</p><p>你的内心：？？？？？？</p></blockquote><p>如果你是被借钱的那个，你敢把钱转过去吗？</p><figure><img src="'+p+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>简单总结一下两次握手所带来的问题：不可靠，还会造成网络资源的浪费。</p><h3 id="_1-2-三次握手的过程" tabindex="-1"><a class="header-anchor" href="#_1-2-三次握手的过程" aria-hidden="true">#</a> 1.2 三次握手的过程</h3><p>上面我们讨论了为什么要三次握手，接下来我们用几个专业术语来解释一下三次握手的过程。</p><ul><li><p>服务器开始监听某个端口，此时服务器进入了<code>LISTEN</code>状态</p></li><li><p>客户端最初是<code>CLOSED</code>状态，然后向服务器发送一个SYN标志位的数据包，主动发起连接。客户端变成<code>SYN-SENT</code>状态</p></li><li><p>服务器接收到客户端的SYN数据包，通过标志位知道了客户端想要建立连接。于是回了客户端一个SYN和ACK，表示收到了请求。服务器的自身状态变为了<code>SYN-RCVD</code></p></li><li><p>客户端收到了服务器的ACK，表示服务器知道了客户端想要建立连接。然后客户端再给服务器回了一个ACK表示自己收到了（或者说能够收到）服务器的消息，发送完这个ACK后，客户端的状态变成了<code>ESTABLISH</code></p></li><li><p>服务器收到了客户端的ACK，服务器的状态也变成<code>ESTABLISH</code></p></li></ul><figure><img src="'+o+'" alt="" width="500" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-四次挥手" tabindex="-1"><a class="header-anchor" href="#_2-四次挥手" aria-hidden="true">#</a> 2. 四次挥手</h2><h3 id="_2-1-模拟四次挥手" tabindex="-1"><a class="header-anchor" href="#_2-1-模拟四次挥手" aria-hidden="true">#</a> 2.1 模拟四次挥手</h3><p>老规矩，还是让我们用一段对话来模拟TCP的四次挥手。</p><blockquote><p>场景，你跟你的朋友们正在外面high</p><p>你：你们继续玩，我就先走了，明天还要上班（第一次）</p><p>老铁：（老铁看到你在跟他说话且从你说的话中知道你要走了，老铁也用肢体语言告诉你他知道你要走了）（第二次）</p><p>老铁：那好吧， 路上注意安全哈 （第三次）</p><p>你：好的，下次再约 （第四次）</p></blockquote><p>这就是通俗版本的四次挥手的解释，下面从专业的角度来看看。</p><h3 id="_2-2-四次挥手的过程" tabindex="-1"><a class="header-anchor" href="#_2-2-四次挥手的过程" aria-hidden="true">#</a> 2.2 四次挥手的过程</h3><p>我们来看一下完整的流程。</p><ul><li><p>最初，客户端和服务器都处于<code>ESTABLISH</code>状态</p></li><li><p>客户端想要断开连接，便主动向服务器发送标志位为FIN的数据包。发送之后客户端的状态变为<code>FIN-WAIT-1</code>，同时客户端也变成了半关闭状态，即无法向服务器发送数据包了，只能接收来自服务器的数据</p></li><li><p>服务器收到客户端的FIN数据包，状态变为<code>CLOSE-WAIT</code>，并回给客户端一个表示确认的数据包ACK</p></li><li><p>客户端收到了ACK之后，状态变为<code>FIN-WAIT-2</code></p></li><li><p>然后，服务器向客户端发送FIN数据包，服务器状态变为<code>LAST-ACK</code></p></li><li><p>客户端收到FIN数据包，客户端状态变为<code>TIME-WAIT</code>。然后回一个确认数据包ACK给服务器</p></li><li><p>然后客户端等待2MSL，如果在这段时间内，没有收到服务器重发的消息，说明服务器收到了ACK</p></li><li><p>四次挥手到此结束，连接断开</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+d+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ul><p>我们再来模拟一次刚刚的场景。</p><blockquote><p>场景，你跟你的朋友们正在外面high</p><p>你：你们继续玩，我就先走了，明天还要上班（第一次）</p><p>老铁：（老铁喝high了，反射弧无限延长）</p><p>你肯定得再说一次啊，给朋友说你要走了，于是你又说了一次。</p><p>你：你们继续玩，我就先走了，明天还要上班（第一次）</p><p>老铁：（老铁喝high了，反射弧无限延长）</p><p>。。。。。。</p><p>如此反复</p></blockquote><p>实际情况是，如果是两次挥手，也就是把服务器给客户端的ACK和FIN合并为同一个，如果此时网络出现了延迟，站在客户端的角度来看，客户端会认为刚刚发送的FIN报文并没有到达服务器，于是会在再重新发送一次。如果延迟的时间较长，那么客户端将会一直重新发送FIN的TCP报文。</p><h3 id="_2-3-对比分析" tabindex="-1"><a class="header-anchor" href="#_2-3-对比分析" aria-hidden="true">#</a> 2.3 对比分析</h3><p>结合抽象和具体的四次挥手，其实就很好理解了，我们用一个表格来总结一下。</p><table><thead><tr><th style="text-align:left;">描述状态</th><th style="text-align:left;">实际情况</th></tr></thead><tbody><tr><td style="text-align:left;">你和你的朋友在外面high</td><td style="text-align:left;">客户端和服务器建立了连接</td></tr><tr><td style="text-align:left;">你和朋友说你要走了</td><td style="text-align:left;">客户端主动向服务器发送FIN，客户端状态变为FIN-WAIT-1</td></tr><tr><td style="text-align:left;">你的朋友听到了并理解了你要说的话，并通过肢体语言反馈给你他知道了</td><td style="text-align:left;">服务器收到FIN数据包，并回了一个ACK，服务器的状态变为CLOSE-WAIT。客户端收到ACK之后变为FIN-WAIT-2</td></tr><tr><td style="text-align:left;">你的朋友说“那好吧， 路上注意安全哈”</td><td style="text-align:left;">服务器向客户端发送FIN包，服务器变为LAST-CHECK。</td></tr><tr><td style="text-align:left;">你说“好的，下次再约”</td><td style="text-align:left;">客户端收到FIN包后状态变为TIME-WAIT。并回一个ACK给服务器。</td></tr><tr><td style="text-align:left;">你迟疑了一下，你的朋友并没有挽留你</td><td style="text-align:left;">客户端等待2MSL，如果没有收到服务器的重发消息，则说明服务器收到了ACK。</td></tr><tr><td style="text-align:left;">你离开了和朋友的聚会</td><td style="text-align:left;">四次挥手结束，连接断开</td></tr></tbody></table><h3 id="_2-4-为什么要等待" tabindex="-1"><a class="header-anchor" href="#_2-4-为什么要等待" aria-hidden="true">#</a> 2.4 为什么要等待</h3><p>MSL，即Maximun Segment LifeTime，报文最大生存时间。为什么在TIME-WAIT之后还需要等待2MSL呢？主要是两个原因，让我们结合例子来理解一下。</p><h4 id="保证服务器收到ack" tabindex="-1"><a class="header-anchor" href="#保证服务器收到ack" aria-hidden="true">#</a> 保证服务器收到ACK</h4><blockquote><p>假设你说了“好的，下次再约”。由于大家都在high，声音太大了。导致你的朋友没有听到你说的“好的，下次再约”这句话，然后你转头就走了。</p><p>如果你站在你朋友的角度，肯定会心里很不爽，好心提醒你，连句道别的话都没有？</p></blockquote><p>这种情况就是服务器并没有收到客户端收到的ACK，站在服务器的角度，服务器并不知道客户端收到了自己发的FIN包。也就不会断开连接，但是客户端已经单方面的断开连接了。又造成了服务器的资源浪费，服务器也无法进入正常的关闭连接状态。</p><h4 id="防止失效的数据包" tabindex="-1"><a class="header-anchor" href="#防止失效的数据包" aria-hidden="true">#</a> 防止失效的数据包</h4><blockquote><p>同样，你说了”好的， 下次再约“后，你没有确认你的朋友是否听到了，扭头就走。你的朋友也喝多了，此时心里很不爽，骂了一句傻X。</p><p>这句话刚好被路过、站到了你刚刚站的位置上的哥们接住了，以为在说他，心里就很不爽，提着拳头就把你的朋友揍了一顿。</p></blockquote><p>这种情况是指，客户端没有等待2MSL就直接断开，但是服务器此时仍然有些数据包需要发送，或者已经发了出去。但是数据包到了后，此时的端口已经被新的连接占用了，老的TCP报文就会与新连接的TCP报文冲突、混淆。</p><h2 id="_3-结尾" tabindex="-1"><a class="header-anchor" href="#_3-结尾" aria-hidden="true">#</a> 3. 结尾</h2><p>后面如果我有时间，会继续尝试把枯燥的理论抽象成生活中一些简单的现象并且与专业的知识结合起来的文章风格，来帮助那些看理论知识很吃力的人。其实只要理解了整个思路，是不需要去死记硬背的。</p><p>如果文章中有不对的地方，还望各位大佬不吝赐教。</p>',50),h=[n];function c(s,g){return e(),a("div",null,h)}const _=t(l,[["render",c],["__file","230829.html.vue"]]);export{_ as default};
