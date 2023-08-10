const nav = [{
    text: '博客',
    link: '/articles.html',
}, {
    text: '链接',
    items: [
        {text: 'Github', link: 'https://github.com/detectiveHLH'},
        {text: '掘金', link: 'https://juejin.cn/user/3509296845029384'}
    ]
}, {
    text: '关于我',
    link: '/about.html',
}];

const sidebar = {
    '/articles/': [{
        title: 'MySQL',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/articles/mysql/简单了解InnoDB底层原理.md',
        ]
    }],
    '/middleware/kafka/': [{
        title: 'Kafka 分组 1',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            'kafka-1',
        ]
    }, {
        title: 'Kafka 分组 2',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            'kafka-2',
        ]
    }],
    '/middleware/rocketmq/': [{
        title: 'RocketMQ 分组 1',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            'rocketmq-1',
        ]
    }, {
        title: 'RocketMQ 分组 2',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            'rocketmq-2',
        ]
    }],
    // 没有匹配上则不展示任何侧边栏
    '/': [],
};

module.exports = {
    port: 8080,
    title: 'SH的全栈笔记',
    description: 'Just playing around',
    head: [
        ['link', {rel: 'icon', href: '/logo.png'}]
    ],
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        '@vuepress/nprogress',
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