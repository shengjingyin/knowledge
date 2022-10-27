## 引入方与被引入方执行顺序问题

```js
// A文件
console.log('引入方', 1);
import B from './B';
```

```js
// B文件
export const a = 1;

console.log('被引入方', 2);

console.time('循环');
let r = 0;
for (let i = 0; i < 1000000000; i++) {
  r += 1;
}
console.timeEnd('循环');
```

执行结果：

![image-20220115111926950](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220115111926950.png)

由此可以得出以下两个结论：

> 使用 A 代表引入方，B 代表被引入方

一、无论在 A 什么位置引入 B，B 总是比 A 先执行。

二、无论 B 文件执行多久，A 文件始终等待 B 结束同步任务。主要原因是 JS 属于单线程，必须等前面的同步任务执行完才能执行后面
