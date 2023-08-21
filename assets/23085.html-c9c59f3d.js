import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as s,c as g,a as t,b as i,d as p,f as n}from"./app-2e9c1c72.js";const c="/images/23085/what-is-index.jpeg",l="/images/23085/why-we-use-index.jpeg",d="/images/23085/for-speed-up.jpeg",f="/images/23085/what-if-have-none-primary-key.jpeg",h="/images/23085/have-empty-unique-index.jpeg",m="/images/23085/16-columns-at-most.jpeg",u="/images/23085/not-the-same-b-tree.jpeg",B="/images/23085/what-is-b-plus-tree-look-like.jpeg",o="/images/23085/what-is-a-b-tree-look-like.jpeg",_="/images/23085/there-is-no-difference.jpeg",y="/images/23085/what-is-the-benifit.jpeg",b="/images/23085/a-demo-for-search.jpeg",I="/images/23085/hehe.jpeg",x={},k=n('<h1 id="浅入浅出-mysql-索引" tabindex="-1"><a class="header-anchor" href="#浅入浅出-mysql-索引" aria-hidden="true">#</a> 浅入浅出 MySQL 索引</h1><p>索引是什么？为什么要有mysql 索引，解决了什么问题，其底层的原理是什么？为什么使用B+树做为解决方案？用其他的像哈希索引或者B树不行吗？</p><h2 id="简单了解索引" tabindex="-1"><a class="header-anchor" href="#简单了解索引" aria-hidden="true">#</a> 简单了解索引</h2><p>首先，索引（Index）是什么？如果我直接告诉你索引是<strong>数据库管理系统中的一个有序的数据结构</strong>，你可能会有点懵逼。</p><figure><img src="'+c+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为了避免这种情况，我打算举几个例子来帮助你更容易的认识<strong>索引</strong>。</p><blockquote><p>我们查询字典的时候可以根据字的部首、笔画来查找到对应的字，这样可以快速的找到对应的字所在页，在字典开头那玩意就叫<strong>索引</strong></p><p>还有一本书的目录，可以帮我们快速的跳到不同的章节，此时这里的目录也是<strong>索引</strong></p><p>甚至，景区的地图，会告诉你你现在在哪里，其他景点在哪儿，这个地图从某些方面来说也是<strong>索引</strong></p></blockquote><p>再结合开篇较专业的解释，你可能就能够理解索引是什么了。</p><figure><img src="'+l+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="为什么需要索引" tabindex="-1"><a class="header-anchor" href="#为什么需要索引" aria-hidden="true">#</a> 为什么需要索引</h2><p>了解了索引的概念，我们就需要知道为什么我们需要索引？从刚刚的例子可以看出来，索引的存在的目的就是：</p><figure><img src="'+d+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>字典中的索引帮助我们快速的找到对应的字</p></li><li><p>书的目录帮助我们快速的跳到我们需要看的章节</p></li><li><p>景区的地图帮助我们快速的找到想要去的景区的路</p></li></ul><p>在数据库中，索引可以帮助我们快速的查询到对应的数据行，从而顺利的取出所有列的数据。这个过程必须要<strong>快</strong>，对于现在的 Web 应用来说，DB 如果响应慢，将会直接影响到整个请求的响应时间，而这对用户体验来说是灾难性的。</p><p>对于点个按钮，等个好几秒才有返回，那么之后用户大概率是不会再使用你开发的应用了。</p><h3 id="mysql中的索引" tabindex="-1"><a class="header-anchor" href="#mysql中的索引" aria-hidden="true">#</a> MySQL中的索引</h3><p>首先，MySQL 和索引其实没有直接的关系。索引其实是 MySQL 中使用的存储引擎 InnoDB 中的概念。在 InnoDB 中，索引分为：</p><ul><li>聚簇索引</li><li>非聚簇索引</li></ul><p>对于<strong>聚簇索引</strong>，是 InnoDB 根据主键（Primary Key）构建的索引。你可以暂时理解为 key 为主键，value 则是整行数据。并且一张表<strong>只能有一个</strong>聚簇索引。</p><figure><img src="'+f+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当然，你可以不定义主键。但是<strong>正常情况下</strong>我们都会创建一个单调递增的主键，或者是通过统一的 ID 生成算法生成。如果没有定义任何主键，InnoDB 会有自己的兜底策略。InnoDB 会选择我们定义的第一个<strong>所有值的都不为空</strong>的<strong>唯一索引</strong>作为<strong>聚簇索引</strong>。</p><figure><img src="'+h+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>不过实际的生产环境中，的确会有这样的 Corner Case。InnoDB 还有一个究极兜底，如果连仅剩的<strong>唯一索引</strong>也不符合要求，InnoDB 会自己创建一个隐藏的6个字节的主键 RowID，然后根据这个隐藏的主键来生成聚簇索引。</p><p>而对于<strong>非聚簇索引</strong>，是根据指定的列创建的索引，也叫<strong>二级索引（Secondary Index）</strong>，一张表<strong>最多可以创建64个二级索引</strong>。key 为创建二级索引的列的值，value 为主键。换句话说，如果通过非聚簇索引查询，最终只能得到索引列本身的值 + 主键的值，如果想要获取到完整的列数据，还需要根据得到的主键去聚簇索引中再查询一次，这个过程叫<strong>回表</strong>。</p><blockquote><p>这里说明一下，现在有很多的博客说，MySQL 使用 InnoDB 时，一张表最多只能创建 16 个索引，<strong>首先这是错的</strong>，明显是从其他的地方直接抄过来的，自己没有去做任何的验证。</p><p>在 MySQL 的官方文章中，明确的说明了，一张表最多可以创建 <strong>64 个非聚簇索引</strong>，而且创建非聚簇索引时，列的数量不能超过16个。</p><p><strong>注意，是创建非聚簇索引的列不能超过16个！</strong></p></blockquote><figure><img src="'+m+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这也顺便提一下题外话，所谓的技术严谨，什么叫严谨？对你通过其他渠道获取到的知识，它最多叫<strong>作者的观点</strong>，我们持一种怀疑态度，并想办法自己去求证。求证后，它才会变成<strong>事实</strong>。</p><p>而不是对某些名词死记硬背，现在的新玩意层出不穷，但当你溯其根源，你会发现就那么回事。</p><h2 id="索引底层原理" tabindex="-1"><a class="header-anchor" href="#索引底层原理" aria-hidden="true">#</a> 索引底层原理</h2><p>前面提到了 InnoDB 中索引的类型，简单的了解了其分类和区别，那 InnoDB 中的索引是如何做到加速查询的呢？其底层的原理是啥呢？InnoDB 中的索引的底层结构为 B+ 树，是B树的一个变种。</p><figure><img src="'+u+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>先给大家看看B+树到底长个什么鸟样，下图是一颗存储了数字「1-7」的B+树。</p><figure><img src="'+B+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到，B+树中，每个节点可以有多个子节点，而像我们平常熟悉的二叉树中，每个节点最多只能有2个。并且，B+树中，节点的存储数据是有序的，而有序的数据结构就可以让我们进行快速的精确匹配和范围查询。而且B+树中的叶子结点之间有指向下一个节点的指针，而B树中的叶子节点是没有的。</p><blockquote><p>在 MySQL InnoDB 的实际实现中，页节点之间其实是个双链表，存储了分别指向上一个、下一个节点的指针</p></blockquote><p>下图是包含了整数「1-7」的B树，这个图应该会帮助你加深对两者区别的理解。</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>并且，在B+树中，除了叶子节点存储了真实的数据之外，其余的节点都只存储了指向下一节点的指针。换句话说，数据全部都在叶子节点上。而在B树中，所有的节点都可以存储数据，这是一个最主要的区别。</p>',38),D={href:"https://mp.weixin.qq.com/s/D-4m5RZwOjhJpLytiJ5FdA",target:"_blank",rel:"noopener noreferrer"},w=n('<p>InnoDB 会将数据存储在磁盘上，而当我们查询数据的时候，OS 会将存储在磁盘上的数据一页一页的加载到内存里。这里的页是 OS 管理内存的一种方式，当其加载数据到内存时，会将某个磁盘块上的数据按照页的大小加载。在这里，你可以理解为B树中每个节点就是一个磁盘块。</p><p>那既然B树和B+树在查找的时候都需要进行 I/O 操作将需要的节点加载到内存，B+树相对于B树的优势到底在哪儿？</p><figure><img src="'+_+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>个人认为主要有三点。</p><p><strong>一是B+树能够减少 I/O 的次数</strong>。为啥呢？凭啥数据结构长的差不多，B+树就能够减少 I/O 的次数？之前说到，单个节点就代表了一个磁盘块，而单个磁盘块的大小是固定的。B+树仅有叶子结点才存储值，相对于所有节点都存完整数据的B树而言，B+树中单个磁盘块能够容纳更多的数据。</p><figure><img src="'+y+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>单个磁盘块，容量固定的前提下，存储的元素<strong>大小越小</strong>，则能够存储的元素的<strong>数量就会更多</strong>。换句话说，一次 I/O 能够把更多的数据加载进内存，而这些多加载的元素很可能是你会用到的，而这就一定程度上能减少 I/O 的次数。</p><p>除此之外，单个节点能够存储的元素增多了，还能够起到减少树的高度的作用。</p><p><strong>二是查询效率更加稳定</strong>。什么叫更稳定呢？那就在数据量相同的情况下，不会因为你查询的数据 ID 不同而造成查询所耗费时间大相径庭，换句话说，这次请求可能花了10ms，下一次同样的请求啪的一下花了20ms，这就让人很不能接受，合着接口的性能还要看你数据库的心情？</p><p>那为什么说使用B+树就能够做到查询效率稳定呢？因为B+树非叶子结点不会存储数据，所以如果要获取到最终的数据，必然会查到叶子结点，换句话说，每次查询的 I/O 次数是相同的。而B树由于所有节点均可存储数据，有的数据可能1次 I/O 就查询到了，而有的则需要查询到叶子结点才找到数据，而这就会带来查询效率的不稳定。</p><p><strong>三是能够更好的支持范围查询</strong>。那B树为啥就不能很好的支持呢？让我们回到B树这张图。</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>假设我们需要查询 [3, 5] 这个区间内的数据，会经历什么呢？不废话，直接把图给出来。</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到，如果到叶子结点仍然没有查询到完整的数据，会重新返回到根结点再次进行遍历。而反观 B+ 树，当找到了叶子结点之后就可以通过叶子结点之间的指针直接进行链表遍历，可以大大的提升范围查询的效率。</p><blockquote><p>知道了这点之后，举一反三就能够知道，为什么 InnoDB 不使用 Hash 在做底层的数据结构了。即使查询时 Hash 的时间复杂度甚至能做到 O(1)</p></blockquote><h2 id="最后聊聊-i-o" tabindex="-1"><a class="header-anchor" href="#最后聊聊-i-o" aria-hidden="true">#</a> 最后聊聊 I/O</h2><p>全篇提到了很多次 I/O，以及在 MySQL 的索引设计中，需要尽量的减少 I/O 次数，为啥呢？是因为 I/O 很昂贵。当我们执行一次 I/O，到底发生了什么？</p><blockquote><p>本来像详细讲讲磁盘结构的，但是看了一眼篇幅，已经快超了，所以这里就简单的聊聊就好</p></blockquote><p>机械硬盘中，一次 I/O 操作，由三个步骤组成：</p><p>首先需要<strong>寻道</strong>，寻道是指磁盘的磁头移动道磁盘上的磁道上面，这个时间一般在3-15ms内。</p><p>然后是<strong>旋转</strong>，磁盘会将存储对应数据的盘片旋转至磁头下方，这又花掉2ms左右，具体的时延与磁盘的转速有关。</p><p>最后是<strong>数据传输</strong>。</p><p>一波操作下来，花费就在10ms左右。不要以为10ms还好...对比于SSD（固态硬盘）和内存的微秒、纳秒来说，简直有着天壤之别。</p><figure><img src="'+I+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这也是为啥在 MySQL 中，随机 I/O 对其查询的性能影响很大的原因。</p>',26);function q(O,S){const e=r("ExternalLinkIcon");return s(),g("div",null,[k,t("p",null,[i("知道了B树和B+树的基础结构长啥样之后，我们需要再深入了解 InnoDB 是如何利用B+树来存储数据的。首先，MySQL 并不会把数据存储在内存中，内存只是作为运行时的一种优化，关于 InnoDB 内存架构相关的东西，之前已经写了"),t("a",D,[i("一篇文章"),p(e)]),i("，感兴趣的可以先去看看。")]),w])}const L=a(x,[["render",q],["__file","23085.html.vue"]]);export{L as default};
