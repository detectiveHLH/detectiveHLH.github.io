import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as p}from"./app-e58d90a2.js";const e={},t=p(`<h1 id="【简单了解系列】从基础的使用来深挖hashmap" tabindex="-1"><a class="header-anchor" href="#【简单了解系列】从基础的使用来深挖hashmap" aria-hidden="true">#</a> 【简单了解系列】从基础的使用来深挖HashMap</h1><h2 id="hashmap定义" tabindex="-1"><a class="header-anchor" href="#hashmap定义" aria-hidden="true">#</a> HashMap定义</h2><p>说的专业一点，HashMap是常用的用于存储key-value键值对数据的一个<strong>集合</strong>，底层是基于对<strong>Map</strong>的接口实现。每一个键值对又叫<strong>Entry</strong>，这些<strong>Entry</strong>分散的存储在一个由<strong>数组和链表</strong>组成的集合中。当然在Java8中，Entry变成了<strong>Node</strong>。</p><blockquote><p>说的通俗一点，就像你去住酒店，你下单提供了你的手机号，然后到酒店了给你一个房卡，你知道了你的房号之后再根据这个房号去找对应的房间一样。</p><p>房号就是key，房间里就是value。你通过手机号下单到酒店给你房号可以理解为对key哈希的过程。你找的过程就是HashMap根据key取到对应value的过程</p></blockquote><h2 id="hashmap底层结构" tabindex="-1"><a class="header-anchor" href="#hashmap底层结构" aria-hidden="true">#</a> HashMap底层结构</h2><h3 id="table数组" tabindex="-1"><a class="header-anchor" href="#table数组" aria-hidden="true">#</a> table数组</h3><p>首先我们要知道，我们存在HashMap中的数据最终是存了什么地方，就是如下的结构。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>transient HashMap.Node<span class="token operator">&lt;</span>K, V<span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span> table<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可能有人看到transient有些陌生，被这个关键字修饰的变量将不会被序列化。简单来说，就是序列化之后这个字段的值就会被干掉，用于一些不需要传递给第三方的字段。</p><blockquote><p>例如一个矩形，在本地使用的时候，有长、宽和面积三个属性，但是你要把这个对象给第三方用，但是由于面积可以通过另外两个属性推导出来，这个key就不需要传递给第三方了。</p><p>这种情况就可以用transient关键字修饰。总的来说就是，被transient修饰的变量将不再参与序列化。</p></blockquote><h3 id="node节点" tabindex="-1"><a class="header-anchor" href="#node节点" aria-hidden="true">#</a> Node节点</h3><p>下面是Node节点的定义。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> hash<span class="token punctuation">;</span>
        <span class="token keyword">final</span> <span class="token class-name">K</span> key<span class="token punctuation">;</span>
        <span class="token class-name">V</span> value<span class="token punctuation">;</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">;</span>

        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> hash<span class="token punctuation">,</span> <span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>hash <span class="token operator">=</span> hash<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
				
  			<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

        <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> value<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
  
        <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">setValue</span><span class="token punctuation">(</span><span class="token class-name">V</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">V</span> oldValue <span class="token operator">=</span> value<span class="token punctuation">;</span>
            value <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
            <span class="token keyword">return</span> oldValue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
  
  			<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码省略了一些<strong>Getter</strong>和<strong>Setter</strong>，结构还是非常清晰和简单。可以看到这个节点存储了下一个节点的对象的引用，形成了一个链表的结构。</p><p>为什么要用链表？用数组不行吗？刚刚上面提到过，这个集合是由链表和数组组成的。因为再完美的hash算法都有可能产生哈希冲突，所以两个不同key的元素可以被放在同一个地方。</p><p>而单用数组明显不能满足这个需求，而在数组的槽位上存一个链表就可以解决这个问题。</p><h2 id="hashmap的使用" tabindex="-1"><a class="header-anchor" href="#hashmap的使用" aria-hidden="true">#</a> HashMap的使用</h2><p>上面简单了解了HashMap的定义和基本的底层数据结构，接下来通过HashMap在平常开发中的使用来具体看看怎么实现的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;搜索关注公众号&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;SH的全栈笔记&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 设置值</span>
map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;搜索关注公众号&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// SH的全栈笔记 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="赋值" tabindex="-1"><a class="header-anchor" href="#赋值" aria-hidden="true">#</a> 赋值</h2><h3 id="put函数" tabindex="-1"><a class="header-anchor" href="#put函数" aria-hidden="true">#</a> put函数</h3><p>上面的Put方法，我们传入了两个参数，Key和Value，函数的定义如下。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">putVal</span><span class="token punctuation">(</span><span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应该跟大多数人YY的put方法差不多，put方法再调用了<code>putVal</code> 方法。</p><p>首先经过了hash之后的key，是一个整型的hashcode，其次是我们传入的key和value。<strong>最后两个布尔值，后面会提到。</strong></p><p>首先一进入putVal就会声明存放数据的table，如果这个HashMap是首次设置值，就会被初始化一个默认size的table，且所有元素的初始值都是NULL，下面是初始化这块的核心代码，我省略掉了一些无关的变量声明。</p><blockquote><p>有趣的是，初始化调用的是<code>resize</code>方法。</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab<span class="token punctuation">;</span> 
<span class="token keyword">int</span> n<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>tab <span class="token operator">=</span> table<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token punctuation">(</span>n <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  n <span class="token operator">=</span> <span class="token punctuation">(</span>tab <span class="token operator">=</span> <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

newCap <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span> <span class="token comment">// 默认容量</span>
newThr <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span> <span class="token comment">// 默认阈值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="默认值为啥是16" tabindex="-1"><a class="header-anchor" href="#默认值为啥是16" aria-hidden="true">#</a> 默认值为啥是16</h3><p>上面初始化table的默认size给的是16，当然我们也可以自己定义，但是建议是最好是2的幂。有的朋（杠）友（精）就要问了，为什么是16呢？我13，14不他不香吗？我们接下来就要分析为什么不香。</p><p>当我们放元素进入map的时候，它是如何确定元素在table数组中的位置的呢？我们拿<code>搜索关注公众号</code>这个key举例。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>hash <span class="token operator">=</span> <span class="token punctuation">(</span>h <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> h <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">16</span>
p <span class="token operator">=</span> tab<span class="token punctuation">[</span>i <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&amp;</span> hash<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，是将hash之后key和数组的length-1做与运算得到了一个数组下标。而且，hash值的二进制的位数，大多数情况下都会比table的长度的二进制位数多。换句话说，与运算之后得到的数组下标index完全取决于hash值的后几位。</p><div class="language-d line-numbers-mode" data-ext="d"><pre class="language-d"><code><span class="token number">16</span> <span class="token comment">// n   10000</span>
<span class="token number">15</span> <span class="token comment">// n-1 1111</span>
<span class="token number">14</span> <span class="token comment">//     1110</span>
<span class="token number">13</span> <span class="token comment">//     1101</span>
<span class="token number">12</span> <span class="token comment">//     1100</span>
<span class="token number">11</span> <span class="token comment">//     1011</span>
<span class="token number">10</span> <span class="token comment">//     1010</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从13、14的二进制值可以看出来，存在0和1在二进制位数上分布不均匀的情况，这样一来就会造成一个问题，那就是会存在某些<strong>不同的hash值</strong>经过与运算得到的值是<strong>一样的</strong>。这样就会导致hash到的index<strong>不均匀</strong>，换句话说有些index可能永远都不会被hash到，而有些index也被频繁的hash到。</p><p>本来hash算法是要求计算的结果要均匀分布的，但是上述的结果明显不符合均匀分布的要求。用n-1而不用n也是因为同样的道理。如果这个值是2的幂，那么2的幂的值-1的所有二进制位数都是1，这样有利于hash计算的均匀分布。</p><p>综上所述，不一定是16，<strong>2的幂</strong>都可以，16只是一个经验值。</p><h3 id="自动扩容" tabindex="-1"><a class="header-anchor" href="#自动扩容" aria-hidden="true">#</a> 自动扩容</h3><p>除了size，初始化的时候还会设定一个阈值，值为12，<code>newThr = 12</code>，这里需要提到一个概念<strong>负载因子</strong>，HashMap的实现里默认给的是0.75。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>loadFactor <span class="token operator">=</span> <span class="token number">0.75F</span><span class="token punctuation">;</span> <span class="token comment">// 12/16=0.75</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>负载因子是用来干嘛的呢？最开始我们提到了，最开始存储的数据结构是数组，这种基础结构是有size设定的。当我们不停的往map里存数据的时候，总会存满，当元素快存满的时候，我们就需要扩大map的容量，来容纳更多的元素，这就需要一个<strong>自动扩容</strong>的机制了。</p><blockquote><p>不是扩容弹匣，想啥呢</p></blockquote><p>在当数据量大于超过设定的阈值的时候（容量*负载因子），自动对map进行扩容，以存放更多的数据。</p><p>自动扩容做了什么事情呢？总结来说就是两件事。</p><ul><li>创建新的数组，大小是原来数组的一倍。</li><li>将元素rehash到新的数组</li></ul><p>为什么要<strong>rehash</strong>呢？上面我们提到过了，当元素被放进map时，确认下标的方法是<strong>table的长度-1</strong>和<strong>hash值</strong>做与运算，现在table的长度发生了变化，那么自然而然，元素获取下标的运算结果也就跟之前的不一样了， 所以需要将老的map中的元素再按照新的table长度<strong>rehash</strong>到扩容后的table中。</p><blockquote><p>所以在当你对性能有一定要求，且你知道你创建map的时候size的时候，可以指定size，这样一来就不会因为数据量持续的增大而去频繁的自动扩容了</p></blockquote><h3 id="put的过程中到底发生了什么" tabindex="-1"><a class="header-anchor" href="#put的过程中到底发生了什么" aria-hidden="true">#</a> put的过程中到底发生了什么</h3><p>了解了<strong>底层数据结构</strong>和<strong>自动扩容机制</strong>，接下来我们来看一下put过程中究竟发生了什么。我们上面说过了，会通过<strong>数组的长度-1</strong>和<strong>hash值</strong>与运算得到一个数组下标。</p><p>如果该位置没有元素，那么就很简单，直接新建一个节点即可然后放置在数据的具体位置即可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">newNode</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">HashMap<span class="token punctuation">.</span>Node</span><span class="token punctuation">)</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是如果该下标已经有元素了，这种情况HashMap是怎么处理的呢？这也要看情况。</p><ul><li><p>如果是跟当前槽位相同的key，就直接覆盖。这就是我们修改某个key的值会发生的情况。那HashMap怎么来判断是不是同一个key呢？就像下面这样。<code>p</code>就是当前槽位上已经有的元素，如果新、老元素的key的<strong>hashCode</strong>和<strong>值</strong>都相同<strong>且key不为空</strong>，那么就能证明这两个key是相同的，那么此时只需要<strong>覆盖</strong>即可。</p><p><code>p.hash == hash &amp;&amp; ((k = p.key) == key || (key != null &amp;&amp; key.equals(k)))</code></p></li><li><p>而如果p是<code>TreeNode</code>的实例，那么就代表当前槽位已经是一个<strong>红黑树</strong>了，此时只需要往这个树里<code>putTreeVal</code>即可。至于为什么是红黑树，哪儿来的红黑树，下面马上就要讲到了。</p></li><li><p>最后一种情况就是，既不是已经存在的元素也不是TreeNode的实例，也不是<strong>红黑树</strong>。这种情况下，它就是一个普通的Node。你可以理解为链表，如果hash冲突了，就把这个Node放到该位置的<strong>链表末尾</strong>。Java8之前采用的<strong>头插法</strong>，而Java8换成了<strong>尾插法</strong>，至于为什么要换，后面会讲。</p></li></ul><p>当该位置的链表中的元素超过了<code>TREEIFY_THRESHOLD</code>所设置的数量时，就会触发树化，将其转化为<strong>红黑树</strong>。Java8里给的默认值是<strong>8</strong>，而当元素的数量低于6时又会</p><h3 id="为啥要转化成红黑树" tabindex="-1"><a class="header-anchor" href="#为啥要转化成红黑树" aria-hidden="true">#</a> 为啥要转化成红黑树</h3><p>首先我们要知道为什么要树化。当大量的数据放入Map中，Hash冲突会越来越多，某些位置就会出现一个很长的链表的情况。这种情况下，查询时间复杂度是O(n) ，删除的时间复杂度也是O(n)，查询、删除的效率会大大降低。而同样的数据情况下，平衡二叉树的时间复杂度都是O(logn)。</p><blockquote><p>有的朋（杠）友（精）看到这个小标题不乐意了，怎么就直接用红黑树了？我用<strong>二叉查找树</strong>它不香吗？</p></blockquote><p>不了解二叉查找树的，我把它的特点列在了下面。</p><ul><li><p>左子树上的所有节点的值都小于根节点的值</p></li><li><p>右子树上的所有节点的值都大于根节点的值</p></li></ul><p>再精简一下就是，<strong>左小右大</strong></p><p>但是，如果数据大量的趋近于有序，例如所有的节点都比根节点大，那这个时候<strong>二叉查找树</strong>就退化成了<strong>链表</strong>，查询效率就会急剧下降。看到这是不是觉得有点不对，我才从链表树化，你这又给我退化成了链表？</p><blockquote><p>朋友看到这又不乐意了，好好好，就算二叉查找树不行，那AVL树它也不行？用了AVL树就不会出现上面所描述的效率急剧退化的情况了不是吗？</p></blockquote><p>的确是这样，AVL也可以叫<strong>平衡二叉搜索树</strong>。AVL树会在其有退化成链表的趋势的时候（左右子树的高度差超过某个阈值）调整树的结构，也就是通过左旋和右旋来使其左右子树的高度尽量平衡。</p><blockquote><p>OK，OK，就算你解释清楚了为什么要树化，那为什么一定要用<strong>红黑树</strong>？</p></blockquote><p>具体的细节也就不在这里赘述，不知不觉已经写了这么多了，直接说结论吧。AVL树的查找速度更快，但是相应的插入和修改的速度较慢。而红黑树则在插入和修改操作较为密集的时候表现更好。</p><p>而总结我们日常的HashMap使用，大多数情况下插入和修改应该是比查找更频繁一些的。而在这种情况下，红黑树的综合表现会更好一些。</p><p>至于红黑树的相关细节，涉及的东西还是挺多，我之后会单独拿一个篇幅来讲。</p><h3 id="为什么要用尾插法" tabindex="-1"><a class="header-anchor" href="#为什么要用尾插法" aria-hidden="true">#</a> 为什么要用尾插法</h3><p>我们目前用的最多的是Java8，在Java8中采用的是<strong>尾插法</strong>，Java8之前采用的是头插法。</p><p>那为什么后面又变成了<strong>尾插法</strong>呢？放心，肯定不是设计者闲的蛋疼，没事来改个设计。这样做一定是有一定的道理的。在解释这个问题之前，我们先来看看，如果采取头插法在<strong>多线程</strong>下的情况下会出现什么问题。</p><p>我们讲过，假设数组中index=1的位置已经有了元素<code>A</code>，之后又有元素<code>B</code>被分配到了index=1的位置。那么在下标为1的槽位上的链表就变成了B -&gt; A。</p><p>此时再分配了一个新元素<code>C</code>，链表又被更新成了C -&gt; B -&gt; A。这也是为什么叫<strong>头插法</strong>，新的元素会被放在链表的头节点，因为当时设计的时候考虑到后被放入map的元素被访问的可能性更大。</p><p>上面讲到了在当不停的往map中放置元素后，超过了设定的阈值，就会触发<strong>自动扩容</strong>。此时会触发两个操作，一是创建一个容量为之前两倍的底层数组，并且将老的数组中的元素<strong>rehash</strong>到新的数组中。</p><p>而由于数组的长度发生了变化，这就导致了元素的rehash结果跟之前在老数组中的位置不一样。</p><p>首先我们来模拟一下rehash的过程，假设新的数组中下标为2的槽位是空的。</p><ul><li><p>首先元素C，被放置在了其他位置。</p></li><li><p>然后元素B，被rehash到了下标为2的槽位， 至此都没有问题。</p></li><li><p>最后元素A，同样被rehash到了下标为2的槽位，此时链表变成了A -&gt; B。到这就有问题了，最开始B的next指向的是A节点。但是rehash之后A的next又指向B，看到这你应该就能明白发生了什么。</p></li></ul><p>我看到很多的对JDK1.7版的HashMap在多线程的情况下扩容会出现死锁的解释都只到了环形链表。但是其实就算是环形链表，只要找到了对应的元素，就会直接退出循环的逻辑，也不会造成死循环。</p><p>实际情况是，当自动扩容形成了环形链表后，当你去Get了一个在entry链上<strong>不存在的元素时</strong>，就会出现死循环的情况。</p><h2 id="取值" tabindex="-1"><a class="header-anchor" href="#取值" aria-hidden="true">#</a> 取值</h2><p>上面聊了给HashMap赋值的大概过程，接下来聊一下从HashMap获取值会发生什么。get方法的开始，跟put一样很简单。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> e<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>e <span class="token operator">=</span> <span class="token function">getNode</span><span class="token punctuation">(</span><span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，取值的核心操作是<code>getNode</code>来负责完成的。</p><p>首先第一件事就是去check的第一个元素是不是当前查找的元素。</p><p>如果不是，而且当前槽位已经被树化成了红黑树，就走红黑树的<code>getTreeNode</code>方法。</p><p>如果还没有被树化，只是普通的链表，则顺着next一路找下去。</p><p>由于get方法逻辑和实现都比较容易理解，就不贴太多源码了。</p><h2 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾" aria-hidden="true">#</a> 结尾</h2><p>由于最近太忙了，工作和生活中的事都巨多，这篇文章是几周利用零零散散的时间写出来的，如果有什么问题，欢迎大家在评论区讨论。</p>`,88),o=[t];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","230843.html.vue"]]);export{d as default};
