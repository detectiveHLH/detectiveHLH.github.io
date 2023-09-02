const e=JSON.parse('{"key":"v-505244c2","path":"/posts/23088.html","title":"MySQL 页完全指南——浅入深出页的原理","lang":"zh-CN","frontmatter":{"date":"2021-06-21T00:00:00.000Z","permalink":"/posts/23088.html","category":["数据库"],"tag":["MySQL"],"description":"MySQL 页完全指南——浅入深出页的原理 之前写了一些关于 MySQL 的 InnoDB 存储引擎的文章，里面好几次都提到了页这个概念，但是都只是简要的提了一下。例如之前在聊 InnoDB内存结构 时提到过，但当时的重点是内存架构，就没有展开深入。 我发现有好几次都需要提到页，那我就正好拿一篇来详细的讲讲 InnoDB 中的页。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/23088.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"MySQL 页完全指南——浅入深出页的原理"}],["meta",{"property":"og:description","content":"MySQL 页完全指南——浅入深出页的原理 之前写了一些关于 MySQL 的 InnoDB 存储引擎的文章，里面好几次都提到了页这个概念，但是都只是简要的提了一下。例如之前在聊 InnoDB内存结构 时提到过，但当时的重点是内存架构，就没有展开深入。 我发现有好几次都需要提到页，那我就正好拿一篇来详细的讲讲 InnoDB 中的页。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-02T08:48:07.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2021-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-02T08:48:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 页完全指南——浅入深出页的原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-02T08:48:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"页是什么","slug":"页是什么","link":"#页是什么","children":[]},{"level":2,"title":"页的概览","slug":"页的概览","link":"#页的概览","children":[]},{"level":2,"title":"Infimum 和 Supremum","slug":"infimum-和-supremum","link":"#infimum-和-supremum","children":[]},{"level":2,"title":"使用Page Directory","slug":"使用page-directory","link":"#使用page-directory","children":[]},{"level":2,"title":"页的真实面貌","slug":"页的真实面貌","link":"#页的真实面貌","children":[{"level":3,"title":"File Header","slug":"file-header","link":"#file-header","children":[]},{"level":3,"title":"Page Header","slug":"page-header","link":"#page-header","children":[]},{"level":3,"title":"Infimum & Supremum Records","slug":"infimum-supremum-records","link":"#infimum-supremum-records","children":[]},{"level":3,"title":"User Records","slug":"user-records","link":"#user-records","children":[]},{"level":3,"title":"Free Space","slug":"free-space","link":"#free-space","children":[]},{"level":3,"title":"Page Directory","slug":"page-directory","link":"#page-directory","children":[]},{"level":3,"title":"File Trailer","slug":"file-trailer","link":"#file-trailer","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1693644487000,"updatedTime":1693644487000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":8.28,"words":2483},"filePathRelative":"posts/数据库/MySQL页完全指南——浅入深出页的原理.md","localizedDate":"2021年6月21日","excerpt":"<h1> MySQL 页完全指南——浅入深出页的原理</h1>\\n<p>之前写了一些关于 MySQL 的 InnoDB 存储引擎的文章，里面好几次都提到了<strong>页</strong>这个概念，但是都只是简要的提了一下。例如之前在聊 <a href=\\"https://mp.weixin.qq.com/s/D-4m5RZwOjhJpLytiJ5FdA\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">InnoDB内存结构</a> 时提到过，但当时的重点是内存架构，就没有展开深入。</p>\\n<p>我发现有好几次都需要提到页，那我就正好拿一篇来详细的讲讲 InnoDB 中的页。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
