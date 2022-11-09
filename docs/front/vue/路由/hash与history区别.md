vue-router 具有 hash、history 两种路由模式。以 Vue3 为列

> 在服务端中，还有第三种模式：abstract（因为服务端不存在浏览器环境，所以没有 hash 和 history）

```js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(), // 或者 createWebHashHistory
  routes,
});

export default router;
```

## 原理

- hash 模式是通过监听 hash 值的改变来实现的。使用的事件是：`onhashchange`，捕获到 hash 值变化后，再去渲染对应内容

[hash 原理](https://blog.csdn.net/Gy_9543/article/details/107891083)

- history 模式是使用了 H5 种 history 提供的 pushState() 和 replaceState()方法改变路由

[history 原理](https://blog.csdn.net/qq_37763130/article/details/105438795)； [popstate_event](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event)

## 优缺点

|  | hash | history |
| --- | --- | --- |
| 优点 | 兼容性强，**兼容性达到了 IE8**；<br />无需服务端进行配合；<br />改变#后的路径、不会自动刷新页面。 | 符合 url 地址规范, 不需要#, 使用起来比较美观；<br />后端可以获取到完整的路由信息；<br />**使用 history 可以查看完整路由信息。** |
| 缺点 | 对于需要锚点功能的需求会与当前路由机制发生冲突；<br />访问路径上包含#，不美观；<br /> | 需要服务端支持**回退路由**（404）；<br />**兼容性只到 IE10**；<br /> |

## 区别

从原理和优缺点上来看，二者区别包含：**原理、兼容性、是否需要后端配合**等方面

#### 404

在设置 vue-rouer 的 history 后使用 router-link 跳转没有问题， 但刷新页面后发现页面就找不到了

解决方法：在 webpack.config.js 中，找到 scripts 自己配置的 webpack 服务器配置，比如我的是修改前：

```bash
"server": "webpack-dev-server --open"
```

修改后：

```bash
"server": "webpack-dev-server --open --history-api-fallback"
```

**nginx**

```json
location / {
    try_files $uri $uri/ /index.html;
}
```
