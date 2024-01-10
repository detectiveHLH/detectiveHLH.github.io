const e=JSON.parse('{"key":"v-9abdd70a","path":"/posts/230811.html","title":"MySQL 到底是如何做到多版本并发的？","lang":"zh-CN","frontmatter":{"date":"2021-08-02T00:00:00.000Z","permalink":"/posts/230811.html","category":["数据库"],"tag":["MySQL"],"description":"MySQL 到底是如何做到多版本并发的？ 之前的文章简单的介绍了 MySQL 的事务隔离级别，它们分别是：读未提交、读已提交、可重复读、串行化。这篇文章我们就来探索一下 MySQL 事务隔离级别的底层原理。 本篇文章针对 InnoDB 存储引擎 多版本并发控制 我们知道，读未提交会造成脏读、幻读、不可重复读，读已提交会造成幻读、不可重复读，可重复读可能会有幻读，和串行化就不会有这些问题。 那 InnoDB 到底是怎么解决这些问题的呢？又或者，你有没有想过造成脏读、幻读、不可重复读的底层最根本的原因是什么呢？","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230811.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"MySQL 到底是如何做到多版本并发的？"}],["meta",{"property":"og:description","content":"MySQL 到底是如何做到多版本并发的？ 之前的文章简单的介绍了 MySQL 的事务隔离级别，它们分别是：读未提交、读已提交、可重复读、串行化。这篇文章我们就来探索一下 MySQL 事务隔离级别的底层原理。 本篇文章针对 InnoDB 存储引擎 多版本并发控制 我们知道，读未提交会造成脏读、幻读、不可重复读，读已提交会造成幻读、不可重复读，可重复读可能会有幻读，和串行化就不会有这些问题。 那 InnoDB 到底是怎么解决这些问题的呢？又或者，你有没有想过造成脏读、幻读、不可重复读的底层最根本的原因是什么呢？"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-09T11:45:29.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2021-08-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-09T11:45:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 到底是如何做到多版本并发的？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-08-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-09T11:45:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"多版本并发控制","slug":"多版本并发控制","link":"#多版本并发控制","children":[]},{"level":2,"title":"一致性读","slug":"一致性读","link":"#一致性读","children":[]},{"level":2,"title":"深入一致性读原理","slug":"深入一致性读原理","link":"#深入一致性读原理","children":[]},{"level":2,"title":"Undo Log 的组成","slug":"undo-log-的组成","link":"#undo-log-的组成","children":[]},{"level":2,"title":"EOF","slug":"eof","link":"#eof","children":[]}],"git":{"createdTime":1704800729000,"updatedTime":1704800729000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":6.65,"words":1994},"filePathRelative":"posts/数据库/MySQL到底是如何做到多版本并发的？.md","localizedDate":"2021年8月2日","excerpt":"<h1> MySQL 到底是如何做到多版本并发的？</h1>\\n<p>之前的文章简单的介绍了 MySQL 的事务隔离级别，它们分别是：读未提交、读已提交、可重复读、串行化。这篇文章我们就来探索一下 MySQL 事务隔离级别的底层原理。</p>\\n<blockquote>\\n<p>本篇文章针对 InnoDB 存储引擎</p>\\n</blockquote>\\n<h2> 多版本并发控制</h2>\\n<p>我们知道，读未提交会造成脏读、幻读、不可重复读，读已提交会造成幻读、不可重复读，可重复读可能会有幻读，和串行化就不会有这些问题。</p>\\n<p>那 InnoDB 到底是怎么解决这些问题的呢？又或者，你有没有想过造成脏读、幻读、不可重复读的底层最根本的原因是什么呢？</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
