# loader

loader 本质上是导出为**函数**的 JavaScript 模块，[loader runner](https://github.com/webpack/loader-runner) 会调用此函数，然后将上一个 loader 产生的结果或者资源文件传入进去。

loader用于对模块的源代码进行转换

loader分为四种loader：**同步loader、异步loader、raw-loader、patch-loader**



### 同步 Loaders

无论是 `return` 还是 `this.callback` 都可以同步地返回转换后的 `content` 值：

```js
module.exports = function (content, map, meta) {
    return content.replace(/console\.log\(.*\);?/g, "");
};
```

`this.callback` 方法则更灵活，因为它允许传递多个参数，而不仅仅是 `content`。

```js
module.exports = function (content, map, meta) {
 	this.callback(null, someSyncOperation(content), map, meta);
  	return; // 当调用 callback() 函数时，总是返回 undefined
};
```

如果不需要传递其它参数，直接return，反之，需要使用`this.callback`

### 异步 Loaders

对于异步 loader，使用 [`this.async`](https://webpack.docschina.org/api/loaders/#thisasync) 来获取 `callback` 函数：

```javascript
module.exports = function (content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function (err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```

### "Raw" Loader

默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 `raw` 为 `true`，loader 可以接收原始的 `Buffer`。

```javascript
module.exports = function (content) {
  assert(content instanceof Buffer);
  return someSyncOperation(content);
  // 返回值也可以是一个 `Buffer`
  // 即使不是 "raw"，loader 也没问题
};
module.exports.raw = true;
```

### Pitching Loader



### 其它

#### 获取参数

getOptions(schema)

传入的是符合[json-schema规范](https://json-schema.org/)，