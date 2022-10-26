一文搞懂改变 this 指向的方法

> 这是一道经典的面试题，区别这三者有什么异同点，并且实际开发中，也有很大的作用，真可谓是相貌与才能出众呀！😄

## this

this 是 JavaScript 语言的一个关键字。

它是函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用。当一个**函数被调用时**，会创建一个活动记录（上下文）。这个记录会包含函数在哪被调用（调用栈）、函数的调用方式、传入的参数等信息。this 在函数执行过程中用到，它与绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

### this 绑定规则

#### 默认绑定

独立的函数调用，**无法使用其他规则时的默认规则**

```js
function foo() {
    log(this.a);
}

var a = 2;

foo(); // window
复制代码;
```

#### 隐式绑定

调用的位置 **是否有上下文**

```js
function foo() {
    log(this.a);
}

var obj = {
    a: 2,
    foo: foo,
};

obj.foo(); // obj
复制代码;
```

当函数引用有上下文时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象，或者是说，对象属性引用链中**只有最后一层在调用位置起作用**

#### 显示绑定

```js
function foo() {
    log(this.a);
}

var obj = {
    a: 2,
};

foo.call(obj); // obj
复制代码;
```

#### new 绑定

使用 new 来构造 foo(...)时，会构造一个新对象并把它绑定到 foo(...)调用中的 this

```js
function foo(a) {
    this.a = a;
}

var bar = new foo(2);

log(bar.a); // bar
复制代码;
```

#### 优先级

new 绑定 > 显示绑定 > 隐式绑定

### new 操作执行的四个步骤

-   构建一个全新的对象
-   这个新对象会被执行[[prototype]]连接
-   这个**新对象会绑定到函数调用的 this**
-   如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

### 面试题：实现 new 的过程

```js
// 伪代码实现new的过程
```

### apply、bind、call 区别

```js
// 调用区别

// apply可传入除this指向外，仅支持传入一个参数，直接运行调用者
Function.apply(obj[, argArray])

// bind 方法的返回值是函数，并且需要执行调用，才会执行。而 apply 和 call 则是立即调用。
Function.bind(thisArg[, arg1[, arg2[, ...]]])

// call可传入除this指向外，多个参数，直接运行调用者
Function.call(obj[, param1[, param2[, …[, paramN]]]])
```

 
