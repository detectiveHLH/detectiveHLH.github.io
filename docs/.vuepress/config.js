module.exports = {
    port: 8080,
    title: 'SH的全栈笔记',
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    themeConfig: {
        // 导航栏的图标
        logo: '/logo.png',
        // 导航栏目录
        nav: [{
            text: '链接',
            items: [
                {text: 'Github', link: 'https://github.com/detectiveHLH'},
                {text: '掘金', link: 'https://juejin.cn/user/3509296845029384'}
            ]
        }, {
            text: '语言',
            items: [
                {text: 'Java', link: '/language/java'},
                {text: 'Go', link: '/language/go'}
            ]
        }, {
            text: 'Kafka',
            link: '/middleware/kafka/kafka-1'
        }, {
            text: 'RocketMQ',
            link: '/middleware/rocketmq/rocketmq-1',
        }],
        sidebar: {
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
        },
    }
}