import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as p,a,b as n,d as s,f as t}from"./app-e58d90a2.js";const r="/images/230865/img-1.jpeg",d="/images/230865/img-2.jpeg",l="/images/230865/img-3.jpeg",g="/images/230865/img-4.jpeg",u="/images/230865/img-5.jpeg",h="/images/230865/img-6.jpeg",m="/images/230865/img-7.jpeg",f="/images/230865/img-8.jpeg",_="/images/230865/img-9.jpeg",b="/images/230865/img-10.jpeg",k="/images/230865/img-11.jpeg",v="/images/230865/img-12.jpeg",x="/images/230865/img-13.jpeg",y="/images/230865/img-14.jpeg",q="/images/230865/img-15.jpeg",w="/images/230865/img-16.jpeg",z="/images/230865/img-17.jpeg",j="/images/230865/img-18.jpeg",S="/images/230865/img-19.jpeg",E="/images/230865/img-20.jpeg",F="/images/230865/img-21.jpeg",J={},T=t('<h1 id="降低代码的圈复杂度——复杂代码的解决之道" tabindex="-1"><a class="header-anchor" href="#降低代码的圈复杂度——复杂代码的解决之道" aria-hidden="true">#</a> 降低代码的圈复杂度——复杂代码的解决之道</h1><blockquote><p>本文代码示例以Go语言为例</p></blockquote><h2 id="_0-什么是圈复杂度" tabindex="-1"><a class="header-anchor" href="#_0-什么是圈复杂度" aria-hidden="true">#</a> 0. 什么是圈复杂度</h2><p>可能你之前没有听说过这个词，也会好奇这是个什么东西是用来干嘛的，在维基百科上有这样的解释。</p><blockquote><p><strong>Cyclomatic complexity</strong> is a software metric used to indicate the complexity of a program. It is a quantitative measure of the number of linearly independent paths through a program&#39;s source code. It was developed by <strong>Thomas</strong> J. McCabe, Sr. in <strong>1976</strong>.</p></blockquote><p>简单翻译一下就是，圈复杂度是用来衡量代码复杂程度的，圈复杂度的概念是由这哥们Thomas J. McCabe, Sr在1976年的时候提出的概念。</p><h2 id="_1-为什么需要圈复杂度" tabindex="-1"><a class="header-anchor" href="#_1-为什么需要圈复杂度" aria-hidden="true">#</a> 1. 为什么需要圈复杂度</h2><p>如果你现在的项目，代码的可读性非常差，难以维护，单个函数代码特别的长，各种if else case嵌套，看着大段大段写的糟糕的代码无从下手，甚至到了根本看不懂的地步，那么你可以考虑使用圈复杂度来衡量自己项目中代码的复杂性。</p><p>如果不刻意的加以控制，当我们的项目达到了一定的规模之后，某些较为复杂的业务逻辑就会导致有些开发写出很复杂的代码。</p><blockquote><p>举个真实的复杂业务的例子，如果你使用<strong>TDD</strong>（<strong>T</strong>est-<strong>D</strong>riven <strong>D</strong>evelopment）的方式进行开发的话，当你还没有真正开始写某个接口的实现的时候，你写的单测可能都已经达到了好几十个case，而真正的业务逻辑甚至还没有开始写</p></blockquote><p>再例如，一个函数，有几百、甚至上千行的代码，除此之外各种if else while嵌套，就算是写代码的人，可能过几周忘了上下文再来看这个代码，可能也看不懂了，因为其代码的可读性太差了，你读懂都很困难，又谈什么维护性和可扩展性呢？</p><p>那我们如何在编码中，CR（Code Review）中提早的避免这种情况呢？使用圈复杂度的检测工具，检测提交的代码中的圈复杂度的情况，然后根据圈复杂度检测情况进行重构。把过长过于复杂的代码拆成更小的、职责单一且清晰的函数，或者是用<strong>设计模式</strong>来解决代码中大量的if else的嵌套逻辑。</p><p>可能有的人会认为，降低圈复杂度对我收益不怎么大，可能从短期上来看是这样的，甚至你还会因为动了其他人的代码，触发了圈复杂度的检测，从而还需要去重构别人写的代码。</p><p>但是从长期看，低圈复杂度的代码具有更佳的可读性、扩展性和可维护性。同时你的编码能力随着设计模式的实战运用也会得到相应的提升。</p><h2 id="_2-圈复杂度度量标准" tabindex="-1"><a class="header-anchor" href="#_2-圈复杂度度量标准" aria-hidden="true">#</a> 2. 圈复杂度度量标准</h2><p>那圈复杂度，是如何衡量代码的复杂程度的？不是凭感觉，而是有着自己的一套计算规则。有两种计算方式，如下：</p><ol><li>节点判定法</li><li>点边计算法</li></ol><p>判定标准我整理成了一张表格，仅供参考。</p><table><thead><tr><th>圈复杂度</th><th>说明</th></tr></thead><tbody><tr><td>1 - 10</td><td>代码是OK的，质量还行</td></tr><tr><td>11 - 15</td><td>代码已经较为复杂，但也还好，可以设法对某些点重构一下</td></tr><tr><td>16 - ∞</td><td>代码已经非常的复杂了，可维护性很低， 维护的成本也大，此时必须要进行重构</td></tr></tbody></table><p>当然，我个人认为不能够武断的把这个圈复杂度的标准应用于所有公司的所有情况，要按照自己的实际情况来分析。</p><p>这个完全是看自己的业务体量和实际情况来决定的。假设你的业务很简单，而且是个单体应用，功能都是很简单的CRUD，那你的圈复杂度即使想上去也没有那么容易。此时你就可以选择把圈复杂度的重构阈值设定为<strong>10</strong>.</p><p>而假设你的业务十分复杂，而且涉及到多个其他的微服务系统调用，再加上各种业务中的corner case的判断，圈复杂度上100可能都不在话下。</p><p>而这样的代码，如果不进行重构，后期随着需求的增加，会越垒越多，越来越难以维护。</p><h3 id="_2-1-节点判定法" tabindex="-1"><a class="header-anchor" href="#_2-1-节点判定法" aria-hidden="true">#</a> 2.1 节点判定法</h3><p>这里只介绍最简单的一种，<strong>节点判定法</strong>，因为包括有的工具其实也是按照这个算法去算法的，其计算的公式如下。</p><blockquote><p>圈复杂度 = 节点数量 + 1</p></blockquote><p>节点数量代表什么呢？就是下面这些控制节点。</p><blockquote><p>if、for、while、case、catch、与、非、布尔操作、三元运算符</p></blockquote><p>大白话来说，就是看到上面符号，就把圈复杂度加1，那么我们来看一个例子。</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们按照上面的方法，可以得出<strong>节点数量</strong>是13，那么最终的圈复杂度就等于<code>13 + 1 = 14</code>，圈复杂度是14，值得注意的是，其中的<code>&amp;&amp;</code>也会被算作节点之一。</p><h3 id="_2-2-使用工具" tabindex="-1"><a class="header-anchor" href="#_2-2-使用工具" aria-hidden="true">#</a> 2.2 使用工具</h3>',32),C={href:"https://github.com/fzipp/gocyclo",target:"_blank",rel:"noopener noreferrer"},D=a("code",null,"go install github.com/fzipp/gocyclo/cmd/gocyclo",-1),I=a("code",null,"gocyclo $file",-1),M=a("code",null,"test.go",-1),G=t(`<div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;flag&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;sort&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">SetFlags</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">SetPrefix</span><span class="token punctuation">(</span><span class="token string">&quot;cognitive: &quot;</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span>Usage <span class="token operator">=</span> usage
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	args <span class="token operator">:=</span> flag<span class="token punctuation">.</span><span class="token function">Args</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token function">usage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	stats <span class="token operator">:=</span> <span class="token function">analyze</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
	sort<span class="token punctuation">.</span><span class="token function">Sort</span><span class="token punctuation">(</span><span class="token function">byComplexity</span><span class="token punctuation">(</span>stats<span class="token punctuation">)</span><span class="token punctuation">)</span>
	written <span class="token operator">:=</span> <span class="token function">writeStats</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> stats<span class="token punctuation">)</span>

	<span class="token keyword">if</span> <span class="token operator">*</span>avg <span class="token punctuation">{</span>
		<span class="token function">showAverage</span><span class="token punctuation">(</span>stats<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> <span class="token operator">*</span>over <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> written <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用命令<code>gocyclo test.go</code>，来计算该代码的圈复杂度。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ gocyclo test.go
<span class="token number">5</span> main main test.go:10:1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>表示main包的main方法从11行开始，其计算出的圈复杂度是<strong>5</strong>。</p><h2 id="_3-如何降低圈复杂度" tabindex="-1"><a class="header-anchor" href="#_3-如何降低圈复杂度" aria-hidden="true">#</a> 3. 如何降低圈复杂度</h2><p>这里其实有很多很多方法，然后各类方法也有很多专业的名字，但是对于初了解圈复杂度的人来说可能不是那么好理解。所以我把<strong>如何降低圈复杂度</strong>的方法总结成了一句话那就是——“尽量减少<strong>节点判定法</strong>中节点的数量”。</p><blockquote><p>换成大白话来说就是，尽量少写if、else、while、case这些流程控制语句。</p></blockquote><p>其实你在降低你原本代码的圈复杂度的时候，其实也算是一种重构。对于大多数的业务代码来说，代码越少，对于后续维护阅读代码的人来说就越容易理解。</p><p>简单总结下来就两个方向，一个是拆分小函数，另一个是想尽办法少些流程控制语句。</p><h3 id="_3-1-拆分小函数" tabindex="-1"><a class="header-anchor" href="#_3-1-拆分小函数" aria-hidden="true">#</a> 3.1 拆分小函数</h3><p>拆分小函数，圈复杂度的计算范围是在一个function内的，将你的复杂的业务代码拆分成一个一个的<strong>职责单一</strong>的小函数，这样后面阅读的代码的人就可以一眼就看懂你大概在干嘛，然后具体到每一个小函数，由于它职责单一，而且代码量少，你也很容易能够看懂。除了能够降低圈复杂度，拆分小函数也能够提高代码的可读性和可维护性。</p><p>比如代码中存在很多condition的判断。</p><figure><img src="`+d+'" alt="重构前" width="600" tabindex="0" loading="lazy"><figcaption>重构前</figcaption></figure><p>其实可以优化成我们单独拆分一个判断函数，只做condition判断这一件事情。</p><figure><img src="'+l+'" alt="重构后" width="600" tabindex="0" loading="lazy"><figcaption>重构后</figcaption></figure><h3 id="_3-2-少写流程控制语句" tabindex="-1"><a class="header-anchor" href="#_3-2-少写流程控制语句" aria-hidden="true">#</a> 3.2 少写流程控制语句</h3><p>这里举个特别简单的例子。</p><figure><img src="'+g+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其实可以直接优化成下面这个样子。</p><figure><img src="'+u+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>例子就先举到这里，其实你也发现，其实就像我上面说的一样，其目的就是为了减少if等流程控制语句。其实换个思路想，复杂的逻辑判断肯定会增加我们阅读代码的理解成本，而且不便于后期的维护。所以，重构的时候可以想办法尽量去简化你的代码。</p><p>那除了这些还有没有什么更加直接一点的方法呢？例如从一开始写代码的时候就尽量去避免这个问题。</p><h2 id="_4-使用go-linq" tabindex="-1"><a class="header-anchor" href="#_4-使用go-linq" aria-hidden="true">#</a> 4. 使用go-linq</h2><p>我们先不用急着去了解<code>go-linq</code>是什么，我们先来看一个经典的业务场景问题。</p><blockquote><p>从一个对象列表中获取一个ID列表</p></blockquote><p>如果在go中，我们可以这么做。</p><figure><img src="'+h+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>略显繁琐，熟悉Java的同学可能会说，这么简单的功能为什么会写的这么复杂，于是三下五除二写下了如下的代码。</p><figure><img src="'+m+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图中使用了Java8的新特性Stream，而Go语言目前还无法达到这样的效果。于是就该轮到<code>go-linq</code>出场了，使用<code>go-linq</code>之后的代码就变成了如下的模样。</p><figure><img src="'+f+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>怎么样，是不是看到Java 8 Stream的影子，重构之后的代码我们暂且不去比较行数，从语意上看，同样的清晰直观，这就是go-linq，我们用了一个例子来为大家介绍了它的定义，接下来简单介绍几种常见的用法，这些都是官网上给的例子。</p><h3 id="_4-1-foreach" tabindex="-1"><a class="header-anchor" href="#_4-1-foreach" aria-hidden="true">#</a> 4.1 ForEach</h3><p>与Java 8中的foreach是类似的，就是对集合的一个遍历。</p><figure><img src="'+_+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>首先是一个<code>From</code>，这代表了输入，梦开始的地方，可以和Java 8中的<code>stream</code>划等号。</p><p>然后可以看到有<code>ForEach</code>和<code>ForEachT</code>，<code>ForEachIndexed</code>和<code>ForEachIndexedT</code>。前者是只遍历元素，后者则将其下标也一起打印了出来。跟Go中的Range是一样的，跟Java 8的ForEach也类似，但是Java 8的ForEach没有下标，之所以go-ling有，是因为它自己记录了一个index，ForEachIndexed<strong>源码</strong>如下。</p><figure><img src="'+b+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中两者的区别是啥呢？我认识是你对你要遍历的元素的类型是否敏感，其实大多数情况应该都是敏感的。如果你使用了带T的，那么在遍历的时候go-ling会将interface转成你在函数中所定义的类型，例如<code>fruit string</code>。</p><p>否则的话，就需要我们自己去手动的将interface转换成对应的类型，所以后续的所有的例子我都会直接使用ForEach<strong>T</strong>这种类型的函数。</p><h3 id="_4-2-where" tabindex="-1"><a class="header-anchor" href="#_4-2-where" aria-hidden="true">#</a> 4.2 Where</h3><p>可以理解为SQL中的<code>where</code>条件，也可以理解为Java 8中的filter，按照某些条件对集合进行过滤。</p><figure><img src="'+k+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上面的<code>Where</code>筛选出了字符串长度大于6的元素，可以看到其中有个<code>ToSlice</code>，就是将筛选后的结果输出到指定的slice中。</p><h3 id="_4-3-distinct" tabindex="-1"><a class="header-anchor" href="#_4-3-distinct" aria-hidden="true">#</a> 4.3 Distinct</h3><p>与你所了解到的MySQL中的Distinct，又或者是Java 8中的Distinct是一样的作用，<strong>去重</strong>。</p><h4 id="_4-3-1-简单场景" tabindex="-1"><a class="header-anchor" href="#_4-3-1-简单场景" aria-hidden="true">#</a> 4.3.1 简单场景</h4><figure><img src="'+v+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-3-2-复杂场景" tabindex="-1"><a class="header-anchor" href="#_4-3-2-复杂场景" aria-hidden="true">#</a> 4.3.2 复杂场景</h4><p>当然，实际的开发中，这种只有一个整形数组的情况是很少的，大部分需要判断的对象都是一个struct数组。所以我们再来看一个稍微复杂一点的例子。</p><figure><img src="'+x+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上面的代码是对一个products的slice，根据product的<code>Code</code>字段来进行去重。</p><h3 id="_4-4-except" tabindex="-1"><a class="header-anchor" href="#_4-4-except" aria-hidden="true">#</a> 4.4 Except</h3><p>对两个集合做差集。</p><h4 id="_4-4-1-简单场景" tabindex="-1"><a class="header-anchor" href="#_4-4-1-简单场景" aria-hidden="true">#</a> 4.4.1 简单场景</h4><figure><img src="'+y+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-4-2-复杂场景" tabindex="-1"><a class="header-anchor" href="#_4-4-2-复杂场景" aria-hidden="true">#</a> 4.4.2 复杂场景</h4><figure><img src="'+q+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_4-5-intersect" tabindex="-1"><a class="header-anchor" href="#_4-5-intersect" aria-hidden="true">#</a> 4.5 Intersect</h3><p>对两个集合求<strong>交集</strong>。</p><h4 id="_4-5-1-简单场景" tabindex="-1"><a class="header-anchor" href="#_4-5-1-简单场景" aria-hidden="true">#</a> 4.5.1 简单场景</h4><figure><img src="'+w+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-5-2-复杂场景" tabindex="-1"><a class="header-anchor" href="#_4-5-2-复杂场景" aria-hidden="true">#</a> 4.5.2 复杂场景</h4><figure><img src="'+z+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_4-6-select" tabindex="-1"><a class="header-anchor" href="#_4-6-select" aria-hidden="true">#</a> 4.6 Select</h3><p>从功能上来看，<code>Select</code>跟<code>ForEach</code>是差不多的，区别如下。</p><blockquote><p>Select 返回了一个Query对象</p><p>ForEach 没有返回值</p></blockquote><p>在这里你不用去关心Query对象到底是什么，就跟Java8中的map、filter等等控制函数都会返回Stream一样，通过返回Query，来达到代码中流式编程的目的。</p><h4 id="_4-6-1-简单场景" tabindex="-1"><a class="header-anchor" href="#_4-6-1-简单场景" aria-hidden="true">#</a> 4.6.1 简单场景</h4><figure><img src="'+j+'" alt="select简单场景" width="600" tabindex="0" loading="lazy"><figcaption>select简单场景</figcaption></figure><p>其中<code>SelectT</code>就是遍历了一个集合，然后做了一些运算，将运算之后的结果输出到了新的slice中。</p><p><code>SelectMany</code>为集合中的每一个元素都返回一个Query，跟Java 8中的flatMap类似，flatMap则是为每个元素创建一个Stream。简单来说就是把一个二维数组给它拍平成一维数组。</p><h4 id="_4-6-2-复杂场景" tabindex="-1"><a class="header-anchor" href="#_4-6-2-复杂场景" aria-hidden="true">#</a> 4.6.2 复杂场景</h4><figure><img src="'+S+'" alt="selectManyByT-复杂场景" width="600" tabindex="0" loading="lazy"><figcaption>selectManyByT-复杂场景</figcaption></figure><h3 id="_4-7-group" tabindex="-1"><a class="header-anchor" href="#_4-7-group" aria-hidden="true">#</a> 4.7 Group</h3><figure><img src="'+E+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>Group根据指定的元素对结合进行分组，</code>Group`的源码如下。</p><figure><img src="'+F+'" alt="" width="600" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Key就是我们分组的时候用key，Group就是分组之后得到的对应key的元素列表。</p>',79),Q={href:"https://godoc.org/github.com/ahmetb/go-linq",target:"_blank",rel:"noopener noreferrer"},B=a("h2",{id:"_5-关于go-linq的使用",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#_5-关于go-linq的使用","aria-hidden":"true"},"#"),n(" 5. 关于go-linq的使用")],-1),L=a("p",null,"首先我认为使用go-linq不仅仅是为了“逃脱”检测工具对圈复杂度的检查，而是真正的通过重构自己的代码，让其变的可读性更佳。",-1),N=a("p",null,"举个例子，在某些复杂场景下，使用go-linq反而会让你的代码更加的难以理解。代码是需要给你和后续维护的同学看的，不要盲目的去追求低圈复杂度的代码，而疯狂的使用go-linq。",-1),R=a("p",null,"我个人其实只倾向于使用go-linq对集合的一些操作，其他的复杂情况，好的代码，加上适当的注释，才是不给其他人（包括你自己）挖坑的行为。而且并不是说所有的if else都是烂代码，如果必要的if else能够大大增加代码的可读性，何乐而不为？（这里当然说的不是那种满屏各种if else前套的代码）",-1);function V(A,K){const e=o("ExternalLinkIcon");return c(),p("div",null,[T,a("p",null,[n("对于golang我们可以使用"),a("a",C,[n("gocyclo"),s(e)]),n("来判定圈复杂度，你可以使用"),D,n("快速的安装。然后使用"),I,n("就可以判断了。我们可以新建文件"),M,n("。")]),G,a("p",null,[n("好了，由于篇幅的原因，关于`go-linq的使用就先介绍到这里，感兴趣的可以去"),a("a",Q,[n("go-linq"),s(e)]),n("官网查看全部的用法。")]),B,L,N,R])}const W=i(J,[["render",V],["__file","230865.html.vue"]]);export{W as default};
