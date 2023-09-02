import{_ as a,o as e,c as h,f as r}from"./app-60033f5c.js";const d={},o=r('<h1 id="游戏服务器和web服务器的区别" tabindex="-1"><a class="header-anchor" href="#游戏服务器和web服务器的区别" aria-hidden="true">#</a> 游戏服务器和Web服务器的区别</h1><p>用Go语言写游戏服务器也有一个多月了，也能够明显的感受到两者的区别。这篇文章就是想具体的聊聊其中的区别。当然，在了解区别之间，我们先简单的了解一下Go语言本身。</p><h2 id="go语言的特点" tabindex="-1"><a class="header-anchor" href="#go语言的特点" aria-hidden="true">#</a> Go语言的特点</h2><p>Go语言跟其他的语言例如Java比起来，算得上一门很年轻的语言。Go语言是由Robert Griesemer、Rob Pike和Ken Thompson于2007年在Google开发。并于2009年正式发布。</p><p>Go语言的设计理念围绕着简洁这两个字，认为少即是多。如果你熟悉Java，用Java那一套语法命名跟Go做对比，可以很明显的体会到这种感觉。</p><p>Go的特点可以简单的概括成以下几个点。</p><h3 id="静态类型和编译型" tabindex="-1"><a class="header-anchor" href="#静态类型和编译型" aria-hidden="true">#</a> 静态类型和编译型</h3><p>首先Go是静态类型，静态类型就是编译时就知道每一个变量的类型，得益于此，在编译的阶段就能够发现很多问题。而如果是动态语言，例如JavaScript，有些问题直到运行时才能发现。</p><p>Go是编译型语言，看到编译型大家脑子里可能会想到另外一个词解释型。两者的区别从字面上来理解其实已经可以看出来，我用一个简单的例子来类比一下。</p><ul><li>编译型 去餐馆吃饭，点了菜之后，饭店会等所有的菜做好了再上</li><li>解释型 去餐馆吃饭，点了菜之后，陆陆续续的边吃边上</li></ul><h3 id="跨平台" tabindex="-1"><a class="header-anchor" href="#跨平台" aria-hidden="true">#</a> 跨平台</h3><p>顾名思义，你写的Go源码在所有的系统都能够运行。</p><p>这点其实很好理解，例如Java的口号是&quot;Write once, run anywhere&quot;。我们都知道Java是编译型的语言，但是Java在编译的时候生成的是字节码，这个字节码与当前的操作系统无关，与CPU也无关。</p><p>这种字节码必须依赖Java虚拟机才能运行，而虚拟机会将操作系统和CPU之间的差异与用户屏蔽。对于编程的人来说这个过程其实无感知的。而对Java来说，语言本身的跨平台并不能代表代码可以跨平台。</p><p>Go的跨平台从某种方面来说，与Java类型，我们需要安装与当前操作系统相对应版本的Go。编译出来的可执行文件会根据操作系统的不同而有所不同。</p><h3 id="自动垃圾回收" tabindex="-1"><a class="header-anchor" href="#自动垃圾回收" aria-hidden="true">#</a> 自动垃圾回收</h3><p>与JVM一样，Go在运行时的内存管理（GC）由Go语言本身来管理，不需要程序员的参与，但是我们可以干预。</p><h3 id="原生的并发编程" tabindex="-1"><a class="header-anchor" href="#原生的并发编程" aria-hidden="true">#</a> 原生的并发编程</h3><p>何为原生？我们都知道，在Java中如果要实现并发， 需要外部的类库支持（Thread），而Go不需要从外部再引入任何依赖。支持使用关键字<code>go</code>即可。而且Java中是通过共享内存进行通信的，熟悉Go的应该都看过一句话“不要通过共享内存来通信，而应该通过通信来共享内存”</p><h3 id="完善的构建工具" tabindex="-1"><a class="header-anchor" href="#完善的构建工具" aria-hidden="true">#</a> 完善的构建工具</h3><p>从获取、编译、测试、安装、运行和分析等一系列流程都有自己的内置工具。例如获取可以使用<code>go get</code>命令来下载更新指定的代码包，并且对它们进行编译和安装，可以使用<code>go build</code> 对源码进行编译，用<code>go run</code>命令来运行Go的程序，用<code>go fmt</code>来快速格式化代码，统一代码风格。</p><h3 id="多范式编程" tabindex="-1"><a class="header-anchor" href="#多范式编程" aria-hidden="true">#</a> 多范式编程</h3><p>目前主流的编程范式有命令式编程、函数式编程和我们最熟悉的面向对象编程。在编写Go的代码的时候，我们可以选择使用面向对象的方法，也可以使用函数式编程的思想，相互结合，相辅相成。</p><p>例如，在Go里面也可以用接口来描述行为，也可以使用纯函数来避免出现副作用。因此，多范式编程就是指这个语言支持多种编程范式的。</p><h3 id="代码风格强统一" tabindex="-1"><a class="header-anchor" href="#代码风格强统一" aria-hidden="true">#</a> 代码风格强统一</h3><p>使用Go的内置工具<code>go fmt</code>即可快速的将代码格式化成官方统一的标准，以此来达到代码风格统一的目的。甚至可以用golangci-lint来检测你的语法跟内置的标准语法是否有冲突，完全可以将这个检测工具挂在git的钩子上，以此来达到强制的代码风格统一的目的。</p><h3 id="活跃的社区" tabindex="-1"><a class="header-anchor" href="#活跃的社区" aria-hidden="true">#</a> 活跃的社区</h3><p>还有一个很重要的特点是，国内的Go的社区十分的活跃，这对于Go在国内的普及起到了很大的作用。</p><h2 id="用go的优势" tabindex="-1"><a class="header-anchor" href="#用go的优势" aria-hidden="true">#</a> 用Go的优势</h2><p>先说一下我对Go语言的看法，我认为Go在服务器这块是非常有优势的。以后如果有高并发的应用场景，那么大概率这个服务就是用Go写的。不知道大家有没有发现，摩尔定律正在失效。近十年内，硬件的原始处理能力都没有太大的提升。显然，一味的增加晶体管的数量已经不是解决问题最好的方法。</p><p>NASA前不久发布到官网然后又迅速删掉的文章透露了，Google可能已经实现了量子霸权，通俗一点说就是拥有超越所有传统计算机的计算能力。而放置更多的晶体管的代价也越来越高，所以现在厂商都在向处理器中添加更多的内核来提升性能。</p><p>就像大家熟悉的Java，虽然Java本身支持多线程，但是在Java上使用多线程编程代码算是比较昂贵的。在Java中创建一个新的线程就会消耗接近1M左右的内存。假如你真的需要支持运行上千个线程，那么服务很可能运行着就OOM了。除了内存消耗外，还会存在由于支持多线程带来的并发和死锁等问题。</p><p>而Go中，使用协程来代替线程。而且一个协程所消耗的内存比线程少了很多倍。同样的物理设备限制，你可能只能启动最多几千个线程，而协程能够启动上百万个。而且不同的Goroutine可以通过信channel进行安全的通信。</p><h2 id="游戏服务器和web服务器的区别-1" tabindex="-1"><a class="header-anchor" href="#游戏服务器和web服务器的区别-1" aria-hidden="true">#</a> 游戏服务器和Web服务器的区别</h2><p>有些对游戏服务器的介绍可能会说，游戏服务器是一个需要长期运行的程序，然后怎么怎么样。我个人认为Web服务器一样的需要长期运行，也需要响应不定点不定时来自用户的请求。两者从宏观上来看其实没有本质的区别。同时Web服务器也会对于稳定性和性能有要求，游戏服一般分为大小服，我们这里都按照小服举例子。</p><h3 id="状态" tabindex="-1"><a class="header-anchor" href="#状态" aria-hidden="true">#</a> 状态</h3><p>首先要提到的就是状态。可能你会听说过一个概念，游戏服务器是有状态的，而Web服务器是无状态的。什么意思呢？Web服务器的数据流大多直接会到数据库中。而游戏服务器的数据流首先会到内存中，然后定期的写入数据库（落地）。</p><p>换句话说，游戏服务器本身的数据与数据库中的数据在运行期间会存在一个数据不一致的窗口。如果此时游戏服务器宕机了，那么就会造成数据首先到的内存数据与数据库存的数据不一致。</p><p>而Web服务器则不会有这样的问题，Web所有的数据状态都会落地，而且可以针对操作加上事务，不用担心因为操作失败而引入脏数据。正因为有了状态的约束，游戏服务器就会很慎重的使用内存、CPU。以求在资源有限的情况下，最大化的提高的承载量，并且降低服务延迟。当然，Web服务器会为了降低某个接口的响应时间而去做对应的优化。</p><h3 id="扩容" tabindex="-1"><a class="header-anchor" href="#扩容" aria-hidden="true">#</a> 扩容</h3><p>在Web服务器中，如果你不能评估一个服务所面临的压力，又不想因为瞬时的热点访问导致服务直接不可用的话，完全可以设置成自动扩容，因为每个服务只是单纯的接收请求，然后处理请求、返回结果，不会将数据保存在服务器的内存中。要有数据存到内存，那也是在Redis中。而Redis数据丢失对数据的一致性基本没有影响。</p><p>但是在游戏服务器这边很难做到像Web那样灵活。首先，数据的流向不是数据库，而是内存。</p><p>举个很简单的例子，玩家的主城被攻打着火了，如果有了自动扩容，很有可能在落地的窗口内，玩家再请求一次，请求到了另一个实例。主城又没有着火了。因为数据都会先存在内存中。</p><p>再举一个例子，玩家氪金买了一个礼包。然后退出游戏，落地窗口内再次上线没了。这就不是单纯的数据问题了，玩家这是花了真金白银买的道具，突然就没了，一两个还好处理，如果多个玩家都出现这样的问题，那这就属于严重的线上事故了。修复数据的工作量十分的大。</p><p>所以，对于一个游戏服务器，所能使用的内存和CPU的资源是非常有限的，不像Web服务器可以不用花很大的代价做到横向扩展。这也就是为什么游戏服务器会十分十分的注重代码的性能以及稳定性。</p><h3 id="稳定" tabindex="-1"><a class="header-anchor" href="#稳定" aria-hidden="true">#</a> 稳定</h3><p>就像上面说的例子，如果游戏服务器运行中出了BUG，导致服务直接不可用，或者说通过这个BUG刷到了大量的道具，将是一个非常严重的线上事故。</p><p>而对于Web服务器来说，如果是管理系统之类的，有可能会有脏数据值得一提的是，脏数据对于Web来说，排查起来也是一件很头疼的事情。如果没有脏数据，只是服务暂且不可用，而且如果用的是微服务架构，重启服务的代价是相对来说比较小的，只有正在重启的服务的业务是不可用的，其余的部分则可以正常的访问。</p><p>而对于游戏服务器来说，服务器重启影响的是全服的玩家。玩家在停服期间，甚至连游戏都进不了，特别的影响玩家体验。而且，如果停服之前服务器的数据落地出现了问题，服务重启之后会将数据从数据库load到内存中，此时同样会造成数据不一致的问题。</p><h3 id="性能" tabindex="-1"><a class="header-anchor" href="#性能" aria-hidden="true">#</a> 性能</h3><p>从我的经验来看，在做Web服务器的时候，没有为了减少GC的压力，为了少占用内存去做过多的优化。当然这是因为项目本身的体量不大，如果QPS很高的话，Web服务器同样很需要注重性能，只不过游戏服务器需要一直特别注意这个方面。</p><p>不过在Web，如果访问量很大的话导致单个服务不能扛住压力，大部分人首先想到的解决方案应该就是搞多个实例，毕竟可以做到很轻松的横向扩展。</p><p>在游戏服务器里，会把服务器的资源看的相当的宝贵。例如，能不落地的字段就绝对不要落地，某个字段的值可以通过已知的条件算出来的，就尽量不要定义在代码里。不过这也要看具体情况权衡运算量和调用的频率。因为上线之后，如果遇到了数据不一致，维护的数据越少，修复数据的难度就越小。</p><h3 id="严谨" tabindex="-1"><a class="header-anchor" href="#严谨" aria-hidden="true">#</a> 严谨</h3><p>这一点上来说，我认为是两者都很关注的一个重点。只不过，在游戏服务器的某些情况中，如果服务器抛出异常或者panic。其造成的后果会被游戏特殊的环境放大。</p><p>例如，召回你的在外部队失败了，那么部队就会一直在外面且不可用。这跟在浏览器中点一个按钮没有反应比起来，影响相对较小。而且使用微服务架构，在修复问题之后可以以很低的成本来重启对应的服务，而游戏服务器中还要修复一次数据。</p><p>再举一个很极端的例子，点击商店，玩家要准备氪金了。但是却发现进不了商店，也可能不能获取商品列表。这些会直接影响到游戏的体验，甚至收入。</p><p>而对于Web来说，服务器的稳定性同样很重要。不然根据业务的不同，造成后果的严重性也有可能不同。影响了用户体验，就会直接影响到产品的口碑。</p><h3 id="数据传输格式" tabindex="-1"><a class="header-anchor" href="#数据传输格式" aria-hidden="true">#</a> 数据传输格式</h3><p>熟悉Web的都知道，数据传输格式是JSON。而在游戏服务器中是Protobuf，是由Google开发的数据传输格式，与JSON类似。Protobuf是二进制的，二进制数据量会比JSON更小一点。而且，如果传输的字段是空值，就不会被传输。而JSON如果是空值，一样的也会被传输。</p><p>无论是在什么样的环境中，举个例子，Node.js和Java中，Protobuf的性能表现都比JSON好。在Java中，Protobuf甚至要比JSON快了接近80%。如果Java的服务之间通信有了性能瓶颈， 可以考虑服务之间使用RPC来通信。</p><p>但是凡事都具有两面性。Protobuf的缺点仍然存在：</p><ul><li>文档较少</li><li>社区与JSON的对比起来</li><li>可读性没有JSON好</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>以上就是这两个月以来，总结的两者的区别。只是从大体上做了一个对比，并没有具体深入细节。细节的话有可能会在以后单独的来介绍。</p>',65),i=[o];function p(n,t){return e(),h("div",null,i)}const s=a(d,[["render",p],["__file","230862.html.vue"]]);export{s as default};
