> new 操作符作用，为什么需要 new 操作符？
>
> new 操作符使用过程中，做了哪些事情？

# 少年，关于 new 操作符的四个特征你还记得吗？

**这是我参与 8 月更文挑战的第 28 天，活动详情查看：[8 月更文挑战](https://juejin.cn/post/6987962113788493831)**

其实`new`操作符做的事情很简单，先来看看[MDN 定义](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fnew)

> **`new` 运算符**创建一个**用户定义**的**对象类型的实例**或具有**构造函数**的**内置对象的实例**。

官方话语，总是那么男爵 😕，可以分为两部分：

-   创建一个**用户定义**的**对象类型的实例**；
-   **创建一个构造函数的内置对象的实例**。

## 创建一个**用户定义**的**对象类型的实例**

这个说的是`new`一个我们自定义的构造函数（不通过 new 操作符调用时，和普通函数一样）会返回一个对象类型的实例

```js
// 自定义的构造函数
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
// new操作符调用时
const p1 = new Person("zs", 18, "male");
// 返回一个对象，赋值给p1
p1 = { name: "zs", age: 18, sex: "male" };
复制代码;
```

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d141d1d059c243c693bae74dac847437~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827212051699.png" style="zoom:50%;" />可以看到原型对象上的`constructor`属性指向的构造函数是`Person`(感觉像是废话 😂)，关于原型链还是想打个广告，可以看看我之前写的两篇文[手撕祖传原型链图(上)](https://juejin.cn/post/7000700538232766472)、[手撕祖传原型链图(下)](https://juejin.cn/post/7000954291385008159)，相信会有所收获。

### 特征一

回到标题含义：我使用 new 操作符操作我自己创建的`Person`（构造）函数，结果就是我的`p1`变量确实等于一个对象了，而且我自定义的`Person`（构造）函数是没有返回值的。再来看定义：**`new` 运算符创建一个用户定义的对象类型的实例**，是`new`操作符在使用过程中进行了**新建对象的操作，并且是执行函数体的第一行就已经创建了一个新对象**（这是第一个特征）

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79ddda65accb443780b6e933438d4936~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827213909911.png" style="zoom:50%;" />

### 特征二、三

再来看看`p1`的结果`p1 = {name: "zs", age: 18, sex: "male"}`，返回一个对象我们已经知道了，为什么这个对象会有值呢？原来啊，**`new`操作符在执行构造函数中，把函数体内的`this`指向改变为这个新建的空对象上去了，并且是执行函数体的第一行就已经改变了 this 的指向**（这是第二个特征）

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d805dc986efd4c61bfee20fd461d50f1~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827214339850.png" style="zoom:50%;" /><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79ddda65accb443780b6e933438d4936~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827213909911.png" style="zoom:50%;" />

看图上我打印的一个`log`，显示这个`this`确实是指向了新创建的对象，有兴趣的朋友打开控制台输入调试看看，代码我贴在下面

```js
// 步骤一
function Person(name, age, sex) {
    console.log("this指向：", this); // 执行中，在此时已创建好新对象，已更改this指向为新对象
    debugger;
    this.name = name; // 新对象 的 name = 传入的name
    this.age = age; // 新对象 的 age = 传入的age
    this.sex = sex; // 新对象 的 sex = 传入的sex
}

// 步骤二
const p3 = new Person("zs", 18, "male");
复制代码;
```

**并且还会对这个新对象创建`__proto__`连接到这个构造函数的原型对象上**（这是第三个特征）

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72c1c9f240544f2980f25832db0c8b6f~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827215504010.png" style="zoom:50%;" />

可以看到新创建的对象`p4`的`[[prototype]]`连接到的是`Person`的原型对象，在此再推荐一下关于原型链的两篇文[手撕祖传原型链图(上)](https://juejin.cn/post/7000700538232766472)、[手撕祖传原型链图(下)](https://juejin.cn/post/7000954291385008159) 😂

### 特征四

最后一个特征就是：当我的（构造）函数体内有返回值时，会有两种情况：

-   返回一个基本数据类型

    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d74483b38366401799fe5866d3ff3c5b~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827215744616.png" style="zoom:50%;" />

    返回基本数据类型时，例如字符串、数字、布尔值、undefined、null 这些，**不会改变**构造函数返回对象的结果，相当于这个返回值对构造函数的返回值没有影响（但是你不要把`return`放在前面了，`return`结束函数体运行的能力依然存在）

-   返回一个复杂数据类型

    例如 Date、Array、Object、Map、Set 等等，这些返回值会去改变这个构造函数的输出！！

    -   示例一

        <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d8d5317de15418080091ca8c63ed393~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827220326840.png" style="zoom:50%;" />

        看上图，这里返回的一个自己创建的空对象，结果就是实例对象`p7`直接返回了空对象，并且这个空对象的原型对象并不是指向`Person`的原型对象，简直就是陪了夫人又折兵

    -   示例二

        <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5223ce30ab4b4b08b226a52ef8d310bb~tplv-k3u1fbpfcp-watermark.awebp" alt="image-20210827220625707.png" style="zoom:50%;" />

        这就能说明返回对象时（万物皆对象），构造函数就会返回这个对象，并不会去帮你返回 new 操作符创建好的新对象，而是返回 return 后面的对象

## **创建一个构造函数的内置对象的实例**

这个就和自定义的构造函数流程一模一样了，不需要单独去理解，特征完全一样

## 小结

再来回顾下`new`创建构造函数时的四个特征吧：

-   创建一个新对象
-   构造函数执行中，`this`的指向为这个新创建的对象
-   会对这个新对象进行`[[prototype]]`连接，新对象的`__proto__`属性指向构造函数的`prototype`属性，即指向原型对象
-   函数体的返回值
    -   没有返回值时，默认返回上面新创建的对象；
    -   有返回值时，返回基本数据类型时，不影响；**返回复杂数据类型（对象）时，这会构造函数就不会返回上面新创建的对象了**

### 代码实现

```js
const objectFactory = () => {
    let obj = new Object(), // 创建一个新对象
    	Constructor = [].shift.call(arguments);	// 取得外部传入的构造器
    obj.__proto__ = Constructor.prototype;	// 指向正确得原型
    
    let ret = Constructor.apply(obj, arguments);	// 借用外部传入得构造器给obj设置属性
    
    return typeof ret === 'object' ? ret : obj;		// 确保总会返回一个对象
}
```

