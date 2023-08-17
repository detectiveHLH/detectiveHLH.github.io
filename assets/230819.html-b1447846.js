const e=JSON.parse('{"key":"v-7f704d1a","path":"/posts/230819.html","title":"深度图解Redis Cluster原理","lang":"zh-CN","frontmatter":{"date":"2020-12-18T00:00:00.000Z","permalink":"/posts/230819.html","category":["redis"],"description":"深度图解Redis Cluster原理 不想谈好吉他的撸铁狗，不是好的程序员 前言 上文我们聊了基于Sentinel的Redis高可用架构，了解了Redis基于读写分离的主从架构，同时也知道当Redis的master发生故障之后，Sentinel集群是如何执行failover的，以及其执行failover的原理是什么。 这里大概再提一下，Sentinel集群会对Redis的主从架构中的Redis实例进行监控，一旦发现了master节点宕机了，就会选举出一个Sentinel节点来执行故障转移，从原来的slave节点中选举出一个，将其提升为master节点，然后让其他的节点去复制新选举出来的master节点。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230819.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"深度图解Redis Cluster原理"}],["meta",{"property":"og:description","content":"深度图解Redis Cluster原理 不想谈好吉他的撸铁狗，不是好的程序员 前言 上文我们聊了基于Sentinel的Redis高可用架构，了解了Redis基于读写分离的主从架构，同时也知道当Redis的master发生故障之后，Sentinel集群是如何执行failover的，以及其执行failover的原理是什么。 这里大概再提一下，Sentinel集群会对Redis的主从架构中的Redis实例进行监控，一旦发现了master节点宕机了，就会选举出一个Sentinel节点来执行故障转移，从原来的slave节点中选举出一个，将其提升为master节点，然后让其他的节点去复制新选举出来的master节点。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-17T06:44:57.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:published_time","content":"2020-12-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-17T06:44:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深度图解Redis Cluster原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-12-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-17T06:44:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[{"level":3,"title":"为什么需2要Redis Cluster","slug":"为什么需2要redis-cluster","link":"#为什么需2要redis-cluster","children":[]}]},{"level":2,"title":"Redis Cluster是什么","slug":"redis-cluster是什么","link":"#redis-cluster是什么","children":[]},{"level":2,"title":"节点负载均衡","slug":"节点负载均衡","link":"#节点负载均衡","children":[]},{"level":2,"title":"什么是一致性哈希","slug":"什么是一致性哈希","link":"#什么是一致性哈希","children":[]},{"level":2,"title":"虚拟节点机制","slug":"虚拟节点机制","link":"#虚拟节点机制","children":[]},{"level":2,"title":"Redis Cluster采用的什么算法","slug":"redis-cluster采用的什么算法","link":"#redis-cluster采用的什么算法","children":[]},{"level":2,"title":"Redis Cluster如何做到高可用","slug":"redis-cluster如何做到高可用","link":"#redis-cluster如何做到高可用","children":[{"level":3,"title":"集群如何进行扩容","slug":"集群如何进行扩容","link":"#集群如何进行扩容","children":[]},{"level":3,"title":"高可用及故障转移","slug":"高可用及故障转移","link":"#高可用及故障转移","children":[]}]},{"level":2,"title":"简单了解gossip协议","slug":"简单了解gossip协议","link":"#简单了解gossip协议","children":[]},{"level":2,"title":"gossip协议消息类型","slug":"gossip协议消息类型","link":"#gossip协议消息类型","children":[]},{"level":2,"title":"使用gossip的优劣","slug":"使用gossip的优劣","link":"#使用gossip的优劣","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1692254697000,"updatedTime":1692254697000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":14.1,"words":4230},"filePathRelative":"posts/redis/深度图解Redis Cluster原理.md","localizedDate":"2020年12月18日","excerpt":"<h1> 深度图解Redis Cluster原理</h1>\\n<blockquote>\\n<p>不想谈好吉他的撸铁狗，不是好的程序员</p>\\n</blockquote>\\n<h2> 前言</h2>\\n<p>上文我们聊了基于Sentinel的Redis高可用架构，了解了Redis基于读写分离的主从架构，同时也知道当Redis的master发生故障之后，Sentinel集群是如何执行failover的，以及其执行failover的原理是什么。</p>\\n<p>这里大概再提一下，Sentinel集群会对Redis的主从架构中的Redis实例进行监控，一旦发现了master节点宕机了，就会选举出一个Sentinel节点来执行故障转移，从原来的slave节点中选举出一个，将其提升为master节点，然后让其他的节点去复制新选举出来的master节点。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
