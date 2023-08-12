const e=JSON.parse('{"key":"v-64cc6c36","path":"/posts/23082.html","title":"深入了解 MySQL 主从复制的原理","lang":"zh-CN","frontmatter":{"date":"2021-01-12T00:00:00.000Z","permalink":"/posts/23082.html","category":["mysql"],"description":"深入了解 MySQL 主从复制的原理 0. 主从复制 首先主从复制是什么？简单来说是让一台MySQL服务器去复制另一台MySQL的数据，使两个服务器的数据保持一致。 这种方式与Redis的主从复制的思路没有太大的出入。如果你对Redis的主从复制感兴趣可以去看看《Redis的主从复制》。那既然Redis和MySQL都采用了复制这种方式，主从复制所带来的意义是什么呢？","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/23082.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"深入了解 MySQL 主从复制的原理"}],["meta",{"property":"og:description","content":"深入了解 MySQL 主从复制的原理 0. 主从复制 首先主从复制是什么？简单来说是让一台MySQL服务器去复制另一台MySQL的数据，使两个服务器的数据保持一致。 这种方式与Redis的主从复制的思路没有太大的出入。如果你对Redis的主从复制感兴趣可以去看看《Redis的主从复制》。那既然Redis和MySQL都采用了复制这种方式，主从复制所带来的意义是什么呢？"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-12T12:42:33.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:published_time","content":"2021-01-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-12T12:42:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入了解 MySQL 主从复制的原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-01-12T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-12T12:42:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"0. 主从复制","slug":"_0-主从复制","link":"#_0-主从复制","children":[]},{"level":2,"title":"1. 复制原理","slug":"_1-复制原理","link":"#_1-复制原理","children":[{"level":3,"title":"1.1 binlog","slug":"_1-1-binlog","link":"#_1-1-binlog","children":[]},{"level":3,"title":"1.2 查看binlog","slug":"_1-2-查看binlog","link":"#_1-2-查看binlog","children":[]},{"level":3,"title":"1.3 复制的核心步骤","slug":"_1-3-复制的核心步骤","link":"#_1-3-复制的核心步骤","children":[]},{"level":3,"title":"1.4 Relay Log","slug":"_1-4-relay-log","link":"#_1-4-relay-log","children":[]},{"level":3,"title":"1.5 Relay Log核心参数","slug":"_1-5-relay-log核心参数","link":"#_1-5-relay-log核心参数","children":[]}]},{"level":2,"title":"2. 复制模型","slug":"_2-复制模型","link":"#_2-复制模型","children":[{"level":3,"title":"2.1 一主多从","slug":"_2-1-一主多从","link":"#_2-1-一主多从","children":[]},{"level":3,"title":"2.2 级联复制","slug":"_2-2-级联复制","link":"#_2-2-级联复制","children":[]},{"level":3,"title":"2.3 主主复制","slug":"_2-3-主主复制","link":"#_2-3-主主复制","children":[]},{"level":3,"title":"2.4 主、被动的主主复制","slug":"_2-4-主、被动的主主复制","link":"#_2-4-主、被动的主主复制","children":[]}]},{"level":2,"title":"3. 复制方式","slug":"_3-复制方式","link":"#_3-复制方式","children":[{"level":3,"title":"3.1 异步复制","slug":"_3-1-异步复制","link":"#_3-1-异步复制","children":[]},{"level":3,"title":"3.2 同步复制","slug":"_3-2-同步复制","link":"#_3-2-同步复制","children":[]},{"level":3,"title":"3.3 半同步复制","slug":"_3-3-半同步复制","link":"#_3-3-半同步复制","children":[]}]},{"level":2,"title":"4. 复制中的数据一致性","slug":"_4-复制中的数据一致性","link":"#_4-复制中的数据一致性","children":[]}],"git":{"createdTime":1691744626000,"updatedTime":1691844153000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":2}]},"readingTime":{"minutes":18.1,"words":5430},"filePathRelative":"posts/mysql/深入了解 MySQL 主从复制的原理.md","localizedDate":"2021年1月12日","excerpt":"<h1> 深入了解 MySQL 主从复制的原理</h1>\\n<h2> 0. 主从复制</h2>\\n<p>首先主从复制是什么？简单来说是让一台MySQL服务器去复制另一台MySQL的数据，使两个服务器的数据保持一致。</p>\\n<p>这种方式与Redis的主从复制的思路没有太大的出入。如果你对Redis的主从复制感兴趣可以去看看<a href=\\"https://mp.weixin.qq.com/s/VJTBmAB-A1aRT9DR6v5gow\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">《Redis的主从复制》</a>。那既然Redis和MySQL都采用了<strong>复制</strong>这种方式，主从复制所带来的意义是什么呢？</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
