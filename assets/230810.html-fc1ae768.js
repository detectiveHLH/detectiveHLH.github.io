const e=JSON.parse('{"key":"v-9e278848","path":"/posts/230810.html","title":"啥是 MySQL 事务隔离级别？","lang":"zh-CN","frontmatter":{"date":"2021-07-26T00:00:00.000Z","permalink":"/posts/230810.html","category":["数据库"],"tag":["MySQL"],"description":"啥是 MySQL 事务隔离级别？ 之前发过一篇文章，简单了解 MySQL 中相关的锁，里面提到了，如果我们使用的 MySQL 存储引擎为 InnoDB ，并且其事务隔离级别是 RR 可重复读的话，是可以避免幻读的。 但是没想到，都 1202 年了都还有人杠，说 InnoDB 的 RR 隔离级别下会出现幻读，只能依靠 gap 和 next-key 这两个锁来防止幻读 ，最开始我还以为是他真的不知道这个点，就跟他聊，最后聊下来发现，发现是在钻牛角尖。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230810.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"啥是 MySQL 事务隔离级别？"}],["meta",{"property":"og:description","content":"啥是 MySQL 事务隔离级别？ 之前发过一篇文章，简单了解 MySQL 中相关的锁，里面提到了，如果我们使用的 MySQL 存储引擎为 InnoDB ，并且其事务隔离级别是 RR 可重复读的话，是可以避免幻读的。 但是没想到，都 1202 年了都还有人杠，说 InnoDB 的 RR 隔离级别下会出现幻读，只能依靠 gap 和 next-key 这两个锁来防止幻读 ，最开始我还以为是他真的不知道这个点，就跟他聊，最后聊下来发现，发现是在钻牛角尖。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2021-07-26T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"啥是 MySQL 事务隔离级别？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-07-26T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"ACID","slug":"acid","link":"#acid","children":[]},{"level":2,"title":"事务隔离级别","slug":"事务隔离级别","link":"#事务隔离级别","children":[{"level":3,"title":"读未提交","slug":"读未提交","link":"#读未提交","children":[]},{"level":3,"title":"读已提交","slug":"读已提交","link":"#读已提交","children":[]},{"level":3,"title":"可重复读","slug":"可重复读","link":"#可重复读","children":[]},{"level":3,"title":"串行化","slug":"串行化","link":"#串行化","children":[]}]},{"level":2,"title":"EOF","slug":"eof","link":"#eof","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":6.41,"words":1924},"filePathRelative":"posts/数据库/啥是MySQL事务隔离级别？.md","localizedDate":"2021年7月26日","excerpt":"<h1> 啥是 MySQL 事务隔离级别？</h1>\\n<p>之前发过一篇文章，<a href=\\"https://mp.weixin.qq.com/s/rB0MHssNG_9ivZP2ka-EYw\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">简单了解 MySQL 中相关的锁</a>，里面提到了，如果我们使用的 MySQL 存储引擎为 <code>InnoDB</code> ，并且其事务隔离级别是 <code>RR</code> 可重复读的话，是可以避免<strong>幻读</strong>的。</p>\\n<p>但是没想到，都 <code>1202</code> 年了都还有人杠，说 <code>InnoDB 的 RR 隔离级别下会出现幻读，只能依靠 gap 和 next-key 这两个锁来防止幻读</code> ，最开始我还以为是他真的不知道这个点，就跟他聊，最后聊下来发现，发现是在钻牛角尖。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
