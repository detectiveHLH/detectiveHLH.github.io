const e=JSON.parse('{"key":"v-345b11c6","path":"/posts/230820.html","title":"消息队列杂谈","lang":"zh-CN","frontmatter":{"date":"2021-02-19T00:00:00.000Z","permalink":"/posts/230820.html","category":["messagequeue"],"description":"消息队列杂谈 本篇文章聊聊消息队列相关的东西，内容局限于我们为什么要用消息队列，消息队列究竟解决了什么问题，消息队列的选型。 为了更容易的理解消息队列，我们首先通过一个开发场景来切入。 不使用消息队列的场景 首先，我们假设A同学负责订单系统的开发，B、C同学负责开发积分系统、仓储系统。我们知道，在一般的购物电商平台上，我们下单完成后，积分系统会给下单的用户增加积分，然后仓储系统会按照下单时填写的信息，发出用户购买的商品。 那问题来了，积分系统、仓储系统如何感知到用户的下单操作？ 你可能会说，当然是订单系统在创建完订单之后调用积分系统、仓储系统的接口了","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230820.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"消息队列杂谈"}],["meta",{"property":"og:description","content":"消息队列杂谈 本篇文章聊聊消息队列相关的东西，内容局限于我们为什么要用消息队列，消息队列究竟解决了什么问题，消息队列的选型。 为了更容易的理解消息队列，我们首先通过一个开发场景来切入。 不使用消息队列的场景 首先，我们假设A同学负责订单系统的开发，B、C同学负责开发积分系统、仓储系统。我们知道，在一般的购物电商平台上，我们下单完成后，积分系统会给下单的用户增加积分，然后仓储系统会按照下单时填写的信息，发出用户购买的商品。 那问题来了，积分系统、仓储系统如何感知到用户的下单操作？ 你可能会说，当然是订单系统在创建完订单之后调用积分系统、仓储系统的接口了"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-17T07:01:18.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:published_time","content":"2021-02-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-17T07:01:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"消息队列杂谈\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-02-19T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-17T07:01:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"不使用消息队列的场景","slug":"不使用消息队列的场景","link":"#不使用消息队列的场景","children":[]},{"level":2,"title":"为什么需要消息队列","slug":"为什么需要消息队列","link":"#为什么需要消息队列","children":[{"level":3,"title":"异步","slug":"异步","link":"#异步","children":[]},{"level":3,"title":"削峰","slug":"削峰","link":"#削峰","children":[]},{"level":3,"title":"解耦","slug":"解耦","link":"#解耦","children":[]}]},{"level":2,"title":"消息队列选型","slug":"消息队列选型","link":"#消息队列选型","children":[{"level":3,"title":"Kafka","slug":"kafka","link":"#kafka","children":[]},{"level":3,"title":"RabbitMQ","slug":"rabbitmq","link":"#rabbitmq","children":[]},{"level":3,"title":"RocketMQ","slug":"rocketmq","link":"#rocketmq","children":[]}]},{"level":2,"title":"消息队列会丢消息吗","slug":"消息队列会丢消息吗","link":"#消息队列会丢消息吗","children":[{"level":3,"title":"生产者发送消息给MQ","slug":"生产者发送消息给mq","link":"#生产者发送消息给mq","children":[]},{"level":3,"title":"MQ存储消息","slug":"mq存储消息","link":"#mq存储消息","children":[]},{"level":3,"title":"消费者消费消息","slug":"消费者消费消息","link":"#消费者消费消息","children":[]}]},{"level":2,"title":"消息最终一致性方案","slug":"消息最终一致性方案","link":"#消息最终一致性方案","children":[]}],"git":{"createdTime":1692255678000,"updatedTime":1692255678000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":14.24,"words":4273},"filePathRelative":"posts/messagequeue/消息队列杂谈.md","localizedDate":"2021年2月19日","excerpt":"<h1> 消息队列杂谈</h1>\\n<p>本篇文章聊聊消息队列相关的东西，内容局限于我们为什么要用消息队列，消息队列究竟解决了什么问题，消息队列的选型。</p>\\n<p>为了更容易的理解消息队列，我们首先通过一个开发场景来切入。</p>\\n<h2> 不使用消息队列的场景</h2>\\n<p>首先，我们假设A同学负责订单系统的开发，B、C同学负责开发积分系统、仓储系统。我们知道，在一般的购物电商平台上，我们下单完成后，积分系统会给下单的用户增加积分，然后仓储系统会按照下单时填写的信息，发出用户购买的商品。</p>\\n<p>那问题来了，积分系统、仓储系统如何感知到用户的下单操作？</p>\\n<blockquote>\\n<p>你可能会说，当然是订单系统在创建完订单之后调用积分系统、仓储系统的接口了</p>\\n</blockquote>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};