export const data = JSON.parse("{\"key\":\"v-382e7548\",\"path\":\"/articles/23083.html\",\"title\":\"基于Redo Log和Undo Log的MySQL崩溃恢复流程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"permalink\":\"/articles/23083.html\",\"icon\":\"pen-to-square\",\"date\":\"2021-01-26T00:00:00.000Z\",\"category\":[\"mysql\"],\"tag\":[\"mysql2\"],\"description\":\"基于Redo Log和Undo Log的MySQL崩溃恢复流程 在之前的文章「简单了解InnoDB底层原理」聊了一下MySQL的Buffer Pool。这里再简单提一嘴，Buffer Pool是MySQL内存结构中十分核心的一个组成，你可以先把它想象成一个黑盒子。 黑盒下的更新数据流程 当我们查询数据的时候，会先去Buffer Pool中查询。如果Buffer Pool中不存在，存储引擎会先将数据从磁盘加载到Buffer Pool中，然后将数据返回给客户端；同理，当我们更新某个数据的时候，如果这个数据不存在于Buffer Pool，同样会先数据加载进来，然后修改修改内存的数据。被修改过的数据会在之后统一刷入磁盘。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://leonsh.cn/articles/23083.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"SH的全栈笔记\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"基于Redo Log和Undo Log的MySQL崩溃恢复流程\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"基于Redo Log和Undo Log的MySQL崩溃恢复流程 在之前的文章「简单了解InnoDB底层原理」聊了一下MySQL的Buffer Pool。这里再简单提一嘴，Buffer Pool是MySQL内存结构中十分核心的一个组成，你可以先把它想象成一个黑盒子。 黑盒下的更新数据流程 当我们查询数据的时候，会先去Buffer Pool中查询。如果Buffer Pool中不存在，存储引擎会先将数据从磁盘加载到Buffer Pool中，然后将数据返回给客户端；同理，当我们更新某个数据的时候，如果这个数据不存在于Buffer Pool，同样会先数据加载进来，然后修改修改内存的数据。被修改过的数据会在之后统一刷入磁盘。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"LeonSH\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"mysql2\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-01-26T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"基于Redo Log和Undo Log的MySQL崩溃恢复流程\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-01-26T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"LeonSH\\\",\\\"url\\\":\\\"https://leonsh.cn\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"黑盒下的更新数据流程\",\"slug\":\"黑盒下的更新数据流程\",\"link\":\"#黑盒下的更新数据流程\",\"children\":[]},{\"level\":2,\"title\":\"Redo Log & Undo Log\",\"slug\":\"redo-log-undo-log\",\"link\":\"#redo-log-undo-log\",\"children\":[]},{\"level\":2,\"title\":\"实现日志后的更新流程\",\"slug\":\"实现日志后的更新流程\",\"link\":\"#实现日志后的更新流程\",\"children\":[]},{\"level\":2,\"title\":\"流程中仍然存在的问题\",\"slug\":\"流程中仍然存在的问题\",\"link\":\"#流程中仍然存在的问题\",\"children\":[]},{\"level\":2,\"title\":\"基于2PC的一致性保障\",\"slug\":\"基于2pc的一致性保障\",\"link\":\"#基于2pc的一致性保障\",\"children\":[]},{\"level\":2,\"title\":\"验证2PC机制的可用性\",\"slug\":\"验证2pc机制的可用性\",\"link\":\"#验证2pc机制的可用性\",\"children\":[]}],\"readingTime\":{\"minutes\":7.27,\"words\":2182},\"filePathRelative\":\"articles/mysql/基于Redo Log和Undo Log的MySQL崩溃恢复流程.md\",\"localizedDate\":\"2021年1月26日\",\"excerpt\":\"<h1> 基于Redo Log和Undo Log的MySQL崩溃恢复流程</h1>\\n<p>在之前的文章「<a href=\\\"https://mp.weixin.qq.com/s/-puz311svMVbBAdRioPrnQ\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">简单了解InnoDB底层原理</a>」聊了一下MySQL的Buffer Pool。这里再简单提一嘴，Buffer Pool是MySQL内存结构中十分核心的一个组成，你可以先把它想象成一个黑盒子。</p>\\n<h2> 黑盒下的更新数据流程</h2>\\n<p>当我们查询数据的时候，会先去Buffer Pool中查询。如果Buffer Pool中不存在，存储引擎会先将数据从磁盘加载到Buffer Pool中，然后将数据返回给客户端；同理，当我们更新某个数据的时候，如果这个数据不存在于Buffer Pool，同样会先数据加载进来，然后修改修改内存的数据。被修改过的数据会在之后统一刷入磁盘。</p>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
