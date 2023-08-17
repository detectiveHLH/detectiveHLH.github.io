const e=JSON.parse('{"key":"v-2d87af4a","path":"/posts/230822.html","title":"RocketMQ基础概念剖析，并分析一下Producer的底层源码","lang":"zh-CN","frontmatter":{"date":"2021-02-26T00:00:00.000Z","permalink":"/posts/230822.html","category":["消息队列"],"tag":["RocketMQ"],"description":"RocketMQ基础概念剖析，并分析一下Producer的底层源码 由于篇幅原因，本次的源码分析只限于Producer侧的发送消息的核心逻辑，我会通过流程图、代码注释、文字讲解的方式来对源码进行解释，后续应该会专门开几篇文章来做源码分析。 这篇博客聊聊关于RocketMQ相关的东西，主要聊的点有RocketMQ的功能使用、RocketMQ的底层运行原理和部分核心逻辑的源码分析。至于我们为什么要用MQ、使用MQ能够为我们带来哪些好处、MQ在社区有哪些实现、社区的各个MQ的优劣对比等等，我在之前的文章《消息队列杂谈》已经聊过了，如果需要了解的话可以回过头去看看。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230822.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"RocketMQ基础概念剖析，并分析一下Producer的底层源码"}],["meta",{"property":"og:description","content":"RocketMQ基础概念剖析，并分析一下Producer的底层源码 由于篇幅原因，本次的源码分析只限于Producer侧的发送消息的核心逻辑，我会通过流程图、代码注释、文字讲解的方式来对源码进行解释，后续应该会专门开几篇文章来做源码分析。 这篇博客聊聊关于RocketMQ相关的东西，主要聊的点有RocketMQ的功能使用、RocketMQ的底层运行原理和部分核心逻辑的源码分析。至于我们为什么要用MQ、使用MQ能够为我们带来哪些好处、MQ在社区有哪些实现、社区的各个MQ的优劣对比等等，我在之前的文章《消息队列杂谈》已经聊过了，如果需要了解的话可以回过头去看看。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-17T08:37:57.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"RocketMQ"}],["meta",{"property":"article:published_time","content":"2021-02-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-17T08:37:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RocketMQ基础概念剖析，并分析一下Producer的底层源码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-02-26T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-17T08:37:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"基础概念","slug":"基础概念","link":"#基础概念","children":[{"level":3,"title":"Broker","slug":"broker","link":"#broker","children":[]},{"level":3,"title":"NameServer","slug":"nameserver","link":"#nameserver","children":[]},{"level":3,"title":"Topic","slug":"topic","link":"#topic","children":[]},{"level":3,"title":"Broker消息存储原理","slug":"broker消息存储原理","link":"#broker消息存储原理","children":[]},{"level":3,"title":"Tag","slug":"tag","link":"#tag","children":[]}]},{"level":2,"title":"Producer发送消息源码分析","slug":"producer发送消息源码分析","link":"#producer发送消息源码分析","children":[{"level":3,"title":"流程总览","slug":"流程总览","link":"#流程总览","children":[]},{"level":3,"title":"初始化Prodcuer","slug":"初始化prodcuer","link":"#初始化prodcuer","children":[]},{"level":3,"title":"合法性校验","slug":"合法性校验","link":"#合法性校验","children":[]},{"level":3,"title":"调用发送消息","slug":"调用发送消息","link":"#调用发送消息","children":[]},{"level":3,"title":"获取Topic详细数据","slug":"获取topic详细数据","link":"#获取topic详细数据","children":[]},{"level":3,"title":"MessageQueue选择机制","slug":"messagequeue选择机制","link":"#messagequeue选择机制","children":[]},{"level":3,"title":"消息发送","slug":"消息发送","link":"#消息发送","children":[]}]},{"level":2,"title":"EOF","slug":"eof","link":"#eof","children":[]}],"git":{"createdTime":1692260892000,"updatedTime":1692261477000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":2}]},"readingTime":{"minutes":13.51,"words":4054},"filePathRelative":"posts/消息队列/RocketMQ基础概念剖析，并分析一下Producer的底层源码.md","localizedDate":"2021年2月26日","excerpt":"<h1> RocketMQ基础概念剖析，并分析一下Producer的底层源码</h1>\\n<blockquote>\\n<p>由于篇幅原因，本次的源码分析只限于Producer侧的发送消息的核心逻辑，我会通过流程图、代码注释、文字讲解的方式来对源码进行解释，后续应该会专门开几篇文章来做源码分析。</p>\\n</blockquote>\\n<p>这篇博客聊聊关于RocketMQ相关的东西，主要聊的点有RocketMQ的功能使用、RocketMQ的底层运行原理和部分核心逻辑的源码分析。至于我们为什么要用MQ、使用MQ能够为我们带来哪些好处、MQ在社区有哪些实现、社区的各个MQ的优劣对比等等，我在之前的文章<a href=\\"https://mp.weixin.qq.com/s/kNQWIcdBiWQU2drgaCQ_2g\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">《消息队列杂谈》</a>已经聊过了，如果需要了解的话可以回过头去看看。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
