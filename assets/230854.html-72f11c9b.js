import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as p,a,b as e,d as o,f as c}from"./app-f49d5c61.js";const s="/images/230854/img-1.png",g="/images/230854/img-2.png",d="/images/230854/img-3.png",h="/images/230854/img-4.png",l="/images/230854/img-5.png",f={},m=a("h1",{id:"搜索引擎告诉你如何-论资排辈",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#搜索引擎告诉你如何-论资排辈","aria-hidden":"true"},"#"),e(" 搜索引擎告诉你如何“论资排辈”")],-1),_={href:"https://mp.weixin.qq.com/s/JdJDcSRD5CTnVMJ9BOGICw",target:"_blank",rel:"noopener noreferrer"},u=c('<p>现在我们随便搜索一些数据可能都会找到几十、甚至上百万条结果，如果是较为热门的内容甚至会有上千万条。那如何从这上千万个网页中，找到用户<strong>最想要</strong>的、或者说是跟用户搜索的关键词<strong>最相关</strong>的网页呢？这就是我们本章要探索的内容。</p><h2 id="如何对相关的结果排序" tabindex="-1"><a class="header-anchor" href="#如何对相关的结果排序" aria-hidden="true">#</a> 如何对相关的结果排序</h2><p>“相关”这个词其实并不是一个非黑即白的量化指标，例如大家去搜索「XXX 车测评」或者「XXX 车怎么样」的关键字时，假设搜索到了两篇文章：</p><figure><img src="'+s+'" alt="张三、李四对XXX车的测评" tabindex="0" loading="lazy"><figcaption>张三、李四对XXX车的测评</figcaption></figure><p>其文章内容都是在描述这款车，只是角度不同。那这两篇文章都是符合「相关」的。</p><p>接下来我们思考一个问题：</p><blockquote><p>既然两个网页都相关，那谁该排在前面、谁该排在后面呢？这个排序的评判标准是啥呢？</p></blockquote><p>我们可以通过“<strong>链接</strong>”的方式来实现。举例说明，现在有另外的 4 个用户 A、B、C、D，他们在某些网页里贴了张三、李四车评网页的链接，通过他们的链接，其他的用户可以跳转到张三、李四的网页：</p><figure><img src="'+g+'" alt="用户A、B、C、D贴了张三、李四的网页链接" tabindex="0" loading="lazy"><figcaption>用户A、B、C、D贴了张三、李四的网页链接</figcaption></figure><p>可以看到，用户 A 链接到了张三的网页，而 B、C、D 链接到了李四的网页，张三和李四的链接比例为 <code>1:3</code>，单从链接的数量这个纬度来看，搜索引擎就可以认为李四的网页应该拥有更高的排名。</p><p>大家觉得这样合理吗？</p><p>可能大家还没发现问题在哪儿，我把上面的图换一下内容，大家应该就懂了：</p><figure><img src="'+d+'" alt="用户A、B、C、D的链接内容是负面的" tabindex="0" loading="lazy"><figcaption>用户A、B、C、D的链接内容是负面的</figcaption></figure><p>可以看到，虽然从链接数量上来看，李四更多一些，但这些内容都是负面（咱们先善意假设这些负面内容大概也许可能是真的）。张三虽然只有 1 个链接，但对其评价确实积极正面的。这个时候如果搜索引擎把李四的网页排在前面肯定显的不合适。（当然，这里不考虑张三的网页内容质量也很垃圾，只是找的水军去给的好评）</p><p>虽然如此，上面通过链接的方式也仍然有效，因为贴链接更多的还是用于推荐。但用户 A、B、C、D 却没有上图中那么理想。因为现实中，用户其实是有<strong>权重</strong>的。</p><h2 id="引入权重" tabindex="-1"><a class="header-anchor" href="#引入权重" aria-hidden="true">#</a> 引入权重</h2><p>怎么个权重法呢？</p><p>举个例子，当一个网络上的普通用户告诉你，有个护肤的产品巨好用，你的内心 OS Be like：呵呵，用你告诉我？但要是 XX琦直播间 告诉你，这个护肤的产品巨好用，你可能就会：买它！</p><p>这就是体现权重对我们决策影响的一个很好的例子，把这个实例代入到上面的图中，假设用户 A 是类似于 XX琦直播间 的一个很资深的、广受好评、广受信任的车评人，那他的建议权重肯定会大于其他的普通用户。</p><p>但，计算机并不能像人脑一样判断某某用户是个大 V，他的推荐要排在前面，总归还是需要一个量化的过程，那到底该如何量化呢？底层其实还是链接那一套逻辑。</p><p>假设用户 A 是个大 V，他的主页被很多网页给链接了，我们假设这些“很多”网页都是一些普通的网页，没有其他任何链接指向他们，那么这些网页的权重值就是 1，那么如果有 100 个这样的网页都贴了大 V 的主页，那么大 V 的主页权重值就是 100，如下图所示：</p><figure><img src="'+h+'" alt="在链接的数量模型中加上了权重值" tabindex="0" loading="lazy"><figcaption>在链接的数量模型中加上了权重值</figcaption></figure><p>通过对权重值的计算我们得出，张三网页的排序优先级应该高于李四，因为权重值 <code>100 &gt; 3</code>。</p><p>看到这里，大家是不是觉得这样已经能解决我们开篇的问题了。通过链接 + 权重的方式，能够将相关度较高的网页排在前面。</p><p>不过很遗憾，这套逻辑有个非常大的问题。</p><h2 id="链接的循环引用" tabindex="-1"><a class="header-anchor" href="#链接的循环引用" aria-hidden="true">#</a> 链接的循环引用</h2><p>实际的网页依赖情况可不会像上图这么的理想、清晰、层次分明，很多的网页可能会存在循环依赖的情况，比如：</p><figure><img src="'+l+'" alt="网页在实际的环境中可能存在循环引用" tabindex="0" loading="lazy"><figcaption>网页在实际的环境中可能存在循环引用</figcaption></figure><p>碰上这种循环我们都知道会发生什么，部分网页的权重值会不停的循环、不停的增加，而这显然是不合理的。</p><h2 id="随机访问" tabindex="-1"><a class="header-anchor" href="#随机访问" aria-hidden="true">#</a> 随机访问</h2><p>为了解决这个问题，我们需要使用“随机访问”。</p><p>简要描述就是：从网上随便找个网页开始访问，然后随机点一个链接，然后跳到下一个网页再执行同样的操作。除此之外，“随机访问”还有一个机制：由 15% 的概率不随机从当前网页点链接了，而是直接跳到已经访问过的页面。</p><p>麻瓜描述就是：跟我们平时“网上冲浪“干的事差不多，就好像大家在手机上刷 B 站，点一个首页推荐视频，然后这个视频下面还有推荐，再点，然后继续看关联的视频，然后当你命中了”15%“的概率，厌倦了，就疯狂右滑回到首页，继续点其他的视频，再重复这个过程。</p><p>然后，这套算法会记录每个网页被访问的次数。因为是随机访问，所以当某个网站被其他的网站引用越多，它被访问到的概率就越大。而这个被访问的次数，就是它的权重了。</p><p>由于整套的随机访问是有总次数的限制，并且即使网页之间的链接依赖存在循环，也不会导致权重无限次的增加，因为有 15% 的概率重访问。这样一来就能能够解决上面的死循环问题。 本质上，随机访问的底层逻辑还是依赖权重的思想，只不过权重的计算模式稍微换了一下。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>上面这一套算法也叫 PageRank，由 Google 的两位创始人拉里·佩奇（Larry Page）和谢尔盖·布林（Sergey Brin）在 1998 年的一篇论文《The Anatomy of a Large-Scale Hypertextual Web Search Engine》中提出。Page 是一语双关，它既是创始人的名字，也代表网页的排序。</p><p>只不过实际中的情况肯定只会更复杂，所以实际的随机访问算法和上面描述的略有不同。举个例子，我想要推广我的网页 XX，那我可以搞一堆其他的无关紧要的网页，在里面链上网页 XX 的地址，以此来刷权重值，而这明显是不符合预期的。并且，成百上千亿的网页，如果真的要运行随机访问算法，耗时可想而知，所以 PageRank 并不能被实际应用。并且实际的生产场景，不可能只通过这一个纬度来评判网页的重要性。</p><p>不过，PageRank 的核心思想 —— 网页权重值的传递仍然是有效的。</p>',39);function X(x,b){const i=r("ExternalLinkIcon");return t(),p("div",null,[m,a("p",null,[e("在前文「"),a("a",_,[e("搜索引擎告诉你如何大海捞针"),o(i)]),e("」中，我们简要的描述了搜索引擎是如何从成百上千亿的网站中，快速的搜索到我们要找的内容。但能够搜索到结果只是搜索流程中的一部分，还有另一个很重要组成部分 —— 排序。")]),u])}const A=n(f,[["render",X],["__file","230854.html.vue"]]);export{A as default};
