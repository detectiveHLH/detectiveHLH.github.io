import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o,c,a as n,b as s,d as e,f as t}from"./app-6d5c7683.js";const l="/images/23093/img-1.gif",r="/images/23093/img-2.jpg",u="/images/23093/img-3.jpg",d="/images/23093/img-4.jpg",v="/images/23093/img-5.jpg",k={},m=t('<h1 id="【硬核教程】只需1秒—你也可以有自己的api文档" tabindex="-1"><a class="header-anchor" href="#【硬核教程】只需1秒—你也可以有自己的api文档" aria-hidden="true">#</a> 【硬核教程】只需1秒—你也可以有自己的API文档</h1><blockquote><p>Nothing is true. Everything is permitted.</p></blockquote><h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面" aria-hidden="true">#</a> 写在前面</h2><p>先聊聊<strong>为什么</strong>想到了要用Vuepress来代替原来写在Confluence上的文档。</p><p>大意是有个需要其他部门接入的项目，这个项目有个用md写的<strong>接入文档</strong>，其他部门的人需要看着这个文档才知道怎么接以及哪些东西需要接。</p><p>但是有个问题是这个文档长的一匹，有多长呢？</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而且这个md文件是放在confluence上的。</p><p>本身用confluence阅读md的体验就不好，这个文档能够让你的滚轮滚个足足十多秒，skr~。</p><p>你想要看的某个小章节就藏在这一大坨文字里。即使从最上面的导航锚点定位到了想要看的地方，但是你看着看着，滑着滑着就不知道自己在哪儿了。</p><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后找了半天，要么你运气好找到了。要么就只有回到最上面的导航，在一堆导航里再找一次。如果你运气究极不好，可能还要把上面的步骤重复几次，真的到了那个时候，你的心态可能就炸了。还接个毛的业务，心里只想找到写文档的人，然后一顿操作。</p><p>这就是为什么，我想换个方式来展示这个<strong>接口文档</strong>。</p><p>说到这个，又不得不吐槽。去网上找了很多vuepress的使用，总体下来两个字，<strong>复杂</strong>。再去看看vuepress的官方文档（虽然最后的解决方案都是在官方找到的），总结下来也是两个字，<strong>懵逼</strong>（因为我想找的那个地方藏得比较深）。</p><p>于是就有了写这一期<strong>硬核教程</strong>。</p><h2 id="don-t-bb-你这个项目启起来到底啥样" tabindex="-1"><a class="header-anchor" href="#don-t-bb-你这个项目启起来到底啥样" aria-hidden="true">#</a> Don&#39;t BB, 你这个项目启起来到底啥样？</h2><p>我看的很多教程，都是在没有背景、没有代码、没有效果的情况就开始了。让本来希望通过这个教程入门的人懵上加懵（比如我）。</p>',17),b={href:"https://github.com/detectiveHLH/vuepress-demo",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,[n("strong",null,"墙裂建议"),s("，先拉下来看看效果。")],-1),h=n("p",null,[s("直接"),n("code",null,"npm install"),s("安装完依赖之后，直接"),n("code",null,"npm start"),s("即可。在你本地的8080端口就会运行一个如下的界面。")],-1),y={href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"},f=t('<figure><img src="'+u+'" alt="首页" tabindex="0" loading="lazy"><figcaption>首页</figcaption></figure><p>然后点<strong>开始开发</strong>会进入到如下的详细界面。</p><figure><img src="'+d+`" alt="详情" tabindex="0" loading="lazy"><figcaption>详情</figcaption></figure><p>左边就是我们需要详细展示的文档，可以看到我简单的分了两类作为样例。</p><h2 id="好了好了-效果看到了-show-me-the-code" tabindex="-1"><a class="header-anchor" href="#好了好了-效果看到了-show-me-the-code" aria-hidden="true">#</a> 好了好了，效果看到了，Show me the code</h2><p>首先，这个项目的目录长这样。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── .vuepress
│   ├── config.js
│   ├── public
│   │   └── logo.jpg
│   └── router.js
├── LICENSE
├── README.md
├── groupA
│   ├── README.md
│   └── 类别A的李四.md
├── groupB
│   ├── README.md
│   └── 类别B的张三.md
├── package-lock.json
└── package.json

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来就分别将一下首页和详情页是怎么来的，以及如果需要加一个页面（也就是路由）该怎么做。</p><h2 id="首先是首页" tabindex="-1"><a class="header-anchor" href="#首先是首页" aria-hidden="true">#</a> 首先是首页</h2><p>项目的根目录下的README.md就是你刚刚看到的<strong>首页</strong>。里面的源码长这样，你可以对比首页来看。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> /logo.jpg
<span class="token key atrule">heroText</span><span class="token punctuation">:</span> 你的标题
<span class="token key atrule">tagline</span><span class="token punctuation">:</span> 你的副标题
<span class="token key atrule">lang</span><span class="token punctuation">:</span> en<span class="token punctuation">-</span>US
<span class="token key atrule">actionText</span><span class="token punctuation">:</span> 开始开发 →
<span class="token key atrule">actionLink</span><span class="token punctuation">:</span> /groupA/
<span class="token key atrule">features</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 吹🐂🍺
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 这是吹🐂🍺的详情
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 继续吹🐂🍺
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 这是继续吹🐂🍺的详情
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 再继续吹🐂🍺
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 这是再继续吹🐂🍺的详情
<span class="token key atrule">footer</span><span class="token punctuation">:</span> MIT Licensed <span class="token punctuation">|</span> Copyright © 2019<span class="token punctuation">-</span>present LunhaoHu</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没错，不用你去写任何的JavaScript和CSS，全部都是基于配置的。</p><p>配成上面这样，你就可以看到刚刚那个首页。</p><blockquote><p>顺嘴一提，只要你把图片放在了<code>.vuepress</code>的public目录下，那么写图片src的时候可以直接<code>/你的图片名</code>即可。</p></blockquote><h2 id="然后是详情页" tabindex="-1"><a class="header-anchor" href="#然后是详情页" aria-hidden="true">#</a> 然后是详情页</h2><p>可以看到，在<strong>首页</strong>的配置中，有一个<code>actionLink</code>，这个是指点了<strong>首页</strong>中的开始开发，需要跳转到的路由。这个就是我们众多详情中的其中一个页面的路由。</p><p>你可以对比刚刚详情页的图片。我们之所以能够看到左边的侧边栏，是因为在<code>config.js</code>里配置了<code>sidebar</code>这个属性。如下。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./router&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">smoothScroll</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;需要你在config.js里单独配的标题&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">sidebar</span><span class="token operator">:</span> router<span class="token punctuation">.</span><span class="token function">getSidebar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;vuepress-plugin-smooth-scroll&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我这里只用了一个插件，但是我展示出了用插件的<strong>正确姿势</strong>，vuepress有很多插件，如果需要可以自己按需安装。</p><p>你可能看到了，最终的<code>sidebar</code>是通过一个函数生成的。</p><p><code>router.js</code>在vuepress中本身没有，是我做的一个简单抽象，里面长这样。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;title&#39;</span><span class="token operator">:</span> <span class="token string">&#39;类别A&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;path&#39;</span><span class="token operator">:</span> <span class="token string">&#39;/groupA/&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;children&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&#39;类别A的李四&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;title&#39;</span><span class="token operator">:</span> <span class="token string">&#39;类别B&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;path&#39;</span><span class="token operator">:</span> <span class="token string">&#39;/groupB/&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;children&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&#39;类别B的张三&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 生成sidebar数据
 *
 * <span class="token keyword">@param</span> <span class="token parameter">data</span> 上面定义的抽象侧边栏路由静态文件
 */</span>
exports<span class="token punctuation">.</span><span class="token function-variable function">getSidebar</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> sidebar <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sidebar<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> item<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> childrenPath <span class="token operator">=</span> item<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            item<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">.</span>path <span class="token operator">+</span> childrenPath<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        sidebar<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> sidebar<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>getSidebar</code>这个函数，大意就是给所有的children加上了一个前缀path。因为vuepress本身需要你配置成这样。例如，如果你直接使用的话，路由就会变成这样。</p><blockquote><p><strong>注意</strong>，以下不是正确打开方式</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>[
  {
    title: &#39;类别A&#39;,
    path: &#39;/groupA/&#39;,
    children: [
      &#39;/groupA/类别A的李四&#39;
    ]
  },
  {
    title: &#39;类别B&#39;,
    path: &#39;/groupB/&#39;,
    children: [
      &#39;/groupB/类别B的张三&#39;,
    ]
  }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在children中再加前缀，显得很没有必要。所以我简单的做了一层抽象。</p><p>那么如果你要加一个页面要怎么做呢？</p><p>举个例子，加入你要在项目目录<code>groupA</code>中新建一个叫<code>类别A的王五.md</code>的md文件，那么你只需要在对应的router中，找到<code>groupA</code>这个类别，然后在children数组中再加一个<code>类别A的王五</code>即可。如下。</p><blockquote><p>正确打开方式</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;title&#39;</span><span class="token operator">:</span> <span class="token string">&#39;类别A&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;path&#39;</span><span class="token operator">:</span> <span class="token string">&#39;/groupA/&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;children&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&#39;类别A的李四&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;类别A的王五&#39;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;title&#39;</span><span class="token operator">:</span> <span class="token string">&#39;类别B&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;path&#39;</span><span class="token operator">:</span> <span class="token string">&#39;/groupB/&#39;</span><span class="token punctuation">,</span>
        <span class="token string-property property">&#39;children&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&#39;类别B的张三&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以在详情多看到一些页面了。</p><blockquote><p>值得注意的是，groupA和groupB的目录下的README文件就是你点击类别A这个分组显示的默认页面。</p><p>在vuepress中，如果路由以<code>/</code>结尾，那么就是指的这个目录下的README.md文件</p></blockquote><p>还有一点很方便的是，单个文件里如果你有二级标题，vuepress会自动的生成该文件下的二级标题导航。点击相应的二级标题还可以直接跳转到对应的锚点，如下图。</p><figure><img src="`+v+'" alt="自动生成锚点" tabindex="0" loading="lazy"><figcaption>自动生成锚点</figcaption></figure><h2 id="如2你还需要更多功能" tabindex="-1"><a class="header-anchor" href="#如2你还需要更多功能" aria-hidden="true">#</a> 如2你还需要更多功能</h2><p>如果你作为一个后端开发， 要想展示你的文档，其实我认为完全够了。</p>',36),_={href:"https://vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"};function x(A,j){const a=i("ExternalLinkIcon");return o(),c("div",null,[m,n("blockquote",null,[n("p",null,[s("Github地址："),n("strong",null,[n("a",b,[s("-> 戳此 <-"),e(a)])])]),g]),h,n("blockquote",null,[n("p",null,[s("并不是自动打开浏览器，需要手动进入"),n("a",y,[s("本地项目地址"),e(a)])])]),f,n("p",null,[s("不过你还需要更多功能的话，建议还是直接去"),n("a",_,[s("vuepress官网"),e(a)]),s("查看对应的文档。")])])}const w=p(k,[["render",x],["__file","23093.html.vue"]]);export{w as default};
