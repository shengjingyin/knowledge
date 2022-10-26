# vue-router 两种模式的区别

vue-router 有两种模式

1. hash (默认)

2. history

可以在实例化 vue-router 的时候，传递 mode 选项来设置使用哪种模式。

这两种模式有什么区别：

1. 表现不同，hash 模式在 url 地址上面会有丑陋的#。而 history 模式没有。
2. 实现原理不同。hash 模式是通过监听 hash 值的改变来实现的。onhashchange。 history 模式是使用的 html5 中新增的 history 相关的 api 操作，pushState() replaceState() onpopstate。
3. history 模式在上线之后，有可能会出现 404 的问题。而 hash 没有。

### 使用 history 需要注意的点

##### 本地 开发刷新后 404

在设置 vue-rouer 的 history 后使用 router-link 跳转没有问题， 但刷新页面后发现页面就找不到了

解决方法：
在 webpack.config.js 中，找到 scripts 自己配置的 webpack 服务器配置，比如我的是
修改前：

```bash
"server": "webpack-dev-server --open"
```

修改后：

```bash
"server": "webpack-dev-server --open --history-api-fallback"
```

##### 线上版本同样会有 404 问题

其实 vue-router 也说了这个 404 的问题，例如我用的 nginx

增加一行配置即可以解决

```json
location / {
    try_files $uri $uri/ /index.html;
}
```
