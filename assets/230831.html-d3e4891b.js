const e=JSON.parse('{"key":"v-1c6d8afd","path":"/posts/230831.html","title":"请求数据包从发送到接收，都经历什么？","lang":"zh-CN","frontmatter":{"date":"2021-10-08T00:00:00.000Z","permalink":"/posts/230831.html","category":["计算机网络"],"tag":["TCP/IP"],"description":"请求数据包从发送到接收，都经历什么？ 之前讲了「从输入 URL 再到浏览器成功看到界面」中的域名是如何变成 IP 地址的，了解了 DNS 相关的东西。这篇文章就聊聊发生在 DNS 解析之后的操作——建立连接。也就是我们常说的三次握手。 看到三次握手你可能会说，这不是面试都被问烂了的题吗？ 三次握手不就是： 服务器开始为 CLOSE 状态，然后监听某个端口，此时服务器会进入 LISTEN 状态 客户端最初也是 CLOSE 状态，客户端会向服务器发送一个带 SYN 标志位的数据包，主动发起连接。此时客户端会变成 SYN-SENT 状态 服务器接收到客户端的数据包之后，通过标志位判断出了客户端想要建立连接。然后返回一个 SYN 和 ACK ，此时服务器的状态变为了 SYN-RCVD 客户端收到了服务器的 ACK 之后，会回一个 ACK 给服务器，回完这个 ACK 之后，服务器的状态就变为了 ESTABLISH 服务器收到了客户端回复的 ACK 之后，服务器的状态也变成了 ESTABLISH","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230831.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"请求数据包从发送到接收，都经历什么？"}],["meta",{"property":"og:description","content":"请求数据包从发送到接收，都经历什么？ 之前讲了「从输入 URL 再到浏览器成功看到界面」中的域名是如何变成 IP 地址的，了解了 DNS 相关的东西。这篇文章就聊聊发生在 DNS 解析之后的操作——建立连接。也就是我们常说的三次握手。 看到三次握手你可能会说，这不是面试都被问烂了的题吗？ 三次握手不就是： 服务器开始为 CLOSE 状态，然后监听某个端口，此时服务器会进入 LISTEN 状态 客户端最初也是 CLOSE 状态，客户端会向服务器发送一个带 SYN 标志位的数据包，主动发起连接。此时客户端会变成 SYN-SENT 状态 服务器接收到客户端的数据包之后，通过标志位判断出了客户端想要建立连接。然后返回一个 SYN 和 ACK ，此时服务器的状态变为了 SYN-RCVD 客户端收到了服务器的 ACK 之后，会回一个 ACK 给服务器，回完这个 ACK 之后，服务器的状态就变为了 ESTABLISH 服务器收到了客户端回复的 ACK 之后，服务器的状态也变成了 ESTABLISH"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-02T08:48:07.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"TCP/IP"}],["meta",{"property":"article:published_time","content":"2021-10-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-02T08:48:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"请求数据包从发送到接收，都经历什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-10-08T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-02T08:48:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1693644487000,"updatedTime":1693644487000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":10.78,"words":3234},"filePathRelative":"posts/计算机网络/请求数据包从发送到接收，都经历什么？.md","localizedDate":"2021年10月8日","excerpt":"<h1> 请求数据包从发送到接收，都经历什么？</h1>\\n<p>之前讲了「从输入 URL 再到浏览器成功看到界面」中的域名是如何变成 IP 地址的，了解了 DNS 相关的东西。这篇文章就聊聊发生在 DNS 解析之后的操作——建立连接。也就是我们常说的<strong>三次握手</strong>。</p>\\n<blockquote>\\n<p>看到三次握手你可能会说，这不是面试都被问烂了的题吗？</p>\\n</blockquote>\\n<p>三次握手不就是：</p>\\n<ol>\\n<li>服务器开始为 <code>CLOSE</code> 状态，然后监听某个端口，此时服务器会进入 <code>LISTEN</code> 状态</li>\\n<li>客户端最初也是 <code>CLOSE</code> 状态，客户端会向服务器发送一个带 <code>SYN</code> 标志位的数据包，主动发起连接。此时客户端会变成 <code>SYN-SENT</code> 状态</li>\\n<li>服务器接收到客户端的数据包之后，通过标志位判断出了客户端想要建立连接。然后返回一个 <code>SYN</code> 和 <code>ACK</code> ，此时服务器的状态变为了 <code>SYN-RCVD</code></li>\\n<li>客户端收到了服务器的 ACK 之后，会回一个 ACK 给服务器，回完这个 ACK 之后，服务器的状态就变为了 <code>ESTABLISH</code></li>\\n<li>服务器收到了客户端回复的 ACK 之后，服务器的状态也变成了 <code>ESTABLISH</code></li>\\n</ol>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
