# asyncawait 原理

1、初始化：pending

promise 的状态转换

-   成功：pending -> fulfilled
-   失败：pending -> rejected

## 总结

-   await 只能在 async 函数中使用，否则报错

    ```js
    Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules
    ```

-   async 函数返回的是一个状态为 fulfilled promise，return 值就是 promise 结果

-   await 一个非 promise 值时，可以添加一个微任务进入任务队列

-   async/await 作用是**用同步的方式，执行异步操作**

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

## 原理（generator 函数）

`generator函数`与普通函数的区别是，多了一个星号 **\*** ，并且只有在`generator函数`中才能使用`yield`，`yield` 相当于是执行`generator函数`的中间暂停点，要想使函数继续向后执行，需要调用`next方法`，执行`next方法`后会返回一个对象，包含`value`和`done`两个属性

-   value：暂停点后面接的值，也就是 yield 后面接的值
-   done：标记 generate 函数是否走完，走完为 true，没走完为 false

```js
function* fn1() {
    yield 1;

    yield 2;

    yield 3;
}

const g = fn1();
console.log("🚀 ~ file: index2.html ~ line 20 ~ g", g); // fn1 {<suspended>}
const r1 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r1", r1); // {value: 1, done: false}
const r2 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r2", r2); // {value: 2, done: false}
const r3 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r3", r3); // {value: 3, done: false}
const r4 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r4", r4); // {value: undefined, done: true}
```

可以看到最后一个 value 是 undefined，这个取决与`generator函数`是否 return 值，当流程走完之后再去调用`next方法`，返回的结果始终是`{value: undefined, done: true}`

```js
function* fn1() {
    yield 1;

    yield 2;

    yield 3;

    return 4;
}

const g = fn1();
g.next();
g.next();
g.next();

const r4 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r4", r4); // {value: 4, done: true}
const r5 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r5", r5); // {value: undefined, done: true}
const r6 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r6", r6); // {value: undefined, done: true}
```

### yield 后面接函数

yield 后面接函数会 **立即执行** 函数，并且以函数的返回值，会作为本次暂停点对象的`value值`

```js
function fn(num) {
    console.log("num", num);
    return num / 3;
}
function* fn1() {
    yield fn(1);

    return 2;
}

const g = fn1();
console.log("🚀 ~ file: index2.html ~ line 20 ~ g", g); // fn1 {<suspended>}

// 1
const r1 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r1", r1); // {value: 0.3333333333333333, done: false}
const r2 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r2", r2); // {value: 2, done: true}
```

### yield 后面接 promise

yield 后面接 promise 会 **立即执行** 函数，返回一个状态为`pending`的 promise 对象

```js
function fn(num) {
    console.log("num", num);
    return num / 3;
}
function promise(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num / 3);
        }, 3000);
    });
}
function* fn1() {
    yield fn(1);

    yield promise(2);

    return 2;
}

const g = fn1();
console.log("🚀 ~ file: index2.html ~ line 20 ~ g", g);
const r1 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r1", r1);
const r2 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r2", r2); // {value: Promise {<pending>} , done: false}
r2.value.then((res) => {
    console.log("🚀 ~ file: index2.html ~ line 37 ~ res", res);
});
const r3 = g.next();
console.log("🚀 ~ file: index2.html ~ line 22 ~ r3", r3);
```

```bash
index2.html:68 🚀 ~ file: index2.html ~ line 20 ~ g fn1 {<suspended>}
index2.html:49 num 1
index2.html:70 🚀 ~ file: index2.html ~ line 22 ~ r1 {value: 0.3333333333333333, done: false}
index2.html:72 🚀 ~ file: index2.html ~ line 22 ~ r2 {value: Promise {<pending>} , done: false}
index2.html:77 🚀 ~ file: index2.html ~ line 22 ~ r3 {value: 2, done: true}
index2.html:74 🚀 ~ file: index2.html ~ line 37 ~ res 0.6666666666666666
```

如果想要 promise 调用的结果，那么接上`.then`即可

### next 传参

generator 函数可以用`next方法`传参，并且可以用 yield 来接收这个参数，需要注意两点

-   第一次传参没有用，第二次才开始有用
-   next 传值时，顺序是：先右边 yield，后左边接收参数

```js
function* gen() {
    const num1 = yield 1;
    console.log(num1);
    const num2 = yield 2;
    console.log(num2);
    return 3;
}
const g2 = gen();
console.log(g2.next()); // { value: 1, done: false }
console.log(g2.next(11111));
// 11111
//  { value: 2, done: false }
console.log(g2.next(22222));
// 22222
// { value: 3, done: true }
```

![image-20220302215406196](D:\Project\image-host\img/image-20220302215406196.png)

### promise + next 传参

```js
function fn(num) {
    return new Promise((resolve) => {
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

const g = gen();

const next1 = g.next(); // yield fn(1);
next1.value.then((res1) => {
    console.log("res1", res1);

    const next2 = g.next(res1); // yield fn(num1); res1 赋值给 num1
    next2.value.then((res2) => {
        console.log("res2", res2);

        const next3 = g.next(res2); // yield fn(num2);  res2 赋值给 num2
        next3.value.then((res3) => {
            console.log("res3", res3);

            const next4 = g.next(res3); // 最后一次，res3 赋值给 num3
            console.log("next4", next4);
        });
    });
});
```

```
res1 3
res2 9
res3 27
next4 {value: 27, done: true}
```

![image-20220302225605325](D:\Project\image-host\img/image-20220302225605325.png)

## 实现 async
