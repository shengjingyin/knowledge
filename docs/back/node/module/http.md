## 搭建 HTTP 服务器
这是一个简单的 HTTP web 服务器的示例：

```js
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('你好世界\n')
})

server.listen(port, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})
```

简要分析一下。 这里引入了 http 模块。

使用该模块来创建 HTTP 服务器。

服务器被设置为在指定的 3000 端口上进行监听。 当服务器就绪时，则 listen 回调函数会被调用。

传入的回调函数会在每次接收到请求时被执行。 每当接收到新的请求时，request 事件会被调用，并提供两个对象：一个请求（http.IncomingMessage 对象）和一个响应（http.ServerResponse 对象）。

request 提供了请求的详细信息。 通过它可以访问请求头和请求的数据。

response 用于构造要返回给客户端的数据。

在此示例中：

```js
res.statusCode = 200
```
设置 statusCode 属性为 200，以表明响应成功。

还设置了 Content-Type 响应头：

```js
res.setHeader('Content-Type', 'text/plain')
```
最后结束并关闭响应，将内容作为参数添加到 end()：

```js
res.end('你好世界\n')
```
## 使用node发送请求（get、post）
使用 https 模块
## 使用node发送请求
使用 axios