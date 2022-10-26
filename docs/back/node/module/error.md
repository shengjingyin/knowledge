# Node.js 中的错误处理

<details class="toc" open="" style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; cursor: pointer; margin-bottom: var(--space-24);"><summary style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s;"><h6 style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; display: inline-block; margin: 0px;">目录</h6></summary><ul class="tableOfContents" style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-24);"><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="http://nodejs.cn/learn/error-handling-in-nodejs/#%E5%88%9B%E5%BB%BA%E5%BC%82%E5%B8%B8" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); cursor: pointer; text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); font-family: var(--sans-serif);">创建异常</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="http://nodejs.cn/learn/error-handling-in-nodejs/#%E9%94%99%E8%AF%AF%E5%AF%B9%E8%B1%A1" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); cursor: pointer; text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); font-family: var(--sans-serif);">错误对象</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="http://nodejs.cn/learn/error-handling-in-nodejs/#%E5%A4%84%E7%90%86%E5%BC%82%E5%B8%B8" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); cursor: pointer; text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); font-family: var(--sans-serif);">处理异常</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="http://nodejs.cn/learn/error-handling-in-nodejs/#%E6%8D%95%E8%8E%B7%E6%9C%AA%E6%8D%95%E8%8E%B7%E7%9A%84%E5%BC%82%E5%B8%B8" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); cursor: pointer; text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); font-family: var(--sans-serif);">捕获未捕获的异常</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="http://nodejs.cn/learn/error-handling-in-nodejs/#promise-%E7%9A%84%E5%BC%82%E5%B8%B8" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); cursor: pointer; text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); font-family: var(--sans-serif);">Promise 的异常</a></li><li style="transition: background-color 0.6s ease 0s, color 0.1s ease 0s; margin-bottom: var(--space-08);"><a href="http://nodejs.cn/learn/error-handling-in-nodejs/#asyncawait-%E7%9A%84%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86" style="transition: all 0.2s ease-out 0s; color: var(--color-text-accent); cursor: pointer; text-decoration-line: underline; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: var(--black4); font-family: var(--sans-serif);">async/await 的错误处理</a></li></ul></details>

Node.js 中的错误通过异常进行处理。

## 创建异常

使用 `throw` 关键字创建异常：

```js
JScopy
throw value
```

一旦 JavaScript 执行到此行，则常规的程序流会被停止，且控制会被交给最近的异常处理程序。

通常，在客户端代码中，`value` 可以是任何 JavaScript 值（包括字符串、数字、或对象）。

在 Node.js 中，我们不抛出字符串，而仅抛出 Error 对象。

## 错误对象

错误对象是 Error 对象的实例、或者继承自 Error 类（由 [Error 核心模块](http://nodejs.cn/api/errors.html)提供）：

```js
JScopy
throw new Error('错误信息')
```

或：

```js
JScopy
class NotEnoughCoffeeError extends Error {
  //...
}
throw new NotEnoughCoffeeError()
```

## 处理异常

异常处理程序是 `try`/`catch` 语句。

`try` 块中包含的代码行中引发的任何异常都会在相应的 `catch` 块中处理：

```js
JScopy
try {
  //代码行
} catch (e) {}
```

在此示例中，`e` 是异常值。

可以添加多个处理程序，它们可以捕获各种错误。

## 捕获未捕获的异常

如果在程序执行过程中引发了未捕获的异常，则程序会崩溃。

若要解决此问题，则监听 `process` 对象上的 `uncaughtException` 事件：

```js
JScopy
process.on('uncaughtException', err => {
  console.error('有一个未捕获的错误', err)
  process.exit(1) //强制性的（根据 Node.js 文档）
})
```

无需为此导入 `process` 核心模块，因为它是自动注入的。

## Promise 的异常

使用 promise 可以链接不同的操作，并在最后处理错误：

```js
JScopy
doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => console.error(err))
```

你怎么知道错误发生在哪里？ 你并不知道，但是你可以处理所调用的每个函数（`doSomethingX`）中的错误，并且在错误处理程序内部抛出新的错误，这就会调用外部的 `catch` 处理程序：

```js
JScopy
const doSomething1 = () => {
  //...
  try {
    //...
  } catch (err) {
    //... 在本地处理
    throw new Error(err.message)
  }
  //...
}
```

为了能够在本地（而不是在调用的函数中）处理错误，则可以断开链条，在每个 `then()` 函数中创建函数并处理异常：

```js
JScopy
doSomething1()
  .then(() => {
    return doSomething2().catch(err => {
      //处理错误
      throw err //打断链条
    })
  })
  .then(() => {
    return doSomething2().catch(err => {
      //处理错误
      throw err //打断链条
    })
  })
  .catch(err => console.error(err))
```

## async/await 的错误处理

使用 async/await 时，仍然需要捕获错误，可以通过以下方式进行操作：

```js
JScopy
async function someFunction() {
  try {
    await someOtherFunction()
  } catch (err) {
    console.error(err.message)
  }
}
```