## 什么是 this？

this 是函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用。当一个**函数被调用时**，会创建一个**活动记录（上下文）**。这个记录会包含函数在哪被调用（调用栈）、函数的调用方式、传入的参数等信息。this 在函数执行过程中用到，它与函数声明的位置没有任何关系，只取决于函数的调用方式。

## 绑定规则

this 有四种绑定规则：默认绑定、隐式绑定、显示绑定、new 绑定

### 默认绑定

独立的函数调用，**无法使用其他规则时的默认规则**

```js
function foo() {
  log(this.a);
}
var a = 2;
foo(); // this -> window
```

### 隐式绑定

调用的位置 **是否有上下文**

```js
function foo() {
  log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
obj.foo(); // this -> obj
```

当函数引用有上下文时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象，或者是说，对象属性引用链中**只有最后一层在调用位置起作用**

### 显示绑定

使用 call、apply、bind，都可以改变函数运行时的 this 指向

#### apply

默认展开数组分配到指定函数的参数列表中

```js{5}
function foo(a, b) {
  return a + b; // 1 + 2
}

foo.apply(null, [1, 2]);
```

#### bind

在 new 中使用 bind 绑定的函数，主要目的是可以预先设置函数的一些参数，在 new 进行初始化的时候可以只传入其余的参数。这种分开传参的技术称为：“部分应用”，是“柯里化”的一种

### new 绑定

使用 new 操作符会有以下 4 个步骤

- 创建一个全新的对象
- 这个新对象和函数之间会进行[[Prototype]]连接
- 函数调用时的 this 会绑定到这个新对象
- 如果函数没有返回其它对象，那么 new 表达式中的函数调用会自动返回这个新对象

```js
function myNew(Func, ...param) {
  let obj = {};
  obj.__proto__ = Func.prototype;
  const result = Func.apply(obj, param);
  return result instanceof Object ? result : obj;
}

function F(name) {
  this.name = name;
}

const p = myNew(F, 'shengjingyin'); // F {name: 'shengjingyin'}
```

**new 操作执行的四个步骤 、实现 new 的过程**可以参考**new**这篇文章

### 优先级

new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

要判断一个运行中函数的**this 绑定对象**，就需要**找到**这个**函数的直接调用位置**。找到之后依据下面四条规则进行判断 this 的绑定对象 ：

- 1、由 new 调用？绑定到新创建的对象。
- 2、由 call、apply、bind 调用？绑定到指定的对象。
- 3、由上下文调用？绑定到上下文。
- 4、默认：严格模式下绑定到 undefined，否则绑定到全局对象上。

## apply、bind、call 区别

```js
// 调用区别

// apply可传入除this指向外，**仅支持传入一个参数**，直接运行调用者
Function.apply(obj[, argArray])

// bind 方法的返回值是函数，并且需要执行调用，才会执行。而 apply 和 call 则是立即调用。
Function.bind(thisArg[, arg1[, arg2[, ...]]])

// call可传入除this指向外，多个参数，直接运行调用者
Function.call(obj[, param1[, param2[, …[, paramN]]]])
```
