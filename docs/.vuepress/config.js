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
            '/articles/mysql/详细了解 InnoDB 内存结构及其原理.md',
            '/articles/mysql/基于Redo Log和Undo Log的MySQL崩溃恢复流程.md',
            '/articles/mysql/深入了解 MySQL 主从复制的原理.md',
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
