const e=JSON.parse('{"key":"v-5725a73e","path":"/posts/23086.html","title":"简单了解 MySQL 中相关的锁","lang":"zh-CN","frontmatter":{"date":"2021-05-24T00:00:00.000Z","permalink":"/posts/23086.html","category":["mysql"],"description":"简单了解 MySQL 中相关的锁 本文主要是带大家快速了解 InnoDB 中锁相关的知识 为什么需要加锁 首先，为什么要加锁？我想我不用多说了，想象接下来的场景你就能 GET 了。 你在商场的卫生间上厕所，此时你一定会做的操作是啥？锁门。如果不锁门，上厕所上着上着，啪一下门就被打开了，可能大概也许似乎貌似有那么一丁点的不太合适。 数据也是一样，在并发的场景下，如果不对数据加锁，会直接破坏数据的一致性，并且如果你的业务涉及到钱，那后果就更严重了。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/23086.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"简单了解 MySQL 中相关的锁"}],["meta",{"property":"og:description","content":"简单了解 MySQL 中相关的锁 本文主要是带大家快速了解 InnoDB 中锁相关的知识 为什么需要加锁 首先，为什么要加锁？我想我不用多说了，想象接下来的场景你就能 GET 了。 你在商场的卫生间上厕所，此时你一定会做的操作是啥？锁门。如果不锁门，上厕所上着上着，啪一下门就被打开了，可能大概也许似乎貌似有那么一丁点的不太合适。 数据也是一样，在并发的场景下，如果不对数据加锁，会直接破坏数据的一致性，并且如果你的业务涉及到钱，那后果就更严重了。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-13T07:42:26.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:published_time","content":"2021-05-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-13T07:42:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"简单了解 MySQL 中相关的锁\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-05-24T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-13T07:42:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"为什么需要加锁","slug":"为什么需要加锁","link":"#为什么需要加锁","children":[]},{"level":2,"title":"锁的分类","slug":"锁的分类","link":"#锁的分类","children":[{"level":3,"title":"意向锁","slug":"意向锁","link":"#意向锁","children":[]},{"level":3,"title":"记录锁","slug":"记录锁","link":"#记录锁","children":[]},{"level":3,"title":"间隙锁","slug":"间隙锁","link":"#间隙锁","children":[]},{"level":3,"title":"临键锁","slug":"临键锁","link":"#临键锁","children":[]},{"level":3,"title":"插入意向锁","slug":"插入意向锁","link":"#插入意向锁","children":[]},{"level":3,"title":"自增锁","slug":"自增锁","link":"#自增锁","children":[]}]}],"git":{"createdTime":1691912439000,"updatedTime":1691912546000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":2}]},"readingTime":{"minutes":9.4,"words":2819},"filePathRelative":"posts/mysql/简单了解MySQL中相关的锁.md","localizedDate":"2021年5月24日","excerpt":"<h1> 简单了解 MySQL 中相关的锁</h1>\\n<blockquote>\\n<p>本文主要是带大家快速了解 InnoDB 中锁相关的知识</p>\\n</blockquote>\\n<h2> 为什么需要加锁</h2>\\n<p>首先，为什么要加锁？我想我不用多说了，想象接下来的场景你就能 GET 了。</p>\\n<blockquote>\\n<p>你在商场的卫生间上厕所，此时你一定会做的操作是啥？锁门。如果不锁门，上厕所上着上着，啪一下门就被打开了，可能大概也许似乎貌似有那么一丁点的不太合适。</p>\\n</blockquote>\\n<p>数据也是一样，在并发的场景下，如果不对数据加锁，会直接破坏数据的一致性，并且如果你的业务涉及到钱，那后果就更严重了。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
