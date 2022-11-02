import Theme from 'vitepress/dist/client/theme-default';
import SmartyUI from '../../../src/entry';

// element
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css';
// 插件的组件，主要是demo组件
// ?找不到模块“vitepress-theme-demoblock/components/DemoBlock.vue”或其相应的类型声明。

import Demo from 'vitepress-theme-demoblock/components/Demo.vue';
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue';

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.use(SmartyUI);
    app.component('Demo', Demo);
    app.component('DemoBlock', DemoBlock);
  },
};
