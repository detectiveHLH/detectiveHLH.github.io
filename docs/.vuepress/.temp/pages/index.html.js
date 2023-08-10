export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/wechat-official-qrcode.jpg\",\"heroText\":\"SH的全栈笔记\",\"tagline\":\"Nothing is true, Everything is permitted.\",\"actionText\":\"历史博客 →\",\"actionLink\":\"/articles\",\"features\":[{\"title\":\"专注后端\",\"details\":\"以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。\"},{\"title\":\"历史博客\",\"details\":\"享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\"},{\"title\":\"面试题目\",\"details\":\"VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。\"}]},\"headers\":[],\"git\":{\"updatedTime\":1691648569000,\"contributors\":[{\"name\":\"leonsh\",\"email\":\"detectivehlh@qq.com\",\"commits\":3}]},\"filePathRelative\":\"README.md\"}")

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
