import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as o,a as s,b as n,d as l,f as a}from"./app-c78d3c93.js";const i="/images/230849/channel-category.jpeg",u="/images/230849/prepare-file.jpeg",r="/images/230849/img-1.gif",k="/images/230849/generate-file.jpeg",d="/images/230849/img-2.gif",m="/images/230849/img-3.gif",v="/images/230849/random-access-file.jpeg",f="/images/230849/send-data-through-socket-channel.jpeg",b={},h=a('<h1 id="java-nio-channel-使用" tabindex="-1"><a class="header-anchor" href="#java-nio-channel-使用" aria-hidden="true">#</a> Java NIO Channel 使用</h1><p>Java NIO 中的 Channel 分类：</p><ul><li>FileChannel</li><li>SocketChannel</li><li>ServerSocketChannel</li><li>DatagramChannel</li></ul><figure><img src="'+i+'" alt="channel 分类" tabindex="0" loading="lazy"><figcaption>channel 分类</figcaption></figure><p>FileChannel: 主要用于文件的读写，可以从磁盘上读取文件，也可以向磁盘上写入文件。</p><p>SocketChannel：用于 Socket 的 TCP 连接的数据读写，既可以从 Channel 读数据，也可以向 Channle 中写入数据</p><p>ServerSocketChannel：通过 ServerSocketChannel 可以监听 TCP 连接，服务端监听到连接之后，会为每个请求创建一个 SocketChannel</p><p>DatagramChannel：用于 UDP 协议的数据读写</p><p>接下来就分别介绍一下。</p><h2 id="filechannel" tabindex="-1"><a class="header-anchor" href="#filechannel" aria-hidden="true">#</a> FileChannel</h2><p>主要用于操作文件，废话不多说，直接看例子。</p><blockquote><p>准备文件 <code>test-file.txt</code> ，内容 <code>shDEQuanZhanBiJi</code></p></blockquote><figure><img src="'+u+`" alt="test-file.txt 文件" tabindex="0" loading="lazy"><figcaption>test-file.txt 文件</figcaption></figure><h3 id="输入-fileinputstream" tabindex="-1"><a class="header-anchor" href="#输入-fileinputstream" aria-hidden="true">#</a> 输入 FileInputStream</h3><p>用于从 FileChannel 中读取数据，例如将指定文件输入到 FileChannel 中，我们就能获取到文件的内容，接下来编写 FileChannel 的 <strong>输入流</strong> 核心代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建一个输入流</span>
  <span class="token class-name">FileInputStream</span> fileInputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;test-file.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 通过输入流获取到 channel</span>
  <span class="token class-name">FileChannel</span> fileChannel <span class="token operator">=</span> fileInputStream<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 准备好 ByteBuffer</span>
  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 将 输入流 的 channel 的数据读入 buffer 中</span>
  fileChannel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 简单打印 buffer 的内容</span>
  <span class="token function">printBuffer</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// shDEQuanZhanBiJi</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里面的 ByteBuffer 是 channel 进行读、写数据的中间媒介。要从 channel 中读取数据（也就是上面这个例子），需要先将数据读到 ByteBuffer 中；同理，要想向 channel 中写入数据，也需要先将数据写入 ByteBuffer（下面讲输出流的时候会讲）。</p>`,17),g={href:"https://mp.weixin.qq.com/s/cCPOlCD_74zqpsOLoBCuCQ",target:"_blank",rel:"noopener noreferrer"},y=s("code",null,"printBuffer",-1),B=a(`<h3 id="输出-fileoutputstream" tabindex="-1"><a class="header-anchor" href="#输出-fileoutputstream" aria-hidden="true">#</a> 输出 FileOutputStream</h3><p>顾名思义，是 FileChannel 要向外输出数据，例如将数据写入到磁盘文件上，接下来通过例子看看效果：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token comment">// 指定需要生成的文件名称</span>
  <span class="token class-name">String</span> generateFileName <span class="token operator">=</span> <span class="token string">&quot;generate-file.txt&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// 创建一个输出流</span>
  <span class="token class-name">FileOutputStream</span> fileOutputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>generateFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 通过输出流获取到 channel</span>
  <span class="token class-name">FileChannel</span> fileChannel <span class="token operator">=</span> fileOutputStream<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 准备好 ByteBuffer, 并向里面写入数据</span>
  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;shDEQuanZhanBiJi&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 将 输入流 的 channel 的数据读入 buffer 中</span>
  fileChannel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  fileChannel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相应的注释都已经贴在对应的代码上了，细节在此不再赘述。唯一需要关注的是，调用 <code>write</code> 写文件到磁盘上时，也是先传入的 ByteBuffer。</p><p>好了，当你运行完代码你会发现，虽然文件是生成的了，但是里面却是空白的...这其实就涉及到对 ByteBuffer 的熟悉程度了，算是埋的一个坑。</p><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果不知道为啥文件是空的，可以去看看上面讲 ByteBuffer 的文章，接下来是解答。</p><p>这是因为我们创建一个 ByteBuffer 的时候默认是处于<strong>写模式</strong>的，此时如果去通过 <strong>position</strong> 和 <strong>limit</strong> 去读取数据是读不到的。所以在调用 <code>write</code> 之前，我们需要先将 ByteBuffer 切换到读模式，完整代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token comment">// 指定需要生成的文件名称</span>
  <span class="token class-name">String</span> generateFileName <span class="token operator">=</span> <span class="token string">&quot;generate-file.txt&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// 创建一个输出流</span>
  <span class="token class-name">FileOutputStream</span> fileOutputStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>generateFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 通过输出流获取到 channel</span>
  <span class="token class-name">FileChannel</span> fileChannel <span class="token operator">=</span> fileOutputStream<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 准备好 ByteBuffer, 并向里面写入数据</span>
  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;shDEQuanZhanBiJi&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 将 ByteBuffer 切换到读模式</span>
  buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 将 输入流 的 channel 的数据读入 buffer 中</span>
  fileChannel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  fileChannel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，文件生成了，内容也有了：</p><figure><img src="`+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但是呢，上面将的两种要么只能写，要么只能读。例如 <code>FileInputStream</code> 如果你硬要往 channel 里怼数据，程序最后会抛出 <code>NonWritableChannelException</code> 异常，告诉你这玩意儿写不了。</p><figure><img src="'+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>那有没有一个既能写，又能读<s>还能唱跳</s>的实现呢？当然有，那就是 <code>RandomAccessFile</code>。</p><blockquote><p>这里提一嘴，调用完 write 并不是立即就写入磁盘，也可以在操作系统的缓存里。如果需要立即刷盘，则调用 <code>channel.force(true);</code> 即可。</p></blockquote><h3 id="randomaccessfile" tabindex="-1"><a class="header-anchor" href="#randomaccessfile" aria-hidden="true">#</a> RandomAccessFile</h3><p>怎么用的呢？其实跟之前两个差不多：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token comment">// 指定需要生成的文件名称</span>
  <span class="token class-name">String</span> targetFileName <span class="token operator">=</span> <span class="token string">&quot;target-file.txt&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// 创建 RandomAccessFile, 赋予可读(r)、可写(w)的权限</span>
  <span class="token class-name">RandomAccessFile</span> accessFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RandomAccessFile</span><span class="token punctuation">(</span>targetFileName<span class="token punctuation">,</span> <span class="token string">&quot;rw&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">FileChannel</span> fileChannel <span class="token operator">=</span> accessFile<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 创建 ByteBuffer 并写入数据</span>
  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;shDEQuanZhanBiJi&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 切换到 buffer 的读模式</span>
  buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 调用 write 将 buffer 的数据写入到 channel, channel 再写数据到磁盘文件</span>
  fileChannel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 相当于清空 buffer</span>
  buffer<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 将之前写入到 channel 的数据再读入到 buffer</span>
  fileChannel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 打印 buffer 中的内容</span>
  <span class="token function">printBuffer</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

  fileChannel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行之后的效果就是，会生成一个名为 <code>target-file.txt</code> 的文件，内容就是 <code>shDEQuanZhanBiJi</code>。并且控制台会将之前写入 channel 的 <code>shDEQuanZhanBiJi</code> 打印出来。</p><p>老规矩，细节都在注释中。值得注意的是 <code>new RandomAccessFile(targetFileName, &quot;rw&quot;);</code> 里的 <code>rw</code> 。注释里也写了，代表赋予可读、可写的权限。</p><p>再值得注意的是，你不能说把 <code>rw</code> 改成 <code>w</code>。</p><figure><img src="`+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>不能这么玩，因为它就是一个单纯的字符串匹配，可供选择的就这么些：</p><figure><img src="'+v+'" alt="mode 类型" tabindex="0" loading="lazy"><figcaption>mode 类型</figcaption></figure><p>可以看到，<code>r</code> 必不可少...：</p><ul><li><code>r</code> 只能读</li><li><code>rw</code> 既能<strong>读</strong>，也能<strong>写</strong></li><li><code>rws</code> 和 <code>rwd</code> 功能和 <code>rw</code> 大致是相同的，可读、可写。唯一区别是他们会将每次改动强制刷到磁盘，并且 <code>rws</code> 会将操作系统对该文件的元数据也一起刷盘，体现就是文件的更新时间会更新，而 <code>rwd</code> 不会将文件的元数据刷盘</li></ul><h2 id="两个-socketchannel" tabindex="-1"><a class="header-anchor" href="#两个-socketchannel" aria-hidden="true">#</a> 两个 SocketChannel</h2><p>由于这俩一个负责连接传输，另一个负责连接的监听，所以就放在一起来讲了。这一小节我们大概要做这件事：</p><figure><img src="'+f+`" alt="客户端发送文件到服务器" tabindex="0" loading="lazy"><figcaption>客户端发送文件到服务器</figcaption></figure><p>但是为了能让大家直接运行起来，客户端这侧就不从磁盘文件读取了，直接用 ByteBuffer。大家可以运行起来之后，自己尝试从磁盘上去加载。还是先看代码，首先是服务器的：</p><h3 id="serversocketchannel" tabindex="-1"><a class="header-anchor" href="#serversocketchannel" aria-hidden="true">#</a> ServerSocketChannel</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token comment">// 打开一个 ServerSocketChannel</span>
  <span class="token class-name">ServerSocketChannel</span> serverSocketChannel <span class="token operator">=</span> <span class="token class-name">ServerSocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 绑定 8080 端口</span>
  serverSocketChannel<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 开始接受客户端连接</span>
  <span class="token class-name">SocketChannel</span> socketChannel <span class="token operator">=</span> serverSocketChannel<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 获取连接成功</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;socketChannel %s connected\\n&quot;</span><span class="token punctuation">,</span> socketChannel<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 准备 ByteBuffer 以从 socketChannel 中读取数据</span>
  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 开始读取数据</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;before read&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> read <span class="token operator">=</span> socketChannel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;read complete, read bytes length: %s \\n&quot;</span><span class="token punctuation">,</span> read<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">printBuffer</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们使用的是 Java NIO 中默认的阻塞模式，仅仅作为一个掩饰，如果想要 ServerSocketChannel 进入<strong>非阻塞模式</strong>，可在 <code>open</code> 之后，调用:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>serverSocketChannel<span class="token punctuation">.</span><span class="token function">configureBlocking</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于我们这里是<strong>阻塞模式</strong>，所以在代码运行到 <code>serverSocketChannel.accept();</code> 时，会陷入<strong>阻塞状态</strong>，直到有客户端过来建立连接。同理，<code>read</code> 方法也是<strong>阻塞的</strong>，如果客户端一直没有写入数据，那么服务器就会一直阻塞在 <code>read</code> 。</p><h3 id="socketchannel" tabindex="-1"><a class="header-anchor" href="#socketchannel" aria-hidden="true">#</a> SocketChannel</h3><p>直接先给代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token comment">// 打开一个 SocketChannel</span>
  <span class="token class-name">SocketChannel</span> socketChannel <span class="token operator">=</span> <span class="token class-name">SocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 连接到 localhost 的 8080 端口</span>
  socketChannel<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 准备 ByteBuffer</span>
  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">Charset</span><span class="token punctuation">.</span><span class="token function">defaultCharset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 将 buffer 切换成读模式 &amp; 向 channel 中写入数据</span>
  buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  socketChannel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先启动服务器，再启动客户端。可以看到服务器侧的控制台有如下的输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>socketChannel java.nio.channels.SocketChannel[connected local=/127.0.0.1:8080 remote=/127.0.0.1:64373] connected
before read
read complete, read bytes length: 4 
BUFFER VALUE: test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="datagram" tabindex="-1"><a class="header-anchor" href="#datagram" aria-hidden="true">#</a> Datagram</h2><p>这个就比较简单，首先是客户端的代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token class-name">DatagramChannel</span> datagramChannel <span class="token operator">=</span> <span class="token class-name">DatagramChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 构建 buffer 数据</span>
  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">Charset</span><span class="token punctuation">.</span><span class="token function">defaultCharset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 切换到 buffer 的读模式</span>
  buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  datagramChannel<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后是服务器：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
  <span class="token class-name">DatagramChannel</span> datagramChannel <span class="token operator">=</span> <span class="token class-name">DatagramChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  datagramChannel<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  datagramChannel<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">printBuffer</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45);function C(w,S){const e=p("ExternalLinkIcon");return c(),o("div",null,[h,s("blockquote",null,[s("p",null,[n("对 ByteBuffer 不熟悉的可以先看看我之前写的"),s("a",g,[n("《玩转 ByteBuffer》"),l(e)]),n("，"),y,n(" 的代码里面也有")])]),B])}const q=t(b,[["render",C],["__file","230849.html.vue"]]);export{q as default};
