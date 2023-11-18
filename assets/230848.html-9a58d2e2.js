import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as s,c as p,a as o,b as e,d as n,f as t}from"./app-c78d3c93.js";const c="/images/230848/io-model.jpeg",g="/images/230848/bio.jpeg",d="/images/230848/nio.jpeg",l="/images/230848/io-multiplexing.jpeg",f="/images/230848/async-io.jpeg",O={},I=t('<h1 id="图解四种-io-模型" tabindex="-1"><a class="header-anchor" href="#图解四种-io-模型" aria-hidden="true">#</a> 图解四种 IO 模型</h1><p>最近越来越认为，在讲解技术相关问题时，大白话固然很重要，通俗易懂，让人有想读下去的欲望。但几乎所有的事，都有两面性，在看到其带来好处时，不妨想想是否也引入了不好的地方。</p><p>例如在博客中，过于大白话的语言<strong>的确</strong>会让你阅读起来更加顺畅，也更容易理解。但这都是其他人理解，已经咀嚼过了的，人家是已经完全理解了，你从这些信息中大概可能会观察不到全貌。所以，适当的白话是很好的，但这个度得控制一下。</p><p>接下来切入正文。</p><p>相信大家经常看到这个问题：</p><blockquote><p>BIO、NIO 和 AIO 有什么区别？</p></blockquote><p>看到这个问题，可能你脑海中就会浮现以下这些字眼。比如 BIO 就是如果从内核获取数据会一直阻塞，直到数据准备完毕返回。再比如 NIO，内核在数据没有准备好时不会阻塞住，调用程序会一直询问内核数据是否 Ready。</p><p>虽然是正确的，字数也很少。但是这样一来，你看这些概念就不是理解，而是背诵了。其实 BIO 和 NIO 这类的名词还有一个共同的名字叫——IO模型，总共有:</p><figure><img src="'+c+'" alt="IO 模型" tabindex="0" loading="lazy"><figcaption>IO 模型</figcaption></figure><p>由于信号驱动 IO 在实际中不常用，我们主要讲以下四种模型：</p><ol><li>同步阻塞</li><li>同步非阻塞</li><li>IO 多路复用</li><li>异步 IO</li></ol><p>这里还是通过例子来理解这 4 种 IO 模型：</p><blockquote><p>假设此时客户端正在发送一些数据到服务器，并且数据已经通过客户端的协议栈、网卡，陆陆续续的到达了服务器这边的内核态 Buffer 中了。</p></blockquote>',13),u={href:"https://mp.weixin.qq.com/s/OJRybC7uamkkizPcfPoC7w",target:"_blank",rel:"noopener noreferrer"},h={href:"https://mp.weixin.qq.com/s/JYPhwwuBPPHH8GgJtoCyug",target:"_blank",rel:"noopener noreferrer"},_=t('<h2 id="同步阻塞-bio" tabindex="-1"><a class="header-anchor" href="#同步阻塞-bio" aria-hidden="true">#</a> 同步阻塞 BIO</h2><p>我们需要知道，内核在处理数据的时候其实是分成了两个阶段：</p><ul><li>数据准备</li><li>数据复制</li></ul><p>在网络 IO 中，<strong>数据准备</strong>可能是客户端还有部分数据还没有发送、或者正在发送的途中，当前内核 Buffer 中的数据并不完整；而<strong>数据复制</strong>则是将内核态 Buffer 中的数据复制到用户态的 Buffer 中去。</p><p>当<strong>调用线程</strong>发起 <code>read</code> 系统调用时，如果此时内核数据还没有 Ready，调用线程会<strong>阻塞</strong>住，等待内核 Buffer 的数据。内核数据准备就绪之后，会将内核态 Buffer 的数据复制到用户态 Buffer 中，这个过程中调用线程仍然是<strong>阻塞</strong>的，直到数据复制完成，整个流程用图来表示就张这样：</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="同步非阻塞-nio" tabindex="-1"><a class="header-anchor" href="#同步非阻塞-nio" aria-hidden="true">#</a> 同步非阻塞 NIO</h2><p>相信大家知道 Java 中有个包叫 <code>nio</code>，但那跟我们现在正在讨论的 NIO 不是同一个概念。</p><p>现在正在讨论的是 <strong>N</strong>on-Blocking <strong>IO</strong>，代表同步非阻塞，<strong>是一种基础的 IO 模型</strong>。而 <code>nio</code> 包则是 <strong>N</strong>ew <strong>IO</strong>，里面的 IO 模型实际上是 <strong>IO多路复用</strong>，大家不要搞混淆了。</p><p>有了 BIO 的基础，这次我们直接来看图：</p><figure><img src="'+d+'" alt="NIO" tabindex="0" loading="lazy"><figcaption>NIO</figcaption></figure><p>还是分为两个阶段来讨论。</p><p><strong>数据准备阶段</strong>。此时用户线程发起 read 系统调用，此时内核会立即返回一个错误，告诉用户态数据还没有 Read，然后用户线程不停地发起请求，询问内核当前数据的状态。</p><p><strong>数据复制阶段</strong>。此时用户线程还在不断的发起请求，但是当数据 Ready 之后，<strong>用户线程就会陷入阻塞</strong>，<strong>直到数据从内核态复制到用户态</strong>。</p><p>稍微总结一下，如果内核态的数据没有 Ready，用户线程不会阻塞；但是如果内核态数据 Ready 了，即使当前的 IO 模型是同步非阻塞，<strong>用户线程仍然会进入阻塞状态</strong>，直到数据复制完成，并不是绝对的非阻塞。</p><p>那 NIO 的好处是啥呢？显而易见，实时性好，内核态数据没有 Ready 会立即返回。但是事情的两面性就来了，频繁的轮询内核，会<strong>占用大量的 CPU 资源，降低效率</strong>。</p><h2 id="io-多路复用" tabindex="-1"><a class="header-anchor" href="#io-多路复用" aria-hidden="true">#</a> IO 多路复用</h2><p>IO 多路复用实际上就解决了 NIO 中的频繁轮询 CPU 的问题。在之前的 BIO 和 NIO 中只涉及到一种系统调用——<code>read</code>，在 IO 多路复用中要引入新的系统调用——<code>select</code>。</p><p><code>read</code> 用于读取内核态 Buffer 中的数据，而 <code>select</code> 你可以理解成 MySQL 中的同名关键字，用于查询 IO 的就绪状态。</p><p>在 NIO 中，内核态数据没有 Ready 会导致用户线程不停的轮询，从而拉满 CPU。而在 IO 多路复用中调用了 <code>select</code> 之后，只要数据没有准备好，用户线程就会阻塞住，<strong>避免了频繁的轮询当前的 IO 状态</strong>，用图来表示的话是这样：</p><figure><img src="'+l+'" alt="IO 多路复用" tabindex="0" loading="lazy"><figcaption>IO 多路复用</figcaption></figure><h2 id="异步-aio" tabindex="-1"><a class="header-anchor" href="#异步-aio" aria-hidden="true">#</a> 异步 AIO</h2><p>该模型的实现就如其名，是异步的。用户线程发起 <code>read</code> 系统调用之后，无论内核 Buffer 数据是否 Ready，都不会阻塞，而是立即返回。</p><p>内核在收到请求之后，会开始准备数据，准备好了&amp;复制完成之后会由内核发送一个 Signal 给用户线程，或者回调用户线程注册的接口进行通知。用户线程收到通知之后就可以去读取用户态 Buffer 的数据了。</p><figure><img src="'+f+'" alt="AIO" tabindex="0" loading="lazy"><figcaption>AIO</figcaption></figure><p>由于这种实现方式，异步 IO 有时也被叫做<strong>信号驱动 IO</strong>。相信你也发现了，这种方式最重要的是需要 OS 的支持，如果 OS 不支持就直接完蛋。</p><p>Linux 系统在 2.6 版本的时候才引入了异步IO，不过那个时候并不算真正的异步 IO，因为内核并不支持，底层其实是通过 IO 多路复用实现的。而到了 Linux 5.1 时，才通过 <code>io_uring</code> 实现了真 AIO。</p>',27);function m(b,x){const r=a("ExternalLinkIcon");return s(),p("div",null,[I,o("p",null,[e("不清楚用户态和内核态区别的可以看看"),o("a",u,[e("《简单聊聊用户态和内核态的区别》"),n(r)])]),o("p",null,[e("对数据在网络中是如何传输的细节感兴趣的，可以去看看我之前写的文章 "),o("a",h,[e("《请求数据包从发送到接收，都经历了什么？》"),n(r)]),e("。")]),_])}const N=i(O,[["render",m],["__file","230848.html.vue"]]);export{N as default};
