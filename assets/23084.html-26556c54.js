const e=JSON.parse('{"key":"v-5df909ba","path":"/posts/23084.html","title":"详细了解 InnoDB 内存结构及其原理","lang":"zh-CN","frontmatter":{"date":"2021-04-13T00:00:00.000Z","permalink":"/posts/23084.html","category":["mysql"],"description":"详细了解 InnoDB 内存结构及其原理 最近发现，文章太长的话，包含的信息量较大， 并且需要更多的时间去阅读。而大家看文章，应该都是利用的一些碎片时间。所以我得出一个结论，文章太长不太利于大家的吸收和消化。所以我之后会减少文章的长度，2-3K字就差不多，也能够快速的阅读完。 之前写过一篇文章「简单了解InnoDB原理」，现在回过头看，其实里面只是把缓冲池（Buffer Pool），重做日志缓冲（Redo Log Buffer）、插入缓冲（Insert Buffer）和自适应哈希索引（Adaptive Hash Index）等概念简单的介绍了一下。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/23084.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"详细了解 InnoDB 内存结构及其原理"}],["meta",{"property":"og:description","content":"详细了解 InnoDB 内存结构及其原理 最近发现，文章太长的话，包含的信息量较大， 并且需要更多的时间去阅读。而大家看文章，应该都是利用的一些碎片时间。所以我得出一个结论，文章太长不太利于大家的吸收和消化。所以我之后会减少文章的长度，2-3K字就差不多，也能够快速的阅读完。 之前写过一篇文章「简单了解InnoDB原理」，现在回过头看，其实里面只是把缓冲池（Buffer Pool），重做日志缓冲（Redo Log Buffer）、插入缓冲（Insert Buffer）和自适应哈希索引（Adaptive Hash Index）等概念简单的介绍了一下。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-11T09:03:46.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:published_time","content":"2021-04-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-11T09:03:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"详细了解 InnoDB 内存结构及其原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-04-13T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-11T09:03:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"InnoDB内存结构","slug":"innodb内存结构","link":"#innodb内存结构","children":[{"level":3,"title":"Buffer Pool","slug":"buffer-pool","link":"#buffer-pool","children":[]},{"level":3,"title":"Log Buffer","slug":"log-buffer","link":"#log-buffer","children":[]}]},{"level":2,"title":"Buffer Pool的LRU算法","slug":"buffer-pool的lru算法","link":"#buffer-pool的lru算法","children":[{"level":3,"title":"原生LRU","slug":"原生lru","link":"#原生lru","children":[]},{"level":3,"title":"优化后的LRU","slug":"优化后的lru","link":"#优化后的lru","children":[]}]},{"level":2,"title":"优化Buffer Pool的配置","slug":"优化buffer-pool的配置","link":"#优化buffer-pool的配置","children":[]},{"level":2,"title":"自适应哈希索引","slug":"自适应哈希索引","link":"#自适应哈希索引","children":[]},{"level":2,"title":"Change Buffer","slug":"change-buffer","link":"#change-buffer","children":[]}],"git":{"createdTime":1691744626000,"updatedTime":1691744626000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":10.12,"words":3035},"filePathRelative":"posts/mysql/详细了解 InnoDB 内存结构及其原理.md","localizedDate":"2021年4月13日","excerpt":"<h1> 详细了解 InnoDB 内存结构及其原理</h1>\\n<p>最近发现，文章太长的话，包含的信息量较大， 并且需要更多的时间去阅读。而大家看文章，应该都是利用的一些碎片时间。所以我得出一个结论，文章太长不太利于大家的吸收和消化。所以我之后会减少文章的长度，2-3K字就差不多，也能够快速的阅读完。</p>\\n<p>之前写过一篇文章「<a href=\\"https://mp.weixin.qq.com/s/-puz311svMVbBAdRioPrnQ\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">简单了解InnoDB原理</a>」，现在回过头看，其实里面只是把缓冲池（Buffer Pool），重做日志缓冲（Redo Log Buffer）、插入缓冲（Insert Buffer）和自适应哈希索引（Adaptive Hash Index）等概念简单的介绍了一下。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
