import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as c,c as i,a as r,b as e,d as s,f as n}from"./app-f14ab02f.js";const t="/images/23088/intro-for-page.jpeg",p="/images/23088/single-linked-list-in-page.jpeg",g="/images/23088/infimum-supremum.jpeg",l="/images/23088/use-page-directory.jpeg",h="/images/23088/use-binary-search-in-page-directory.jpeg",f="/images/23088/true-face-for-page.jpeg",m="/images/23088/file-header.jpeg",u="/images/23088/page-header-detail.jpeg",_="/images/23088/sorted-user-record-list.jpeg",y="/images/23088/file-trailer.jpeg",P={},b=r("h1",{id:"mysql-页完全指南——浅入深出页的原理",tabindex:"-1"},[r("a",{class:"header-anchor",href:"#mysql-页完全指南——浅入深出页的原理","aria-hidden":"true"},"#"),e(" MySQL 页完全指南——浅入深出页的原理")],-1),x=r("strong",null,"页",-1),R={href:"https://mp.weixin.qq.com/s/D-4m5RZwOjhJpLytiJ5FdA",target:"_blank",rel:"noopener noreferrer"},S=n('<p>我发现有好几次都需要提到页，那我就正好拿一篇来详细的讲讲 InnoDB 中的页。</p><h2 id="页是什么" tabindex="-1"><a class="header-anchor" href="#页是什么" aria-hidden="true">#</a> 页是什么</h2><p>首先，我们需要知道，<strong>页（Pages）<strong>是 InnoDB 中管理数据的</strong>最小单元</strong>。Buffer Pool 中存的就是一页一页的数据。再比如，当我们要查询的数据不在 Buffer Pool 中时，InnoDB 会将记录所在的页整个加载到 Buffer Pool 中去；同样的，将 Buffer Pool 中的脏页刷入磁盘时，也是按照页为单位刷入磁盘的。</p><blockquote><p>不了解 Buffer Pool 的、或者感兴趣的可以去文章开头给的链接熟悉一下</p></blockquote><h2 id="页的概览" tabindex="-1"><a class="header-anchor" href="#页的概览" aria-hidden="true">#</a> 页的概览</h2><p>我们往 MySQL 插入的数据最终都是存在页中的。在 InnoDB 中的设计中，页与页之间是通过一个<strong>双向链表</strong>连接起来。</p><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而存储在页中的一行一行的数据则是通过<strong>单链表</strong>连接起来的。</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图中的 <code>User Records</code> 的区域就是用来存储行数据的。那 InnoDB 为什么要这么设计？假设我们没有页这个概念，那么当我们查询时，成千上万的数据要如何做到快速的查询出结果？众所周知，MySQL 的性能是不错的，而如果没有页，我们剩下的只能是逐条逐条的遍历数据了。</p><p>那页是如何做到快速查询的呢？在当前页中，可以通过 <code>User Records</code> 中的连接每条记录的单链表来进行遍历，如果在当前页中没有找到，则可以通过<strong>下一页指针</strong>快速的跳到下一页进行查询。</p><h2 id="infimum-和-supremum" tabindex="-1"><a class="header-anchor" href="#infimum-和-supremum" aria-hidden="true">#</a> Infimum 和 Supremum</h2><p>有人可能会说了，你在 <code>User Records</code> 中还不是通过遍历来解决的，你就是简单的把数据分了个组而已。如果我的数据根本不在当前这个页中，那我难道还是得把之前的页中的每一条数据全部遍历完？这效率也太低了</p><p>当然，MySQL 也考虑到了这个问题，所以实际上在页中还存在一块区域叫做 <code>The Infimum and Supremum Records</code> ，代表了当前页中<strong>最大</strong>和<strong>最小</strong>的记录。</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>有了 <code>Infimum Record</code> 和 <code>Supremum Record</code> ，现在查询不需要将某一页的 <code>User Records</code> 全部遍历完，只需要将这两个记录和待查询的目标记录进行比较。比如我要查询的数据 <code>id = 101</code> ，那很明显不在当前页。接下来就可以通过<strong>下一页指针</strong>跳到下页进行检索。</p><h2 id="使用page-directory" tabindex="-1"><a class="header-anchor" href="#使用page-directory" aria-hidden="true">#</a> 使用Page Directory</h2><p>可能有人又会说了，你这 <code>User Records</code> 里不也全是单链表吗？即使我知道我要找的数据在当前页，那最坏的情况下，不还是得挨个挨个的遍历100次才能找到我要找的数据？你管这也叫效率高？</p><p>不得不说，这的确是个问题，不过是一个 MySQL 已经考虑到的问题。不错，挨个遍历确实效率很低。为了解决这个问题，MySQL 又在页中加入了另一个区域 <code>Page Directory</code> 。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>顾名思义，<code>Page Directory</code> 是个目录，里面有很多个<strong>槽位（Slots）</strong>，每一个槽位都指向了一条 <code>User Records</code> 中的记录。大家可以看到，每隔几条数据，就会创建一个槽位。其实我图中给出的数据是非常严格按照其设定来的，在一个完整的页中，<strong>每隔6条数据就会有一个 Slot。</strong></p><blockquote><p>Page Directory 的设计不知道有没有让你想起另一个数据结构——跳表，只不过这里只抽象了一层索引</p></blockquote><p>MySQL 会在新增数据的时候就将对应的 Slot 创建好，有了 <code>Page Directory</code> ，就可以对一张页的数据进行粗略的<strong>二分查找</strong>。至于为什么是粗略，毕竟 <code>Page Directory</code> 中不是完整的数据，二分查找出来的结果只能是个大概的位置，找到了这个大概的位置之后，还需要回到 <code>User Records</code> 中继续的进行挨个遍历匹配。</p><p>不过这样的效率已经比我们刚开始聊的原始版本高了很多了。</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="页的真实面貌" tabindex="-1"><a class="header-anchor" href="#页的真实面貌" aria-hidden="true">#</a> 页的真实面貌</h2><p>如果我开篇就把页的各种组成部分，各种概念直接抛出来，首先我自己接受不了，这样显得很僵硬。其次，对页不熟悉的人应该是不太能理解页为什么要这么设计的。所以我按照查询一条数据的一套思路，把页的大致的面貌呈现给了大家。</p><p>实际上，页上还存储了很多其他的字段，也还有其他的区域，但是这些都不会影响到我们对页的理解。所以，在对页有了一个较为清晰的认知之后，我们就可以来看看真实的页到底长啥样了。</p><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图就是页的实际全部组成，除了我们之前提到过的，还多了一些之前没有聊过的，例如 <code>File Header</code>、<code>Page Header</code>、<code>Free Space</code>、<code>File Tailer</code> 。我们一个一个来看。</p><h3 id="file-header" tabindex="-1"><a class="header-anchor" href="#file-header" aria-hidden="true">#</a> File Header</h3><p>其实<code>File Header</code> 在上文已经聊过了，只是不叫这个名字。上面提到的<strong>上一页指针</strong>和<strong>下一页指针</strong>其实就是属于<code>File Header</code>的，除此之外还有很多其他的数据。</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其实我比较抗拒把一堆参数列出来，告诉你这个大小多少，那个用来干嘛。对于我们需要详细了解页来说，其实暂时只需要知道两个就足够了，分别是：</p><ul><li>FIL_PAGE_PREV</li><li>FIL_PAGE_NEXT</li></ul><p>这两个变量就是上文提到过的<strong>上一页指针</strong>和<strong>下一页指针</strong>，说是指针，是为了方便大家理解，实际上是页在磁盘上的偏移量。</p><h3 id="page-header" tabindex="-1"><a class="header-anchor" href="#page-header" aria-hidden="true">#</a> Page Header</h3><p>比起 <code>File Header</code> ，<code>Page Header</code> 中的数据对我们来说就显得更加熟悉了，我这里画了一张图，把里面的内容详细的列了出来。</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里全列出来是因为了解这些参数的含义和为什么要设置参数，能够更好的帮助我们了解页的原理和构造，具体的看图说话就行。</p><p>这里也很想吐槽，太多博客都写的太<strong>僵硬</strong>，比如参数 <code>PAGE_HEAP_TOP</code> ，这里的 <code>HEAP</code> 很多博客都直接叫<strong>堆</strong>。这就跟你给<code>Init</code>写注释叫初始化一样，还不如不写。实际上你去研究一下就会知道，这里的堆实际上就是指<strong>User Records</strong>。</p><p>里面有个两个参数可能会有点混淆，分别是<code>PAGE_N_HEAP</code>和<code>PAGE_N_RECS</code> ，都是当前 <code>User Records</code> 中记录的数量，唯一的不同在于，<code>PAGE_N_HEAP</code> 中是包含了<strong>被标记为删除</strong>的记录的， 而 <code>PAGE_N_RECS</code> 中就是实际上我们能够查询到的所有数据。</p><h3 id="infimum-supremum-records" tabindex="-1"><a class="header-anchor" href="#infimum-supremum-records" aria-hidden="true">#</a> Infimum &amp; Supremum Records</h3><p>上文中提到，<code>Infimum &amp; Supremum Records</code>会记录当前页最大最小记录。实际上不准确，更准确的描述是最小记录和最大纪录的开区间。因为实际上 <code>Infimum Records</code> 会比当前页中的最小值还要小，而 <code>Supremum Records</code> 会比当前页中的最大值要大。</p><h3 id="user-records" tabindex="-1"><a class="header-anchor" href="#user-records" aria-hidden="true">#</a> User Records</h3><p><code>User Records</code> 可以说是我们平时接触的最多的部分了，毕竟我们的数据最终都在这。页被初始化之后，<code>User Records</code> 中是没有数据的，随着系统运行，数据产生，<code>User Records</code> 中的数据会不断的膨胀，相应的 <code>Free Space</code> 空间会慢慢的变小。</p><p>关于 <code>User Records</code> 中的概念，之前已经聊过了。这里只聊我认为很关键的一点，那就是<strong>顺序</strong>。</p><p>我们知道，在聚簇索引中，Key 实际上会按照 <code>Primary Key</code> 的顺序来进行排列。那在 <code>User Records</code> 中也会这样吗？我们插入一条新的数据到 <code>User Records</code> 中时，是否也会按照 <code>Primary Key</code> 的顺序来对已有的数据重排序？</p><p>答案是<strong>不会</strong>，因为这样会拉低 MySQL 处理的效率。</p><p><code>User Records</code> 中的数据是由单链表指针的指向来保证的，也就是说，行数据实际在磁盘上的表现，是按照<strong>插入顺序</strong>来排队的，先到的数据在前面，后来的数据在后面。只不过通过 <code>User Records</code> 中的行数据之间的单链表形成了一个按照 <code>Primary Key</code>排列的顺序。</p><p>用图来表示，大概如下：</p><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="free-space" tabindex="-1"><a class="header-anchor" href="#free-space" aria-hidden="true">#</a> Free Space</h3><p>这块其实变相的在其他的模块中讨论了，最初 <code>User Records</code> 是完全空的，当有新数据进来时，会来 <code>Free Space</code> 中申请空间，当 <code>Free Space</code> 没空间了，则说明需要申请新的页了，其他没什么特别之处。</p><h3 id="page-directory" tabindex="-1"><a class="header-anchor" href="#page-directory" aria-hidden="true">#</a> Page Directory</h3><p>这跟上文讨论的没什么出入，就直接跳过了。</p><h3 id="file-trailer" tabindex="-1"><a class="header-anchor" href="#file-trailer" aria-hidden="true">#</a> File Trailer</h3><p>这块主要是为了防止页在刷入磁盘的过程中，由于极端的意外情况（网络问题、火灾、自然灾害）导致失败，而造成数据不一致的情况，也就是说形成了脏页。</p><p>里面有只有一个组成部分：</p><figure><img src="'+y+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>到此，我认为关于<strong>页</strong>的所有东西就聊的差不多了，了解了底层的页原理，我个人认为是有助于我们更加友好、理智的使用 MySQL 的，使其能发挥出自己应该发挥的极致性能。</p>',62);function U(E,I){const o=d("ExternalLinkIcon");return c(),i("div",null,[b,r("p",null,[e("之前写了一些关于 MySQL 的 InnoDB 存储引擎的文章，里面好几次都提到了"),x,e("这个概念，但是都只是简要的提了一下。例如之前在聊 "),r("a",R,[e("InnoDB内存结构"),s(o)]),e(" 时提到过，但当时的重点是内存架构，就没有展开深入。")]),S])}const F=a(P,[["render",U],["__file","23088.html.vue"]]);export{F as default};
