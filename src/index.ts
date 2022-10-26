import { createApp } from "vue";

import SmartyUI from "./entry";
import SButton from "./button";
import SFCButton from "./SFCButton.vue";
import JSXButton from "./JSXButton";

createApp({
	template: `
        <div>
            <SButton color="blue" icon="search">蓝色按钮</SButton>
            <SButton color="green" icon="delete">绿色按钮</SButton>
            <SButton color="gray"  icon="add">灰色按钮</SButton>
            <SButton color="yellow"  icon="message">黄色按钮</SButton>
            <SButton color="red"  icon="share">红色按钮</SButton>
        </div>
    `,
})
	.use(SmartyUI)
	.mount("#app");
