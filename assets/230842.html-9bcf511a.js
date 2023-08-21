import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as o,a as n,b as s,d as t,f as l}from"./app-2e9c1c72.js";const i={},u=l(`<h1 id="初探java类型擦除" tabindex="-1"><a class="header-anchor" href="#初探java类型擦除" aria-hidden="true">#</a> 初探Java类型擦除</h1><h2 id="什么是类型擦除" tabindex="-1"><a class="header-anchor" href="#什么是类型擦除" aria-hidden="true">#</a> 什么是类型擦除</h2><p>为了让你们快速的对类型擦除有一个印象，首先举一个很简单也很经典的例子。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 指定泛型为String</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 指定泛型为Integer</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> list2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>list1<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> list2<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的判断结果是<code>true</code>。代表了两个传入了不同泛型的List最终都编译成了ArrayList，成为了同一种类型，原来的泛型参数String和Integer被擦除掉了。这就是类型擦除的一个典型的例子。</p><p>而如果我们说到类型擦除为什么会出现，我们就必须要了解泛型。</p><h2 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h2><h3 id="泛型的定义" tabindex="-1"><a class="header-anchor" href="#泛型的定义" aria-hidden="true">#</a> 泛型的定义</h3><p>随着2004年9月30日，工程代号为Tiger的JDK 1.5发布，泛型从此与大家见面。JDK 1.5在Java语法的易用性上作出了非常大的改进。除了泛型，同版本加入的还有自动装箱、动态注解、枚举、可变长参数、foreach循环等等。</p><p>而在1.5之前的版本中，为了让Java的类具有通用性，参数类型和返回类型通常都设置为Object，可见，如果需要不用的类型，就需要在相应的地方，对其进行强制转换，程序才可以正常运行，十分麻烦，稍不注意就会出错。</p><p>泛型的本质就是参数化类型。也就是，将一个数据类型指定为参数。引入泛型有什么好处呢？</p><p>泛型可以将JDK 1.5之前在运行时才能发现的错误，提前到编译期。也就是说，泛型提供了编译时类型安全的检测机制。例如，一个变量本来是Integer类型，我们在代码中设置成了String，没有使用泛型的时候只有在代码运行到这了，才会报错。</p><p>而引入泛型之后就不会出现这个问题。这是因为通过泛型可以知道该参数的规定类型，然后在编译时，判断其类型是否符合规定类型。</p><p>泛型总共有三种使用方法，分别使用于类、方法和接口。</p><h2 id="泛型的使用方法" tabindex="-1"><a class="header-anchor" href="#泛型的使用方法" aria-hidden="true">#</a> 泛型的使用方法</h2><h3 id="泛型类" tabindex="-1"><a class="header-anchor" href="#泛型类" aria-hidden="true">#</a> 泛型类</h3><h4 id="定义泛型类" tabindex="-1"><a class="header-anchor" href="#定义泛型类" aria-hidden="true">#</a> 定义泛型类</h4><p>简单的泛型类可以定义为如下。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token class-name">T</span> data<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">Generic</span><span class="token punctuation">(</span><span class="token class-name">T</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setData</span><span class="token punctuation">(</span><span class="token class-name">T</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的T代表参数类型，代表任何类型。当然，并不是一定要写成T，这只是大家约定俗成的习惯而已。有了上述的泛型类之后我们就可以像如下的方式使用了。</p><h4 id="使用泛型类" tabindex="-1"><a class="header-anchor" href="#使用泛型类" aria-hidden="true">#</a> 使用泛型类</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 假设有这样一个具体的类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> email<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用泛型类</span>
<span class="token class-name">Hello</span> hello <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Hello</span><span class="token punctuation">&gt;</span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
resule<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 通过泛型类获取数据</span>
<span class="token class-name">Hello</span> data <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然如果泛型类不传入指定的类型的话，泛型类中的方法或者成员变量定义的类型可以为任意类型，如果打印<code>result.getClass()</code>的话，会得到<code>Generic</code>。</p><h3 id="泛型方法" tabindex="-1"><a class="header-anchor" href="#泛型方法" aria-hidden="true">#</a> 泛型方法</h3><h4 id="定义泛型方法" tabindex="-1"><a class="header-anchor" href="#定义泛型方法" aria-hidden="true">#</a> 定义泛型方法</h4><p>首先我们看一下不带返回值的泛型方法，可以定义为如下结构。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 定义不带返回值的泛型方法</span>
<span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">void</span> <span class="token function">genericMethod</span><span class="token punctuation">(</span><span class="token class-name">T</span> field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义带返回值的泛型方法</span>
<span class="token keyword">private</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">T</span> <span class="token function">genericWithReturnMethod</span><span class="token punctuation">(</span><span class="token class-name">T</span> field<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> field<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="调用泛型方法" tabindex="-1"><a class="header-anchor" href="#调用泛型方法" aria-hidden="true">#</a> 调用泛型方法</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 调用不带返回值泛型方法</span>
<span class="token function">genericMethod</span><span class="token punctuation">(</span><span class="token string">&quot;This is string&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// class java.lang.String</span>
<span class="token function">genericMethod</span><span class="token punctuation">(</span><span class="token number">56L</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// class java.lang.Long</span>

<span class="token comment">// 调用带返回值的泛型方法</span>
<span class="token class-name">String</span> test <span class="token operator">=</span> <span class="token function">genericWithReturnMethod</span><span class="token punctuation">(</span><span class="token string">&quot;TEST&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TEST class java.lang.String</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带返回值的方法中，T就是当前函数的返回类型。</p><h3 id="泛型接口" tabindex="-1"><a class="header-anchor" href="#泛型接口" aria-hidden="true">#</a> 泛型接口</h3><p>泛型接口定义如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> genericInterface<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用的方法与泛型类类似，这里就不再赘述。</p><h2 id="泛型通配符" tabindex="-1"><a class="header-anchor" href="#泛型通配符" aria-hidden="true">#</a> 泛型通配符</h2><p>什么是泛型通配符？官方一点的解释是</p><blockquote><p>Type of unknown.</p></blockquote><p>也就是无限定的通配符，可以代表任意类型。用法也有三种，&lt;?&gt;，&lt;? extends T&gt;和&lt;? super T&gt;。</p><p>既然已经有了T这样的代表任意类型的通配符，为什么还需要这样一个无限定的通配符呢？是因为其主要解决的问题是泛型继承带来的问题。</p><h3 id="泛型的继承问题" tabindex="-1"><a class="header-anchor" href="#泛型的继承问题" aria-hidden="true">#</a> 泛型的继承问题</h3><p>首先来看一个例子</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> integerList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Number</span><span class="token punctuation">&gt;</span></span> numberList <span class="token operator">=</span> integerList<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道，<code>Integer</code> 是继承自 <code>Number</code> 类的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Integer</span> <span class="token keyword">extends</span> <span class="token class-name">Number</span> <span class="token keyword">implements</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么上述的代码能够通过编译吗？肯定是不行的。Integer继承自Number不代表 <code>List&lt;Integer&gt;</code> 和 <code>List&lt;Number&gt;</code>之间有继承关系。那通配符的应用场景是什么呢？</p><h3 id="通配符的应用场景" tabindex="-1"><a class="header-anchor" href="#通配符的应用场景" aria-hidden="true">#</a> 通配符的应用场景</h3><p>在其他函数中，例如JavaScript中，一个函数的参数可以是任意的类型，而不需要进行任意的类型转换，所以这样的函数在某些应用场景下，就会具有很强的通用性。</p><p>而在Java这种强类型语言中，一个函数的参数类型是固定不变的。那如果想要在Java中实现类似于JavaScript那样的通用函数该怎么办呢？这也就是为什么我们需要泛型的通配符。</p><p>假设我们有很多动物的类, 例如Dog, Pig和Cat三个类，我们需要有一个通用的函数来计算动物列表中的所有动物的腿的总数，如果在Java中，要怎么做呢？</p><p>可能会有人说，用泛型啊，泛型不就是解决这个问题的吗？泛型必须指定一个特定的类型。正式因为泛型解决不了...才提出了泛型的通配符。</p><h3 id="无界通配符" tabindex="-1"><a class="header-anchor" href="#无界通配符" aria-hidden="true">#</a> 无界通配符</h3><p>无界通配符就是<code>?</code>。看到这你可能会问，这不是跟T一样吗？为啥还要搞个<code>?</code>。他们主要区别在于，T主要用于声明一个泛型类或者方法，?主要用于使用泛型类和泛型方法。下面举个简单的例子。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 定义打印任何类型列表的函数</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> elem<span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>elem <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 调用上述函数</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> intList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> stringList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;two&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;three&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printList</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 1 2 3 </span>
<span class="token function">printList</span><span class="token punctuation">(</span>ls<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// one two three</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述函数的目的是打印任何类型的列表。可以看到在函数内部，并没有关心List中的泛型到底是什么类型的，你可以将&lt;?&gt;理解为只提供了一个只读的功能，它去除了增加具体元素的能力，只保留与具体类型无关的功能。从上述的例子可以看出，它只关心元素的数量以及其是否为空，除此之外不关心任何事。</p><p>再反观T，上面我们也列举了如何定义泛型的方法以及如果调用泛型方法。泛型方法内部是要去关心具体类型的，而不仅仅是数量和不为空这么简单。</p><h3 id="上界通配符-extends-t" tabindex="-1"><a class="header-anchor" href="#上界通配符-extends-t" aria-hidden="true">#</a> 上界通配符&lt;? extends T&gt;</h3><p>既然<code>?</code>可以代表任何类型，那么extends又是干嘛的呢？</p><p>假设有这样一个需求，我们只允许某一些特定的类型可以调用我们的函数（例如，所有的Animal类以及其派生类），但是目前使用<code>?</code>，所有的类型都可以调用函数，无法满足我们的需求。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">countLength</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span><span class="token punctuation">&gt;</span></span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用了上界通配符来完成这个公共函数之后，就可以使用如下的方式来调用它了。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Pig</span><span class="token punctuation">&gt;</span></span> pigs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Dog</span><span class="token punctuation">&gt;</span></span> dogs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Cat</span><span class="token punctuation">&gt;</span></span> cats <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 假装写入了数据</span>
<span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
sum <span class="token operator">+=</span> <span class="token function">countLength</span><span class="token punctuation">(</span>pigs<span class="token punctuation">)</span><span class="token punctuation">;</span>
sum <span class="token operator">+=</span> <span class="token function">countLength</span><span class="token punctuation">(</span>dogs<span class="token punctuation">)</span><span class="token punctuation">;</span>
sum <span class="token operator">+=</span> <span class="token function">countLength</span><span class="token punctuation">(</span>cats<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看完了例子，我们就可以简单的得出一个结论。上界通配符就是一个可以处理任何特定类型以及是该特定类型的派生类的通配符。</p><p>可能会有人看的有点懵逼，我结合上面的例子，再简单的用人话解释一下：上界通配符就是一个啥动物都能放的盒子。</p><h3 id="下界通配符-super-animal" tabindex="-1"><a class="header-anchor" href="#下界通配符-super-animal" aria-hidden="true">#</a> 下界通配符&lt;? super Animal&gt;</h3><p>上面我们聊了上界通配符，它将未知的类型限制为特定类型或者该特定的类型的子类型（也就是上面讨论过的动物以及一切动物的子类）。而下界通配符则将未知的类型限制为特定类型或者该特定的类型的超类型，也就是超类或者基类。</p><p>在上述的上界通配符中，我们举了一个例子。写了一个可以处理任何动物类以及是动物类的派生类的函数。而现在我们要写一个函数，用来处理任何是Integer以及是Integer的超类的函数。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">addNumbers</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类型擦除" tabindex="-1"><a class="header-anchor" href="#类型擦除" aria-hidden="true">#</a> 类型擦除</h2><p>简单的了解了泛型的几种简单的使用方法之后，我们回到本篇博客的主题上来——类型擦除。泛型虽然有上述所列出的一些好处，但是泛型的生命周期只限于编译阶段。</p><p>本文最开始的给出的样例就是一个典型的例子。在经过编译之后会采取去泛型化的措施，编译的过程中，在检测了泛型的结果之后会将泛型的相关信息进行擦除操作。就像文章最开始提到的例子一样，我们使用上面定义好的Generic泛型类来举个简单的例子。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> generic <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Field</span><span class="token punctuation">[</span><span class="token punctuation">]</span> fs <span class="token operator">=</span> generic<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDeclaredFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Field</span> f <span class="token operator">:</span> fs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;type: &quot;</span> <span class="token operator">+</span> f<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// type: java.lang.Object</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>getDeclaredFields</code>是反射中的方法，可以获取当前类已经声明的各种字段，包括public，protected以及private。</p><p>可以看到我们传入的泛型String已经被擦除了，取而代之的是Object。那之前的String和Integer的泛型信息去哪儿了呢？可能这个时候你会灵光一闪，那是不是所有的泛型在被擦除之后都会变成Object呢？别着急，继续往下看。</p><p>当我们在泛型上面使用了上界通配符以后，会有什么情况发生呢？我们将Generic类改成如下形式。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Generic</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token class-name">T</span> data<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Generic</span><span class="token punctuation">(</span><span class="token class-name">T</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setData</span><span class="token punctuation">(</span><span class="token class-name">T</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再次使用反射来查看泛型擦除之后类型。这次控制台会输出<code>type: java.lang.String</code>。可以看到，如果我们给泛型类制定了上限，泛型擦除之后就会被替换成类型的上限。而如果没有指定，就会统一的被替换成Object。相应的，泛型类中定义的方法的类型也是如此。</p><h2 id="写在最后" tabindex="-1"><a class="header-anchor" href="#写在最后" aria-hidden="true">#</a> 写在最后</h2><p>如果各位发现文章中有问题的，欢迎大家不吝赐教，我会及时的更正。</p>`,78),r=n("p",null,"参考：",-1),k={href:"https://www.ibm.com/developerworks/cn/java/java-language-type-erasure/index.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.zhihu.com/question/20400700",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.zhihu.com/question/31429113",target:"_blank",rel:"noopener noreferrer"},m=n("code",null,"List<?>",-1),g=n("code",null,"List<T>",-1);function b(h,f){const a=p("ExternalLinkIcon");return c(),o("div",null,[u,n("blockquote",null,[r,n("ol",null,[n("li",null,[n("a",k,[s("Java语言类型擦除"),t(a)])]),n("li",null,[n("a",d,[s("下界通配符"),t(a)])]),n("li",null,[n("a",v,[m,s("和"),g,s("的区别"),t(a)])])])])])}const j=e(i,[["render",b],["__file","230842.html.vue"]]);export{j as default};
