import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,b as n,d as p,f as a}from"./app-5a161a5d.js";const l={},r=a(`<h1 id="是时候拥有一个你自己的命令行工具了" tabindex="-1"><a class="header-anchor" href="#是时候拥有一个你自己的命令行工具了" aria-hidden="true">#</a> 是时候拥有一个你自己的命令行工具了</h1><p>本篇博客主要介绍了如何使用commander, inquirer以及chalk从零开始，创建属于自己的命令行工具。</p><h2 id="一分钟体验" tabindex="-1"><a class="header-anchor" href="#一分钟体验" aria-hidden="true">#</a> 一分钟体验</h2><p>首先我们先花一分钟的时间，体验一下创建自己的命令行cli工具是什么感觉。</p><h3 id="新建项目目录" tabindex="-1"><a class="header-anchor" href="#新建项目目录" aria-hidden="true">#</a> 新建项目目录</h3><p>假如我们的项目名称叫<code>hello-cli</code>，使用如下命令新建项目目录。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> hello-cli <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> hello-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="初始化项目" tabindex="-1"><a class="header-anchor" href="#初始化项目" aria-hidden="true">#</a> 初始化项目</h3><p>接下里使用npm-init命令来初始化一个简单的package.json文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> init <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>-y</code>命令表示接受npm的一切默认参数设置。然后替换package.json为如下代码。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;hello-cli&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;index.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;bin&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hello&quot;</span><span class="token operator">:</span> <span class="token string">&quot;hello&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;keywords&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;author&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;license&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ISC&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;chalk&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.4.2&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;commander&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.20.0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;inquirer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^6.3.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;shelljs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^0.8.3&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后使用<code>npm install</code>安装依赖。</p><h3 id="新建入口文件" tabindex="-1"><a class="header-anchor" href="#新建入口文件" aria-hidden="true">#</a> 新建入口文件</h3><p>在项目根目录下新建名为<code>hello</code>的文件，不需要任何后缀，值得注意的是此时的文件名就是你的cli工具第一个键入的命令，例如<code>npm install</code>，那么<code>hello</code>就等价于<code>npm</code>。并将代码替换如下。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token hashbang comment">#! /usr/bin/env node</span>

<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;commander&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> inquirer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;inquirer&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chalk <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;chalk&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program
  <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;init&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">alias</span><span class="token punctuation">(</span><span class="token string">&#39;i&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">&#39;初始化项目&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token parameter">option</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 该对象用于存储所有与用户交互的数据</span>
    <span class="token keyword">let</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token comment">// 假设我们需要用户自定义项目名称</span>
      <span class="token literal-property property">projectName</span><span class="token operator">:</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 使用chalk打印美化的版本信息</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span>default<span class="token punctuation">.</span><span class="token function">bold</span><span class="token punctuation">(</span><span class="token string">&#39;hello v1.0.0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 用于存储所有的交互步骤，例如让用户输入项目名称就是其中一个步骤</span>
    <span class="token keyword">let</span> promps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>config<span class="token punctuation">.</span>projectName <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      promps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;projectName&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;请输入项目名称&#39;</span><span class="token punctuation">,</span>
        <span class="token function-variable function">validate</span><span class="token operator">:</span> <span class="token parameter">input</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&#39;项目名称不能为空&#39;</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 更新对象中属性的数据</span>
          config<span class="token punctuation">.</span>projectName <span class="token operator">=</span> input<span class="token punctuation">;</span>
          <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 至此，与用户的所有交互均已完成，answers是收集到的用户所填的所有数据</span>
    <span class="token comment">// 同时，这也是你开始操作的地方，这个cli工具的核心代码应该从这个地方开始</span>
    inquirer<span class="token punctuation">.</span><span class="token function">prompt</span><span class="token punctuation">(</span>promps<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">answers</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// do something here</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>answers<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

program<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npm-link" tabindex="-1"><a class="header-anchor" href="#npm-link" aria-hidden="true">#</a> npm link</h3><p>那么问题来了，<br> 在你的项目根目录下使用<code>npm link</code>，然后在你本地上就相当于安装了名为<code>hello-cli</code>这样的一个全局npm包了。其原理是将你本地的项目在全局的node_modules中做了一个软链接，拿此项目举例，全局的<code>hello</code>命令已经指向了你的本地目录。如果你想取消测试项目在全局中的映射，同样的进入项根目录，输入命令<code>npm unlink</code>即可。</p><p>然后搭配以下命令食用你的第一个cli工具吧。如果报错提示没有权限，在命令前加上sudo即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hello init
<span class="token comment"># 或者</span>
<span class="token comment"># hello i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commander" tabindex="-1"><a class="header-anchor" href="#commander" aria-hidden="true">#</a> commander</h2>`,21),u={href:"https://github.com/tj/commander.js",target:"_blank",rel:"noopener noreferrer"},d=s("code",null,"command",-1),k=s("code",null,"alias",-1),m=s("code",null,"description",-1),v=s("code",null,"action",-1),h=a("<ul><li><p>command <code>command</code>代表了这个cli工具向用户暴露的命令行指令。我们还是拿<code>npm install</code>来举例子，<code>command(&#39;init&#39;)</code>声明了一个叫init的命令，在此处，init等价于install</p></li><li><p>alias <code>alias</code>是对于当前命令行指令的更短的指令。例如大家都知道，<code>npm install</code>可以简写为<code>npm i</code>。<code>i</code>就是定义的alias</p></li><li><p>description <code>description</code>是对当前命令行指令的描述，commander会自动的生成当前cli工具的帮助文档，而该描述就会在<code>hello -h</code>中展示，如果你的一分钟体验项目还在的话，在命令行中输入<code>hello -h</code>就可以看到自动生成的帮助文档了</p></li><li><p>action <code>action</code>是我们注册我们自己回调函数的地方</p></li><li><p>parse <code>parse</code>命令则是解析命令行</p></li></ul>",1),b={href:"https://hexo.io/zh-cn/index.html",target:"_blank",rel:"noopener noreferrer"},g=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hexo new post <span class="token variable">$YOUR_POST_NAME</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>没用过也没关系，这个命令是用于创建一个可以自定义名字的Markdown的文档的。大家可能会发现，上面的命令包含了4个单词，而我们的例子中只有两个。那是因为一分钟项目中没有使用commander的<code>option</code>API。</p><p>如果你想在hello项目中实现一样的命令，那么只需要在program中调用该API即可。<code>.option(&#39;-p, --post&#39;, &#39;add post&#39;)</code>，然后就可以通过<code>option</code>参数获取到-p后面，用户输入的参数的值。</p><h2 id="inquirer" tabindex="-1"><a class="header-anchor" href="#inquirer" aria-hidden="true">#</a> inquirer</h2>`,4),q={href:"https://github.com/SBoudrias/Inquirer.js/",target:"_blank",rel:"noopener noreferrer"},f=a(`<p>通过inquirer，我们可以实现输入框，获取用户的输入数据，还可以实现选择框。举个例子，用过antd-design-pro应该熟悉创建项目的流程。在命令行中输入命令<code>yarn create umi</code>，在之后的流程中就会出现一个可选择的list。只需要将步骤中的代码替换成如下即可。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>promps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;list&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;projectName&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;请输入项目名称&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">choices</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ant-design-pro&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;ant-design-pro&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;dva&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;dva&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在项目中，还使用了<code>validate</code>来对用户的输入数据进行验证，如果不需要验证的话，直接把validate整个代码删除掉就好。</p><h2 id="chalk" tabindex="-1"><a class="header-anchor" href="#chalk" aria-hidden="true">#</a> chalk</h2>`,4),y={href:"https://github.com/chalk/chalk",target:"_blank",rel:"noopener noreferrer"},_=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用默认的字体颜色，加粗字体</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span>default<span class="token punctuation">.</span><span class="token function">bold</span><span class="token punctuation">(</span><span class="token string">&#39;hello v1.0.0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 打印蓝色的提示信息</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token punctuation">.</span><span class="token function">blue</span><span class="token punctuation">(</span><span class="token string">&#39;hello v1.0.0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 字符串模板用法，在同一行中打印不同样式的信息</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>chalk<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">{white.bold [1/3]} 🔍</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span> chalk<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">{default.bold Clone project into local path...}</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function x(j,w){const e=o("ExternalLinkIcon");return c(),i("div",null,[r,s("p",null,[s("a",u,[n("commander"),p(e)]),n("是一个Node.js环境下的命令行接口解决方案。在上面的一分钟体验例子中，我们用到了"),d,n(","),k,n(","),m,n(","),v,n("这四个API。")]),h,s("p",null,[n("下面是一分钟体验项目中没有使用的命令，option。还是举一个例子。如果有用过"),s("a",b,[n("hexo"),p(e)]),n("的应该熟悉这个命令。")]),g,s("p",null,[n("大家也发现了，在命令行输入init命令后，我们需要不停地与命令行进行交互拿到数据，但是在代码里并没有怎么体现，这是因为我们用了"),s("a",q,[n("inquirer"),p(e)]),n("来帮我们做这些事情。")]),f,s("p",null,[s("a",y,[n("chalk"),p(e)]),n("没有什么好介绍的，官网上的文档已经写的很详细了。给大家列一下项目中使用的例子就好。")]),_])}const E=t(l,[["render",x],["__file","23091.html.vue"]]);export{E as default};
