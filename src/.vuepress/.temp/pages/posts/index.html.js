export const data = JSON.parse("{\"key\":\"v-e1e3da16\",\"path\":\"/posts/\",\"title\":\"Posts\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Posts\",\"article\":false,\"feed\":false,\"sitemap\":false,\"description\":\"\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://leonsh.cn/posts/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"SH的全栈笔记\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Posts\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"LeonSH\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Posts\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"excerpt\":\"\",\"copyright\":{\"author\":\"LeonSH\"},\"autoDesc\":true}")

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
