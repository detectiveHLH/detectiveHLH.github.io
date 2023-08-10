const {nav} = require("./nav");
const {sidebar} = require("./sidebar");

module.exports = {
    port: 8080,
    title: 'SH的全栈笔记',
    description: 'Just playing around',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}]
    ],
    plugins: [
        'vuepress-plugin-nprogress',
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
    ],
    themeConfig: {
        // 导航栏的图标
        logo: '/logo.png',
        smoothScroll: true,
        lastUpdated: 'Last Updated',
        // 导航栏目录
        nav: nav,
        sidebar: sidebar,
    }
}
