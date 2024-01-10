const e=JSON.parse('{"key":"v-5672501b","path":"/posts/230844.html","title":"深入了解ConcurrentHashMap","lang":"zh-CN","frontmatter":{"date":"2020-06-02T00:00:00.000Z","permalink":"/posts/230844.html","category":["Java"],"tag":["ConcurrentHashMap"],"description":"深入了解ConcurrentHashMap 在上一篇文章【简单了解系列】从基础的使用来深挖HashMap里，我从最基础的使用中介绍了HashMap，大致是JDK1.7和1.8中底层实现的变化，和介绍了为什么在多线程下可能会造成死循环，扩容机智是什么样的。感兴趣的可以先看看。 我们知道，HashMap是非线程安全的容器，那么为什么ConcurrentHashMap能够做到线程安全呢？","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230844.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"深入了解ConcurrentHashMap"}],["meta",{"property":"og:description","content":"深入了解ConcurrentHashMap 在上一篇文章【简单了解系列】从基础的使用来深挖HashMap里，我从最基础的使用中介绍了HashMap，大致是JDK1.7和1.8中底层实现的变化，和介绍了为什么在多线程下可能会造成死循环，扩容机智是什么样的。感兴趣的可以先看看。 我们知道，HashMap是非线程安全的容器，那么为什么ConcurrentHashMap能够做到线程安全呢？"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-09T11:45:29.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"ConcurrentHashMap"}],["meta",{"property":"article:published_time","content":"2020-06-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-09T11:45:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入了解ConcurrentHashMap\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-06-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-09T11:45:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"底层结构","slug":"底层结构","link":"#底层结构","children":[{"level":3,"title":"volatile关键字","slug":"volatile关键字","link":"#volatile关键字","children":[]},{"level":3,"title":"内存可见性","slug":"内存可见性","link":"#内存可见性","children":[]}]},{"level":2,"title":"基础使用","slug":"基础使用","link":"#基础使用","children":[{"level":3,"title":"取值","slug":"取值","link":"#取值","children":[]},{"level":3,"title":"赋值","slug":"赋值","link":"#赋值","children":[]}]},{"level":2,"title":"初始化的线程安全","slug":"初始化的线程安全","link":"#初始化的线程安全","children":[{"level":3,"title":"CAS","slug":"cas","link":"#cas","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}]},{"level":2,"title":"如何保证值不被覆盖","slug":"如何保证值不被覆盖","link":"#如何保证值不被覆盖","children":[{"level":3,"title":"synchronized关键字","slug":"synchronized关键字","link":"#synchronized关键字","children":[]}]},{"level":2,"title":"自动扩容的线程安全","slug":"自动扩容的线程安全","link":"#自动扩容的线程安全","children":[{"level":3,"title":"计算分区的范围","slug":"计算分区的范围","link":"#计算分区的范围","children":[]},{"level":3,"title":"初始化nextTable","slug":"初始化nexttable","link":"#初始化nexttable","children":[]},{"level":3,"title":"设置分区边界","slug":"设置分区边界","link":"#设置分区边界","children":[]},{"level":3,"title":"Copy分区内的值","slug":"copy分区内的值","link":"#copy分区内的值","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1704800729000,"updatedTime":1704800729000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":13.2,"words":3960},"filePathRelative":"posts/Java/深入了解ConcurrentHashMap.md","localizedDate":"2020年6月2日","excerpt":"<h1> 深入了解ConcurrentHashMap</h1>\\n<p>在上一篇文章<a href=\\"https://mp.weixin.qq.com/s/-ZE8eA-2CFYsgwRbwjEVnw\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">【简单了解系列】从基础的使用来深挖HashMap</a>里，我从最基础的使用中介绍了HashMap，大致是JDK1.7和1.8中底层实现的变化，和介绍了为什么在多线程下可能会造成死循环，扩容机智是什么样的。感兴趣的可以先看看。</p>\\n<p>我们知道，HashMap是非线程安全的容器，那么为什么ConcurrentHashMap能够做到线程安全呢？</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
