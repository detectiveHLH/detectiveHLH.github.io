const e=JSON.parse('{"key":"v-53bbf600","path":"/posts/23087.html","title":"深入剖析 MySQL 自增锁","lang":"zh-CN","frontmatter":{"date":"2021-05-31T00:00:00.000Z","permalink":"/posts/23087.html","category":["数据库"],"tag":["MySQL"],"description":"深入剖析 MySQL 自增锁 之前的文章把 InnoDB 中的所有的锁都介绍了一下，包括意向锁、记录锁...自增锁巴拉巴拉的。但是后面我自己回过头去看的时候发现，对自增锁的介绍居然才短短的一段。 其实自增锁（AUTO-INC Locks）这块还是有很多值得讨论的细节，例如在并发的场景下，InnoDB 是如何保证该值正确的进行自增的，本章就专门来简单讨论一下 InnoDB 中的自增锁。","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/23087.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"深入剖析 MySQL 自增锁"}],["meta",{"property":"og:description","content":"深入剖析 MySQL 自增锁 之前的文章把 InnoDB 中的所有的锁都介绍了一下，包括意向锁、记录锁...自增锁巴拉巴拉的。但是后面我自己回过头去看的时候发现，对自增锁的介绍居然才短短的一段。 其实自增锁（AUTO-INC Locks）这块还是有很多值得讨论的细节，例如在并发的场景下，InnoDB 是如何保证该值正确的进行自增的，本章就专门来简单讨论一下 InnoDB 中的自增锁。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2021-05-31T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入剖析 MySQL 自增锁\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-05-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"什么是自增锁","slug":"什么是自增锁","link":"#什么是自增锁","children":[]},{"level":2,"title":"行为与限制","slug":"行为与限制","link":"#行为与限制","children":[]},{"level":2,"title":"锁模式","slug":"锁模式","link":"#锁模式","children":[{"level":3,"title":"传统模式","slug":"传统模式","link":"#传统模式","children":[]},{"level":3,"title":"连续模式","slug":"连续模式","link":"#连续模式","children":[]},{"level":3,"title":"交叉模式","slug":"交叉模式","link":"#交叉模式","children":[]}]},{"level":2,"title":"交叉模式缺陷","slug":"交叉模式缺陷","link":"#交叉模式缺陷","children":[]},{"level":2,"title":"鱼和熊掌","slug":"鱼和熊掌","link":"#鱼和熊掌","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":7.18,"words":2155},"filePathRelative":"posts/数据库/深入剖析MySQL自增锁.md","localizedDate":"2021年5月31日","excerpt":"<h1> 深入剖析 MySQL 自增锁</h1>\\n<p><a href=\\"https://mp.weixin.qq.com/s/rB0MHssNG_9ivZP2ka-EYw\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">之前的文章</a>把 InnoDB 中的所有的锁都介绍了一下，包括意向锁、记录锁...自增锁巴拉巴拉的。但是后面我自己回过头去看的时候发现，对自增锁的介绍居然才短短的一段。</p>\\n<p>其实自增锁（AUTO-INC Locks）这块还是有很多值得讨论的细节，例如在并发的场景下，InnoDB 是如何保证该值正确的进行自增的，本章就专门来<strong>简单</strong>讨论一下 InnoDB 中的自增锁。</p>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
