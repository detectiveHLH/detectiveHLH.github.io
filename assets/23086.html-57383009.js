import{_ as a,r as p,o as t,c as l,a as n,b as e,d,f as s}from"./app-3507ce1f.js";const c="/images/23086/mysql-locks-compatible.jpeg",r={},i=s('<h1 id="简单了解-mysql-中相关的锁" tabindex="-1"><a class="header-anchor" href="#简单了解-mysql-中相关的锁" aria-hidden="true">#</a> 简单了解 MySQL 中相关的锁</h1><blockquote><p>本文主要是带大家快速了解 InnoDB 中锁相关的知识</p></blockquote><h2 id="为什么需要加锁" tabindex="-1"><a class="header-anchor" href="#为什么需要加锁" aria-hidden="true">#</a> 为什么需要加锁</h2><p>首先，为什么要加锁？我想我不用多说了，想象接下来的场景你就能 GET 了。</p><blockquote><p>你在商场的卫生间上厕所，此时你一定会做的操作是啥？锁门。如果不锁门，上厕所上着上着，啪一下门就被打开了，可能大概也许似乎貌似有那么一丁点的不太合适。</p></blockquote><p>数据也是一样，在并发的场景下，如果不对数据加锁，会直接破坏数据的一致性，并且如果你的业务涉及到钱，那后果就更严重了。</p><p><strong>锁门表情包</strong></p><h2 id="锁的分类" tabindex="-1"><a class="header-anchor" href="#锁的分类" aria-hidden="true">#</a> 锁的分类</h2><p>在 InnoDB 中，都有哪些锁？其实你应该已经知道了很多了，例如面试中会问你存储引擎 MyISAM 和 InnoDB 的区别，你会说 MyIASM 只有表锁，但是 InnoDB 同时支持行锁和表锁。你可能还会被问到乐观锁和悲观锁的区别是啥。</p><p>锁的概念、名词很多，如果你没有对锁构建出一个完整的世界观，那么你理解起来就会比较有阻碍，接下来我们把这些锁给分一下类。</p><blockquote><p>按照锁的粒度</p></blockquote><p>按照锁的粒度进行划分可以分为：</p><ul><li>表锁</li><li>行锁</li></ul><p>这里就不讨论页锁了，页锁是 BDB（BerkeleyDB） 存储引擎中才有的概念，我们这里主要讨论 InnoDB 存储引擎。</p><blockquote><p>按照锁的思想</p></blockquote><p>按照加锁的思想可以分为：</p><ul><li>悲观锁</li><li>乐观锁</li></ul><p>这里的悲观、乐观和你平时理解的名词是同一个意思。乐观锁认为大概率不会发生冲突，只在必要的时候加锁。而悲观锁认为大概率会冲突，所以无论是否必要加锁都会执行加锁操作。</p><blockquote><p>按照兼容性</p></blockquote><p>按照兼容性可以把锁划分为：</p><ul><li>共享锁</li><li>排他锁</li></ul><p>被加上共享锁的资源，能够和其他人进行共享，而如果被加上了排他锁，其他人在拿不到这把锁的情况下是无法进行任何操作的。</p><blockquote><p>按照锁的实现</p></blockquote><p>这里的实现就是 InnoDB 中具体的锁的种类了，分别有：</p><ul><li>意向锁（Intention Locks）</li><li>记录锁（Record Locks）</li><li>间隙锁（Gap Locks）</li><li>临键锁（Next-Key Locks）</li><li>插入意向锁（Insert Intention Locks）</li><li>自增锁（AUTO-INC Locks）</li></ul><p>即使按照这种分类来对锁进行了划分，看到了这么多的锁的名词可能仍然会有点懵。比如我<code>SELECT ... FOR UPDATE</code> 的时候到底加的是什么锁？</p><p>我们应该透过现象看本质，本质是什么？本质是锁到底加在了什么对象上，而这个很好回答：</p><ul><li><p>加在了表上</p></li><li><p>加在了行上</p></li></ul><p>而对于加在行上的锁，其本质又是什么？本质是将锁加在了索引上。</p><h3 id="意向锁" tabindex="-1"><a class="header-anchor" href="#意向锁" aria-hidden="true">#</a> 意向锁</h3><p>在 InnoDB 中支持了不同粒度的锁，行锁和表锁。例如<code>lock tables</code>命令就会持有对应表的排他锁。为了使多种不同粒度的锁更实用，InnoDB 设计了<strong>意向锁</strong>。</p><p>意向锁是一种<strong>表级锁</strong>，它表明了接下来的事务中，会使用哪种类型的锁，它有以下两种类型：</p><ul><li>共享意向锁（IS） 表明该事务会打算对表中的记录加共享锁</li><li>独占意向锁（IX） 则是加排他锁</li></ul><p>例如，<code>select ... for share</code>就是加的共享意向锁，而<code>SELECT .. FOR UPDATE</code>则是加的独占意向锁。其规则如下：</p><ul><li>一个事务如果想要获取某张表中某行的共享锁，它必须先获取该表的<strong>共享意向锁</strong>，或者独占意向锁。</li><li>同理，如果想获取排他锁，它必须先获取<strong>独占意向锁</strong></li></ul><p>下图是这几种锁的组合下相互互斥、兼容的情况</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对照上面的表，在相互兼容的情况下，对应的事务就能获取锁，但是如果不兼容则无法获取锁，直到不兼容的锁释放之后才能获取。</p><p>看到这里你可能就会有问题了，那既然意向锁除了 <code>LOCK TBALES</code> 之外什么都不阻塞。那我要它何用？</p><p>还是通过例子，假设事务 A 获取了 student 表中 id = 100 这行的共享锁，之后事务 B 需要申请 student 表的排他锁。而这两把锁明显是冲突的，而且还是对于同一行。</p><p>那 InnoDB 需要如何感知 A 获取了这把锁？遍历整个 B+ 树吗？不，答案就是意向锁。事务 B 申请写表的排他锁时，InnoDB 会发现事务 A 已经获取了该表的意向共享锁，说明 student 表中已经有记录被共享锁锁住了。此时就会阻塞住。</p><p>并且，意向锁除了像<code>LOCK TABLES</code>这种操作之外，不会阻塞其他任何操作。换句话说，意向锁只会和表级别的锁之间发生冲突，而不会和行级锁发生冲突。因为意向锁的主要目的是为了表明有人即将、或者正在锁定某一行。</p><blockquote><p>就像你去图书馆找书，你并不需要每个书架挨着挨着找，直接去服务台用电脑一搜，就知道图书馆有没有这本书。</p></blockquote><h3 id="记录锁" tabindex="-1"><a class="header-anchor" href="#记录锁" aria-hidden="true">#</a> 记录锁</h3>',44),u={href:"https://mp.weixin.qq.com/s/iVwJMlW3CsV5ng1573U_lA",target:"_blank",rel:"noopener noreferrer"},k=s(`<p>当我们执行<code>SELECT * FROM student WHERE id = 1 FOR UPDATE</code>语句时，就会对值为1的索引加上记录锁。至于要是一张表里没有索引该怎么办？这个问题在上面提到的文章中也解释过了，当一张表没有定义主键时，InnoDB 会创建一个隐藏的RowID，并以此 RowID 来创建聚簇索引。后续的记录锁也会加到这个隐藏的聚簇索引上。</p><p>当我们开启一个事务去更新 id = 1 这行数据时，如果我们不马上提交事务，然后再启一个事务去更新 id = 1 的行，此时使用 <code>show engine innodb status</code>查看，我们可以看到<code>lock_mode X locks rec but not gap waiting</code>的字样。</p><p>X是排他锁的意思，从这可以看出来，记录锁其实也可以分为共享锁、排他锁模式。当我们使用<code>FOR UPDATE</code>是排他，而使用<code>LOCK IN SHARE MODE</code> 则是共享。</p><p>而在上面字样中出现的 <code>gap</code> 就是另一种行锁的实现<strong>间隙锁</strong>。</p><h3 id="间隙锁" tabindex="-1"><a class="header-anchor" href="#间隙锁" aria-hidden="true">#</a> 间隙锁</h3><p>对于间隙锁（Gap Locks）而言，其锁定的对象也是索引。为了更好的了解间隙锁，我们举个例子。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> name <span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> age <span class="token operator">BETWEEN</span> <span class="token number">18</span> <span class="token operator">AND</span> <span class="token number">25</span> <span class="token keyword">FOR</span> <span class="token keyword">UPDATE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>假设我们为 <code>age</code> 建立了非聚簇索引，运行该语句会阻止其他事务向 <code>student</code> 表中新增 18-25 的数据，无论表中是否真的有 age 为 18-25 的数据。因为间隙锁的本质是锁住了索引上的一个范围，而 InnoDB 中索引在底层的B+树上的存储是有序的。</p><p>再举个例子:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> age <span class="token operator">=</span> <span class="token number">10</span> <span class="token keyword">FOR</span> <span class="token keyword">UPDATE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>值得注意的是，这里的 age 不是唯一索引，就是一个简单的非聚簇索引。此时会给 <code>age = 10</code> 的数据加上记录锁，并且锁定 <code>age &lt; 10</code> 的 Gap。如果当前这个事务不提交，其他事务如果要插入一条 <code>age &lt; 10</code> 的数据时，会被阻塞住。</p><p>间隙锁是 MySQL 在对性能、并发综合考虑之下的一种折中的解决方案，并且只在**可重复读（RR）<strong>下可用，如果当前事务的隔离级别为</strong>读已提交（RC）**时，MySQL会将间隙锁禁用。</p><p>刚刚说了，记录锁分为共享、排他，间隙锁其实也一样。但是不同于记录锁的一点，共享间隙锁、排他间隙锁相互不互斥，这是怎么回事？</p><p>我们还是需要透过现象看到本质，间隙锁的目的是什么？</p><blockquote><p>为了防止其他事务在 Gap 中插入数据</p></blockquote><p>那共享、排他间隙锁在这个目标上是一致的，所以是可以同时存在的。</p><h3 id="临键锁" tabindex="-1"><a class="header-anchor" href="#临键锁" aria-hidden="true">#</a> 临键锁</h3><p>临键锁（Next-Key Locks）是 InnoDB 最后一种行锁的实现，临键锁实际上是<strong>记录锁</strong>和<strong>间隙锁</strong>的组合。换句话说，临键锁会给对应的索引加上记录锁，并且外加锁定一个区间。</p><p>但是并不是所有临键锁都是这么玩的，对于下面的SQL:</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">23</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，<code>id</code>是主键，唯一索引，无论其他事务插入了多少数据，<code>id = 23</code>这条数据永远也只有一条。此时再加一个间隙锁就完全没有必要了，反而会降低并发。所以，在使用的索引是<strong>唯一索引</strong>的时候，临键锁会降级为<strong>记录锁</strong>。</p><p>假设我们有10，20，30总共3条索引数据。那么对应临键锁来说，可能锁定的区间就会如下：</p><ul><li>(∞, 10]</li><li>(10, 20]</li><li>(20, 30]</li><li>(30, ∞)</li></ul><p>InnoDB 的默认事务隔离级别为<strong>可重复读（RR）</strong>，在这个情况下，InnoDB 就会使用临键锁，以防止<strong>幻读</strong>的出现。</p><blockquote><p>简单解释一下幻读，就是在事务内，你执行了两次查询，第一次查询出来 5 条数据，但是第二次再查，居然查出了 7 条数据，这就是<strong>幻读</strong>。</p></blockquote><p>可能你在之前的很多博客，或者面试八股文上，了解到过 InnoDB 的RR事务隔离级别可以防止幻读，RR防止幻读的关键就是<strong>临键锁</strong>。</p><p>举个例子，假设 student 表中就两行数据，id分别为90和110.</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> id <span class="token operator">&gt;</span> <span class="token number">100</span> <span class="token keyword">FOR</span> <span class="token keyword">UPDATE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当执行该 SQL 语句之后，InnoDB就会给区间 (90, 110] 和（110,∞) 加上<strong>间隙锁</strong>，同时给 id=110 的索引加上<strong>记录锁</strong>。这样以来，其他事务就无法向这个区间内新增数据，即使 100 根本不存在。</p><h3 id="插入意向锁" tabindex="-1"><a class="header-anchor" href="#插入意向锁" aria-hidden="true">#</a> 插入意向锁</h3><p>接下来是插入意向锁（Insert Intention Locks），当我们执行 <code>INSERT</code> 语句之前会加的锁。本质上是间隙锁的一种。</p><p>还是举个例子，假设我们现在有索引记录10、20，事务A、B分别插入索引值为14、16的数据，此时事务A和B都会用插入意向锁锁住 10-20 之间的 Gap，获取了插入意向锁之后就会获取14、16的排他锁。</p><p>此时事务A和B是不会相互阻塞的，因为他们插入的是不同的行。</p><h3 id="自增锁" tabindex="-1"><a class="header-anchor" href="#自增锁" aria-hidden="true">#</a> 自增锁</h3><p>最后是自增锁（AUTO-INC Locks），自增锁的本质是<strong>表锁</strong>，较为特殊。当事务 A 向包含了 <code>AUTO_INCREMENT</code> 列的表中新增数据时，就会持有自增锁。而此时其他的事务 B 则必须要等待，以保证事务 A 取得连续的自增值，中间不会有断层。</p>`,35);function g(h,b){const o=p("ExternalLinkIcon");return t(),l("div",null,[i,n("p",null,[e("这就是记录锁，是行锁的一种。记录锁的锁定对象是对应那行数据所对应的索引。对索引不太清楚的可以看看"),n("a",u,[e("这篇文章"),d(o)]),e("。")]),k])}const m=a(r,[["render",g],["__file","23086.html.vue"]]);export{m as default};
