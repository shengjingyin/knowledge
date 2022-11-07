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

### 为什么要用 Vue3

vue3 更好的支持 TS

响应式原理不同：Proxy

2.x 响应式的处理方式：是对属性做遍历+递归，只能对已经存在的属性响应式，如果修改/添加一个原本不存在的属性，那么是无法触发响应式的

3.x 使用 Proxy 监听对象，属于这个对象的所有操作都会被 监听操作 捕获，

3.x 响应式是惰性的，使用 Proxy 并不能监听到对象深层次的属性变化，因此它的处理方式是在 getter 中去递归响应式，这样做的好处是真正访问到的内部属性才会变成响应式，也就是按需实现响应式，减少性能消耗除了弥补 2.x 的缺点外，也会带来性能上的提升

新的特性：

1、Composition Api

提供了很多新的 api

2、新的内置组件

3、其它变更

- 生命周期钩子变更

- 移除 `$on`、`$once`、`$off`
