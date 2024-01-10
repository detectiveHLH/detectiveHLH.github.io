const e=JSON.parse('{"key":"v-5153c63e","path":"/posts/230841.html","title":"如何在SpringBoot中集成JWT(JSON Web Token)鉴权","lang":"zh-CN","frontmatter":{"date":"2019-03-18T00:00:00.000Z","permalink":"/posts/230841.html","category":["Java"],"tag":["Spring Boot","JWT"],"description":"如何在SpringBoot中集成JWT(JSON Web Token)鉴权 这篇博客主要是简单介绍了一下什么是JWT，以及如何在Spring Boot项目中使用JWT(JSON Web Token)。 关于JWT 什么是JWT 老生常谈的开头，我们要用这样一种工具，首先得知道以下几个问题。 这个工具是什么，这个工具解决了什么问题 是否适用于当前我们所处得业务场景 用了之后是否会带来任何其他问题 怎么用才是最佳实践","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230841.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"如何在SpringBoot中集成JWT(JSON Web Token)鉴权"}],["meta",{"property":"og:description","content":"如何在SpringBoot中集成JWT(JSON Web Token)鉴权 这篇博客主要是简单介绍了一下什么是JWT，以及如何在Spring Boot项目中使用JWT(JSON Web Token)。 关于JWT 什么是JWT 老生常谈的开头，我们要用这样一种工具，首先得知道以下几个问题。 这个工具是什么，这个工具解决了什么问题 是否适用于当前我们所处得业务场景 用了之后是否会带来任何其他问题 怎么用才是最佳实践"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-09T11:45:29.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"JWT"}],["meta",{"property":"article:published_time","content":"2019-03-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-09T11:45:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在SpringBoot中集成JWT(JSON Web Token)鉴权\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-09T11:45:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"关于JWT","slug":"关于jwt","link":"#关于jwt","children":[{"level":3,"title":"什么是JWT","slug":"什么是jwt","link":"#什么是jwt","children":[]},{"level":3,"title":"应用场景","slug":"应用场景","link":"#应用场景","children":[]}]},{"level":2,"title":"JWT的结构","slug":"jwt的结构","link":"#jwt的结构","children":[{"level":3,"title":"header","slug":"header","link":"#header","children":[]},{"level":3,"title":"payload","slug":"payload","link":"#payload","children":[]},{"level":3,"title":"signature","slug":"signature","link":"#signature","children":[]}]},{"level":2,"title":"JWT在Spring项目中的应用场景","slug":"jwt在spring项目中的应用场景","link":"#jwt在spring项目中的应用场景","children":[{"level":3,"title":"生成JWT","slug":"生成jwt","link":"#生成jwt","children":[]},{"level":3,"title":"返回JWT","slug":"返回jwt","link":"#返回jwt","children":[]},{"level":3,"title":"验证token","slug":"验证token","link":"#验证token","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1704800729000,"updatedTime":1704800729000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":7.45,"words":2234},"filePathRelative":"posts/Java/如何在SpringBoot中集成JWT(JSON Web Token)鉴权.md","localizedDate":"2019年3月18日","excerpt":"<h1> 如何在SpringBoot中集成JWT(JSON Web Token)鉴权</h1>\\n<p>这篇博客主要是简单介绍了一下什么是JWT，以及如何在Spring Boot项目中使用JWT(JSON Web Token)。</p>\\n<h2> 关于JWT</h2>\\n<h3> 什么是JWT</h3>\\n<p>老生常谈的开头，我们要用这样一种工具，首先得知道以下几个问题。</p>\\n<ul>\\n<li>这个工具是什么，这个工具解决了什么问题</li>\\n<li>是否适用于当前我们所处得业务场景</li>\\n<li>用了之后是否会带来任何其他问题</li>\\n<li>怎么用才是最佳实践</li>\\n</ul>\\n","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
