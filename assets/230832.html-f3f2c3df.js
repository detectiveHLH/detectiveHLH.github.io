import{_ as i,r as o,o as s,c as p,a as e,b as t,d as r,f as n}from"./app-a9a3b51d.js";const g="/images/230832/simple-network-model.png",c="/images/230832/network-of-network.png",d="/images/230832/osi-model.png",l="/images/230832/tcp-ip-model.png",h="/images/230832/send-message.png",f="/images/230832/with-protocal-stack.png",P="/images/230832/detail-in-protocal-stack.png",u="/images/230832/http-protocal-demo.png",m="/images/230832/use-network-card-to-send-data.png",_={},I=n('<h1 id="网络杂谈" tabindex="-1"><a class="header-anchor" href="#网络杂谈" aria-hidden="true">#</a> 网络杂谈</h1><p>互联网是什么相信不用在这里赘述，大家平时“网上冲浪”都离不开它。本篇文章中我们就来翻译翻译，什么 XX 的叫 XX 的网络。</p><h2 id="网络的概念" tabindex="-1"><a class="header-anchor" href="#网络的概念" aria-hidden="true">#</a> 网络的概念</h2><p>对于网络，我们可能听过非常多的名词，比如因特网、万维网、互联网。三者的关系其实为：</p><blockquote><p>互联网 &gt; 因特网 &gt; 万维网</p></blockquote><p>那么一个简单的<strong>网络</strong>看起来会是这样：</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>一个简单的网络会由多个节点（AKA 计算机）和连接他们的链路组成。就好像你家里有 3 台电脑，然后它们都相互连接，这样你家里的 3 台电脑就组成了一个简单的网络。而所谓的互联网，就是<strong>网络的网络</strong>，如下所示：</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而不同的网络之间可以通过<strong>路由器</strong>来相互连接，就形成了覆盖范围更大的互联网。所以总的来说，网络连接了许多的计算机，而因特网将许多网络连接到了一起。因此，<strong>因特网</strong>也是目前全球最大的计算机网络。</p><h2 id="因特网的发展" tabindex="-1"><a class="header-anchor" href="#因特网的发展" aria-hidden="true">#</a> 因特网的发展</h2><h3 id="第一阶段" tabindex="-1"><a class="header-anchor" href="#第一阶段" aria-hidden="true">#</a> 第一阶段</h3><p>互联网的起源带有一点战争的背景。它起源于 1960s，当时正值冷战，美国国防部开发了一个分布式的、预期能够抵御核攻击的通讯网络，而这就是世界上第一个互联网的原型 — <strong>ARPANET</strong>。</p><p>在 1983 年，TCP/IP 协议成为了 ARPANET 上的<strong>标准协议</strong>，只要是使用了 TCP/IP 协议，计算机之间都能够相互通信。</p><h3 id="第二阶段" tabindex="-1"><a class="header-anchor" href="#第二阶段" aria-hidden="true">#</a> 第二阶段</h3><p>1985 年，美国国家科学基金会围绕了 6 个大型计算机中心建设计算机网络，这一阶段的特点是形成了三级结构的因特网，分别是：主干网、地区网、校园网（企业网）。这个三级结构的网络覆盖了当时全美主要的大学和研究所。后续，越来越多的企业接入了因特网，导致了网络上通信量激增，由于当时的因特网是由政府维护的，其容量已经满足不了当时的需求了，所以美国政府决定将主干网转交给私人企业经营，并开始收费。</p><h3 id="第三阶段" tabindex="-1"><a class="header-anchor" href="#第三阶段" aria-hidden="true">#</a> 第三阶段</h3><p>随着主干网开始由私人企业经营，该阶段形成了多层次 ISP 结构的因特网。什么叫 ISP？其实也就是互联网（因特网）服务的提供商。给你举个例子你就知道了，比如咱们国内的三巨头：中国联通、电信、移动，他们就是典型的 ISP。</p><p>ISP 其实也是一层代理，因为他们也是从因特网管理机构去申请的一堆 IP 地址，然后我们去 ISP 那办理宽带，支付费用，然后我们就能够在使用期间，用这个 IP 地址上网“冲浪”。</p><h2 id="因特网中的协议" tabindex="-1"><a class="header-anchor" href="#因特网中的协议" aria-hidden="true">#</a> 因特网中的协议</h2><p>经过了这么多年的发展，互联网已经演变成了一个横跨全球、极其复杂的网络。这就好像我们每个城市的内部是通过各种道路相互连接的，而城市与城市之间也是相互连接的，而所有这些城市相互连接就组成了这个大型的“国家互联网”。连接到互联网的机器可以相互通信，而在“国家互联网”中的城市也可以相互“通信”。</p><p>你说包裹有可能在运输途中丢失吗？当然有可能，这样的例子还不少。同理，我们发送出去的数据包也有可能丢失。</p><p>所以为了保证数据包的准确送达，互联网使用了很多种协议。例如我们非常熟悉的 <strong>TCP/IP</strong>。<strong>TCP</strong> 全称是 Transmission Control Protocol，<strong>IP</strong> 全称是 Internet Protocol。</p><p>它们分工明确，IP 负责数据包的路由，让它从一个“中转站”跳到下一个“中转站”，而 TCP 则是确保包裹可靠、准确、有序的到达“中转站”。</p><p>当然，在互联网这个巨大的概念里，TCP/IP 协议并不是全部，还有我们非常熟悉的 <strong>DNS</strong>（Domain Name System）和 <strong>HTTP</strong>（Hypertext Transfer Protocol）。</p>',25),x={href:"https://mp.weixin.qq.com/s/fhyUZpMjHPhIg-z1exaBFQ",target:"_blank",rel:"noopener noreferrer"},T=n('<p>还有像 SSL 和 TLS 这样的网络安全加密协议，让我们的数据能够安全的在互联网上传播。当然，现在 TLS 已经将 SSL 给替代了，因为 TLS 有着更高的安全性和更强的认证机制。</p><p>在互联网的通信和数据交换流程中，协议扮演了一个非常关键的角色。这就好像人与人之间要进行沟通，语言是非常重要的一样。语言不通，沟通起来是非常非常困难的。通信的前提也是双方需要使用一样的协议。</p><p>而协议其实就是一堆的规则，这些规则规定了信息交换的细节。就比如咱们的老朋友三次握手、四次挥手就属于 TCP/IP 协议的一部分。而规定使用这些协议有什么好处？</p><p>答案当然是<strong>标准化</strong>，用标准化来屏蔽不通制造商或者不通系统之间的差异。举个例子，假设不同的制造商的制造出来的手机使用了不同的协议，那么某个 APP 在制造商 A 上能用，在制造商 B 上又不能用，又或者不同的操作系统之间不能相互通信，这类问题以现在的眼光来看肯定是不能接受的。</p><p>再举个标准化协议的例子，像我们用的 Type-C 这种接口的充电线就是一种标准，不管是哪个厂家生产的，只要遵循了这个标准，消费者就能够正常使用。再举一个协议不同的例子，不同的国家使用的充电器的标准不同，不同的标准之间要想充电则需要使用转接头，及其的不方便。</p><h2 id="网络分层模型" tabindex="-1"><a class="header-anchor" href="#网络分层模型" aria-hidden="true">#</a> 网络分层模型</h2><h3 id="osi-七层模型" tabindex="-1"><a class="header-anchor" href="#osi-七层模型" aria-hidden="true">#</a> OSI 七层模型</h3><p>相信大家曾经都被问过一个问题：“请简单描述一下 OSI 七层模型”。这个网络模型是啥意思？怎么来的？或者说，为什么需要网络模型这个玩意儿？</p><p>这是因为 70 年代，网络快速发展演进出了不同网络体系结构，而由于全球的经济发展，迫切的需要使在不同的网络结构体系结构中的用户相互通信，交换信息。为了达成这一目的，国际标准化组织在 1977 年成立了专门的机构来研究这个问题。</p><p>而他们的研究成果就是著名的 OSI 模型。在 OSI 模型中总共包含了 7 层（到这里是不是很多人就条件反射的开始全文背诵了），从下至上分别是：物理层、数据链路层、传输层、网络层、会话层、表示层、应用层。</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但，OSI 模型的设计，理想很丰满，现实很骨感。OSI 仅仅取得了理论上的成果，这些专家在设计的时候，并没有太考虑商业化，并且，OSI 协议设计过于复杂，复杂则导致其运行效率低下，并且 OSI 的层次中有重复的层次。</p><p>所以用一句话来总结 OSI 七层模型就是：<strong>既复杂又不实用</strong>。</p><h3 id="tcp-ip-体系" tabindex="-1"><a class="header-anchor" href="#tcp-ip-体系" aria-hidden="true">#</a> TCP/IP 体系</h3><p>相对于 OSI 的不实用，TCP/IP 是一个<strong>四层的体系结构</strong>，分别是：应用层、运输层、网际层、网络接口层，和 OSI 的对比如下图所示：</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="消息如何发送" tabindex="-1"><a class="header-anchor" href="#消息如何发送" aria-hidden="true">#</a> 消息如何发送</h2><p>简单的了解了一些背景之后，我们来看看网络中的消息是如何发送的。那在一般的认知中，所谓的通信是啥样的呢？可能看起来是这样：</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>假设现在有 A、B 两台机器，其 IP 地址分别为 1.2.3.4 和 4.3.2.1，它们的 IP 地址都不相同，并且需要通过上图中的“网络”进行通信。那如果 A 要发送消息给 B，这个消息该如何“传输”到 B 呢？当然是通过连接到 B 机器上的网线（假设是有线），我们知道，线路中传输的是电信号，这套转换的流程当然不需要我们手动的实现，这些功能都内置在了计算机中，而上面说的转化，则是由<strong>协议栈</strong>来完成的，协议栈的大致工作流程如下：</p><figure><img src="'+f+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',21),b={href:"https://mp.weixin.qq.com/s/JYPhwwuBPPHH8GgJtoCyug",target:"_blank",rel:"noopener noreferrer"},S=n('<p>这里我们拿 TCP/IP 协议栈来举个例子，它分为 <strong>4 层</strong>，大致长这样：</p><ul><li><strong>应用层</strong>，就比如你看这篇文章所使用到的 HTTP 协议</li><li><strong>传输层</strong>，TCP 协议</li><li><strong>网络层</strong>，IP 协议</li><li><strong>硬件层</strong>，使用的是以太网协议，将二进制的数据转换成电信号，以及相互转换，就比如网卡</li></ul><p>那结合上面这个图，就会变成这样：</p><figure><img src="'+P+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这个流程跟上面举过的网购、快递包裹的例子非常类似，我们下单了东西，卖家会将东西层层的包装，而这个“打包”的过程跟协议栈对数据包的处理非常像，从上至下，将数据「Hi, there」一步步的处理。而对于我们收快递的人来说，我们会一点点从外至里的打开这个包裹，最终拿到我们购买的货物。而对于 4.3.2.1 的协议栈来说，一步步的将电信号还原成「Hi, there」也是同样的道理。</p><p>而我们将这个打包的细节添加到上图的话，看起来就会是这样，以 HTTP 协议来说：</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到，每一层的包都是由 XX 头和 XX 数据包组成的，通过协议栈的“层层加码”，通信所需要的关键的信息也会被打包进去：</p><ul><li>传输层，会将 HTTP 报文添加到 TCP 的数据包中，并在 TCP 头中添加发送方、接收方的端口号</li><li>网络层，会将上一层的 TCP 包添加到 IP 数据包中，并且在 IP 头中添加发送方、接收方的 IP 地址</li><li>硬件层，会将 IP 包添加到以太网数据包中，并在以太网头中添加发送方、接收方的 Mac 地址。</li></ul><p>那么问题来了，我们现在只知道中间有个“网络”，那从 1.2.3.4 机器 A 中出发的数据包，是如何找到 4.3.2.1<br> B 这台机器的呢？A 从一开始就知道该走哪条线路</p><p>1.2.3.4 发送的数据，会经过协议栈从上至下的处理，变成一个一个的<strong>数据包</strong>，然后 4.3.2.1 收到数据包之后，也会经过协议栈从下至上的处理，解析出原始的消息。</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',13),k={href:"http://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm",target:"_blank",rel:"noopener noreferrer"},C=e("li",null,"《计算机网络》",-1);function w(y,A){const a=o("ExternalLinkIcon");return s(),p("div",null,[I,e("blockquote",null,[e("p",null,[t("不太熟悉 DNS 及其底层原理的可以看看我之前写的这篇文章"),e("a",x,[t("你的域名是如何变成 IP 地址的？"),r(a)])])]),T,e("p",null,[t("这样讲有点抽象，比如协议栈到底是啥，它是通过什么方式来处理的数据的，都不知道。关于协议栈相关的概念，以及数据包发送、接收的大致流程，在我之前写的 "),e("a",b,[t("数据包从发送到接收，都经历了什么"),r(a)]),t(" 这篇文章里都有详细的介绍，在此不再赘述。")]),S,e("ul",null,[e("li",null,[e("a",k,[t("How Does the Internet Work?"),r(a)])]),C])])}const H=i(_,[["render",w],["__file","230832.html.vue"]]);export{H as default};
