import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as i,c as d,a as n,b as o,d as r,f as e}from"./app-6d5c7683.js";const g="/images/230811/consistant-read.jpeg",p="/images/230811/three-key-in-a-row.jpeg",c="/images/230811/undo-log-ptr.jpeg",l="/images/230811/composition-of-undo-log.jpeg",h={},_=e('<h1 id="mysql-到底是如何做到多版本并发的" tabindex="-1"><a class="header-anchor" href="#mysql-到底是如何做到多版本并发的" aria-hidden="true">#</a> MySQL 到底是如何做到多版本并发的？</h1><p>之前的文章简单的介绍了 MySQL 的事务隔离级别，它们分别是：读未提交、读已提交、可重复读、串行化。这篇文章我们就来探索一下 MySQL 事务隔离级别的底层原理。</p><blockquote><p>本篇文章针对 InnoDB 存储引擎</p></blockquote><h2 id="多版本并发控制" tabindex="-1"><a class="header-anchor" href="#多版本并发控制" aria-hidden="true">#</a> 多版本并发控制</h2><p>我们知道，读未提交会造成脏读、幻读、不可重复读，读已提交会造成幻读、不可重复读，可重复读可能会有幻读，和串行化就不会有这些问题。</p><p>那 InnoDB 到底是怎么解决这些问题的呢？又或者，你有没有想过造成脏读、幻读、不可重复读的底层最根本的原因是什么呢？</p><p>这就是今天要聊的主角——MVCC（<strong>M</strong>ulti-<strong>V</strong>ersion <strong>C</strong>oncurrent <strong>C</strong>ontroll），也叫多版本并发控制。InnoDB 是一个支持多事务并发的存储引擎，它能让数据库中的读-写操作能够并发的进行，避免由于加锁而导致读阻塞。</p><p>正是由于有了 MVCC，在事务B更新 <code>id=1</code> 的数据时，事务A读取 <code>id=1</code> 的操作才不会被阻塞。而不阻塞的背后则是<strong>不加锁的一致性读</strong>。那什么是一致性读？</p><h2 id="一致性读" tabindex="-1"><a class="header-anchor" href="#一致性读" aria-hidden="true">#</a> 一致性读</h2><p>简单来讲，当进行 query 查询时，InnoDB 会对当前时间点的数据库创建一个快照，快照创建完之后，当前查询就只能感知到快照创建之前提交的事务改动，在快照创建之后再提交的事务就不会被当前query感知。</p><p>当然，当前事务自己更新的数据是个例外。当前事务修改过的行，再次读取时是能够拿到最新的数据的。而对于其他行，读取的仍然是<strong>打快照时的版本</strong>。</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而这个快照就是 InnoDB 实现事务隔离级别的关键。</p><p>在读已提交（Read Committed）的隔离级别下，事务中的<strong>每一次的一致性读</strong>都会重新生成快照。而在可重复读（Repeatable Read）的隔离级别下，事务中所有的一致性读都只会使用<strong>第一次一致性读</strong>生成的快照。</p><p>这也就是为什么，在上图中事务B提交了事务之后，读已提交的隔离级别下能看到改动，可重复读的隔离级别看不到改动，本质上就是因为读已提交又<strong>重新生成了快照</strong>。</p><p>在读已提交、可重复读的隔离级别下，<code>SELECT</code> 语句都会默认走一致性读，并且在一致性读的场景下，不会加任何的锁。其他的修改操作也可以同步的进行，大大的提升了 MySQL 的性能。而这也就是MVCC多版本并发控制的实现原理。这种读还有个名字叫 <strong>快照读</strong> 。</p><p>那如果我在事务中想要立马看到其他的事务的提交怎么办？有两种方法：</p><ol><li>使用读已提交隔离级别</li><li>对 <code>SELECT</code> 加锁，共享锁和排他锁都行，再具体点就是 <code>FOR SHARE</code> 和 <code>FOR UPDATE</code></li></ol><p>当然，第二种方法如果对应的记录加的锁和 <code>SELECT</code> 加的锁互斥，<code>SELECT</code> 就会被阻塞，这种读也有个别名叫 <strong>当前读</strong>。</p><p>了解完上面的解释，下次再有人问你 MVCC 是怎么实现的，你就能从一致性读（快照读）和当前读来进行解释了，并且把不同的隔离级别下对一致性读快照的刷新机制也讲清楚。</p><p>但是我觉得还不够，应该还需要继续往下深入了解。因为我们只知道个快照，其底层到底是怎么实现的呢？其实还是不知道的。</p><h2 id="深入一致性读原理" tabindex="-1"><a class="header-anchor" href="#深入一致性读原理" aria-hidden="true">#</a> 深入一致性读原理</h2>',22),m={href:"https://mp.weixin.qq.com/s/KVH---8XrkX-6_liVux2Xg",target:"_blank",rel:"noopener noreferrer"},u=e('<p>InnoDB 内实现 MVCC 的关键其实就是三个字段，并且数据表中每一行都有这三个字段：</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><strong>DB_TRX_ID</strong> 该字段有6个字节，用于存储上次<strong>插入</strong>或者<strong>更新</strong>该行数据的事务的唯一标识。你可能会问，只有插入和更新吗？那删除呢？其实在InnoDB的内部，<em>删除</em><strong>其实就是更新操作</strong>，只不过会更新该行中一个特定的比标志位，将其标记为删除。</li><li><strong>DB_ROLL_PTR</strong> 该字段有7个字节，你可以叫它<strong>回滚指针</strong>，该指针指向了存储在<strong>回滚段</strong>中的一条具体的Undo Log。即使当前这行数据被更新了，我们同样的可以通过回滚指针，拿到更新之前的历史版本数据。</li><li><strong>DB_ROW_ID</strong> 该字段有6个字节，InnoDB给该行数据的<strong>唯一标识</strong>，该唯一标识会在有新数据插入的时候单调递增，就跟我们平时定义表结构的时候定义的<code>primary key</code>的时候单调递增是一样的。<strong>DB_ROW_ID</strong>会被包含在聚簇索引中，其他的<strong>非聚簇索引</strong>则不会包含。</li></ul><p>通过 <code>DB_ROLL_PTR</code> 可以拿到最新的一条 Undo Log，然后每一个对应的 Undo Log 指向其上一个 Undo Log，这样一来，不同的版本就可以连接起来形成链表，不同的事务根据需求和规则，从链表中选择不同的版本进行读取，从而实现多版本的并发控制，<strong>就像这样</strong>：</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可能有人对 Undo Log 没啥概念，记住这个就好了：</p>',6),L=n("code",null,"git reset --hard $last_commit_id",-1),f={href:"https://mp.weixin.qq.com/s/sDhgznRSA5wWduvG156mBw",target:"_blank",rel:"noopener noreferrer"},U=e('<h2 id="undo-log-的组成" tabindex="-1"><a class="header-anchor" href="#undo-log-的组成" aria-hidden="true">#</a> Undo Log 的组成</h2><p>可能也有人会有疑问，说 Undo Log 不是应该在事务提交之后就被删除了吗？为什么我通过 MVCC 还能查到之前的数据呢？</p><p>实际上在 InnoDB 中，Undo Log 被分成了两部分，分别是</p><ul><li>Insert Undo Log</li><li>Update Undo Log</li></ul><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对于 Insert Undo Log 来说，它只会用于在事务中发生错误的回滚，因为一旦事务提交了，Insert Undo Log 就完全没用了，所以在事务提交之后 Insert Undo Log 就会被删除。</p><p>而 Update Undo Log 不同，其可以用于 MVCC 的一致性读，为不同版本的请求提供数据源。那这样一来，是不是 Update Undo Log 就完全没法移除了？因为你不清楚啥时候就会有个一致性读请求过来，然后导致其占用的空间越来越大。</p><p>对，但也不完全对。</p><p>一致性读本质上是要处理多事务并发时，需要按需给<strong>不同的事务</strong>以<strong>不同的数据版本</strong>，所以如果当前没有事务存在了，Update Undo Log 就可以被干掉了。</p><blockquote><p>MySQL 的官方建议有点皮，建议大家定期提交事务，这样机器上的 Undo Logs 就可以被定期的清理。我寻思，不提交事务整个 DB 不就 hang 住了，那不完犊子了吗..</p></blockquote><h2 id="eof" tabindex="-1"><a class="header-anchor" href="#eof" aria-hidden="true">#</a> EOF</h2><p>本篇文章就先到这里，至于怎么 Update Undo Log 怎么被干掉的，之后有空专门写篇文章来聊聊。</p>',12);function B(C,D){const t=a("ExternalLinkIcon");return i(),d("div",null,[_,n("p",null,[o("从常理来说，不同的一致性读可能会读到不同版本的数据，那么这些肯定都存储在 MySQL 中的，否则不可能被读取到。是的，这些数据都存储在 InnoDB 的"),n("a",m,[o("表空间"),r(t)]),o("内，再具体点这些数据存储在 Undo 表空间内。")]),u,n("blockquote",null,[n("p",null,[o("Undo Log 记录的是此次事务开始前的数据状态，就有点类似于 Git 中的某个 commit，你提交了某个 commit， 然后开始做一个及其复杂的需求，然后做着做着心态就崩了，就不想要这些改动了，你就可以直接 "),L,o(" 回退，上个 commit 你就可以理解为 Undo Log，感兴趣的可以去看看 "),n("a",f,[o("基于Redo Log和Undo Log的MySQL崩溃恢复流程"),r(t)])])]),U])}const I=s(h,[["render",B],["__file","230811.html.vue"]]);export{I as default};
