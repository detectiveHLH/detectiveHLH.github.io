import{_ as t,r as p,o as c,c as o,a as n,b as s,d as l,f as a}from"./app-3507ce1f.js";const i="/images/230850/select-preview.jpeg",u="/images/230850/io-event.jpeg",k="/images/230850/selection-key-group.jpeg",r="/images/230850/server-socket-channel.jpeg",d={},v=a('<h1 id="java-nio-selector-的使用" tabindex="-1"><a class="header-anchor" href="#java-nio-selector-的使用" aria-hidden="true">#</a> Java NIO Selector 的使用</h1><p>之前的文章已经把 Java 中 NIO 的 Buffer、Channel 讲解完了，不太了解的可以先回过头去看看。这篇文章我们就来聊聊 Selector —— 选择器。</p><p>首先 Selector 是用来干嘛的呢？不熟悉这个概念的话我们其实可以这么理解：</p><figure><img src="'+i+'" alt="selector" tabindex="0" loading="lazy"><figcaption>selector</figcaption></figure><p>把它当作 SQL 中的 <code>select</code> 语句，在 SQL 中无非就是筛选出符合条件的结果集合。而 NIO 中的 Selector 用途类似，只不过它选择出来的是<strong>有就绪 IO 事件的 Channel</strong>。</p><p>IO 事件代表了 Channel 对于不同的 IO 操作所处的不同的状态，而不是对 Channel 进行 IO 操作。总共有 4 种 IO 事件的定义：</p><ul><li><code>OP_READ</code> 可读</li><li><code>OP_WRITE</code> 可写</li><li><code>OP_CONNECT</code> 连接</li><li><code>OP_ACCEPT</code> 接收</li></ul><figure><img src="'+u+'" alt="IO 事件分类" tabindex="0" loading="lazy"><figcaption>IO 事件分类</figcaption></figure><p>比如 <code>OP_READ</code>，其就绪是指数据已经在内核态 Ready 了并且已经从内核态复制到了用户态的缓冲区，然后我们的应用程序就可以去读取数据了，这叫<strong>可读</strong>。</p><p>再比如 <code>OP_CONNECT</code>，当某个 Channel 已经完成了握手连接，则 Channel 就会处于 <code>OP_CONNECT</code> 的状态。</p>',10),m={href:"https://mp.weixin.qq.com/s/OJRybC7uamkkizPcfPoC7w",target:"_blank",rel:"noopener noreferrer"},b=a(`<p>在之前讲 BIO 模型的时候说过，用户态在发起 read 系统调用之后会一直阻塞，直到数据在内核态 Ready 并且复制到用户态的缓冲区内。如果只有一个用户还好，随便你阻塞多久。但要是这时有其他用户发请求进来了，就会一直卡在这里等待。这样串行的处理会导致系统的效率极其低下。</p><p>针对这个问题，也是有解决方案的。那就是为每个用户都分配一个线程（即 <strong>Connection Per Thread</strong>），乍一想这个思路可能没问题，但使用线程需要消耗系统的资源，例如在 JVM 中一个线程会占用较多的资源，非常昂贵。系统稍微并发多一些（例如上千），你的系统就会直接 OOM 了。而且，线程频繁的创建、销毁、切换也是一个比较耗时的操作。</p><p>而如果用 NIO，虽然不会阻塞了，但是会一直轮询，让 CPU <strong>空转</strong>，也是一个<strong>不环保</strong>的方式。</p><p>而如果用 Selector，<strong>只需要一个线程</strong>来监听多个 Channel，而这个<strong>多个</strong>可以上千、上万甚至更多。那这些 Channel 是怎么跟 Selector 关联上的呢？</p><p>答案是通过<strong>注册</strong>，因为现在变成了 Selector 决定什么时候处理 Channel 中的事件，而注册操作则相当于将 Channel 的<strong>控制权转交</strong>给了 Selector。一旦注册上了，后续当 Channel 有就绪的 IO 事件，Selector 就会将它们<em>选择</em>出来执行对应的操作。</p><p>说了这么多，来看个例子吧，客户端的代码相对简单，后续再看，我们先看服务端的：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建 selector, 管理多个 channel</span>
  <span class="token class-name">Selector</span> selector <span class="token operator">=</span> <span class="token class-name">Selector</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 创建 ServerSocketChannel 并且绑定端口</span>
  <span class="token class-name">ServerSocketChannel</span> serverSocketChannel <span class="token operator">=</span> <span class="token class-name">ServerSocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  serverSocketChannel<span class="token punctuation">.</span><span class="token function">configureBlocking</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  serverSocketChannel<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 将 channel 注册到 selector 上</span>
  <span class="token class-name">SelectionKey</span> serverSocketChannelKey <span class="token operator">=</span> serverSocketChannel<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>selector<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 由于总共有 4 种事件, 分别是 accept、connect、read 和 write,</span>
  <span class="token comment">// 分别代表有连接请求时触发、客户端建立连接时触发、可读事件、可写事件</span>
  <span class="token comment">// 我们可以使用 interestOps 来表明只处理有连接请求的事件</span>
  serverSocketChannelKey<span class="token punctuation">.</span><span class="token function">interestOps</span><span class="token punctuation">(</span><span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_ACCEPT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;serverSocketChannel %s\\n&quot;</span><span class="token punctuation">,</span> serverSocketChannelKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 没有事件发生, 线程会阻塞; 有事件发生, 就会让线程继续执行</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;start to select...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    selector<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 换句话说, 有连接过来了, 就会继续往下走</span>

    <span class="token comment">// 通过 selectedKeys 包含了所有发生的事件, 可能会包含 READ 或者 WRITE</span>
    <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectionKey</span><span class="token punctuation">&gt;</span></span> iterator <span class="token operator">=</span> selector<span class="token punctuation">.</span><span class="token function">selectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>iterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">SelectionKey</span> key <span class="token operator">=</span> iterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;selected key %s\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// 这里需要进行事件区分</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">isAcceptable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;get acceptable event&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 触发此次事件的 channel, 拿到事件一定要处理, 否则会进入非阻塞模式, 空转占用 CPU</span>
        <span class="token comment">// 例如你可以使用 key.cancel()</span>
        <span class="token class-name">ServerSocketChannel</span> channel <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ServerSocketChannel</span><span class="token punctuation">)</span> key<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SocketChannel</span> socketChannel <span class="token operator">=</span> channel<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        socketChannel<span class="token punctuation">.</span><span class="token function">configureBlocking</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 这个 socketChannel 也需要注册到 selector 上, 相当于把控制权交给 selector</span>
        <span class="token class-name">SelectionKey</span> socketChannelKey <span class="token operator">=</span> socketChannel<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>selector<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        socketChannelKey<span class="token punctuation">.</span><span class="token function">interestOps</span><span class="token punctuation">(</span><span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_READ</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;get socketChannel %s\\n&quot;</span><span class="token punctuation">,</span> socketChannel<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">isReadable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;get readable event&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">SocketChannel</span> channel <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SocketChannel</span><span class="token punctuation">)</span> key<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ByteBuffer</span> buf <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        channel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        buf<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ByteBufferUtil</span><span class="token punctuation">.</span><span class="token function">debugRead</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        key<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      
      iterator<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看起来有点多，但相应的注释都写了，可以先看看。其实这里的很多代码跟之前的玩转 Channel 的代码差不多的，这里抽一些我认为值得讲的解释一下。</p><p>首先就是 <code>Selector.open()</code>，跟 Channel 的 open 方法类似，可以理解为创建一个 selector。</p><p>其次就是 <code>SelectionKey serverSocketChannelKey = serverSocketChannel.register(selector, 0);</code> 了，我们调用了 serverSocketChannel 的注册方法之后，返回了一个 SelectionKey，这是个什么概念呢？</p><blockquote><p>说简单点，你可以把 SelectionKey 理解为你去商场寄存柜存东西，那个机器吐给你的<strong>提取凭证</strong></p></blockquote><p>换句话说，这个 SelectionKey 就是当前这个 serverSocketChannel 注册到 selector 上的<strong>凭证</strong>。selector 会维护一个 SelectionKey 的集合，用于统一管理。</p><figure><img src="`+k+`" alt="selectionkey 集合" tabindex="0" loading="lazy"><figcaption>selectionkey 集合</figcaption></figure><p>上图中的每个 Key 都代表了一个具体的 Channel。</p><p>而至于 register 的第二个参数，我们传入的是 0，代表了当前 Selector 需要关注这个 Channel 的哪些 IO 事件。0 代表<strong>不关注任何事件</strong>，我们这里是通过 <code>serverSocketChannelKey.interestOps(SelectionKey.OP_ACCEPT);</code> 来告诉 Selector，对这个 Channel 只关注 OP_ACCEPT 事件。</p><p>IO 事件有 4 个，如果你想要同时监听多个 IO 事件怎么办呢？答案是通过或运算符。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>serverSocketChannelKey<span class="token punctuation">.</span><span class="token function">interestOps</span><span class="token punctuation">(</span><span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_ACCEPT</span> <span class="token operator">|</span> <span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_READ</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面说过，NIO 虽然不阻塞，但会一直轮询占用 CPU 的资源，而 Selector 解决了这个问题。在调用完 <code>selector.select();</code> 之后，线程会在这里阻塞，而不会像 NIO 一样<strong>疯狂轮询，把 CPU 拉满</strong>。所以 Selector 只会在有事件处理的时候才执行，其余时间都会阻塞，极大的减少了 CPU 资源的占用。</p><p>当客户端调用 <code>connect</code> 发起连接之后，Channel 就会处于 <code>OP_CONNECT</code> 就绪状态，<code>selector.select();</code> 就不会再阻塞，会继续往下运行，即：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectionKey</span><span class="token punctuation">&gt;</span></span> iterator <span class="token operator">=</span> selector<span class="token punctuation">.</span><span class="token function">selectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 selectedKeys 这个名字也能看出来，表示被选出来的 SelectionKey。上面我们已经讨论过 Selector 维护的一种集合 —— SelectionKey 集合，接下来我们再讨论另外一种集合 —— SelectedKey 集合。</p><figure><img src="`+r+`" alt="selectedkey 集合" tabindex="0" loading="lazy"><figcaption>selectedkey 集合</figcaption></figure><p>当 Channel 有就绪 IO 事件之后，对应的 Key 就会被加入到 SelectedKey 集合中，然后这一次 While 循环会依次处理被选择出来的所有 Key。</p><p>但被选择出来的 Key 可能触发的是不同的 IO 事件，所以我们需要对 Key 进行区分。代码里区分了 OP_ACCEPT 和 OP_READ，分别讨论一下。</p><p>ServerSocketChannel 一开始 register 的时候只设定关注 OP_ACCEPT 事件，所以第一次循环只会进入 IsAcceptable 分支里，所以这里通过 <code>iterator.next()</code> 迭代器拿到的 SelectionKey 就是 serverSocketChannel 注册之后返回的 Key，同理拿到的 channel 的就是最开始调用 <code>ServerSocketChannel.open();</code> 创建的 channel。</p><p>拿到了 ServerSocketChannel 我们就可以调用其 <code>accept()</code> 方法来处理建立连接的请求了，这里值得注意的是，建立连接之后，这个 SocketChannel 也需要注册到 Selector 上去，因为这些 SocketChannel 也需要将<strong>控制权交给 Selector</strong>，这样后续有就绪 IO 事件才能通过 Selector 处理。这里我们对这个 SocketChannel 只关注 OP_READ 事件。相当于把后续进来的所有的连接和 Selector 就关联上了。</p><p>Accept 事件处理成功之后，服务器这边会继续循环，然后再次在 <code>selector.select();</code> 处阻塞住。</p><p>客户端这边会继续调用 write 方法向 channel 写入数据，数据 Ready 之后就会触发 OP_READ 事件，然后继续往下走，这次由于事件是 OP_READ 所以会进入 <code>key.isReadable()</code> 这个分支。进入这个分支之后会获取到对应的 SocketChannel，并从其中读取客户端发来的数据。</p><p>而另一个值得关注的是 <code>iterator.remove();</code>，每次迭代都需要把当前处理的 SelectedKey 移除，这是为什么呢？</p><p>因为对应的 Key 进入了 SelectedKey 集合之后，不会被 NIO 里的机制给移除。如果我们不去移除，那么下一次调用 <code>selector.selectedKeys().iterator();</code> 会发现，上次处理的有 OP_ACCEPT 事件的 SelectionKey 还在，而这会导致上面的服务端程序抛出空指针异常。</p><blockquote><p>大家可以自行将 <code>iterator.remove();</code> 注释掉再试试</p></blockquote><p>客户端的代码很简单，就直接给出来了：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token class-name">SocketChannel</span> socketChannel <span class="token operator">=</span> <span class="token class-name">SocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  socketChannel<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  socketChannel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不去移除的话，服务端会在下面这行 NPE。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>socketChannel<span class="token punctuation">.</span><span class="token function">configureBlocking</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为啥呢？因为此时 SelectionKey 虽然还在，ServerSocketChannel 也能拿到，但调用 <code>channel.accept();</code> 的时候，并没有客户端真正在发起连接（上一个循环已经处理过真正的连接请求了，只是没有将这个 Key 从 SelectedKey 中移除）。所以 <code>channel.accept();</code> 会返回一个 null，我们再对 null 调用 configureBlocking 方法，自然而然就 NPE 了。</p>`,36);function g(f,h){const e=p("ExternalLinkIcon");return c(),o("div",null,[v,n("blockquote",null,[n("p",null,[s("对用户态和内核态不了解的，可以去看看之前写的 "),n("a",m,[s("《用户态和内核态的区别》"),l(e)])])]),b])}const y=t(d,[["render",g],["__file","230850.html.vue"]]);export{y as default};
