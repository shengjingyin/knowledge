import { App } from 'vue';

import SButton from './button';
import SFCButton from './button/SFCButton.vue';
import JSXButton from './button/JSXButton';
import EffectVue from './effect';
import elButtonVue from './el-button';

// 导出单独组件
export { SButton, SFCButton, JSXButton };

// 编写一个插件，实现install方法

export default {
  install(app: App): void {
    app.component(SButton.name, SButton);
    app.component(elButtonVue.name, elButtonVue);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
    app.component(EffectVue.name, EffectVue);
  },
};
