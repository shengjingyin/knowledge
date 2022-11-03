import { demoBlockPlugin } from 'vitepress-theme-demoblock';
export default {
  themeConfig: {
    title: 'My Custom Title',
    description: 'Just playing around.',
    // 展示搜索框
    algolia: {
      appKey: '',
      indexName: '',
      searchParameters: {
        faeFilters: ['tags:guide,api'],
      },
    },
    sidebar: {
      '/components/': [
        { text: '起步', link: '/components/' },
        {
          text: '基础',
          collapsible: true,
          children: [
            { text: 'Button 按钮', link: '/components/button/' },
            { text: 'el-test', link: '/components/el-test/' },
          ],
        },
      ],
      '/front/': [
        { text: '导航', link: '/front/README' },
        {
          text: 'JS',
          collapsible: true,
          link: '/front/js/README',
          children: [
            { text: 'var、let、const区别', link: '/front/js/var、let、const' },
            { text: 'new', link: '/front/js/new' },
            { text: 'this', link: '/front/js/this以及改变this指向的方法' },
            { text: '闭包', link: '/front/js/闭包' },
            { text: '防抖、节流', link: '/front/js/防抖、节流' },
            { text: '深浅拷贝', link: '/front/js/深浅拷贝' },
            { text: '异步解决方案', link: '/front/js/异步解决方案' },
            { text: '原型链', link: '/front/js/原型链' },
            { text: 'async、await原理', link: '/front/js/asyncawait原理' },
            { text: '获取元素尺寸', link: '/front/js/获取元素尺寸' },
            { text: '数组', link: '/front/js/数组' },
            { text: 'console', link: '/front/js/console' },
            { text: 'js工具函数', link: '/front/js/js工具函数' },
            { text: 'JS工具库', link: '/front/js/JS工具库' },
            { text: 'ES6模块化', link: '/front/js/ES6模块化' },
          ],
        },
        {
          text: 'vue',
          collapsible: true,
          children: [
            {
              text: '基础',
              children: [
                { text: '传参', link: '/front/vue/基础/传参' },
                { text: '插槽', link: '/front/vue/基础/插槽' },
                { text: 'for循环中key的作用', link: '/front/vue/基础/for循环中key的作用' },
                { text: 'hook使用', link: '/front/vue/基础/hook使用' },
                { text: 'watch、computed区别', link: '/front/vue/基础/watch、computed区别' },
                { text: 'watch', link: '/front/vue/基础/watch' },
              ],
            },
            {
              text: '进阶',
              children: [
                { text: '插件', link: '/front/vue/进阶/使用插件' },
                { text: '自定义指令', link: '/front/vue/进阶/使用自定义指令' },
              ],
            },
            {
              text: '工程应用',
              children: [
                { text: '全局loading', link: '/front/vue/工程解决方案/全局loading' },
                { text: '使用css变量', link: '/front/vue/工程解决方案/使用css变量' },
              ],
            },
            {
              text: '源码',
              children: [
                { text: '初始化Vue', link: '/front/vue/源码/1、初始化Vue' },
                { text: '响应式原理', link: '/front/vue/源码/2、响应式原理' },
                { text: '异步更新原理', link: '/front/vue/源码/3、异步更新原理' },
                {
                  text: '有哪些是你看了vue才知道的小知识',
                  link: '/front/vue/源码/98、有哪些是你看了vue才知道的小知识',
                },
                { text: 'vue中优秀的语法', link: '/front/vue/源码/99、vue中优秀的语法' },
              ],
            },
            {
              text: '路由',
              children: [
                { text: '入门', link: '/front/vue/路由/入门' },
                { text: '路由守卫', link: '/front/vue/路由/路由守卫' },
                { text: 'hash与history区别', link: '/front/vue/路由/hash与history区别' },
              ],
            },
            {
              text: '状态管理',
              children: [{ text: '入门', link: '/front/vue/状态管理/入门' }],
            },
          ],
        },
        {
          text: 'vue3',
          collapsible: true,
          children: [
            {
              text: '基础',
              children: [{ text: '基础', link: '/front/vue3/基础/' }],
            },
          ],
        },
        {
          text: 'typescript',
          collapsible: true,
          link: '/front/typescript/前言',
          children: [
            { text: '一、基础类型（一）', link: '/front/typescript/一、基础类型（一）' },
            { text: '二、基础类型（二）', link: '/front/typescript/二、基础类型（二）' },
            { text: '三、接口', link: '/front/typescript/三、接口' },
            { text: '四、类', link: '/front/typescript/四、类' },
            { text: '五、泛型', link: '/front/typescript/五、泛型' },
            { text: '六、练习', link: '/front/typescript/六、练习' },
            { text: 'TS中的型变', link: '/front/typescript/TS中的型变' },
            {
              text: 'TS类型体操',
              collapsible: true,
              children: [
                {
                  text: '一、TS支持哪些运算',
                  link: '/front/typescript/TS类型体操/一、TS支持哪些运算',
                },
                {
                  text: '二、模式匹配做提取',
                  link: '/front/typescript/TS类型体操/二、模式匹配做提取',
                },
              ],
            },
          ],
        },
        {
          text: '层叠样式表（css）',
          collapsible: true,
          link: '/front/css/',
          children: [
            { text: '色值转换', link: '/front/css/色值' },
            { text: '响应式', link: '/front/css/响应式' },
            { text: 'flex', link: '/front/css/flex' },
            { text: '样式库（less）', link: '/front/css/样式库less' },
            { text: 'less技巧', link: '/front/css/less技巧' },
            { text: '动效', link: '/front/css/effect' },
          ],
        },
        {
          text: 'webpack',
          collapsible: true,
          children: [
            { text: '入门', link: '/front/webpack/' },
            { text: 'loader', link: '/front/webpack/loader' },
            { text: 'plugin', link: '/front/webpack/plugin' },
            { text: '高级配置', link: '/front/webpack/高级配置' },
            { text: 'vue-cli', link: '/front/webpack/vue-cli' },
            {
              text: '插件',
              collapsible: true,
              children: [{ text: 'Babel', link: '/front/webpack/插件/babel/README' }],
            },
          ],
        },
        { text: 'jquery', collapsible: true, link: '/front/jquery/README' },
        {
          text: 'react',
          collapsible: true,
          link: '/front/react/',
          children: [
            { text: 'jsx', link: '/front/react/jsx' },
            { text: '函数式组件与类式组件', link: '/front/react/函数式组件与类式组件' },
          ],
        },
        {
          text: 'three',
          collapsible: true,
          link: '/front/three/',
          children: [
            { text: '入门', link: '/front/three/入门' },
            { text: '资源', link: '/front/three/资源' },
          ],
        },
      ],
      '/ecology/': [
        {
          text: 'linux',
          collapsible: true,
          link: '/ecology/linux/README',
          children: [
            { text: '基础', link: '/ecology/linux/基础' },
            { text: 'nohup', link: '/ecology/linux/nohup' },
          ],
        },
        {
          text: 'windows',
          collapsible: true,
          children: [
            { text: 'cmd', link: '/ecology/windows/cmd' },
            { text: '技巧', link: '/ecology/windows/技巧' },
          ],
        },
        {
          text: 'git',
          collapsible: true,
          link: '/ecology/git/README',
          children: [
            { text: '基操', link: '/ecology/git/基操' },
            { text: '代码冲突', link: '/ecology/git/代码冲突' },
            { text: '储藏', link: '/ecology/git/储藏' },
            { text: 'gitEmoji', link: '/ecology/git/gitEmoji' },
            { text: '常见问题', link: '/ecology/git/常见问题' },
          ],
        },
        {
          text: 'tool',
          collapsible: true,
          children: [
            { text: 'go-gs', link: '/ecology/tool/go-gs' },
            { text: 'pic-go', link: '/ecology/tool/pic-go' },
          ],
        },
        {
          text: 'nginx',
          collapsible: true,
          children: [{ text: '常见问题', link: '/ecology/nginx/README' }],
        },
        {
          text: 'svn',
          collapsible: true,
          children: [{ text: '常见问题', link: '/ecology/svn/常见问题' }],
        },
        {
          text: 'nvm',
          collapsible: true,
          children: [{ text: '入门', link: '/ecology/nvm/入门' }],
        },
        {
          text: 'vscode',
          collapsible: true,
          children: [
            {
              text: '插件',
              children: [
                { text: 'Prettify JSON', link: '/ecology/vscode/插件/Prettify JSON' },
                { text: 'Turbo Console Log', link: '/ecology/vscode/插件/Turbo Console Log' },
                { text: 'prettier', link: '/ecology/tool/prettier' },
              ],
            },
          ],
        },
      ],
      '/coding/': [
        {
          text: '数据结构',
          collapsible: true,
          children: [
            { text: '链表', link: '/coding/数据结构/链表' },
            { text: '队列', link: '/coding/数据结构/队列' },
            { text: '堆栈', link: '/coding/数据结构/堆栈' },
            { text: '哈希表', link: '/coding/数据结构/哈希表' },
            { text: '树', link: '/coding/数据结构/树' },
            { text: '二叉树', link: '/coding/数据结构/二叉树' },
          ],
        },
        {
          text: '设计模式',
          collapsible: true,
          link: '/coding/设计模式/README',
          children: [
            { text: '创建型-单例模式', link: '/coding/设计模式/创建型-单例模式' },
            { text: '创建型-工厂模式', link: '/coding/设计模式/创建型-工厂模式' },
            { text: '创建型-原型模式', link: '/coding/设计模式/创建型-原型模式' },
            { text: '结构型-代理模式', link: '/coding/设计模式/结构型-代理模式' },
            { text: '结构型-适配器模式', link: '/coding/设计模式/结构型-适配器模式' },
            { text: '结构型-装饰器模式', link: '/coding/设计模式/结构型-装饰器模式' },
          ],
        },
        {
          text: '算法',
          collapsible: true,
          link: '/coding/算法/README',
          children: [
            {
              text: '字符串',
              collapsible: true,
              link: '/coding/算法/字符串/README',
              children: [
                { text: '反转字符串 II', link: '/coding/算法/字符串/反转字符串 II' },
                {
                  text: '反转字符串中的元音字母',
                  link: '/coding/算法/字符串/反转字符串中的元音字母',
                },
                { text: '学生出勤记录 I', link: '/coding/算法/字符串/学生出勤记录 I' },
                { text: '最长特殊序列 Ⅰ', link: '/coding/算法/字符串/最长特殊序列 Ⅰ' },
              ],
            },
            {
              text: '数组',
              collapsible: true,
              link: '/coding/算法/数组/README',
              children: [
                { text: '1比特与2比特字符', link: '/coding/算法/数组/1比特与2比特字符' },
                {
                  text: '获取生成数组中的最大值',
                  link: '/coding/算法/数组/获取生成数组中的最大值',
                },
              ],
            },
            { text: '链表', collapsible: true, link: '/coding/算法/链表/README' },
            { text: '哈希集合', collapsible: true, link: '/coding/算法/哈希集合/README' },
            { text: '哈希映射', collapsible: true, link: '/coding/算法/哈希映射/README' },
            { text: '二进制', collapsible: true, link: '/coding/算法/二进制/README' },
            { text: '二叉树', collapsible: true, link: '/coding/算法/二叉树/README' },
            {
              text: '排序',
              collapsible: true,
              link: '/coding/算法/排序/README',
              children: [
                { text: '堆排序', collapsible: true, link: '/coding/算法/排序/堆排序' },
                { text: '归并排序', collapsible: true, link: '/coding/算法/排序/归并排序' },
                { text: '快排序', collapsible: true, link: '/coding/算法/排序/快排序' },
              ],
            },
            {
              text: '高阶',
              collapsible: true,
              children: [
                { text: '二分法', collapsible: true, link: '/coding/算法/二分法/README' },
                { text: '动态规划', collapsible: true, link: '/coding/算法/动态规划/README' },
                { text: '贪心', collapsible: true, link: '/coding/算法/贪心/README' },
                { text: '找规律', collapsible: true, link: '/coding/算法/找规律/README' },
                {
                  text: '双指针',
                  collapsible: true,
                  link: '/coding/算法/双指针/README',
                  children: [
                    {
                      text: '滑动窗口',
                      collapsible: true,
                      link: '/coding/算法/双指针/滑动窗口/README',
                    },
                    {
                      text: '快慢指针',
                      collapsible: true,
                      link: '/coding/算法/双指针/快慢指针/README',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      '/back/': [
        {
          text: 'node',
          collapsible: true,
          link: '/back/node/README',
          children: [
            {
              text: '基础',
              collapsible: true,
              children: [
                { text: 'RESETful API', link: '/back/node/RESETful API' },
                { text: 'package', link: '/back/node/base/package' },
                { text: '与浏览器的区别', link: '/back/node/base/diff-brow' },
                { text: '事件循环', link: '/back/node/base/event-loop' },
                { text: 'WebAssembly', link: '/back/node/base/WebAssembly' },
              ],
            },
            {
              text: '模块',
              collapsible: true,
              children: [
                { text: '异步IO', link: '/back/node/module/异步IO' },
                { text: 'buffer', link: '/back/node/module/buffer' },
                { text: 'error', link: '/back/node/module/error' },
                { text: 'events', link: '/back/node/module/events' },
                { text: 'fs', link: '/back/node/module/fs' },
                { text: 'http', link: '/back/node/module/http' },
                { text: 'os', link: '/back/node/module/os' },
                { text: 'path', link: '/back/node/module/path' },
                { text: 'stream', link: '/back/node/module/stream' },
              ],
            },
            {
              text: 'orm',
              collapsible: true,
              children: [
                {
                  text: 'mongoose',
                  link: '/back/node/orm/mongoose',
                },
                {
                  text: 'sequelize',
                  link: '/back/node/orm/sequelize',
                },
              ],
            },
            {
              text: '解决方案',
              collapsible: true,
              children: [
                {
                  text: '权限模块',
                  children: [
                    { text: 'jsonwebtoken', link: '/back/node/解决方案/权限模块/jsonwebtoken' },
                  ],
                },
                {
                  text: '文件模块',
                  children: [{ text: '读取行数', link: '/back/node/解决方案/文件模块/读取行数' }],
                },
              ],
            },
          ],
        },
        {
          text: 'koa',
          link: '/back/koa/README',
          children: [],
        },
        {
          text: 'mysql',
          link: '/back/mysql/基础',
          children: [],
        },
      ],
      '/shengjingyin/': [
        {
          text: '关于',
          link: '/shengjingyin/README',
        },
        {
          text: '收藏',
          children: [{ text: '如何写好一篇文章', link: '/shengjingyin/收藏/如何写好一篇文章' }],
        },
      ],
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '前端', link: '/front/README' },
      { text: '生态', link: '/ecology/git/基操' },
      { text: '算法', link: '/coding/数据结构/链表' },
      { text: '后端', link: '/back/README' },
      { text: 'about', link: '/shengjingyin/README' },
      { text: 'help', link: 'https://vuepress-theme-hope.github.io/v2/zh/' },
    ],
  },
  markdown: {
    config: md => {
      console.log('🚀 ~ file: config.ts ~ line 463 ~ md', md);
      // 添加DemoBlock插槽
      // const { demoBlockPlugin } = require("vitepress-theme-demoblock");
      md.use(demoBlockPlugin);
    },
  },
};
