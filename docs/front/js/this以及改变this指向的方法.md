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

```js {7}
function foo() {
  log(this.a);
}
var obj = {
  a: 2,
};
foo.call(obj); // this -> obj
```

### new 绑定

使用 new 来构造 foo(...)时，会构造一个新对象并把它绑定到 foo(...)调用中的 this

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2); // this -> 当前创建的新对象

log(bar.a); // bar
```

### 优先级

new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

## new 操作执行的四个步骤 、实现 new 的过程

new 相关内容可以参考**new**这篇文章

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
