import{_ as n,o as a,c as s,f as t}from"./app-5790b668.js";const e={},p=t(`<h1 id="两分钟让你明白go中如何继承" tabindex="-1"><a class="header-anchor" href="#两分钟让你明白go中如何继承" aria-hidden="true">#</a> 两分钟让你明白Go中如何继承</h1><p>最近在重构代码的时候，抽象了大量的接口。也使用这些抽象的接口做了很多伪继承的操作，极大的减少了代码冗余，同时也增加了代码的可读性。</p><p>然后随便搜了一下关于Go继承的文章，发现有的文章的代码量过多，并且代码format极其粗糙，命名极其随意，类似于A、B这种，让人看着看着就忘了到底是谁继承谁，我又要回去看一遍逻辑。</p><p>虽然只是样例代码，我认为仍然需要做到简洁、清晰以及明了。这也是我为什么要写这篇博客的原因。接下里在这里简单分享一下在Go中如何实现继承。</p><h2 id="_1-简单的组合" tabindex="-1"><a class="header-anchor" href="#_1-简单的组合" aria-hidden="true">#</a> 1. 简单的组合</h2><p>说到继承我们都知道，在Go中没有<code>extends</code>关键字，也就意味着Go并没有原生级别的继承支持。这也是为什么我在文章开头用了<strong>伪继承</strong>这个词。本质上，Go使用interface实现的功能叫组合，Go是使用组合来实现的继承，说的更精确一点，是使用组合来代替的继承，举个很简单的例子。</p><h3 id="_1-1-实现父类" tabindex="-1"><a class="header-anchor" href="#_1-1-实现父类" aria-hidden="true">#</a> 1.1 实现父类</h3><p>我们用很容易理解的<strong>动物</strong>-<strong>猫</strong>来举例子，废话不多说，直接看代码。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Animal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Animal<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v is eating&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>Animal
<span class="token punctuation">}</span>

cat <span class="token operator">:=</span> <span class="token operator">&amp;</span>Cat<span class="token punctuation">{</span>
	Animal<span class="token punctuation">:</span> <span class="token operator">&amp;</span>Animal<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> <span class="token string">&quot;cat&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
cat<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// cat is eating</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-代码分析" tabindex="-1"><a class="header-anchor" href="#_1-2-代码分析" aria-hidden="true">#</a> 1.2 代码分析</h3><p>首先，我们实现了一个Animal的结构体，代表动物类。并声明了Name字段，用于描述动物的名字。</p><p>然后，实现了一个以Animal为receiver的Eat方法，来描述动物进食的行为。</p><p>最后，声明了一个Cat结构体，组合了Cat字段。再实例化一个猫，调用Eat方法，可以看到会正常的输出。</p><p>可以看到，Cat结构体本身没有Name字段，也没有去实现Eat方法。唯一有的就是组合了Animal父类，至此，我们就证明了已经通过组合实现了继承。</p><h2 id="_2-优雅的组合" tabindex="-1"><a class="header-anchor" href="#_2-优雅的组合" aria-hidden="true">#</a> 2. 优雅的组合</h2><p>熟悉Go的人看到上面的代码可能会发出如下感叹</p><blockquote><p>这也太粗糙了吧 -- By 鲁迅：我没说过这句话</p></blockquote><p>的确，上面的仅仅是为了给还没有了解过Go组合的人看的。作为一个简单的例子来理解Go的组合继承，这是完全没有问题的 。但如果要运用在真正的开发中，那还是远远不够的。</p><p>举个例子，我如果是这个抽象类的使用者，我拿到animal类不能一目了然的知道这个类干了什么，有哪些方法可以调用。以及，没有统一的初始化方式，这意味着凡是涉及到初始化的地方都会有重复代码。如果后期有初始化相关的修改，那么只有一个一个挨着改。所以接下来，我们对上述的代码做一些优化。</p><h3 id="_2-1-抽象接口" tabindex="-1"><a class="header-anchor" href="#_2-1-抽象接口" aria-hidden="true">#</a> 2.1 抽象接口</h3><p>接口用于描述某个类的行为。例如，我们即将要抽象的动物接口就会描述作为一个动物，具有哪些行为。常识告诉我们，动物可以进食（Eat），可以发出声音（bark），可以移动（move）等等。这里有一个很有意思的类比。</p><blockquote><p>接口就像是一个招牌，比如一家星巴克。星巴克就是一个招牌（接口）。</p><p>你看到这个招牌会想到什么？美式？星冰乐？抹茶拿铁？又或者是拿铁，甚至是店内的装修风格。</p><p>这就是一个好的接口应该达到的效果，同样这也是为什么我们需要抽象接口。</p></blockquote><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 模拟动物行为的接口</span>
<span class="token keyword">type</span> IAnimal <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 描述吃的行为</span>
<span class="token punctuation">}</span>

<span class="token comment">// 动物 所有动物的父类</span>
<span class="token keyword">type</span> Animal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 动物去实现IAnimal中描述的吃的接口</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>a <span class="token operator">*</span>Animal<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v is eating\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 动物的构造函数</span>
<span class="token keyword">func</span> <span class="token function">newAnimal</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Animal <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Animal<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> name<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 猫的结构体 组合了animal</span>
<span class="token keyword">type</span> Cat <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token operator">*</span>Animal
<span class="token punctuation">}</span>

<span class="token comment">// 实现猫的构造函数 初始化animal结构体</span>
<span class="token keyword">func</span> <span class="token function">newCat</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Cat <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Cat<span class="token punctuation">{</span>
		Animal<span class="token punctuation">:</span> <span class="token function">newAnimal</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

cat <span class="token operator">:=</span> <span class="token function">newCat</span><span class="token punctuation">(</span><span class="token string">&quot;cat&quot;</span><span class="token punctuation">)</span>
cat<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// cat is eating</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Go中其实没有关于构造函数的定义。例如我们在Java中可以使用构造函数来初始化变量，举个很简单的例子，<code>Integer num = new Integer(1)</code>。而在Go中就需要使用者自己通过结构体的初始化来模拟构造函数的实现。</p><p>然后在这里我们实现子类Cat，使用组合的方式代替继承，来调用Animal中的方法。运行之后我们可以看到，Cat结构体中并没有Name字段，也没有实现Eat方法，但是仍然可以正常运行。这证明我们已经通过组合的方式了实现了继承。</p><h3 id="_2-2-重载方法" tabindex="-1"><a class="header-anchor" href="#_2-2-重载方法" aria-hidden="true">#</a> 2.2 重载方法</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 猫结构体IAnimal的Eat方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>cat <span class="token operator">*</span>Cat<span class="token punctuation">)</span> <span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;children %v is eating\\n&quot;</span><span class="token punctuation">,</span> cat<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

cat<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// children cat is eating</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，Cat结构体已经重载了Animal中的Eat方法，这样就实现了重载。</p><h3 id="_2-3-参数多态" tabindex="-1"><a class="header-anchor" href="#_2-3-参数多态" aria-hidden="true">#</a> 2.3 参数多态</h3><p>什么意思呢？举个例子，我们要如何在Java中解决函数的参数多态问题？熟悉Java的可能会想到一种解决方案，那就是通配符。用一句话概括，使用了通配符可以使该函数接收某个类的所有父类型或者某个类的所有子类型。但是我个人认为对于不熟悉Java的人来说，可读性不是特别友好。</p><p>而在Go中，就十分方便了。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">check</span><span class="token punctuation">(</span>animal IAnimal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	animal<span class="token punctuation">.</span><span class="token function">Eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个函数中就可以处理所有组合了Animal的单位类型，对应到Java中就是上界通配符，即一个可以处理任何特定类型以及是该特定类型的派生类的通配符，再换句人话，啥动物都能处理。</p><h2 id="_3-总结" tabindex="-1"><a class="header-anchor" href="#_3-总结" aria-hidden="true">#</a> 3. 总结</h2><p>凡事都有两面性，做优化也不例外。大量的抽象接口的确可以精简代码，让代码看起来十分优雅、舒服。但是同样，这会给其他不熟悉的人review代码造成理解成本。想象你看某段代码，全是接口，点了好几层才能看到实现。更有的，往下找着找着突然就在另一个接口处断掉了，必须要手动的去另一个注册的地方去找。</p><p>这就是我认为优化的时候要面临的几个问题：</p><ul><li>优雅</li><li>可读</li><li>性能</li></ul><p>有的时候我们很难做到三个方面都兼顾，例如这样写代码看起来很难受，但是性能要比优雅的代码好。再例如，这样写看起来很优雅，但是可读性很差等等。</p><p>还是引用我之前博客中经常写的一句话</p><blockquote><p>适合自己的才是最好的</p></blockquote><p>这种时候只能根据自己项目的特定情况，选择最适合你的解决方案。没有万能的解决方案。</p><p>分享一句最近弹吉他看到的毒鸡汤，学习也是一样的。</p><blockquote><p>练琴的路上没有捷径，全是弯路</p></blockquote>`,43),i=[p];function c(o,l){return a(),s("div",null,i)}const d=n(e,[["render",c],["__file","230861.html.vue"]]);export{d as default};
