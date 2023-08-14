const e=JSON.parse('{"key":"v-975425cc","path":"/posts/230812.html","title":"MySQL 中删除的数据都去哪儿了？","lang":"zh-CN","frontmatter":{"date":"2021-08-11T00:00:00.000Z","permalink":"/posts/230812.html","category":["mysql"],"description":"MySQL 中删除的数据都去哪儿了？ 不知道大家有没有想过下面这件事？ 我们平时调用 DELETE 在 MySQL 中删除的数据都去哪儿了？ 这还用问吗？当然是被删除了啊 那么这里又有个新的问题了，如果在 InnoDB 下，多事务并发的情况下，如果事务A删除了 id=1 的数据，同时事务B又去读取 id=1 的数据，如果这条数据真的被删除了，那 MVCC 拿啥数据返回给用户呢？","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230812.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"MySQL 中删除的数据都去哪儿了？"}],["meta",{"property":"og:description","content":"MySQL 中删除的数据都去哪儿了？ 不知道大家有没有想过下面这件事？ 我们平时调用 DELETE 在 MySQL 中删除的数据都去哪儿了？ 这还用问吗？当然是被删除了啊 那么这里又有个新的问题了，如果在 InnoDB 下，多事务并发的情况下，如果事务A删除了 id=1 的数据，同时事务B又去读取 id=1 的数据，如果这条数据真的被删除了，那 MVCC 拿啥数据返回给用户呢？"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-14T03:32:07.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:published_time","content":"2021-08-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-14T03:32:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 中删除的数据都去哪儿了？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-08-11T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-14T03:32:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1691983927000,"updatedTime":1691983927000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":4.82,"words":1447},"filePathRelative":"posts/mysql/MySQL中删除的数据都去哪儿了？.md","localizedDate":"2021年8月11日","excerpt":"<h1> MySQL 中删除的数据都去哪儿了？</h1>\\n<p>不知道大家有没有想过下面这件事？</p>\\n<blockquote>\\n<p>我们平时调用 <code>DELETE</code> 在 MySQL 中删除的数据都去哪儿了？</p>\\n</blockquote>\\n<p>这还用问吗？当然是被删除了啊</p>\\n<figure><img src=\\"/images/mysql/230812/img-1.jpeg\\" alt=\\"\\" width=\\"250\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>那么这里又有个新的问题了，如果在 InnoDB 下，多事务并发的情况下，如果事务A删除了 <code>id=1</code> 的数据，同时事务B又去读取 <code>id=1</code> 的数据，如果这条数据真的被删除了，那 MVCC 拿啥数据返回给用户呢？</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
