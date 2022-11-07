原文链接：https://juejin.cn/post/6844903480868470798

## 类式继承

属性访问过程之中，触发[[GET]]操作，通过**让子类的原型对象 = 父类的实例**，以达到继承父类实例方法属性的目的，

核心代码：`SubClass.prototype = new SuperClass()`

```js{17}
//声明父类
var SuperClass = function (name) {
  this.name = name;
  this.getFullName = function () {
    return 'SuperClass__' + this.name;
  };
};
//声明子类
var SubClass = function (name) {
  this.name = name;
  this.subGetFullName = function () {
    return 'SubClass__' + this.name;
  };
};

//	----------继承父类----------------
SubClass.prototype = new SuperClass();

var sub = new SubClass('lilei');
var sub2 = new SubClass('xiaoli');

sub.getFullName(); //superValue is true
sub2.getFullName();
sub.subGetFullName(); //superValue is true
sub2.subGetFullName();
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59fe8bb0933447fb888c8a7b9a5e609d~tplv-k3u1fbpfcp-zoom-1.image" alt="image-20220306105720222" style="zoom: 67%;" />

## 构造函数继承

改变父类函数调用时的 this 指向，将父类的方法属性全部给子类

核心代码：`SuperClass.apply(this, args)`

```js {11}
//声明父类
var SuperClass = function (name) {
  this.name = name;
  this.getFullName = function () {
    return 'SuperClass__' + this.name;
  };
};
//声明子类
var SubClass = function (...args) {
  //	----------继承父类----------------
  SuperClass.apply(this, args); // 或者  SuperClass.call(this, ...args)

  this.subGetFullName = function () {
    return 'SubClass__' + this.name;
  };
};

var sub = new SubClass('lilei');
var sub2 = new SubClass('xiaoli');

sub.getFullName(); //superValue is true
sub2.getFullName();
sub.subGetFullName(); //superValue is true
sub2.subGetFullName();
```

## 组合式继承

|  | 类式继承 | 构造函数继承 |
| --- | --- | --- |
| 核心 | 子类的原型对象 = 父类的实例 | 构造子类时，改变父类的 this 指向，将其（父类）所有的属性方法都给子类 |
| 优点 | 所有子类实例化对象都可以通过原型链找到父类的方法，达到复用的效果 | 每个子类实例化对象互不影响 |
| 缺点 | 子类之间的修改（父类属性方法）操作可能会有影响 | 内存浪费 |

所以组合式继承的出现就是为了解决上面类式和构造函数继承时的缺点

核心思想：将父类的公用方法挂载到原型对象上，子类继承父类的方法时，共用原型链上的方法

核心代码：`SuperClass.apply(this, args)`、`SubClass.prototype = new SuperClass()`

```js{6,13,20}
//声明父类
var SuperClass = function(name) {
    this.name = name;
};
/ ！！！！！！注意这里！！！！！    提取公用方法
SuperClass.prototype.getFullName = function() {
    return "SuperClass__" + this.name;
};

//声明子类
var SubClass = function(...args) {
    /	----拿到父类的属性-----------
    SuperClass.apply(this, args); // 或者  SuperClass.call(this, ...args)

    this.subGetFullName = function() {
        return "SubClass__" + this.name;
    };
};
/	----------继承父类----------------
SubClass.prototype = new SuperClass();

var sub = new SubClass("lilei");
var sub2 = new SubClass("xiaoli");
```

## 寄生式继承

组合式继承的方法固然好，但是会导致一个问题，父类的构造函数会**被创建两次**（apply()的时候一遍，new 的时候又一遍），所以为了解决这个问题，又出现了寄生组合继承。

核心思想：主动构造一个空对象，该对象的 prototype 链接至父类的原型对象上，然后把该对象置为子类的原型对象。

核心代码：`inheritPrototype方法`、`inheritObject方法`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96437bf6099b407dba3123ba3c533162~tplv-k3u1fbpfcp-watermark.image?)

**实现继承函数**

```js
function inheritPrototype(subClass, superClass) {
  // 1、创建一个空对象，并且该空对象的prototype链接是指向父类的原型对象上
  var p = inheritObject(superClass.prototype);
  // 2、设置该空对象为子类的原型对象
  p.constructor = subClass;
  subClass.prototype = p;
}
// 创建一个空对象的prototype链接是指向父类的原型对象上
function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

业务代码

```js{13,17}
//声明父类
var SuperClass = function(name) {
    this.name = name;
};
/ 提取公用方法
SuperClass.prototype.getFullName = function() {
    return "SuperClass__" + this.name;
};

//声明子类
var SubClass = function(...args) {
    //	----拿到父类的属性-----------
    SuperClass.apply(this, args); // 或者  SuperClass.call(this, ...args)
};

/  核心 实现类式继承，此时原型对象是空对象
inheritPrototype(SubClass, SuperClass);

/ 实现类式继承之后，因为原型对象是空的，所以绑定在原型对象上的方法要放在后面调用
SubClass.prototype.subGetFullName = function() {
    return "SubClass__" + this.name;
};

var sub = new SubClass("lilei");
var sub2 = new SubClass("xiaoli");
```

ES5 继承大类分为四类：类式继承（将父类的实例赋值给子类的原型对象），构造函数继承（在子类的构造函数中调用父类构造函数`SuperClass.apply(this, args);`）

前面这两种方法，都没有把公用的方法提取到原型对象上。

后面两种方法算是优化类型，组合式继承：结合了类式继承、构造函数继承，并且把父类的公用方法都提取到了原型对象上。

寄生式组合继承：这个方法也是在组合式继承方法上继续优化，思路是通过工具函数**nop**实现**子类的原型对象**与**父类的原型对象**进行**[[prototype]]绑定**，减少父类构造函数的调用次数
