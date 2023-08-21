import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o,c as l,a as t,b as e,d as i,f as a}from"./app-2e9c1c72.js";const h="/images/230833/https-encrypt-process.png",p="/images/230833/middle-person-attack.jpeg",T="/images/230833/https-handshake-process.jpeg",d={},c=a('<h1 id="https-是如何运作的-它解决了什么问题" tabindex="-1"><a class="header-anchor" href="#https-是如何运作的-它解决了什么问题" aria-hidden="true">#</a> HTTPS 是如何运作的？它解决了什么问题？</h1><p>首先，HTTPS 并不是一个新的协议，而是 HTTP + SSL/TLS，即 SSL（<strong>S</strong>ecurity <strong>S</strong>ocket <strong>L</strong>ayer）和 TLS（<strong>T</strong>ransport <strong>L</strong>ayer <strong>S</strong>ecurity) 的缩写。但其实作为 SSL 的继任者，TLS 已经完全替代了 SSL，只是大概还是习惯使用 SSL 这个名词。为了严谨，后续都会继续使用 TLS。</p><h2 id="简单了解-http" tabindex="-1"><a class="header-anchor" href="#简单了解-http" aria-hidden="true">#</a> 简单了解 HTTP</h2><h3 id="从何而来" tabindex="-1"><a class="header-anchor" href="#从何而来" aria-hidden="true">#</a> 从何而来</h3><p>要了解 HTTPS，自然我们要先了解 HTTP 协议，最初 HTTP 协议的出现是为了让全球的研究者知识共享而发明出来的，它于 1990 年被发明出来，但这一版本的 HTTP 协议并没有作为标准。</p><h3 id="http-0-9" tabindex="-1"><a class="header-anchor" href="#http-0-9" aria-hidden="true">#</a> HTTP/0.9</h3><p>Tim Berners-Lee 和他的团队提出这个最早的 HTTP/0.9 版本存在一些不明确的地方，例如：</p><ul><li>没有版本标识，不像现在我们有 HTTP/0.9、HTTP/1.0、HTTP/1.1 等等，就连这个 0.9 都是后面才加上的</li><li>没有请求头，只有一个简简单单普普通通的 GET 请求</li><li>响应只支持 HTML 文档本身，不支持其他的格式，比如图片、视频</li><li>没有状态码，根本不知道请求是否成功，或者是因为什么原因失败</li><li>短连接，也是就是后面 HTTP/1.1 和部分的 HTTP/1.0 提出 Keep-Alive 要解决的问题</li></ul><p>这就是最初的 HTTP，存在很多的缺陷，也难怪没有成为标准。</p><h3 id="http-1-0" tabindex="-1"><a class="header-anchor" href="#http-1-0" aria-hidden="true">#</a> HTTP/1.0</h3><p>到了1996年5月，HTTP 提出了新的版本 HTTP/1.0，而它也成了 HTTP 第一个正式的版本，也被正式的标准化。它解决了 HTTP/0.9 没有解决的问题，例如：</p><ul><li>引入了明确的版本号</li><li>定义了请求头、响应头，这让请求中能够附件传输很多的元数据，这些头都是基础，不再赘述</li><li>支持了多种数据类型，例如图片、音频、视频</li><li>引入了状态码</li><li>引入了缓存机制</li></ul><p>我们现在之后后续的主流版本其实是 HTTP/1.1，这说明当时提出的 HTTP/1.0 其实还是存在部分的问题。</p><h3 id="http-1-1" tabindex="-1"><a class="header-anchor" href="#http-1-1" aria-hidden="true">#</a> HTTP/1.1</h3><p>1997年1月，HTTP/1.1 发布，这也是在 HTTP/2.0 出来之前最为主流的版本，我们来看看它解决了什么问题就知道 HTTP/1.0 存在的缺陷了。</p><ul><li><p>引入了<strong>持久化连接</strong>机制</p></li><li><p>基于 Keep-Alive 长连接，推出了<strong>管线化技术</strong>，提高了发送请求的速度</p></li><li><p>引入了更加灵活的缓存机制</p></li><li><p><strong>分块传输</strong></p></li><li><p><strong>范围请求</strong></p></li></ul><p>所谓持久化连接机制，即服用底层的 TCP 连接。HTTP 底层通信使用的是 TCP，在 HTTP/1.1 之前都是发起一个 HTTP 请求就会建立一个 TCP 连接，传输数据之后再断开。这波操作在 HTTP/1.0 那个时间是没问题的，HTTP 没普及，传输的内容也都是小容量的文本。但随着 HTTP 的普及，传输的内容变得也越来越来丰富，况且还新增了图片、音视频。像这样频繁的发起、断开 TCP 连接会大大的增加页面资源的加载速度，降低用户的体验。所谓持久化连接也就是，只要任意一方没有提出断开 TCP 连接，就继续复用这个连接，减少了创建连接带来的开销。</p><p>而管线化技术则是发送一个请求不用等待其响应，继续发送下一个请求。没有管线化技术时，必须等待上一个请求响应回来之后才能发送下一个请求，而这种机制在网络较慢的情况下会引发一个问题——<strong>队头阻塞</strong>。比如，请求一张较大的图片，偏偏网络还慢，那么后续的请求都会被阻塞。但管线化技术解决了这个问题吗？解决了一部分，没有完全解决。采用管线化技术，请求虽然发出去了，但它是有序的， 所以在等待响应时，这一批里有响应迟迟没有回来，后续的请求<strong>仍然要等待</strong>。所以这个问题并没有完全解决。</p><h3 id="http-2-0" tabindex="-1"><a class="header-anchor" href="#http-2-0" aria-hidden="true">#</a> HTTP/2.0</h3><p>既然有问题，那么后续就需要有新的版本来解决这些问题。2015年5月，HTTP/2.0 正式标准化，之后慢慢开始大面积的普及，那么它又解决了哪些问题呢？主要如下：</p><ul><li>提出了<strong>多路复用</strong>，解决了 HTTP/1.1 中的队头阻塞问题</li><li>使用了二进制协议，而不是原来的文本协议</li><li>对头部进行<strong>压缩</strong>，减少每个 HTTP 请求的头部大小，减少了传输的数据大小</li><li>支持服务器推送，HTTP/2.0 允许服务器主动推送资源到客户端，减少客户端的请求次数</li></ul><p>当然，相信你也知道，现在 HTTP/3.0 也出来了，其关键的改动在于将底层传输层的协议从 TCP 切换到了 <strong>QUIC</strong>，其底层采用的是 UDP，这个后面有机会单独写一篇文章来介绍。</p><h2 id="why-https" tabindex="-1"><a class="header-anchor" href="#why-https" aria-hidden="true">#</a> Why HTTPS？</h2><p>HTTP 即使推出了很多个版本，但是仍然存在问题，例如：</p>',24),g={href:"https://www.wireshark.org/",target:"_blank",rel:"noopener noreferrer"},P=t("li",null,"没有验证通信方的身份，可能遭遇伪装",-1),H=t("li",null,"无法校验数据是否被篡改",-1),_=a('<h3 id="混合加密" tabindex="-1"><a class="header-anchor" href="#混合加密" aria-hidden="true">#</a> 混合加密</h3><p>所以这才有了 HTTPS，也就是 HTTP + TLS。</p><p>在 HTTP 协议中，由它本身直接和 HTTP 通信，而在 HTTPS 协议中，HTTP 是和 TLS 进行通信，相当于给套了一层娃，加了个中间层。</p><p>那要如何进行加密呢？</p><p>HTTPS 采用了<strong>混合加密</strong>的方式，大致的流程如下：</p><ul><li>客户端访问服务器，服务器会返回自己的<strong>公钥</strong></li><li>客户端生成一个<strong>随机密钥</strong>，使用上一步获取的公钥对随机密钥进行加密</li><li>将用服务器公钥加密后的客户端随机密钥发送给服务器</li><li>服务器用自己的私钥进行解密，拿到客户端的随机密钥明文</li></ul><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>到这里，客户端和浏览器就将后续通信加解密要使用到的密钥安全的进行了传输，后续客户端服务器的所有通信都会使用这个随机密钥。所谓的混合加密就是即使用了对称加密，也使用了非对称加密。</p><h3 id="中间人攻击" tabindex="-1"><a class="header-anchor" href="#中间人攻击" aria-hidden="true">#</a> 中间人攻击</h3>',9),u={href:"https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB",target:"_blank",rel:"noopener noreferrer"},f=a('<p>还是基于上面的这个步骤，客户端以为自己在和服务器通信，实际上它在和中间人通信，然后中间人将服务器的真正公钥 S 保存了下来，然后把中间人自己的公钥 B 返回给了客户端。</p><p>客户端拿到了中间人的公钥 B，然后使用公钥 B 对其生成的随机密钥进行加密，然后传给中间人。中间人拿到了加密密文，使用自己的私钥 B’ 进行解密，到这里就拿到了客户端的随机密钥。然后再用保存好的服务器真正公钥 S 加密，将密文再传给服务器。其流程如下图所示：</p><figure><img src="'+p+'" alt="中间人攻击示意图" tabindex="0" loading="lazy"><figcaption>中间人攻击示意图</figcaption></figure><p>这样就完成了一波套娃，并且客户端和服务器都没有感知。这样一来，一旦攻击成功，后续的通信中间人都能够通过前面步骤拿到的<strong>随机密钥</strong>进行解密，然后篡改，再加密传给服务器。</p><p>那该如何解决这个问题呢？</p><p>在上面的流程中，其关键的问题在于客户端无法证明服务器返回的公钥的<strong>正确性</strong>，它可能是中间人的公钥，而不是服务器的。如果有某种方式能够让我们确认，这个公钥的的确确就是服务器的真实公钥，上面的问题就迎刃而解了。</p><p>而这就是 CA。</p><h3 id="ca-证书" tabindex="-1"><a class="header-anchor" href="#ca-证书" aria-hidden="true">#</a> CA 证书</h3><p>全称为 <strong>C</strong>ertificate <strong>A</strong>uthority，它是一个机构，可以将其理解为客户端和服务器都可以信赖的一个第三方。开发人员会将服务器的真实公钥提供给 CA，然后 CA 判断服务器的身份之后，会对公钥签名，然后将其和 CA 证书绑定在一起。当然 CA 证书包含的不仅仅只有签名，还有序列号、用途、颁发者、有效时间之类的。</p><p>然后客户端来请求公钥时，服务器会直接把证书返回给客户端。那么问题又来了，你怎么能够保证返回的证书不是由中间人返回的？加了个 CA 就能够解决这个问题吗？</p><p>当然不是。</p><p>客户端还会对 CA 证书进行校验，以此来保证：</p><ul><li>CA 机构值得信赖</li><li>服务器的公钥真实有效</li></ul><p>否则仍然会面临中间人攻击的风险。那客户端是如何验证这两点的呢？</p>',14),S=t("strong",null,"私钥",-1),C=t("strong",null,"是否可信赖",-1),A={href:"https://en.wikipedia.org/wiki/Chain_of_trust",target:"_blank",rel:"noopener noreferrer"},m=t("p",null,"当然，CA 也不能解决全部的问题。之前也出过 CA 机构被黑的事故，非法颁发了 Google 和 Twitter 的伪造证书。",-1),x=t("h3",{id:"https-握手过程",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#https-握手过程","aria-hidden":"true"},"#"),e(" HTTPS 握手过程")],-1),b=t("p",null,"握手的过程，总结成了一张图，其实就是将上面将的 HTTPS 的加密原理细化了一下：",-1),L=t("figure",null,[t("img",{src:T,alt:"",tabindex:"0",loading:"lazy"}),t("figcaption")],-1);function k(B,y){const r=s("ExternalLinkIcon");return o(),l("div",null,[c,t("ul",null,[t("li",null,[e("协议本身没有加密，再加上底层使用的 TCP/IP 本身就在很多环节容易被窃听，例如我们熟悉的 "),t("a",g,[e("Wireshark"),i(r)])]),P,H]),_,t("p",null,[e("但是这个步骤有个比较明显的问题，即——"),t("a",u,[e("中间人攻击"),i(r)]),e("。")]),f,t("p",null,[e("首先，在将服务器公钥提供给 CA 时，CA 会使用自己的"),S,e("对服务器公钥进行签名。注意，这里是私钥，不是公钥。然后客户端拿到这个证书之后，会使用 CA 的公钥（内置在浏览器中）对其进行解密，然后拿到 CA 侧登记证书时计算的 Hash 值，然后客户端会根据证书上的信息，使用同样的算法计算出另一个 Hash 值，然后将这两个 Hash 值对比，就能够知道证书"),C,e("。当然，这个只是其中的一个步骤，CA 的认证还涉及到"),t("a",A,[e("信任链"),i(r)]),e("的问题，这里不展开。")]),m,x,b,L])}const v=n(d,[["render",k],["__file","230833.html.vue"]]);export{v as default};
