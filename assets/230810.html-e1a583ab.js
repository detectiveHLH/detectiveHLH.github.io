import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as r,c as l,a as n,b as e,d as o,f as a}from"./app-14312e0a.js";const p="/images/230810/acid-model.jpeg",c="/images/230810/read-uncommitted.jpeg",d="/images/230810/read-committed.jpeg",g="/images/230810/repeatable-read.jpeg",u={},h=n("h1",{id:"啥是-mysql-事务隔离级别",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#啥是-mysql-事务隔离级别","aria-hidden":"true"},"#"),e(" 啥是 MySQL 事务隔离级别？")],-1),k={href:"https://mp.weixin.qq.com/s/rB0MHssNG_9ivZP2ka-EYw",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"InnoDB",-1),m=n("code",null,"RR",-1),f=n("strong",null,"幻读",-1),A=a('<p>但是没想到，都 <code>1202</code> 年了都还有人杠，说 <code>InnoDB 的 RR 隔离级别下会出现幻读，只能依靠 gap 和 next-key 这两个锁来防止幻读</code> ，最开始我还以为是他真的不知道这个点，就跟他聊，最后聊下来发现，发现是在钻牛角尖。</p><p>这个在下面讲到 <strong>可重复读</strong> 的隔离级别时会讲。</p><p>本来我觉得事务隔离级别这玩意儿太简单没啥可讲的，但是经过了上面这件事，我打算详细的把事务隔离给讲讲。接下来顺便就把 <code>InnoDB</code> 所有的事务隔离级别给搂一遍。</p><h2 id="acid" tabindex="-1"><a class="header-anchor" href="#acid" aria-hidden="true">#</a> ACID</h2><p>在聊事务隔离级别之前，我们需要知道 <strong>ACID</strong> 模型。</p><figure><img src="'+p+'" alt="ACID 模型" tabindex="0" loading="lazy"><figcaption>ACID 模型</figcaption></figure><p>分别代表：</p><ul><li>Atomicity 原子性</li><li>Consistency 一致性</li><li>Isolation 隔离型</li><li>Durability 持久性</li></ul><p><strong>原子性</strong>，代表 InnoDB 事务中，所有的操作要么全部成功，要么全部失败，不会处于某个中间状态。说的更通俗一点，如果事务 A 失败，其所做的<strong>所有的更改</strong>应该全部回滚。</p>',9),B=n("strong",null,"一致性",-1),b={href:"https://mp.weixin.qq.com/s/D-4m5RZwOjhJpLytiJ5FdA",target:"_blank",rel:"noopener noreferrer"},E=n("blockquote",null,[n("p",null,[e("很多其他的博客写的是"),n("strong",null,"事务开要始前后，数据的完整性没有被破坏"),e("。我表示看了根本看不懂，太抽象了。")])],-1),D=n("p",null,[n("strong",null,"隔离性"),e("，主要是指事务之间的隔离，再具体一点，就是我们本篇文章要讨论的事务隔离级别了。")],-1),I=n("p",null,[n("strong",null,"持久性"),e("，主要是指我们新增或者删除了某些数据，一旦成功，这些操作应该需要被持久化到磁盘上去。")],-1),y={href:"https://mp.weixin.qq.com/s/sDhgznRSA5wWduvG156mBw",target:"_blank",rel:"noopener noreferrer"},x=a('<p>而 ACID 中的隔离型，就是我们这篇文章中讨论的重点。</p><h2 id="事务隔离级别" tabindex="-1"><a class="header-anchor" href="#事务隔离级别" aria-hidden="true">#</a> 事务隔离级别</h2><p>有很多文章上来就直接介绍事务隔离级别的种类，这个种类啥意思，那个种类怎么用。但我认为应该先了解<strong>为什么需要事务隔离级别</strong>，以及事务隔离级别到底解决了什么问题，这才是关键。</p><p>我们知道 InnoDB 中同时会有多个事务对数据进行操作，举一些例子：</p><ul><li>假如事务A需要查询 <code>id=1</code> 的数据，但是事务A查询完毕之后，事务B对 <code>id=1</code> 的数据做了更新，那此时事务A再次执行查询，应该看到更新前的数据还是更新后的数据？</li><li>或者还是上面那个例子，事务A读取了事务B的数据，但是如果事务B进行回滚了怎么办？事务A的数据不就变成了脏数据？</li><li>又或者事务A读取了 <code>1-3点</code> 的日程安排，有4条，但是事务A读取完成后事务B又向 <code>1-3</code> 点这个时间段插入了一条新的安排，那么事务A如果再次读取，应该显示4条日程安排还是5条？</li></ul><p>以上的这些问题，就需要<strong>事务隔离级别</strong>来回答了。其实以上的三种情况分别对应<strong>不可重复读</strong>、<strong>脏读</strong>和<strong>幻读</strong>。InnoDB 通过事务隔离级别分别的解决了上面的问题。所有的事务隔离级别如下：</p><ul><li>READ UNCOMMITTED 读未提交</li><li>READ COMMITTED 读已提交</li><li>REPEATABLE READ 可重复读</li><li>SERIALIZABLE 串行化</li></ul><p>InnoDB 默认的事务隔离级别为 <code>REPEATABLE READ</code> 。</p><h3 id="读未提交" tabindex="-1"><a class="header-anchor" href="#读未提交" aria-hidden="true">#</a> 读未提交</h3><blockquote><p>事务A读取了事务B还未提交的数据</p></blockquote><p>如果事务B此时出错了进行了回滚，那么事务A读取到的数据就成为了脏数据，从而造成<strong>脏读</strong>。</p><p>如果事务B又更新事务A读取的数据，那么事务A再次读取，读取到了事务B修改的结果，这造成了<strong>不可重复读</strong>。</p><p>而如果事务B又新增了数据，事务A再次读取，会读取到事务B新增的数据，这造成了<strong>幻读</strong>。</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>所以总结来说，在<strong>读未提交</strong>这个隔离级别下，会造成以下的问题：</p><ul><li>脏读</li><li>不可重复读</li><li>幻读</li></ul><h3 id="读已提交" tabindex="-1"><a class="header-anchor" href="#读已提交" aria-hidden="true">#</a> 读已提交</h3><blockquote><p>事务A读取了事务B已经提交的数据</p></blockquote><p>如果事务B更新了事务A读取到的数据，并且提交，那么当事务A再次进行读取，就会读取到其他事务的变更，就造成了<strong>不可重复读</strong>。</p><p>同理，如果事务B新增了数据并且提交，事务A再次进行读取时拿到了事务B刚刚提交的数据，这就造成了幻读。</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>所以总结来说，在<strong>读已提交</strong>的隔离级别下，会造成：</p><ul><li>不可重复读</li><li>幻读</li></ul><h3 id="可重复读" tabindex="-1"><a class="header-anchor" href="#可重复读" aria-hidden="true">#</a> 可重复读</h3><blockquote><p>事务A不会读取到事务B更新的数据，也不会读到事务B新增的数据</p></blockquote><p>在可重复读场景下，不会出现<strong>脏读</strong>、不会出现<strong>不可重复读</strong>，可能会出现<strong>幻读</strong>。</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>无论事务B做了什么操作，事务A查询到的 <code>id=1</code> 的数据都是张三。</p><p>但是，在某些情况下，还是可能会出现 <strong>幻读</strong>。<strong>可重复读</strong> 只是在某些情况下会产生幻读，但绝对不是 <code>InnoDB 无法避免幻读</code>。首先，InnoDB 在 RR 隔离级别下有很明确的解决幻读的方式，那就是——<strong>临键锁</strong>，一种组合了 gap 锁和记录锁的锁。</p><p>接下来举个例子来看在 RR 隔离级别下，什么情况会出现幻读，什么情况下不会出现幻读。首先是 <strong>可能会出现幻读</strong>。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>student<span class="token punctuation">`</span></span> <span class="token keyword">WHERE</span> <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于 InnoDB 有 MVCC 来进行多事务的并发，此时 <code>SELECT</code> 走的是快照读，不会加锁，所以无论插入多少 <code>id &gt; 1</code> 的数据，在同一个事物内执行上述的 SQL 是不会出现幻读的。</p><p>但是如果显示的进行加锁，就会出现幻读。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>student<span class="token punctuation">`</span></span> <span class="token keyword">WHERE</span> <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token keyword">FOR</span> <span class="token keyword">UPDATE</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为啥这样就会有问题呢？对 <code>SELECT</code> 显示的进行加锁之后，无论是加的共享锁还是排他锁，都会进行 <strong>当前读</strong>，而一旦执行了当前读，就能够读取到其他事物提交的 <code>id &gt; 1</code> 的数据。</p><h3 id="串行化" tabindex="-1"><a class="header-anchor" href="#串行化" aria-hidden="true">#</a> 串行化</h3><blockquote><p>所以事务被强制的串行执行</p></blockquote><p>这样从根本上就避免了并发的问题，但是这样会使得 MySQL 的性能下降。因为现在同一时间只能有一个事务在运行。</p><h2 id="eof" tabindex="-1"><a class="header-anchor" href="#eof" aria-hidden="true">#</a> EOF</h2><p>关于事务隔离级别就先介绍到这，之后有时间了就把 <strong>事务隔离级别</strong> 的底层原理给搂一遍。</p>',40);function q(R,L){const s=i("ExternalLinkIcon");return r(),l("div",null,[h,n("p",null,[e("之前发过一篇文章，"),n("a",k,[e("简单了解 MySQL 中相关的锁"),o(s)]),e("，里面提到了，如果我们使用的 MySQL 存储引擎为 "),_,e(" ，并且其事务隔离级别是 "),m,e(" 可重复读的话，是可以避免"),f,e("的。")]),A,n("p",null,[B,e("，主要是保护数据的一致性，防止由于数据库的崩溃而导致的数据一致性问题。举个例子，我们更新 MySQL 的数据，更新的数据会先到 InnoDB 的 "),n("a",b,[e("Buffer Pool"),o(s)]),e(" 中，如果此时 MySQL 所在的机器突然意外重启了，如果 InnoDB 没有崩溃恢复机制，之前更新的数据就会丢失，数据的一致性问题就出现了。")]),E,D,I,n("p",null,[e("ACID 模型可以理解成数据库的设计范式，主要关注点在数据数据、及其本身的可靠性。而 MySQL 中的 InnoDB 就完全遵守 ACID 模型，并且在存储引擎层就支持数据一致性的校验和"),n("a",y,[e("崩溃恢复"),o(s)]),e("的机制。")]),x])}const w=t(u,[["render",q],["__file","230810.html.vue"]]);export{w as default};
