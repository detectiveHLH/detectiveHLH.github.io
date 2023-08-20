import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as r,a as o,b as e,d as t,f as d}from"./app-96b73531.js";const s="/images/23089/img-1.jpeg",p="/images/23089/table-on-disk.jpeg",g="/images/23089/share-table-space.jpeg",l="/images/23089/extends-on-disk.jpeg",b="/images/23089/extend-size.jpeg",h="/images/23089/segment-on-disk.jpeg",u="/images/23089/undo-table-space-size.jpeg",_={},f=d('<h1 id="innodb-表空间" tabindex="-1"><a class="header-anchor" href="#innodb-表空间" aria-hidden="true">#</a> InnoDB 表空间</h1><p>这应该是 MySQL 原理中最底层的部分了，我们存在 MySQL 中的数据，到底在磁盘上长啥样。你可能会说，数据不都存储在<strong>聚簇索引</strong>中吗？但很遗憾，你并没有回答我的问题。我会再问你，那聚簇索引在磁盘上又长啥样？</p><p>就像 Redis 的 RDB 文件，最终落在磁盘上就是一个真真切切的 <code>dump.rdb</code> 文件，而 MySQL 就显得有点迷，我们只知道通过 SQL 去拿数据，并不知道数据最终是以什么方式进行存储的。当然，了解其底层的存储逻辑，并不仅仅是为了满足好奇心这么简单。</p><p>其底层的存储方式，会影响到聚簇索引中数据的存储，进而影响到 MySQL 的 DML（<strong>D</strong>ata <strong>M</strong>anipulation <strong>L</strong>anguage） 性能，所以对底层存储逻辑有个清晰的认知，就能够在某些对性能有着极致追求的场景下，帮助我们对 MySQL 进行优化。</p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="表在磁盘上到底长啥样" tabindex="-1"><a class="header-anchor" href="#表在磁盘上到底长啥样" aria-hidden="true">#</a> 表在磁盘上到底长啥样</h2><p>首先我们先不扯像表空间这类的专业词汇，让我们先来建一张表，从磁盘的结构上来看一下。首先你得找到 MySQL 的数据目录，如果你是用 Docker 启动的话，这个目录大概长下面这样：</p><blockquote><p>/data00/docker/volumes/ef876f70d5f5c95325c2a79689db79cc4d1cecb7d96e98901256bd49ca359287/_data</p></blockquote><p>然后我们新建一个叫 <code>test</code> 的 DB，然后在 <code>_data</code> 的这个目录下就会多一个 <code>test</code> 的目录。然后在 test 数据库下新建了一张 <code>student</code> 的表，在 <code>test</code> 目录下就会多出两个文件，分别是 <code>student.frm</code> 和 <code>student.ibd</code>。</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以发现，最终数据在磁盘上的宏观表现其实很简单，就这么些个文件，什么索引啊、页啊都先忽略不管。</p><p>对于后缀为 <code>.frm</code> 文件，里面都有啥？里面包含了每张表的元数据，包括了表的结构定义。而 <code>.ibd</code> 文件里则存放了该表的<strong>数据</strong>和<strong>索引</strong>。</p><blockquote><p>我看到有人在博客里把 <code>.ibd</code> 写成了 <code>.idb</code>...虽然 db 看着更顺，但很遗憾并不正确，你把 ibd 的全称 <code>innodb data </code> 记住，就不会把缩写记错了。</p></blockquote><p>上面说的这个以表名命名的 <code>ibd</code> 文件，其实还有一个专业术语叫<strong>表空间</strong>。</p><blockquote><p>顾名思义可以理解为我这个<strong>表</strong>专属的<strong>空间</strong></p></blockquote><h2 id="认识表空间" tabindex="-1"><a class="header-anchor" href="#认识表空间" aria-hidden="true">#</a> 认识表空间</h2><p>如果我上来就直接告诉你，InnoDB 中有个概念叫表空间，你大概率是很难理解的。</p><p>像上文描述的这种每张表都有自己单独的数据存储文件的，叫<strong>独占表空间</strong>；相对应的，InnoDB 还有自己的<strong>系统表空间</strong>，在系统表空间下，所有表的数据都存储在同一个文件中。</p><p>那数据什么时候存储在系统表空间，又什么时候存储在独占表空间呢？</p><p>这个可以通过 MySQL 的配置项 <code>innodb_file_per_table</code> 来决定。当该配置项开启时，每张表都会有自己单独的表空间；相反，当该配置项关闭时，表数据将会存储在系统的表空间内。</p><blockquote><p>该配置项是默认开启的，你可以在 MySQL 中通过命令 <code>SHOW VARIABLES LIKE &#39;innodb_file_per_table&#39;</code> 来查看该变量的状态</p></blockquote><p>其实从 MySQL 将独占表空间作为默认的设置来看，你就应该知道独占表空间的性能肯定是要比系统表空间好的。</p><p>因为对于系统表空间来说，通常只有一个文件，所有的表数据都在这一个文件中，如果我们对某张表进行 <code>TRUNCATE</code> 操作，需要将分散在文件中各个地方的数据删除。首先这样做性能就不好，其次 <code>TRUNCATE</code> 操作会在该文件中产生很多空闲的碎片空间，并且并不会减少共享表空间文件 ibdata1 的大小。</p><blockquote><p>不能理解的话，可以想象 Java 里的标记-清理垃圾回收算法，该算法会在清理的时候造成大量的内存碎片，不利于提高后期的内存利用率</p></blockquote><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而对于独占表空间来说，从始至终一整张表的数据都只存储在一个文件，比起共享表空间谁更容易清理并且还能释放磁盘空间，简直是一目了然。所以，对于独占表空间来说，<code>TRUNCATE</code> 的性能会更好。</p><p>除此之外，独占表空间能够提升单张表的最大容量限制，这块可能不是很好理解，为什么独占表空间还有这个功效？在这里你只需要记住这个结论就好了，后文讲到页相关的东西时，我们会具体的论证。</p><p>了解了表空间的概念之后，我们就可以继续深入了解数据在表空间内到底是怎么存储的了。</p><h2 id="深入表空间文件内部" tabindex="-1"><a class="header-anchor" href="#深入表空间文件内部" aria-hidden="true">#</a> 深入表空间文件内部</h2>',29),m={href:"https://mp.weixin.qq.com/s/D-4m5RZwOjhJpLytiJ5FdA",target:"_blank",rel:"noopener noreferrer"},x={href:"https://mp.weixin.qq.com/s/UgLcleeeAbXPQYp61JB0qQ",target:"_blank",rel:"noopener noreferrer"},M=d('<p>表空间由一堆的**页（Pages）**组成，并且每张页的大小是相等的，页大小默认为 16K，当然这个大小可以调整。</p><blockquote><p>页大小可以通过配置项 <code>innodb_page_size</code> 根据业务的实际情况进行调整，可以选择的大小分别为 4K、8K、16K、32K和64K</p></blockquote><p>一堆页组合在一起，就变成了<strong>区（Extents）</strong>。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>每个<strong>区</strong>的大小是固定的。当我们设置了不同的 <code>innodb_page_size</code> 时，每个区（Extents）内所包含的页的数量、和对应的固定区大小都不同，具体的情况如下图所示。</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当 <code>innodb_page_size</code> 为 4K、8K或者16K时，其对应的区（Extents）大小为1M；当其页大小为32K时，区大小为2M；当页大小为64K时，区大小为4M。</p><blockquote><p>MySQL 5.6的时候其实只支持 4K、8K和16K，至于上面说到的32K和64K，是在 MySQL 5.7.6 之后添加的。</p></blockquote><p>随着页和区大小的变动，每个区内所能容纳的 <strong>页数量</strong> 也会随之改变。举个例子，当 <code>innodb_page_size</code> 的值为 16K 时，每个区就包含 64 页；当其为 8K 时，每个区包含 128 页；当其为 4K 时，每个区就会包含 256 页。</p><p>上面聊过，一页一页的数据组成了<strong>区</strong>，而一个一个区则组成了<strong>段（Segments）</strong>。</p><figure><img src="'+h+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在<strong>逻辑</strong>上，InnoDB 的表空间就是由一个一个这样的段（Segment)组成的。随着数据量的持续增长需要申请新的空间时，InnoDB 会先请求32个页，之后便会直接分配一整个区（Extents) 。甚至在某个很大的 Segment 内，还会一次性分配 4 个区。</p><p>默认情况下，InnoDB 会给每个索引分配<strong>两个</strong>段（Segment）。一个用于存储索引中的非叶子结点，另一个用于存储叶子结点。</p><h2 id="表空间的分类" tabindex="-1"><a class="header-anchor" href="#表空间的分类" aria-hidden="true">#</a> 表空间的分类</h2><p>上面大概介绍了两种表空间类别，分别是系统表空间、独占表空间。接下来就需要详细的了解一下各个表空间分类的细节了。</p><h3 id="系统表空间" tabindex="-1"><a class="header-anchor" href="#系统表空间" aria-hidden="true">#</a> 系统表空间</h3><p>当我们开启了<code>innodb_file_per_table</code> 这个配置项（默认就是开启的）之后，系统表空间内就只用于存储 Change Buffer 相关的数据。而当我们将其关闭之后，系统表空间内就会存储表和索引相关的数据。当然，在 MySQL 8.0之前，独占表空间内还包含了 Double Write Buffer（两次写缓冲），但在 MySQL 8.0.20 之后被移了出去，存放在了一个单独的文件中。</p><p>默认情况下，系统表空间只会有一个叫 <code>ibdata1</code> 的数据文件，当然，它是允许有多个文件存在的。这所有的属性包括文件名称、文件大小都是通过配置项目 <code>innodb_data_file_path</code> 来制定的，举个例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>innodb_data_file_path=ibdata1:10M:autoextend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里指明了系统表空间的文件名为<code>ibdata1</code> ，初始化大小为<code>10M</code> 。你可发现了，这个 <code>autoextend</code> 是个什么鬼？</p><p>刚刚说到，初始大小是 <code>10M</code> ，那么随着 MySQL 的运行，其数据量会慢慢的增长，数据文件必须要申请更多的空间来存储数据。而定义了 <code>autoextend</code> InnoDB 就会帮我们自动对数据文件进行扩容，每次扩容申请 8M 的空间。当然，这个 <code>8M</code> 也是可以配置的，我们可以通过配置项 <code>innodb_autoextend_increment</code> 来配置。</p><h3 id="独占表空间" tabindex="-1"><a class="header-anchor" href="#独占表空间" aria-hidden="true">#</a> 独占表空间</h3><p>这块其实上面在引入的时候已经介绍的差不多了，这里简单的总结一下就好。当配置项 <code>innodb_file_per_table</code> 开启时（现在是默认开启的），每张表的数据都会存储自己单独的数据文件中。</p><h3 id="常规表空间" tabindex="-1"><a class="header-anchor" href="#常规表空间" aria-hidden="true">#</a> 常规表空间</h3><p>这个暂时不用了解，知道常规表空间跟系统表空间类似，也是一个共享的存储空间就好。</p><h3 id="undo-表空间" tabindex="-1"><a class="header-anchor" href="#undo-表空间" aria-hidden="true">#</a> Undo 表空间</h3><p>这里主要存储 Undo Logs，有了 Undo Logs 我们就可以在事务出错之后快速的将更改回滚。InnoDB 会默认给 Undo 表空间创建两个数据文件，如果没有特别指定，其文件名默认为 <code>undo_001</code> 和 <code>undo_002</code> 。</p><p>至于这两个数据文件的具体存放路径，可以通过配置项 <code>innodb_undo_directory</code> 来指定。当然，如果没有指定，Undo 表空间的数据文件就会放在 InnoDB 的默认数据目录下，通常来说是 <code>/usr/local/mysql</code> 。</p><p>而这两个 Undo 表空间数据文件的初始大小，在 MySQL 8.0.23 之前是由 InnoDB 的页大小来决定的，具体的情况如下图：</p><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而在 MySQL 8.0.23 之后，Undo 表空间的初始化大小都是 16M 了。至于 Undo 表空间的扩容，不同的版本也有不通的处理方式。</p><p>在 MySQL 8.0.23 之前，每次扩容是申请 4 个区（Extends），按照之前的讨论，如果页大小为 16 K，那么对应到区就是 1M，换句话说，每次扩容申请 4M 的空间，当然这个具体的大小会根据页大小的变化而变化，这个在上文提到过在此就不再赘述。</p><p>而在 MySQL 8.0.23 之后，每次最少都要扩容 16 M的空间。而且，为了防止数据量爆发式的增长，InnoDB 对扩容的容量会做一个动态的调整。</p><p>如果本次扩容和上次扩容时间差小于 0.1 秒，则扩容的空间会加倍，也就是变成 32 M。如果多次扩容的时间差都小于 0.1 秒，这个 <strong>加倍</strong> 的操作会 <strong>累加</strong>，直到达到上限 <strong>256M</strong>；</p><p>那你可能会说，那如果某段时间刚好请求量比较大，使得扩容的容量达到了最大的 256 M，那后续请求量下去了呢？难道还是申请 256 M吗？这显的不太合理。所以 InnoDB 判断如果两次扩容间隔大于 0.1 秒，就会将扩容的容量<strong>减半</strong>，直到减少到最小限制 16 M。</p><h3 id="临时表空间" tabindex="-1"><a class="header-anchor" href="#临时表空间" aria-hidden="true">#</a> 临时表空间</h3><p>临时表空间内的数据，顾名思义都是临时的。</p><blockquote><p>你在说屁话...</p></blockquote><p>它分为两个部分，分别是：</p><ul><li>Session 临时表空间</li><li>全局临时表空间</li></ul><p>对于 Session 临时表空间，里面会存储由用户或者优化器创建的临时表。对于每个 Session 来说，InnoDB 最多会分配两个数据文件（表空间），分别用于存储用户创建的临时表和优化器创建的内部临时表。当 Session 失效之后，这些已分配的数据文件会被 Truncate 然后放到一个 <strong>数据文件池</strong> 中。</p><p>这个操作其实跟其他的池化技术没有区别，值得注意的是，这些文件被 Truncate 了之后大小并不会发生变化。而这个数据文件池会在 MySQL 服务器启动的时候创建，里面会默认扔进去 10 个文件，每个文件的默认大小为 5 页。</p><p>而对于全局临时表空间，里面会存对临时表做了改动的回滚段（Rollback Segment），其初始化的大小大约是 12 M，同样会在 MySQL 服务器启动的时候创建。</p>',43);function S(L,y){const n=i("ExternalLinkIcon");return c(),r("div",null,[f,o("p",null,[e("其实在很早之前我讲 "),o("a",m,[e("InnoDB的内存架构"),t(n)]),e(" 时我就讲过，在 InnoDB 中，页是其数据管理的最小单位。所以讲道理我们应该从其最小的部分开始，但是之前已经专门写过"),o("a",x,[e("一篇文章"),t(n)]),e("来讨论页了，所以在这里就不赘述了。")]),M])}const Q=a(_,[["render",S],["__file","23089.html.vue"]]);export{Q as default};
