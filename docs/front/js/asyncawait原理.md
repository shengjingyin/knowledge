ES2017 引入 async，本质是 Generator 函数的语法糖。 async 函数对 Generator 函数的改进，体现在以下四点。

- **内置执行器**

Generator 函数的执行必须靠执行器，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。这完全不像 Generator 函数，需要调用 next 方法，才能真正执行，得到最后结果。

- **更好的语义**

async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

- **更广的适用性**

co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

- **返回值是 Promise**

async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。进一步说，async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。 1、初始化：pending

## generator 函数

`generator函数`与普通函数的区别是，多了一个星号 **\*** ，并且只有在`generator函数`中才能使用`yield`，`yield` 相当于是执行`generator函数`的中间暂停点，要想使函数继续向后执行，需要调用`next方法`，执行`next方法`后会返回一个对象，包含`value`和`done`两个属性

- value：暂停点后面接的值，也就是 yield 后面接的值
- done：标记 generate 函数是否走完，走完为 true，没走完为 false

```js
function* fn1() {
  yield 1;

  yield 2;

  yield 3;
}

const g = fn1(); // fn1 {<suspended>}，初始化，
const r1 = g.next(); // {value: 1, done: false}
const r2 = g.next(); // {value: 2, done: false}
const r3 = g.next(); // {value: 3, done: false}
const r4 = g.next(); // {value: undefined, done: true}
```

### yield 后面接 promise

yield 后面接 promise 会 **立即执行** 函数，返回一个状态为`pending`的 promise 对象

```js{14,15}
function promise(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num / 3);
    }, 3000);
  });
}
function* fn1() {
  yield promise(2);
  return 2;
}

const g = fn1(); // {<suspended>}
const r2 = g.next(); //? {value: Promise {<pending>} , done: false} ?
r2.value.then(res => {
  console.log('🚀 2', res); // 0.6666666666666666
});
const r3 = g.next();
console.log('🚀 ~ 1', r3); // {value: 2, done: true}
```

### next 传参

generator 函数可以用`next方法`传参，并且可以用 yield 来接收这个参数，需要注意两点

- 第一次传参没有用，第二次才开始有用
- next 传值时，顺序是：先右边 yield，后左边接收参数

```js
function* gen() {
  const num1 = yield 1;
  console.log('num1', num1); // 11111
  const num2 = yield 2;
  console.log('num2', num2); // 22222
  return 3;
}
const g = gen();
g.next(); // { value: 1, done: false }
g.next(11111); // { value: 2, done: false }
g.next(22222); // { value: 3, done: true }
```

自己画一个

![image-20220302215406196](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/850681c60b494d2f9ecbe9d820be2e0d~tplv-k3u1fbpfcp-zoom-1.image)

### promise + next 传参

```js
function fn(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * 3);
    }, 1000);
  });
}

function* gen() {
  const num1 = yield fn(1);
  const num2 = yield fn(num1);
  const num3 = yield fn(num2);
  return num3;
}
```

执行 gen ，因为返回的都是 promise，所以需要.then 处理

```js
const g = gen();

const next1 = g.next(); // yield fn(1);
next1.value.then(res1 => {
  console.log('res1', res1);

  const next2 = g.next(res1); // yield fn(num1); res1 赋值给 num1
  next2.value.then(res2 => {
    console.log('res2', res2);

    const next3 = g.next(res2); // yield fn(num2);  res2 赋值给 num2
    next3.value.then(res3 => {
      console.log('res3', res3);

      const next4 = g.next(res3); // 最后一次，res3 赋值给 num3
      console.log('next4', next4);
    });
  });
});
```

结果

```
res1 3
res2 9
res3 27
next4 {value: 27, done: true}
```

上面使用 promise 的方式手动执行.next 在步骤少时还能使用，但是如果步骤很多时，那就会出现很多重复的步骤；所以可以将 generator 调用方式进行封装，如下：

```js{7}
function run(generator) {
  const it = generator();
  function go(result) {
    if (result.done) return result.value;

    return result.value.then(
      res => go(it.next(res)), // 执行next
      error => go(it.throw(error))
    );
  }
  go(it.next());
}

run(gen);
```

那换成这种之后，其实只要执行 `run(gen)` ，gen 中的函数体就有着和 await 一样的等待功能，run 函数也是 async、await 的核心原理

## 练习

```js
const fn = function (num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    });
};
const fn1 = function (num) {
    setTimeout(() => {
        return num * 2;
    }, 1000);
};
const deal1 = async function () {
    const r1 = await fn(1);
    console.log("🚀 6", r1);
    const r2 = await fn(r1);
    console.log("🚀 7", r2);
};
deal1();
const deal2 = async function () {
    const r1 = await fn1("1");
    console.log("🚀 3", r1);
    const r2 = await 2;
    console.log("🚀 5", r2);
};
deal2();

async function deal3() {
    return 20;
}
console.log("🚀 1", deal3);
console.log("🚀 2", deal3());
deal3().then((...args) => {
    console.log("🚀 4", args);
});

🚀 1 async ƒ deal3() { return 20; }
🚀 2 Promise {<fulfilled>: 20}
🚀 3 undefined
🚀 4 [20]
🚀 5 2
🚀 6 2
🚀 7 4
```

解析：
