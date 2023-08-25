const e=JSON.parse('{"key":"v-82ec2404","path":"/posts/230863.html","title":"聊聊微服务集群当中的自动化工具","lang":"zh-CN","frontmatter":{"date":"2019-06-17T00:00:00.000Z","permalink":"/posts/230863.html","category":["后端"],"tag":["自动化","集群"],"description":"聊聊微服务集群当中的自动化工具 本篇博客主要介绍了自动化工具这个概念，在微服务集群当中的作用，算抛砖引玉，欢迎大家提出自己的见解。 写在前面 在了解自动化工具的概念之前，我们先了解一下微服务和集群的概念。 什么是微服务 这个概念其实有些广泛，而我的知识广度也有限，我会尽量用通俗的语言来描述什么是微服务，什么是集群，以及为什么我们需要微服务集群 。为什么需要集群可以去看看《小强开饭店-从单体应用到微服务》，这篇文章用非常通俗的语言和配图，通过一个漫画故事简单的解释了为什么我们需要微服务集群。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230863.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"聊聊微服务集群当中的自动化工具"}],["meta",{"property":"og:description","content":"聊聊微服务集群当中的自动化工具 本篇博客主要介绍了自动化工具这个概念，在微服务集群当中的作用，算抛砖引玉，欢迎大家提出自己的见解。 写在前面 在了解自动化工具的概念之前，我们先了解一下微服务和集群的概念。 什么是微服务 这个概念其实有些广泛，而我的知识广度也有限，我会尽量用通俗的语言来描述什么是微服务，什么是集群，以及为什么我们需要微服务集群 。为什么需要集群可以去看看《小强开饭店-从单体应用到微服务》，这篇文章用非常通俗的语言和配图，通过一个漫画故事简单的解释了为什么我们需要微服务集群。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-25T12:38:04.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"自动化"}],["meta",{"property":"article:tag","content":"集群"}],["meta",{"property":"article:published_time","content":"2019-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-25T12:38:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"聊聊微服务集群当中的自动化工具\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-25T12:38:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"写在前面","slug":"写在前面","link":"#写在前面","children":[]},{"level":2,"title":"什么是微服务","slug":"什么是微服务","link":"#什么是微服务","children":[{"level":3,"title":"微服务","slug":"微服务","link":"#微服务","children":[]},{"level":3,"title":"微服务的拆分","slug":"微服务的拆分","link":"#微服务的拆分","children":[]},{"level":3,"title":"BFF","slug":"bff","link":"#bff","children":[]}]},{"level":2,"title":"集群","slug":"集群","link":"#集群","children":[{"level":3,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":3,"title":"例子","slug":"例子","link":"#例子","children":[]}]},{"level":2,"title":"自动化工具","slug":"自动化工具","link":"#自动化工具","children":[{"level":3,"title":"构建","slug":"构建","link":"#构建","children":[]},{"level":3,"title":"其他的功能","slug":"其他的功能","link":"#其他的功能","children":[]},{"level":3,"title":"功能总结","slug":"功能总结","link":"#功能总结","children":[]}]},{"level":2,"title":"功能详解","slug":"功能详解","link":"#功能详解","children":[{"level":3,"title":"构建","slug":"构建-1","link":"#构建-1","children":[]},{"level":3,"title":"部署和回滚","slug":"部署和回滚","link":"#部署和回滚","children":[]},{"level":3,"title":"elk日志","slug":"elk日志","link":"#elk日志","children":[]},{"level":3,"title":"更新容器配置","slug":"更新容器配置","link":"#更新容器配置","children":[]},{"level":3,"title":"管理集群的环境、项目和容器","slug":"管理集群的环境、项目和容器","link":"#管理集群的环境、项目和容器","children":[]},{"level":3,"title":"命令行连接具体项目的容器","slug":"命令行连接具体项目的容器","link":"#命令行连接具体项目的容器","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1692967084000,"updatedTime":1692967084000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":11.68,"words":3503},"filePathRelative":"posts/后端/聊聊微服务集群当中的自动化工具.md","localizedDate":"2019年6月17日","excerpt":"<h1> 聊聊微服务集群当中的自动化工具</h1>\\n<p>本篇博客主要介绍了自动化工具这个概念，在微服务集群当中的作用，算抛砖引玉，欢迎大家提出自己的见解。</p>\\n<h2> 写在前面</h2>\\n<p>在了解自动化工具的概念之前，我们先了解一下微服务和集群的概念。</p>\\n<h2> 什么是微服务</h2>\\n<p>这个概念其实有些广泛，而我的知识广度也有限，我会尽量用通俗的语言来描述什么是微服务，什么是集群，以及为什么我们需要微服务集群 。为什么需要集群可以去看看<a href=\\"https://juejin.im/post/5d006b32f265da1b9253d2c7\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">《小强开饭店-从单体应用到微服务》</a>，这篇文章用非常通俗的语言和配图，通过一个漫画故事简单的解释了为什么我们需要微服务集群。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
