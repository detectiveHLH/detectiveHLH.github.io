const e=JSON.parse('{"key":"v-8d171212","path":"/posts/230815.html","title":"Redis基础——剖析基础数据结构及其用法","lang":"zh-CN","frontmatter":{"date":"2020-10-21T00:00:00.000Z","permalink":"/posts/230815.html","category":["Redis"],"tag":["Redis"],"description":"Redis基础——剖析基础数据结构及其用法 这是一个系列的文章，打算把Redis的基础数据结构、高级数据结构、持久化的方式以及高可用的方式都讲一遍，公众号会比其他的平台提前更新，感兴趣的可以提前关注，「SH的全栈笔记」，下面开始正文。 如果你是一个有经验的后端或者服务器开发，那么一定听说过Redis，其全称叫Remote Dictionary Server。是由C语言编写的基于Key-Value的存储系统。说直白点就是一个内存数据库，既然是内存数据库就会遇到如果服务器意外宕机造成的数据不一致的问题。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230815.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"Redis基础——剖析基础数据结构及其用法"}],["meta",{"property":"og:description","content":"Redis基础——剖析基础数据结构及其用法 这是一个系列的文章，打算把Redis的基础数据结构、高级数据结构、持久化的方式以及高可用的方式都讲一遍，公众号会比其他的平台提前更新，感兴趣的可以提前关注，「SH的全栈笔记」，下面开始正文。 如果你是一个有经验的后端或者服务器开发，那么一定听说过Redis，其全称叫Remote Dictionary Server。是由C语言编写的基于Key-Value的存储系统。说直白点就是一个内存数据库，既然是内存数据库就会遇到如果服务器意外宕机造成的数据不一致的问题。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-02T08:48:07.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:published_time","content":"2020-10-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-02T08:48:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis基础——剖析基础数据结构及其用法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-10-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-02T08:48:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"1. 数据类型","slug":"_1-数据类型","link":"#_1-数据类型","children":[]},{"level":2,"title":"2. String","slug":"_2-string","link":"#_2-string","children":[{"level":3,"title":"2.1 使用","slug":"_2-1-使用","link":"#_2-1-使用","children":[]},{"level":3,"title":"2.2 原理","slug":"_2-2-原理","link":"#_2-2-原理","children":[]}]},{"level":2,"title":"3. List","slug":"_3-list","link":"#_3-list","children":[{"level":3,"title":"3.1 使用","slug":"_3-1-使用","link":"#_3-1-使用","children":[]},{"level":3,"title":"3.2 原理","slug":"_3-2-原理","link":"#_3-2-原理","children":[]}]},{"level":2,"title":"4. Hash","slug":"_4-hash","link":"#_4-hash","children":[{"level":3,"title":"4.1 使用","slug":"_4-1-使用","link":"#_4-1-使用","children":[]},{"level":3,"title":"4.2 原理","slug":"_4-2-原理","link":"#_4-2-原理","children":[]}]},{"level":2,"title":"5. Set","slug":"_5-set","link":"#_5-set","children":[{"level":3,"title":"5.1 使用","slug":"_5-1-使用","link":"#_5-1-使用","children":[]},{"level":3,"title":"5.2 原理","slug":"_5-2-原理","link":"#_5-2-原理","children":[]}]},{"level":2,"title":"6. Sorted Set","slug":"_6-sorted-set","link":"#_6-sorted-set","children":[{"level":3,"title":"6.1 使用","slug":"_6-1-使用","link":"#_6-1-使用","children":[]},{"level":3,"title":"6.2 原理","slug":"_6-2-原理","link":"#_6-2-原理","children":[]}]},{"level":2,"title":"End","slug":"end","link":"#end","children":[]}],"git":{"createdTime":1693644487000,"updatedTime":1693644487000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":17.29,"words":5186},"filePathRelative":"posts/Redis/Redis基础——剖析基础数据结构及其用法.md","localizedDate":"2020年10月21日","excerpt":"<h1> Redis基础——剖析基础数据结构及其用法</h1>\\n<blockquote>\\n<p>这是一个系列的文章，打算把Redis的<strong>基础数据结构</strong>、<strong>高级数据结构</strong>、<strong>持久化的方式</strong>以及<strong>高可用的方式</strong>都讲一遍，公众号会比其他的平台提前更新，感兴趣的可以提前关注，「<strong>SH的全栈笔记</strong>」，下面开始正文。</p>\\n</blockquote>\\n<p>如果你是一个有经验的后端或者服务器开发，那么一定听说过Redis，其全称叫<strong>Remote Dictionary Server</strong>。是由C语言编写的基于Key-Value的存储系统。说直白点就是一个<strong>内存数据库</strong>，既然是内存数据库就会遇到如果服务器意外宕机造成的数据不一致的问题。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
