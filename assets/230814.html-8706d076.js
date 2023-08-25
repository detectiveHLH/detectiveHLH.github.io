import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as s,c as p,a as e,b as o,d as a,f as t}from"./app-0f9babf2.js";const l="/images/230814/question-invited.jpeg",g="/images/230814/all-questions.jpeg",c="/images/230814/flush-page-list.jpeg",d="/images/230814/dirty-page.jpeg",_="/images/230814/flush-page-strategy.jpeg",h="/images/230814/strategy-detail.jpeg",f={},u=t('<h1 id="mysql-表数据多久刷一次盘" tabindex="-1"><a class="header-anchor" href="#mysql-表数据多久刷一次盘" aria-hidden="true">#</a> MySQL 表数据多久刷一次盘</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>事情是这样的，在某乎的邀请回答中看到了这个问题：</p><p>-<img src="'+l+'" alt="" loading="lazy"></p><p>然后当时我没多想就啪一下写下来这样的答案：</p><blockquote><p>这个其实要通过 MySQL 后台线程来刷的，在 Buffer Pool 中被修改的过的 Page（页）都会被标记成脏页，放到一个链表（Flush 链表）里。</p><p>然后 MySQL 通过启动后台线程，在满足条件时将 Flush 链表中的脏页刷入磁盘。</p><p>满足的条件是：<strong>脏页的数量</strong>达到了 Buffer Pool 中页数量的 <strong>10%</strong>，当然 10% 这个值是可变的，通过配置项 innodb_max_dirty_pages_pct_lwm 来配置的，其默认值为 10%，并且这个值也必须小于另一个配置 innodb_max_dirty_pages_pct 的值（<strong>90%</strong>）。</p><p>至于启多少个线程，则是由另一个变量 innodb_page_cleaners 来控制的，默认是 4.一般都不会去改这个。</p><p>大概就是这样。</p></blockquote><p>但是，后面有兄弟在下面说：”我唔知你喺讲乜“。</p><p>后面我回过头去看，当时写的确实有点过于跳跃了，过一段时间再去看有些不是那么连贯，打算重新把这个事情讲清楚。</p><h2 id="_1-表数据" tabindex="-1"><a class="header-anchor" href="#_1-表数据" aria-hidden="true">#</a> 1. 表数据</h2><p>我们这篇「短文」讨论的是【MySQL 表数据多久刷一次盘】，从这个标题中我们可以分裂成两个问题：</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>刷什么到磁盘</li><li>什么时候刷到磁盘</li></ol><p>我们分开来讨论。</p><h2 id="_2-刷什么到磁盘" tabindex="-1"><a class="header-anchor" href="#_2-刷什么到磁盘" aria-hidden="true">#</a> 2. 刷什么到磁盘</h2><p>看上去有点废话，肯定是将数据刷入磁盘。所以我们更多需要讨论的是【数据是以什么样的形式被刷入磁盘】。</p>',15),m=e("p",null,"答案是页",-1),b={href:"https://mp.weixin.qq.com/s/UgLcleeeAbXPQYp61JB0qQ",target:"_blank",rel:"noopener noreferrer"},x=e("figure",null,[e("img",{src:c,alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),y=e("p",null,[o("在 InnoDB 中，"),e("strong",null,"页"),o("是数据被管理的最小的单位。当使用 InnoDB 作为存储引擎的 MySQL 运行时，表中一行一行的数据会被组织在一页一页当中，放在 Buffer Pool 中。")],-1),B={href:"https://mp.weixin.qq.com/s/D-4m5RZwOjhJpLytiJ5FdA",target:"_blank",rel:"noopener noreferrer"},L=t('<p>这一页一页的数据，就存放在 Buffer Pool 中。当 DML 语句（也就是 CRUD）语句对表数据进行了变更之后，数据所在的那一页就会被标记为<strong>脏页</strong>。</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>InnoDB 会用一个叫【Flush 链表】的结构来存放这些脏页，凡是被放进该链表的页都代表需要<strong>刷入磁盘</strong>，但不是立即刷入。</p><p>和 InnoDB 的其他日志例如 Redo Log 一样，这些日志都是有自己的<strong>刷盘策略</strong>。例如 Redo Log，其刷盘策略可以用下图来表示：</p><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>参数为0，Redo Log 会每隔一秒，写入并且刷入磁盘。</p><p>参数为1，Redo Log 会在每次事务提交之后刷入磁盘</p><p>参数为2，每次事务提交，都会写到 OS 缓存中去，然后每隔一秒将 OS 缓存中的数据刷入磁盘</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而 Flush 链表也有自己的策略。</p><h2 id="_3-什么时候刷到磁盘" tabindex="-1"><a class="header-anchor" href="#_3-什么时候刷到磁盘" aria-hidden="true">#</a> 3. 什么时候刷到磁盘</h2><p>接上节，策略就是：<strong>脏页的数量</strong>达到了 Buffer Pool 中页数量的 <strong>10%</strong>，就会触发将 Flush 链表中的脏页刷入磁盘。举个例子，Buffer Pool 中总共有 100 张页，脏页如果达到了 10 页就会启动后台线程，触发刷盘。</p><p>当然，【10%】这个数值是可配置的，通过 MySQL 配置项 innodb_max_dirty_pages_pct_lwm 可以进行调整，只是默认值是 10%。但是我们调整的值不能超过某个最大值，这个最大值由 innodb_max_dirty_pages_pct 来指定，默认值为 90%。</p><p>换句话说，默认情况，刷盘阈值是 10%，如果需要自定义，则最大值不能超过 90%。</p><h2 id="_4-谁来负责刷盘" tabindex="-1"><a class="header-anchor" href="#_4-谁来负责刷盘" aria-hidden="true">#</a> 4. 谁来负责刷盘</h2><p>上个小节已经说过了，会启动线程来专门做这个事情，这个没有什么疑问。我们需要关注的是会启动多少个线程来做这个事。</p><p>答案是 4 个，我们也可以通过配置项 innodb_page_cleaners 来更改，但一般都不会去改这个值。</p><p>关于这个点就聊到这。</p>',18);function q(k,S){const n=r("ExternalLinkIcon");return s(),p("div",null,[u,e("blockquote",null,[m,e("p",null,[o("对页不太了解的可以去看看之前写的文章："),e("a",b,[o("MySQL 页完全指南——浅入深出页的原理"),a(n)])])]),x,y,e("blockquote",null,[e("p",null,[o("Buffer Pool 可以看另一篇："),e("a",B,[o("详细了解 InnoDB 内存结构及其原理"),a(n)])])]),L])}const D=i(f,[["render",q],["__file","230814.html.vue"]]);export{D as default};
