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
    // 没有匹配上则不展示任何侧边栏
    '/': [],
};

module.exports = {
    sidebar
}