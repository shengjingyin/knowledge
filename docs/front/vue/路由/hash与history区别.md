vue-router 具有 hash、history 两种路由模式。以 Vue3 为列

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

hash 模式（优点）

- 兼容性强，兼容性达到了 IE8
- 除发送 ajax 和资源请求外不会发送其他多余请求
- 改变#后的路径、不会自动刷新页面
- 无需服务端进行配合

hash 模式（缺点）

- 访问路径上包含#,不美观
- 对于需要锚点功能的需求会与当前路由机制发生冲突
- 重定向操作时，后段无法获取 url 完整路径。

history 模式（优点）

- 符合 url 地址规范, 不需要#, 使用起来比较美观
- 可以使用 history.state 获取完整的路由信息
- 后端可以获取到完整的路由信息

history 模式（缺点）

- 兼容性只到 IE10
- 改变 url 路径后、会重新请求资源。
- 若访问的路由地址不存在时、会报 404,需服务端配合支持重定向返回统一的 404 页面。

##### 404

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
