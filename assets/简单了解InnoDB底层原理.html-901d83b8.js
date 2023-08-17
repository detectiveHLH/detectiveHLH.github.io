const e=JSON.parse('{"key":"v-3680a009","path":"/posts/%E6%95%B0%E6%8D%AE%E5%BA%93/%E7%AE%80%E5%8D%95%E4%BA%86%E8%A7%A3InnoDB%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86.html","title":"简单了解InnoDB底层原理","lang":"zh-CN","frontmatter":{"description":"x--- date: 2020-07-28 permalink: /posts/23081.html category: 数据库 tag: MySQL 简单了解InnoDB底层原理 存储引擎 很多文章都是直接开始介绍有哪些存储引擎，并没有去介绍存储引擎本身。那么究竟什么是存储引擎？不知道大家有没有想过，MySQL是如何存储我们丢进去的数据的？ 其实存储引擎也很简单，我认为就是一种存储解决方案，实现了新增数据、更新数据和建立索引等等功能。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/%E6%95%B0%E6%8D%AE%E5%BA%93/%E7%AE%80%E5%8D%95%E4%BA%86%E8%A7%A3InnoDB%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"简单了解InnoDB底层原理"}],["meta",{"property":"og:description","content":"x--- date: 2020-07-28 permalink: /posts/23081.html category: 数据库 tag: MySQL 简单了解InnoDB底层原理 存储引擎 很多文章都是直接开始介绍有哪些存储引擎，并没有去介绍存储引擎本身。那么究竟什么是存储引擎？不知道大家有没有想过，MySQL是如何存储我们丢进去的数据的？ 其实存储引擎也很简单，我认为就是一种存储解决方案，实现了新增数据、更新数据和建立索引等等功能。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"LeonSH"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"简单了解InnoDB底层原理\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"存储引擎","slug":"存储引擎","link":"#存储引擎","children":[]},{"level":2,"title":"缓冲池","slug":"缓冲池","link":"#缓冲池","children":[{"level":3,"title":"插入缓冲","slug":"插入缓冲","link":"#插入缓冲","children":[]},{"level":3,"title":"两次写","slug":"两次写","link":"#两次写","children":[]},{"level":3,"title":"自适应哈希索引","slug":"自适应哈希索引","link":"#自适应哈希索引","children":[]}]},{"level":2,"title":"页","slug":"页","link":"#页","children":[]},{"level":2,"title":"重做日志缓冲","slug":"重做日志缓冲","link":"#重做日志缓冲","children":[]},{"level":2,"title":"日志","slug":"日志","link":"#日志","children":[{"level":3,"title":"MySQL日志","slug":"mysql日志","link":"#mysql日志","children":[]},{"level":3,"title":"InnoDB日志","slug":"innodb日志","link":"#innodb日志","children":[]}]},{"level":2,"title":"InnoDB和MyISAM的区别","slug":"innodb和myisam的区别","link":"#innodb和myisam的区别","children":[]},{"level":2,"title":"End","slug":"end","link":"#end","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":9.6,"words":2879},"filePathRelative":"posts/数据库/简单了解InnoDB底层原理.md","excerpt":"<p>x---<br>\\ndate: 2020-07-28<br>\\npermalink: /posts/23081.html<br>\\ncategory:</p>\\n<ul>\\n<li>数据库<br>\\ntag:</li>\\n<li>MySQL</li>\\n</ul>\\n<hr>\\n<h1> 简单了解InnoDB底层原理</h1>\\n<h2> 存储引擎</h2>\\n<p>很多文章都是直接开始介绍有哪些存储引擎，并没有去介绍存储引擎本身。那么究竟什么是存储引擎？不知道大家有没有想过，MySQL是如何存储我们丢进去的数据的？</p>\\n<p>其实存储引擎也很简单，我认为就是一种存储解决方案，实现了新增数据、更新数据和建立索引等等功能。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
