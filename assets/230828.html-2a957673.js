const e=JSON.parse('{"key":"v-190d87d6","path":"/posts/230828.html","title":"简单了解 TiDB 架构","lang":"zh-CN","frontmatter":{"date":"2022-04-25T00:00:00.000Z","permalink":"/posts/230828.html","category":["数据库"],"tag":["TiDB"],"description":"简单了解 TiDB 架构 一、前言 大家如果看过我之前发过的文章就知道，我写过很多篇关于 MySQL 的文章，从我的 Github 汇总仓库 中可以看出来：","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230828.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"简单了解 TiDB 架构"}],["meta",{"property":"og:description","content":"简单了解 TiDB 架构 一、前言 大家如果看过我之前发过的文章就知道，我写过很多篇关于 MySQL 的文章，从我的 Github 汇总仓库 中可以看出来："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"TiDB"}],["meta",{"property":"article:published_time","content":"2022-04-25T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"简单了解 TiDB 架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-25T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"一、前言","slug":"一、前言","link":"#一、前言","children":[]},{"level":2,"title":"二、正文","slug":"二、正文","link":"#二、正文","children":[{"level":3,"title":"1.TiDB Server","slug":"_1-tidb-server","link":"#_1-tidb-server","children":[]},{"level":3,"title":"2.TiKV","slug":"_2-tikv","link":"#_2-tikv","children":[]},{"level":3,"title":"3.索引数据","slug":"_3-索引数据","link":"#_3-索引数据","children":[]},{"level":3,"title":"4.存储细节","slug":"_4-存储细节","link":"#_4-存储细节","children":[]},{"level":3,"title":"5.Region","slug":"_5-region","link":"#_5-region","children":[]},{"level":3,"title":"6.PD","slug":"_6-pd","link":"#_6-pd","children":[]},{"level":3,"title":"7.调度","slug":"_7-调度","link":"#_7-调度","children":[]},{"level":3,"title":"8.心跳","slug":"_8-心跳","link":"#_8-心跳","children":[]}]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":11.7,"words":3511},"filePathRelative":"posts/数据库/简单了解 TiDB 架构.md","localizedDate":"2022年4月25日","excerpt":"<h1> 简单了解 TiDB 架构</h1>\\n<h2> 一、前言</h2>\\n<p>大家如果看过我之前发过的文章就知道，我写过很多篇关于 MySQL 的文章，从我的 <a href=\\"https://github.com/detectiveHLH/sh-blog\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Github 汇总仓库</a> 中可以看出来：</p>\\n<figure><img src=\\"/images/230828/github-title-content.jpeg\\" alt=\\"\\" width=\\"600\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};