const e=JSON.parse('{"key":"v-59dc0159","path":"/posts/230846.html","title":"ArrayList 从源码角度剖析底层原理","lang":"zh-CN","frontmatter":{"date":"2021-07-20T00:00:00.000Z","permalink":"/posts/230846.html","category":["Java"],"tag":["ArrayList"],"description":"ArrayList 从源码角度剖析底层原理 对于 ArrayList 来说，我们平常用的最多的方法应该就是 add 和 remove 了，本文就主要通过这两个基础的方法入手，通过源码来看看 ArrayList 的底层原理。 add 默认添加元素 这个应该是平常用的最多的方法了，其用法如下。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230846.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"ArrayList 从源码角度剖析底层原理"}],["meta",{"property":"og:description","content":"ArrayList 从源码角度剖析底层原理 对于 ArrayList 来说，我们平常用的最多的方法应该就是 add 和 remove 了，本文就主要通过这两个基础的方法入手，通过源码来看看 ArrayList 的底层原理。 add 默认添加元素 这个应该是平常用的最多的方法了，其用法如下。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-02T08:48:07.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:published_time","content":"2021-07-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-02T08:48:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ArrayList 从源码角度剖析底层原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-07-20T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-02T08:48:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"add","slug":"add","link":"#add","children":[{"level":3,"title":"默认添加元素","slug":"默认添加元素","link":"#默认添加元素","children":[]},{"level":3,"title":"指定添加元素的位置","slug":"指定添加元素的位置","link":"#指定添加元素的位置","children":[]}]},{"level":2,"title":"remove","slug":"remove","link":"#remove","children":[{"level":3,"title":"根据下标移除","slug":"根据下标移除","link":"#根据下标移除","children":[]},{"level":3,"title":"根据值移除","slug":"根据值移除","link":"#根据值移除","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1693644487000,"updatedTime":1693644487000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":9.48,"words":2845},"filePathRelative":"posts/Java/ArrayList 从源码角度剖析底层原理.md","localizedDate":"2021年7月20日","excerpt":"<h1> ArrayList 从源码角度剖析底层原理</h1>\\n<p>对于 <code>ArrayList</code>  来说，我们平常用的最多的方法应该就是 <code>add</code> 和 <code>remove</code> 了，本文就主要通过这两个基础的方法入手，通过源码来看看 <code>ArrayList</code> 的底层原理。</p>\\n<h2> add</h2>\\n<h3> 默认添加元素</h3>\\n<p>这个应该是平常用的最多的方法了，其用法如下。</p>\\n<figure><img src=\\"/images/230846/add-usage.jpeg\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
