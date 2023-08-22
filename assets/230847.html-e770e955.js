const e=JSON.parse('{"key":"v-5b90d9f8","path":"/posts/230847.html","title":"玩转 ByteBuffer","lang":"zh-CN","frontmatter":{"date":"2021-12-29T00:00:00.000Z","permalink":"/posts/230847.html","category":["Java"],"tag":["NIO","ByteBuffer"],"description":"玩转 ByteBuffer 为什么要讲 Buffer 首先为什么一个小小的 Buffer 我们需要单独拎出来聊？或者说，Buffer 具体是在哪些地方被用到的呢？ 例如，我们从磁盘上读取一个文件，并不是直接就从磁盘加载到内存中，而是首先会将磁盘中的数据复制到内核缓冲区中，然后再将数据从内核缓冲区复制到用户缓冲区内，在图里看起来就是这样： 从磁盘读取文件","head":[["meta",{"property":"og:url","content":"https://leonsh.cn/posts/230847.html"}],["meta",{"property":"og:site_name","content":"SH的全栈笔记"}],["meta",{"property":"og:title","content":"玩转 ByteBuffer"}],["meta",{"property":"og:description","content":"玩转 ByteBuffer 为什么要讲 Buffer 首先为什么一个小小的 Buffer 我们需要单独拎出来聊？或者说，Buffer 具体是在哪些地方被用到的呢？ 例如，我们从磁盘上读取一个文件，并不是直接就从磁盘加载到内存中，而是首先会将磁盘中的数据复制到内核缓冲区中，然后再将数据从内核缓冲区复制到用户缓冲区内，在图里看起来就是这样： 从磁盘读取文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-22T02:29:37.000Z"}],["meta",{"property":"article:author","content":"LeonSH"}],["meta",{"property":"article:tag","content":"NIO"}],["meta",{"property":"article:tag","content":"ByteBuffer"}],["meta",{"property":"article:published_time","content":"2021-12-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-22T02:29:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"玩转 ByteBuffer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-12-29T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-22T02:29:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"LeonSH\\",\\"url\\":\\"https://leonsh.cn\\"}]}"]]},"headers":[{"level":2,"title":"为什么要讲 Buffer","slug":"为什么要讲-buffer","link":"#为什么要讲-buffer","children":[]},{"level":2,"title":"Buffer 的使用","slug":"buffer-的使用","link":"#buffer-的使用","children":[{"level":3,"title":"put","slug":"put","link":"#put","children":[]},{"level":3,"title":"get","slug":"get","link":"#get","children":[]},{"level":3,"title":"flip","slug":"flip","link":"#flip","children":[]},{"level":3,"title":"rewind","slug":"rewind","link":"#rewind","children":[]},{"level":3,"title":"mark & reset","slug":"mark-reset","link":"#mark-reset","children":[]},{"level":3,"title":"clear","slug":"clear","link":"#clear","children":[]},{"level":3,"title":"compact","slug":"compact","link":"#compact","children":[]}]},{"level":2,"title":"EOF","slug":"eof","link":"#eof","children":[]}],"git":{"createdTime":1692671377000,"updatedTime":1692671377000,"contributors":[{"name":"leonsh","email":"detectivehlh@qq.com","commits":1}]},"readingTime":{"minutes":9.63,"words":2888},"filePathRelative":"posts/Java/玩转 ByteBuffer.md","localizedDate":"2021年12月29日","excerpt":"<h1> 玩转 ByteBuffer</h1>\\n<h2> 为什么要讲 Buffer</h2>\\n<p>首先为什么一个小小的 Buffer 我们需要单独拎出来聊？或者说，Buffer 具体是在哪些地方被用到的呢？</p>\\n<p>例如，我们从磁盘上读取一个文件，并<strong>不是直接就从磁盘加载到内存中</strong>，而是首先会将磁盘中的数据复制到内核缓冲区中，然后再将数据从内核缓冲区复制到用户缓冲区内，在图里看起来就是这样：</p>\\n<figure><img src=\\"/images/230847/read-file-from-disk.jpeg\\" alt=\\"从磁盘读取文件\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>从磁盘读取文件</figcaption></figure>","copyright":{"author":"LeonSH"},"autoDesc":true}');export{e as data};
