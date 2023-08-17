const e=JSON.parse('{"key":"v-89ad60d4","path":"/posts/230816.html","title":"Redis基础—了解Redis是如何做数据持久化的","lang":"zh-CN","frontmatter":{"date":"2023-08-17T00:00:00.000Z","permalink":"/posts/230816.html","category":["redis"],"description":"Redis基础—了解Redis是如何做数据持久化的 之前的文章介绍了Redis的简单数据结构的相关使用和底层原理，这篇文章我们就来聊一下Redis应该如何保证高可用。 数据持久化 我们知道虽然单机的Redis虽然性能十分的出色， 单机能够扛住10w的QPS，这是得益于其基于内存的快速读写操作，那如果某个时间Redis突然挂了怎么办？我们需要一种持久化的机制，来保存内存中的数据，否则数据就会直接丢失。 Redis有两种方式来实现数据的持久化，分别是RDB（Redis Database）和AOF（Append Only File)，你可以先简单的把RDB理解为某个时刻的Redis内存中的数据快照，而AOF则是所有记录了所有修改内存数据的指令的集合（也就是Redis指令的集合），而这两种方式都会生成相应的文件落地到磁盘上，实现数据的持久化，方便下次恢复使用。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230816.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"Redis基础—了解Redis是如何做数据持久化的"}],["meta",{"property":"og:description","content":"Redis基础—了解Redis是如何做数据持久化的 之前的文章介绍了Redis的简单数据结构的相关使用和底层原理，这篇文章我们就来聊一下Redis应该如何保证高可用。 数据持久化 我们知道虽然单机的Redis虽然性能十分的出色， 单机能够扛住10w的QPS，这是得益于其基于内存的快速读写操作，那如果某个时间Redis突然挂了怎么办？我们需要一种持久化的机制，来保存内存中的数据，否则数据就会直接丢失。 Redis有两种方式来实现数据的持久化，分别是RDB（Redis Database）和AOF（Append Only File)，你可以先简单的把RDB理解为某个时刻的Redis内存中的数据快照，而AOF则是所有记录了所有修改内存数据的指令的集合（也就是Redis指令的集合），而这两种方式都会生成相应的文件落地到磁盘上，实现数据的持久化，方便下次恢复使用。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:published_time","content":"2023-08-17T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis基础—了解Redis是如何做数据持久化的\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-17T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"数据持久化","slug":"数据持久化","link":"#数据持久化","children":[]},{"level":2,"title":"RDB","slug":"rdb","link":"#rdb","children":[{"level":3,"title":"生成方法","slug":"生成方法","link":"#生成方法","children":[]},{"level":3,"title":"优点","slug":"优点","link":"#优点","children":[]},{"level":3,"title":"缺点","slug":"缺点","link":"#缺点","children":[]}]},{"level":2,"title":"AOF","slug":"aof","link":"#aof","children":[{"level":3,"title":"AOF记录过程","slug":"aof记录过程","link":"#aof记录过程","children":[]},{"level":3,"title":"ServerCron","slug":"servercron","link":"#servercron","children":[]},{"level":3,"title":"写入策略","slug":"写入策略","link":"#写入策略","children":[]}]},{"level":2,"title":"End","slug":"end","link":"#end","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":13.07,"words":3921},"filePathRelative":"posts/redis/Redis基础—了解Redis是如何做数据持久化的.md","localizedDate":"2023年8月17日","excerpt":"<h1> Redis基础—了解Redis是如何做数据持久化的</h1>\\n<p>之前的文章介绍了Redis的简单数据结构的相关使用和底层原理，这篇文章我们就来聊一下Redis应该如何保证高可用。</p>\\n<h2> 数据持久化</h2>\\n<p>我们知道虽然单机的Redis虽然性能十分的出色， 单机能够扛住10w的QPS，这是得益于其基于内存的快速读写操作，那如果某个时间Redis突然挂了怎么办？我们需要一种<strong>持久化</strong>的机制，来保存内存中的数据，否则数据就会直接丢失。</p>\\n<p>Redis有两种方式来实现数据的持久化，分别是<strong>RDB</strong>（Redis Database）和<strong>AOF</strong>（Append Only File)，你可以先简单的把RDB理解为某个时刻的Redis内存中的数据快照，而AOF则是所有记录了所有修改内存数据的指令的集合（也就是Redis指令的集合），而这两种方式都会生成相应的文件落地到磁盘上，实现数据的持久化，方便下次恢复使用。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
