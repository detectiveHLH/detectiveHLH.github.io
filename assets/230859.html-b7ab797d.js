const t=JSON.parse('{"key":"v-d83e7312","path":"/posts/230859.html","title":"go源码解析-Println的故事","lang":"zh-CN","frontmatter":{"date":"2019-06-14T00:00:00.000Z","permalink":"/posts/230859.html","category":["Golang"],"tag":["Golang"],"description":"go源码解析-Println的故事 本文主要通过平常常用的go的一个函数，深入源码，了解其底层到底是如何实现的。 Println Println函数接受参数a，其类型为…interface{}。用过Java的对这个应该比较熟悉，Java中也有…的用法。其作用是传入可变的参数，而interface{}类似于Java中的Object，代表任何类型。 所以，…interface{}转换成Java的概念，就是Object args ...。 Println函数中没有什么实现，只是return了Fprintln函数。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230859.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"go源码解析-Println的故事"}],["meta",{"property":"og:description","content":"go源码解析-Println的故事 本文主要通过平常常用的go的一个函数，深入源码，了解其底层到底是如何实现的。 Println Println函数接受参数a，其类型为…interface{}。用过Java的对这个应该比较熟悉，Java中也有…的用法。其作用是传入可变的参数，而interface{}类似于Java中的Object，代表任何类型。 所以，…interface{}转换成Java的概念，就是Object args ...。 Println函数中没有什么实现，只是return了Fprintln函数。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-02T08:48:07.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"Golang"}],["meta",{"property":"article:published_time","content":"2019-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-02T08:48:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go源码解析-Println的故事\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-02T08:48:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"Println","slug":"println","link":"#println","children":[]},{"level":2,"title":"Fprintln","slug":"fprintln","link":"#fprintln","children":[{"level":3,"title":"sync.Pool","slug":"sync-pool","link":"#sync-pool","children":[]},{"level":3,"title":"ppFree.Get","slug":"ppfree-get","link":"#ppfree-get","children":[]}]},{"level":2,"title":"doPrintln","slug":"doprintln","link":"#doprintln","children":[]},{"level":2,"title":"printArg","slug":"printarg","link":"#printarg","children":[{"level":3,"title":"rune","slug":"rune","link":"#rune","children":[]},{"level":3,"title":"printArg具体实现","slug":"printarg具体实现","link":"#printarg具体实现","children":[]},{"level":3,"title":"fmtString","slug":"fmtstring","link":"#fmtstring","children":[]},{"level":3,"title":"fmtS","slug":"fmts","link":"#fmts","children":[]}]},{"level":2,"title":"free","slug":"free","link":"#free","children":[]},{"level":2,"title":"写在最后","slug":"写在最后","link":"#写在最后","children":[]}],"git":{"createdTime":1693644487000,"updatedTime":1693644487000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":7.21,"words":2164},"filePathRelative":"posts/Golang/go源码解析-Println的故事.md","localizedDate":"2019年6月14日","excerpt":"<h1> go源码解析-Println的故事</h1>\\n<p>本文主要通过平常常用的go的一个函数，深入源码，了解其底层到底是如何实现的。</p>\\n<h2> Println</h2>\\n<p>Println函数接受参数a，其类型为…interface{}。用过Java的对这个应该比较熟悉，Java中也有…的用法。其作用是传入可变的参数，而interface{}类似于Java中的Object，代表任何类型。</p>\\n<p>所以，…interface{}转换成Java的概念，就是<code>Object args ...</code>。</p>\\n<p>Println函数中没有什么实现，只是return了Fprintln函数。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{t as data};
