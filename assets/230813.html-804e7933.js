const e=JSON.parse('{"key":"v-93ea748e","path":"/posts/230813.html","title":"MySQL 不完全入门指南","lang":"zh-CN","frontmatter":{"date":"2021-08-18T00:00:00.000Z","permalink":"/posts/230813.html","category":["数据库"],"tag":["MySQL"],"description":"MySQL 不完全入门指南 由于 MySQL 的整个体系太过于庞大，文章的篇幅有限，不能够完全的覆盖所有的方面。所以我会尽可能的从更加贴进我们日常使用的方式来进行解释。 小白眼中的 MySQL 首先，对于我们来说，MySQL 是个啥？我们从一个最简单的例子来回顾一下。 这可能就是最开始大家认知中的 MySQL。那 MySQL 中是怎么处理这个查询语句的呢？换句话说，它是如何感知到这串字符串是一个查询语句的？它是如何感知到该去哪张表中取数据？它是如何感知到该如何取数据？","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230813.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"MySQL 不完全入门指南"}],["meta",{"property":"og:description","content":"MySQL 不完全入门指南 由于 MySQL 的整个体系太过于庞大，文章的篇幅有限，不能够完全的覆盖所有的方面。所以我会尽可能的从更加贴进我们日常使用的方式来进行解释。 小白眼中的 MySQL 首先，对于我们来说，MySQL 是个啥？我们从一个最简单的例子来回顾一下。 这可能就是最开始大家认知中的 MySQL。那 MySQL 中是怎么处理这个查询语句的呢？换句话说，它是如何感知到这串字符串是一个查询语句的？它是如何感知到该去哪张表中取数据？它是如何感知到该如何取数据？"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-17T08:37:57.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2021-08-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-17T08:37:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 不完全入门指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-08-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-17T08:37:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"小白眼中的 MySQL","slug":"小白眼中的-mysql","link":"#小白眼中的-mysql","children":[{"level":3,"title":"连接池","slug":"连接池","link":"#连接池","children":[]},{"level":3,"title":"分析器","slug":"分析器","link":"#分析器","children":[]},{"level":3,"title":"优化器","slug":"优化器","link":"#优化器","children":[]},{"level":3,"title":"执行器","slug":"执行器","link":"#执行器","children":[]}]},{"level":2,"title":"存储引擎","slug":"存储引擎","link":"#存储引擎","children":[]},{"level":2,"title":"Buffer Pool","slug":"buffer-pool","link":"#buffer-pool","children":[{"level":3,"title":"页","slug":"页","link":"#页","children":[]},{"level":3,"title":"索引","slug":"索引","link":"#索引","children":[]},{"level":3,"title":"更新数据","slug":"更新数据","link":"#更新数据","children":[]},{"level":3,"title":"Change Buffer","slug":"change-buffer","link":"#change-buffer","children":[]},{"level":3,"title":"Adaptive Hash","slug":"adaptive-hash","link":"#adaptive-hash","children":[]},{"level":3,"title":"过期策略","slug":"过期策略","link":"#过期策略","children":[]}]},{"level":2,"title":"Log Buffer","slug":"log-buffer","link":"#log-buffer","children":[]}],"git":{"createdTime":1692260892000,"updatedTime":1692261477000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":2}]},"readingTime":{"minutes":18.17,"words":5452},"filePathRelative":"posts/数据库/MySQL不完全入门指南.md","localizedDate":"2021年8月18日","excerpt":"<h1> MySQL 不完全入门指南</h1>\\n<p>由于 MySQL 的整个体系太过于庞大，文章的篇幅有限，不能够完全的覆盖所有的方面。所以我会尽可能的从更加贴进我们日常使用的方式来进行解释。</p>\\n<h2> 小白眼中的 MySQL</h2>\\n<p>首先，对于我们来说，MySQL 是个啥？我们从一个最简单的例子来回顾一下。</p>\\n<figure><img src=\\"/images/230813/simple-example.jpeg\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>这可能就是最开始大家认知中的 MySQL。那 MySQL 中是怎么处理这个查询语句的呢？换句话说，它是如何感知到这串字符串是一个查询语句的？它是如何感知到该去哪张表中取数据？它是如何感知到该如何取数据？</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
