import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{o as g,c as e,f as n}from"./app-818314ad.js";const i="/images/mysql/230812/img-1.jpeg",t="/images/mysql/230812/row-data-in-db.jpeg",r="/images/mysql/230812/img-2.jpeg",p="/images/mysql/230812/purge-operation.jpeg",a="/images/mysql/230812/img-3.jpeg",s="/images/mysql/230812/config-innodb-purge-threads.jpeg",d="/images/mysql/230812/assign-purge-thread.jpeg",c="/images/mysql/230812/img-4.jpeg",u="/images/mysql/230812/all-in-one-table.jpeg",l="/images/mysql/230812/main-object.jpeg",m={},f=n('<h1 id="mysql-中删除的数据都去哪儿了" tabindex="-1"><a class="header-anchor" href="#mysql-中删除的数据都去哪儿了" aria-hidden="true">#</a> MySQL 中删除的数据都去哪儿了？</h1><p>不知道大家有没有想过下面这件事？</p><blockquote><p>我们平时调用 <code>DELETE</code> 在 MySQL 中删除的数据都去哪儿了？</p></blockquote><p>这还用问吗？当然是被删除了啊</p><figure><img src="'+i+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>那么这里又有个新的问题了，如果在 InnoDB 下，多事务并发的情况下，如果事务A删除了 <code>id=1</code> 的数据，同时事务B又去读取 <code>id=1</code> 的数据，如果这条数据真的被删除了，那 MVCC 拿啥数据返回给用户呢？</p><p>没错，这就需要了解一下 MySQL 的多版本并发的原理相关的东西，感兴趣的可以去看我之前写的<a href="">这篇文章</a>。</p><p>所以，实际情况中，调用了 <code>DELETE</code> 语句删除的数据并不会真正的被<strong>物理删除</strong>，这条数据其实还在那，只不过被打上了一个标记，标记<strong>已删除</strong>。</p><blockquote><p>这其实跟我们日常的操作——<strong>软删除</strong>，差不多是一个意思</p></blockquote><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 MySQL 中， <code>UPDATE</code> 和 <code>DELETE</code> 操作本质上是一样的， 都属于<strong>更新</strong>操作，删除操作只不过是把某行数据中的一个特定的比特位标记为已删除，仅此而已。</p><p>那么问题又来了，那这些删除的数据如果一直这么堆下去，那不早晚把硬盘撑爆？</p><figure><img src="'+r+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果都玩儿成这样了，那 MySQL 还能像现在这样被大规模的用于生产环境中吗？那 MySQL 到底是怎么玩的？</p><p>这就需要提到 <strong>Purge</strong> 操作了。</p><p>Purge操作是啥？</p><p>Purge 操作才是真正将数据（已被标记为已删除）物理删除的操作。</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Purge 操作针对的数据对象，不仅仅是某一行，还有其对应的索引数据和 Undo Log。</p><p>好的那么问题又来了。</p><figure><img src="'+a+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>问题是，Purge 操作什么时候会执行呢？实际上，你可以将执行 Purge 操作的线程（简称 Purge 线程）理解成一个后台周期性执行的线程。</p><p>Purge 线程可以有一个，也可以有多个，具体的线程数量可以由 MySQL 的配置项 <code>innodb_purge_threads</code> 来进行配置。当然，我相信你肯定不记得在使用 MySQL 的时候配置过这个，因为 <code>innodb_purge_threads</code> 有个默认值，值为 <code>4</code>。</p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>InnoDB 会根据 MySQL 中表的数量和 Purge 线程的数量进行分配。</p><figure><img src="'+d+'" alt="" width="500" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但正是因为有这种特性，Purge 线程的数量才需要根据业务的实际情况来做调整。举个例子，假设 <strong>DML</strong> 操作都集中在某张表，比如<strong>表1</strong>上...</p><p>你先等等，我打断一下......</p><figure><img src="'+c+'" alt="" width="250" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>什么叫 DML 操作？总喜欢搞些复杂的名词...DML（<strong>D</strong>ata <strong>M</strong>anipulation <strong>L</strong>anguage）数据操作语句，实际上就是CRUD增删改查...</p><p>与之类似的概念还有DDL（<strong>D</strong>ata <strong>D</strong>efinition <strong>L</strong>anguage）数据定义语句，也就是<code>CREATE</code>、<code>DROP</code>和<code>ALTER</code>等等.</p><p>以及DCL（<strong>D</strong>ata <strong>C</strong>ontrol <strong>L</strong>anguage）数据控制语句，也就是<code>GRANT</code>、<code>REVOKE</code>等等...</p><p>继续说回来，虽然 Purge 线程的数量是可配置的，但是也不是你想配多少就配多少的。不然你给它干个 <code>10000</code> 个线程，那不就直接原地 OOM 了吗？</p><p><code>innodb_purge_threads</code> 的最大值为 32，而且并不是我们配了 32 InnoDB 就真的会启动 32 个 Purge 线程，为啥呢？举个很简单的例子，假设此时只有一张表，然后我们配置了 32 个 Purge 线程。</p><figure><img src="'+u+'" alt="" width="450" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>你看着上面这个图问问自己，这「河里」吗？这样不仅浪费了系统的资源，同时还使得不同的 Purge 线程之间发生了<strong>数据竞争</strong>。不仅如此，Purge 线程还可能跟用户线程产生竞争。</p><p>但是当系统中真的有 32 张表的时候，情况又不一样了，一个 Purge 线程对应一张表，线程与线程之间就不会存在数据竞争，并且没有浪费系统资源，还能够提升执行 Purge 操作的性能。</p><p>这就是为啥 InnoDB 会根据<strong>实际情况</strong>来调整 MySQL 中 Purge 线程的数量，所以我们在配置的时候也要按照实际情况来设置。</p><p>举个例子，如果你的数据库中，<strong>增删改</strong> 的操作只集中在某几张表上，则可以考虑将 <code>innodb_purge_threads</code> 设置的稍微低一点。相反，如果 <strong>增删改</strong> 的操作几乎每张表都有，那么 <code>innodb_purge_threads</code> 就可以设置的大一些。</p><p>了解完 Purge 线程本身之后，我们就可以来了解 Purge 线程所针对的对象了。Purge 线程主要清理的对象是 Undo Logs，其次是行记录。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>因为 Undo Log 可以分为：</p><ul><li>Insert Undo Log</li><li>Update Undo Log</li></ul><p>所以更准确的说法是，Purge 线程清理的对象是 Update Undo Log 和 行记录，因为 Insert Undo Log 会在事务提交之后就会被删除。</p><p>我们都知道 InnoDB 的 MVCC 的数据来源是一个一个 Undo Log 形成的单链表，而 Purge 线程就是用于定期清理 Undo Log 的，并且在清理完 删除数据所生成的 Undo Log 的时候，就会把对应的行记录给移除了。</p><p>那么问题又来了，Purge 线程每次会读取多少条件 Undo Log 记录呢？</p><p>很明显，它不是看当时的心情来决定取多少条的。它是通过配置项 <code>innodb_purge_batch_size</code> 来控制的，默认是 300。然后InnoDB会将这300条 Undo Log 分给<code>innodb_purge_threads</code>个 Purge 线程。在清理的过程中，Purge 线程还会释放 Undo Log 表空间内的文件。</p>',47),_=[f];function L(y,P){return g(),e("div",null,_)}const D=o(m,[["render",L],["__file","230812.html.vue"]]);export{D as default};
