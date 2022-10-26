事件循环是了解 Node.js 最重要的方面之一。

为什么这么重要？ 因为它阐明了 Node.js 如何做到**异步且具有非阻塞的 I/O**，所以它基本上阐明了 Node.js 的“杀手级应用”，正是这一点使它成功了。

单线程

优点：大大简化了编程方式，而不必担心并发问题。

缺点：避免任何可能阻塞线程的事情，例如同步的网络调用（原生xml和jquery有这个选项可以同步加载，此时页面无法交互，处于锁定状态）或无限的循环。

任何花费太长时间才能将控制权返回给事件循环的 JavaScript 代码，都会阻塞页面中任何 JavaScript 代码的执行，甚至阻塞 UI 线程，并且用户无法单击浏览、滚动页面等。

JavaScript 中几乎所有的 I/O 基元都是非阻塞的。 网络请求、文件系统操作等。 被阻塞是个异常，这就是 JavaScript 如此之多基于回调（最近越来越多基于 promise 和 async/await）的原因。

### nextTick
### setImmediate
### setTimeout
### setInterval
### 定时setTimeout
### 异步编程与回调
### promise
### Async 和 Await
