import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-c78d3c93.js";const e={},p=t(`<h1 id="go中使用seed得到重复随机数的问题" tabindex="-1"><a class="header-anchor" href="#go中使用seed得到重复随机数的问题" aria-hidden="true">#</a> Go中使用Seed得到重复随机数的问题</h1><h2 id="重复的随机数" tabindex="-1"><a class="header-anchor" href="#重复的随机数" aria-hidden="true">#</a> 重复的随机数</h2><p>废话不多说，首先我们来看使用seed的一个很神奇的现象。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 结果如下</span>
<span class="token comment">// 90</span>
<span class="token comment">// 90</span>
<span class="token comment">// 90</span>
<span class="token comment">// 90</span>
<span class="token comment">// 90</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可能不熟悉seed用法的看到这里会很疑惑，我不是都用了seed吗？为何我随机出来的数字都是一样的？不应该每次都不一样吗？</p><p>可能会有人说是你数据的样本空间太小了，OK，我们加大样本空间到10w再试试。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 结果如下</span>
<span class="token comment">// 84077</span>
<span class="token comment">// 84077</span>
<span class="token comment">// 84077</span>
<span class="token comment">// 84077</span>
<span class="token comment">// 84077</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你会发现结果仍然是一样的。简单的推理一下我们就能知道，在上面那种情况，每次都取到相同的随机数跟我们所取的样本空间大小是无关的。那么唯一有关的就是seed。我们首先得明确seed的用途。</p><h2 id="seed的用途" tabindex="-1"><a class="header-anchor" href="#seed的用途" aria-hidden="true">#</a> seed的用途</h2><p>在这里就不卖关子了，先给出结论。</p><p>上面每次得到相同随机数是因为在上面的循环中，每次操作的间隔都在毫秒级下，所以每次通过<code>time.Now().Unix()</code>取出来的时间戳都是同一个值，换句话说就是使用了同一个seed。</p><p>这个其实很好验证。只需要在每次循环的时候将生成的时间戳打印出来，你就会发现每次打印出来的时间戳都是一样的。</p><p>每次rand都会使用相同的seed来生成随机队列，这样一来在循环中使用相同seed得到的随机队列都是相同的，而生成随机数时每次都会去取同一个位置的数，所以每次取到的随机数都是相同的。</p><p>seed 只用于决定一个确定的随机序列。不管seed多大多小，只要随机序列一确定，本身就不会再重复。除非是样本空间太小。解决方案有两种：</p><ul><li>在全局初始化调用一次seed即可</li><li>每次使用纳秒级别的种子（强烈不推荐这种）</li></ul><h2 id="不用每次调用" tabindex="-1"><a class="header-anchor" href="#不用每次调用" aria-hidden="true">#</a> 不用每次调用</h2><p>上面的解决方案建议各位不要使用第二种，给出是因为在某种情况下的确可以解决问题。比如在你的服务中使用这个seed的地方是串行的，那么每次得到的随机序列的确会不一样。</p><p>但是如果在高并发下呢？你能够保证每次取到的还是不一样的吗？事实证明，在高并发下，即使使用UnixNano作为解决方案，同样会得到相同的时间戳，Go官方也不建议在服务中同时调用。</p><blockquote><p>Seed should not be called concurrently with any other Rand method.</p></blockquote><p>接下来会带大家了解一下代码的细节。想了解源码的可以继续读下去。</p><h2 id="源码解析-seed" tabindex="-1"><a class="header-anchor" href="#源码解析-seed" aria-hidden="true">#</a> 源码解析-seed</h2><h3 id="seed" tabindex="-1"><a class="header-anchor" href="#seed" aria-hidden="true">#</a> seed</h3><p>首先来看一下seed做了什么。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>rng <span class="token operator">*</span>rngSource<span class="token punctuation">)</span> <span class="token function">Seed</span><span class="token punctuation">(</span>seed <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rng<span class="token punctuation">.</span>tap <span class="token operator">=</span> <span class="token number">0</span>
	rng<span class="token punctuation">.</span>feed <span class="token operator">=</span> rngLen <span class="token operator">-</span> rngTap

	seed <span class="token operator">=</span> seed <span class="token operator">%</span> int32max
	<span class="token keyword">if</span> seed <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>  <span class="token comment">// 如果是负数，则强行转换为一个int32的整数</span>
		seed <span class="token operator">+=</span> int32max
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> seed <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span> <span class="token comment">// 如果seed没有被赋值，则默认给一个值</span>
		seed <span class="token operator">=</span> <span class="token number">89482311</span>
	<span class="token punctuation">}</span>

	x <span class="token operator">:=</span> <span class="token function">int32</span><span class="token punctuation">(</span>seed<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">20</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> rngLen<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		x <span class="token operator">=</span> <span class="token function">seedrand</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
		<span class="token keyword">if</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			<span class="token keyword">var</span> u <span class="token builtin">int64</span>
			u <span class="token operator">=</span> <span class="token function">int64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">40</span>
			x <span class="token operator">=</span> <span class="token function">seedrand</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
			u <span class="token operator">^=</span> <span class="token function">int64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">20</span>
			x <span class="token operator">=</span> <span class="token function">seedrand</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
			u <span class="token operator">^=</span> <span class="token function">int64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
			u <span class="token operator">^=</span> rngCooked<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
			rng<span class="token punctuation">.</span>vec<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> u
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，seed赋值了两个定义好的变量，<code>rng.tap</code>和<code>rng.feed</code>。<code>rngLen</code>和<code>rngTap</code>是两个常量。我们来看一下相关的常量定义。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	rngLen   <span class="token operator">=</span> <span class="token number">607</span>
	rngTap   <span class="token operator">=</span> <span class="token number">273</span>
	rngMax   <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">63</span>
	rngMask  <span class="token operator">=</span> rngMax <span class="token operator">-</span> <span class="token number">1</span>
	int32max <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由此可见，无论seed是否相同，这两个变量的值都不会受seed的影响。同时，seed的值会最终决定x的值，只要seed相同，则得到的x就相同。而且无论seed是否被赋值，只要检测到是零值，都会默认的赋值为<code>89482311</code>。</p><p>接下来我们再看seedrand。</p><h3 id="seedrand" tabindex="-1"><a class="header-anchor" href="#seedrand" aria-hidden="true">#</a> seedrand</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// seed rng x[n+1] = 48271 * x[n] mod (2**31 - 1)</span>
<span class="token keyword">func</span> <span class="token function">seedrand</span><span class="token punctuation">(</span>x <span class="token builtin">int32</span><span class="token punctuation">)</span> <span class="token builtin">int32</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> <span class="token punctuation">(</span>
		A <span class="token operator">=</span> <span class="token number">48271</span>
		Q <span class="token operator">=</span> <span class="token number">44488</span>
		R <span class="token operator">=</span> <span class="token number">3399</span>
	<span class="token punctuation">)</span>

	hi <span class="token operator">:=</span> x <span class="token operator">/</span> Q 	  <span class="token comment">// 取除数</span>
	lo <span class="token operator">:=</span> x <span class="token operator">%</span> Q 	  <span class="token comment">// 取余数</span>
	x <span class="token operator">=</span> A<span class="token operator">*</span>lo <span class="token operator">-</span> R<span class="token operator">*</span>hi <span class="token comment">// 通过公式重新给x赋值</span>
	<span class="token keyword">if</span> x <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		x <span class="token operator">+=</span> int32max <span class="token comment">// 如果x是负数，则强行转换为一个int32的正整数</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> x
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出，只要传入的x相同，则最后输出的x一定相同。进而最后得到的随机序列<code>rng.vec</code>就相同。</p><p>到此我们验证我们最开始给出的结论，即<strong>只要每次传入的seed相同，则生成的随机序列就相同</strong>。验证了这个之后我们再继续验证为什么每次取到的随机序列的值都是相同的。</p><h2 id="源码解析-intn" tabindex="-1"><a class="header-anchor" href="#源码解析-intn" aria-hidden="true">#</a> 源码解析-Intn</h2><p>首先举个例子，来直观的描述上面提到的问题。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">printRandom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 结果</span>
<span class="token comment">// 81</span>
<span class="token comment">// 87</span>
<span class="token comment">// 81</span>
<span class="token comment">// 87</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设<code>printRandom</code>是一个单独的Go文件，那么你无论run多少次，每次打印出来的随机序列都是一样的。通过阅读seed的源码我们知道，这是因为生成了相同的随机序列。那么为什么会每次都取到同样的值呢？不说废话，我们一层一层来看。</p><h3 id="intn" tabindex="-1"><a class="header-anchor" href="#intn" aria-hidden="true">#</a> Intn</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>Rand<span class="token punctuation">)</span> <span class="token function">Intn</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> n <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;invalid argument to Intn&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token number">31</span><span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">int</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Int31n</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">int</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Int63n</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，如果n小于等于0，就会直接panic。其次，会根据传入的数据类型，返回对应的类型。</p><p>虽然说这里调用分成了Int31n和Int63n，但是往下看的你会发现，其实都是调用的r.Int63()，只不过在返回64位的时候做了一个右移的操作。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// r.Int31n的调用</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>Rand<span class="token punctuation">)</span> <span class="token function">Int31</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int32</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">int32</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Int63</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">32</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token comment">// r.Int63n的调用</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>Rand<span class="token punctuation">)</span> <span class="token function">Int63</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int64</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> r<span class="token punctuation">.</span>src<span class="token punctuation">.</span><span class="token function">Int63</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="int63" tabindex="-1"><a class="header-anchor" href="#int63" aria-hidden="true">#</a> Int63</h3><p>先给出这个函数的相关代码。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 返回一个非负的int64伪随机数.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>rng <span class="token operator">*</span>rngSource<span class="token punctuation">)</span> <span class="token function">Int63</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int64</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">int64</span><span class="token punctuation">(</span>rng<span class="token punctuation">.</span><span class="token function">Uint64</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> rngMask<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>rng <span class="token operator">*</span>rngSource<span class="token punctuation">)</span> <span class="token function">Uint64</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">uint64</span> <span class="token punctuation">{</span>
	rng<span class="token punctuation">.</span>tap<span class="token operator">--</span>
	<span class="token keyword">if</span> rng<span class="token punctuation">.</span>tap <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		rng<span class="token punctuation">.</span>tap <span class="token operator">+=</span> rngLen
	<span class="token punctuation">}</span>

	rng<span class="token punctuation">.</span>feed<span class="token operator">--</span>
	<span class="token keyword">if</span> rng<span class="token punctuation">.</span>feed <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		rng<span class="token punctuation">.</span>feed <span class="token operator">+=</span> rngLen
	<span class="token punctuation">}</span>

	x <span class="token operator">:=</span> rng<span class="token punctuation">.</span>vec<span class="token punctuation">[</span>rng<span class="token punctuation">.</span>feed<span class="token punctuation">]</span> <span class="token operator">+</span> rng<span class="token punctuation">.</span>vec<span class="token punctuation">[</span>rng<span class="token punctuation">.</span>tap<span class="token punctuation">]</span>
	rng<span class="token punctuation">.</span>vec<span class="token punctuation">[</span>rng<span class="token punctuation">.</span>feed<span class="token punctuation">]</span> <span class="token operator">=</span> x
	<span class="token keyword">return</span> <span class="token function">uint64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，无论是int31还是int63，最终都会进入<code>Uint64</code>这个函数中。而在这两个函数中，这两个变量的值显得尤为关键。因为直接决定了最后得到的随机数，这两个变量的赋值如下。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>rng<span class="token punctuation">.</span>tap <span class="token operator">=</span> <span class="token number">0</span>
rng<span class="token punctuation">.</span>feed <span class="token operator">=</span> rngLen <span class="token operator">-</span> rngTap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>tap的值是常量0，而feed的值决定于rngLen和rngTap，而这两个变量的值也是一个常量。如此，每次从随机队列中取到的值都是确定的两个值的和。</p><p>到这，我们也验证了<strong>只要传入的seed相同，并且每次都调用seed方法，那么每次随机出来的值一定是相同的</strong>。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2><p>首先评估是否需要使用seed，其次，使用seed只需要在全局调用一次即可，如果多次调用则有可能取到相同随机数。</p>`,50),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","230860.html.vue"]]);export{d as default};
