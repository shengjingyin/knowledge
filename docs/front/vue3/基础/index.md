使用 vite

> Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。
>
> ```bash
> PS D:\project\vue3> node -v
> v14.16.1
> ```

[ (plugin Rollup Core) Error: Could not load ](https://blog.csdn.net/weixin_38659265/article/details/112004047)

### 1、找不到模块

[解决 vscode 红色波浪线的 ts 报错:找不到模块“store” ts(2307)，不识别@别名路径](https://blog.csdn.net/xjtarzan/article/details/123660435)

![image-20220416154915568](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220416154915568.png)

```tsx
// ts.config.ts 配置

"baseUrl": "./",
"paths": {
    "@src/*": ["src/*"]
}
```

### 2、安装 element-icon

[Vue3 中 element-plus 全局使用 Icon 图标的过程详解](https://www.jb51.net/article/235348.htm)

```tsx
import * as ElIcons from '@element-plus/icons';

for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name]);
}
```

### 3、api.now is not a function 的解决方法

[api.now is not a function 的解决方法](https://blog.csdn.net/qq_38682174/article/details/123372052)

`vue-devtools`不够给力，遇到问题重启调试台

### 4、vue3 动态路由

[Vue3---路由动态管理(router.addRoute())](https://blog.csdn.net/qq_39115469/article/details/113824868)
