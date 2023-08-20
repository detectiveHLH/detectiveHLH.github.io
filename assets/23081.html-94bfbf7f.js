const e=JSON.parse('{"key":"v-68361d74","path":"/posts/23081.html","title":"简单了解InnoDB底层原理","lang":"zh-CN","frontmatter":{"date":"2020-07-28T00:00:00.000Z","permalink":"/posts/23081.html","category":["数据库"],"tag":["MySQL"],"description":"简单了解InnoDB底层原理 存储引擎 很多文章都是直接开始介绍有哪些存储引擎，并没有去介绍存储引擎本身。那么究竟什么是存储引擎？不知道大家有没有想过，MySQL是如何存储我们丢进去的数据的？ 其实存储引擎也很简单，我认为就是一种存储解决方案，实现了新增数据、更新数据和建立索引等等功能。 有哪些已有的存储引擎可以让我们选择呢？ InnoDB、MyISAM、Memory、CSV、Archive、Blackhole、Merge、Federated、Example","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/23081.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"简单了解InnoDB底层原理"}],["meta",{"property":"og:description","content":"简单了解InnoDB底层原理 存储引擎 很多文章都是直接开始介绍有哪些存储引擎，并没有去介绍存储引擎本身。那么究竟什么是存储引擎？不知道大家有没有想过，MySQL是如何存储我们丢进去的数据的？ 其实存储引擎也很简单，我认为就是一种存储解决方案，实现了新增数据、更新数据和建立索引等等功能。 有哪些已有的存储引擎可以让我们选择呢？ InnoDB、MyISAM、Memory、CSV、Archive、Blackhole、Merge、Federated、Example"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-17T08:56:26.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2020-07-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-17T08:56:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"简单了解InnoDB底层原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-07-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-17T08:56:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"存储引擎","slug":"存储引擎","link":"#存储引擎","children":[]},{"level":2,"title":"缓冲池","slug":"缓冲池","link":"#缓冲池","children":[{"level":3,"title":"插入缓冲","slug":"插入缓冲","link":"#插入缓冲","children":[]},{"level":3,"title":"两次写","slug":"两次写","link":"#两次写","children":[]},{"level":3,"title":"自适应哈希索引","slug":"自适应哈希索引","link":"#自适应哈希索引","children":[]}]},{"level":2,"title":"页","slug":"页","link":"#页","children":[]},{"level":2,"title":"重做日志缓冲","slug":"重做日志缓冲","link":"#重做日志缓冲","children":[]},{"level":2,"title":"日志","slug":"日志","link":"#日志","children":[{"level":3,"title":"MySQL日志","slug":"mysql日志","link":"#mysql日志","children":[]},{"level":3,"title":"InnoDB日志","slug":"innodb日志","link":"#innodb日志","children":[]}]},{"level":2,"title":"InnoDB和MyISAM的区别","slug":"innodb和myisam的区别","link":"#innodb和myisam的区别","children":[]},{"level":2,"title":"End","slug":"end","link":"#end","children":[]}],"git":{"createdTime":1692260892000,"updatedTime":1692262586000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":3}]},"readingTime":{"minutes":9.59,"words":2878},"filePathRelative":"posts/数据库/简单了解InnoDB底层原理.md","localizedDate":"2020年7月28日","excerpt":"<h1> 简单了解InnoDB底层原理</h1>\\n<h2> 存储引擎</h2>\\n<p>很多文章都是直接开始介绍有哪些存储引擎，并没有去介绍存储引擎本身。那么究竟什么是存储引擎？不知道大家有没有想过，MySQL是如何存储我们丢进去的数据的？</p>\\n<p>其实存储引擎也很简单，我认为就是一种存储解决方案，实现了新增数据、更新数据和建立索引等等功能。</p>\\n<p>有哪些已有的存储引擎可以让我们选择呢？</p>\\n<blockquote>\\n<p>InnoDB、MyISAM、Memory、CSV、Archive、Blackhole、Merge、Federated、Example</p>\\n</blockquote>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
