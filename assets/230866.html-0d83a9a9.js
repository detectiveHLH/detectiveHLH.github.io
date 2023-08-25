const e=JSON.parse('{"key":"v-78af104a","path":"/posts/230866.html","title":"大白话聊聊微服务——人人都能看懂的演进过程","lang":"zh-CN","frontmatter":{"date":"2020-09-07T00:00:00.000Z","permalink":"/posts/230866.html","category":["后端"],"tag":["微服务"],"description":"大白话聊聊微服务——人人都能看懂的演进过程 这篇博客的本意是希望看到这篇文章的读者能够很轻松的理解我想表达的意思。但程序向的分享经常会不经意间就贴上了代码，很可能就会让人看的很懵。而且我认为分享一个东西，只有对方真正明白了其中的逻辑，才是有意义的分享。所以接下来我会尝试用大家都能理解的语言来聊一聊”微服务“。 【写在前面】 那么，什么是微服务呢？你不一定知道微服务，但是你一定知道麦某劳，而且知道麦某劳有个甜品站。你可能会问，甜品站和微服务有什么关联呢？ 让我们先假设不把甜品站独立出来，而是普通的麦某劳店。经营一段时间你会发现，这个地方虽然人流量很大，也有顾客，但是顾客的需求80-90%都集中在甜品，导致甜品供不应求，而其余的菜品则没多少人购买。但是把这个店关了吗？那也不行，始终是有流量的。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230866.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"大白话聊聊微服务——人人都能看懂的演进过程"}],["meta",{"property":"og:description","content":"大白话聊聊微服务——人人都能看懂的演进过程 这篇博客的本意是希望看到这篇文章的读者能够很轻松的理解我想表达的意思。但程序向的分享经常会不经意间就贴上了代码，很可能就会让人看的很懵。而且我认为分享一个东西，只有对方真正明白了其中的逻辑，才是有意义的分享。所以接下来我会尝试用大家都能理解的语言来聊一聊”微服务“。 【写在前面】 那么，什么是微服务呢？你不一定知道微服务，但是你一定知道麦某劳，而且知道麦某劳有个甜品站。你可能会问，甜品站和微服务有什么关联呢？ 让我们先假设不把甜品站独立出来，而是普通的麦某劳店。经营一段时间你会发现，这个地方虽然人流量很大，也有顾客，但是顾客的需求80-90%都集中在甜品，导致甜品供不应求，而其余的菜品则没多少人购买。但是把这个店关了吗？那也不行，始终是有流量的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-25T12:38:04.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:published_time","content":"2020-09-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-25T12:38:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"大白话聊聊微服务——人人都能看懂的演进过程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-09-07T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-25T12:38:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"【写在前面】","slug":"【写在前面】","link":"#【写在前面】","children":[]},{"level":2,"title":"0.【梦开始的地方】","slug":"_0-【梦开始的地方】","link":"#_0-【梦开始的地方】","children":[{"level":3,"title":"0.1 店面","slug":"_0-1-店面","link":"#_0-1-店面","children":[]},{"level":3,"title":"0.2 装修和购置设备","slug":"_0-2-装修和购置设备","link":"#_0-2-装修和购置设备","children":[]},{"level":3,"title":"0.3 炸鸡和甜品","slug":"_0-3-炸鸡和甜品","link":"#_0-3-炸鸡和甜品","children":[]}]},{"level":2,"title":"1.【渐入佳境】","slug":"_1-【渐入佳境】","link":"#_1-【渐入佳境】","children":[{"level":3,"title":"1.1 不断的推出新的菜品","slug":"_1-1-不断的推出新的菜品","link":"#_1-1-不断的推出新的菜品","children":[]},{"level":3,"title":"1.2 朋友间的口口相传","slug":"_1-2-朋友间的口口相传","link":"#_1-2-朋友间的口口相传","children":[]},{"level":3,"title":"1.3 关于差评","slug":"_1-3-关于差评","link":"#_1-3-关于差评","children":[]}]},{"level":2,"title":"2.【蜂拥而至】","slug":"_2-【蜂拥而至】","link":"#_2-【蜂拥而至】","children":[{"level":3,"title":"2.1 多招人","slug":"_2-1-多招人","link":"#_2-1-多招人","children":[]},{"level":3,"title":"2.2 重新规划桌椅摆放","slug":"_2-2-重新规划桌椅摆放","link":"#_2-2-重新规划桌椅摆放","children":[]}]},{"level":2,"title":"3.【山穷水尽】","slug":"_3-【山穷水尽】","link":"#_3-【山穷水尽】","children":[{"level":3,"title":"3.1 开分店","slug":"_3-1-开分店","link":"#_3-1-开分店","children":[]}]},{"level":2,"title":"4.【柳暗花明】","slug":"_4-【柳暗花明】","link":"#_4-【柳暗花明】","children":[{"level":3,"title":"4.1 人流量分布不均匀","slug":"_4-1-人流量分布不均匀","link":"#_4-1-人流量分布不均匀","children":[]},{"level":3,"title":"4.2 顾客中心","slug":"_4-2-顾客中心","link":"#_4-2-顾客中心","children":[]}]},{"level":2,"title":"5. 【微服务的关注点】","slug":"_5-【微服务的关注点】","link":"#_5-【微服务的关注点】","children":[]},{"level":2,"title":"【The End】","slug":"【the-end】","link":"#【the-end】","children":[]}],"git":{"createdTime":1692967084000,"updatedTime":1692967084000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":14.17,"words":4252},"filePathRelative":"posts/后端/大白话聊聊微服务——人人都能看懂的演进过程.md","localizedDate":"2020年9月7日","excerpt":"<h1> 大白话聊聊微服务——人人都能看懂的演进过程</h1>\\n<p>这篇博客的本意是希望看到这篇文章的读者能够很轻松的理解我想表达的意思。但程序向的分享经常会不经意间就贴上了代码，很可能就会让人看的很懵。而且我认为分享一个东西，只有对方真正明白了其中的逻辑，才是有意义的分享。所以接下来我会尝试用大家都能理解的语言来聊一聊”微服务“。</p>\\n<h2> 【写在前面】</h2>\\n<p>那么，什么是微服务呢？你不一定知道微服务，但是你一定知道麦某劳，而且知道麦某劳有个甜品站。你可能会问，甜品站和微服务有什么关联呢？</p>\\n<p>让我们先假设不把甜品站独立出来，而是普通的麦某劳店。经营一段时间你会发现，这个地方虽然人流量很大，也有顾客，但是顾客的需求80-90%都集中在甜品，导致甜品供不应求，而其余的菜品则没多少人购买。但是把这个店关了吗？那也不行，始终是有流量的。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
