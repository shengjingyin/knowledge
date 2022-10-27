> 相信大部分的朋友在使用 console 的基本只是使用其中的`log`方法吧，本文将介绍其中更有趣的玩法

## 获取代码块运行时间

日常中开发需要优化代码块，那么怎么知道优化的空间有多大呢，这时候如果能准确记录代码块运行时间那就有优劣之分了，来，让我们看看代码

```js
console.time('执行时间');
let count = 0;
for (let i = 0; i < 10000; i++) {
  // 执行相关代码
  count++;
}
console.timeEnd('执行时间');
```

效果：

![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807104116533.png)

## 个性打印

使用`%c`格式化打印，能给被打印内容添加自定义 css 样式

```js
console.log(`%c 这是自定义打印 内容 `, 'background:#286fb9;color:white;');
```

效果：

![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807102802512.png)

## 清空控制台

有时候我们会遇到多人合作的场景，李磊开发 A 模块，小明开发 B 模块，阿银开发子模块 C。由于处于开发阶段，李磊，小明，阿银都分别打印了很多条（每人 5 条）控制台信息进行调试，这时候代码合并后再继续开发。噢天，满屏的信息打印出来，自己不想去删除别人的代码，又要从满屏的打印记录中查找自己所需要的信息，简直崩溃，好在阿银学会了`console.clear()`方法，在自己开发模块的开头位置使用一下`clear`方法，即可舒舒服服的继续开发

```js
console.log('李磊信息：这是第一条emmmmmmmmm......................');
console.log('李磊信息：这是第二条emmmmmmmmm......................');
console.log('李磊信息：这是第三条emmmmmmmmm......................');
console.log('李磊信息：这是第四条emmmmmmmmm......................');
console.log('李磊信息：这是第五条emmmmmmmmm......................');
console.log('小明信息：这是第一条emmmmmmmmm......................');
console.log('小明信息：这是第二条emmmmmmmmm......................');
console.log('小明信息：这是第三条emmmmmmmmm......................');
console.log('小明信息：这是第四条emmmmmmmmm......................');
console.log('小明信息：这是第五条emmmmmmmmm......................');
console.clear();
console.log('阿银信息：这是第一条emmmmmmmmm......................');
console.log('阿银信息：这是第二条emmmmmmmmm......................');
console.log('阿银信息：这是第三条emmmmmmmmm......................');
console.log('阿银信息：这是第四条emmmmmmmmm......................');
console.log('阿银信息：这是第五条emmmmmmmmm......................');
```

效果：

​ 清空前：![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807105205632.png)

---

​ 清空后：![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807105315320.png)

## 常用输出内容

这一块主要根据不同的指令输出不同的样式类型，让人联想起 elementUI 中的`$message`组件，和它类似，有**error|warn|info**，

```js
console.error('这是一条错误');
console.warn('这是一个警告');
console.info('这是一条信息');
console.log('这是一条日志');
```

效果：

​ chrome：![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807110529380.png)

​ 火狐： ![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807110625825.png)

​ 对于 info 打印有一点区别，火狐的前面有个 icon，个人比较喜欢火狐的这种展示。反观 chrome，info 和 log 没什么区别。

## 输出分组

顾名思义：可以将多个输出合并到一个组下面，也就是分类的意思

```js
console.group('用户数据');
console.log('数据A： 1');
console.log('数据B： 2');
console.groupEnd(); // 切记，如果不想让后面的打印也加入分组，要手动调用 groupEnd 方法，声明分组结束
let a = 1;
console.log('a', a);
```

效果：

![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807111409407.png)

![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210807111428613.png)

## 本章小结

关于 console 的多种打印基本使用，总结就到这了，代码没什么难度，平常多多使用即可玩出不一样的控制台~~~
