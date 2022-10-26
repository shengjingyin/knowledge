TS相对于JS新增内容：

+ implements
+ enum
+ type
+ interface





类也可以做类型注解



结构化类型系统（ts、鸭子模型）、表明类型系统（c#、java）



#### 兼容性问题

##### 接口/对象兼容性问题

+ **属性类型**兼容性
+ **属性个数**兼容性

##### 函数兼容性问题

+ 函数**参数个数**兼容性
+ 函数**参数类型**兼容性
+ 函数**返回值**兼容



#### 交叉类型

类似接口继承，常用于对象

```tsx
// 交叉类型
interface Person22 {
    name: string;
}
interface Phone {
    phone: number;
}
type PersonDetail = Person22 & Phone;

let xiaommin: PersonDetail = {
    name: "123",
    phone: 1230,
};
```



#### 交叉类型和接口继承之间的区别

类型组合时，对于**同名属性，处理类型冲突的方式不同**

接口继承时，冲突报错；

交叉类型冲突时，求并集

```tsx
interface A {
    fn: (val: number) => string;
}
interface B {
    fn: (val: string) => string;
}
type C = A & B;

let c: C = {
    /* fn类型: ((val: number) => string) & ((val: string) => string) */
    fn(val: number | string) {
        return "";
    },
};
```



### 泛型

可以**在保证安全的前提下**，让函数与多种类型一起工作，从而**实现复用**（目的）。常用于：函数、接口、类中

#### 创建泛型函数

```tsx
function getId<Type>(id: Type): Type { return id; }

const id1 = getId<number>(5);		// 返回值类型：number
const id2 = getId<string>("123");	// 返回值类型：string
```

解释：

+ 语法：在函数后面添加`<>`，尖括号中添加类型变量（此处的Type）
+ 类型变量Type，是一种特殊的变量，它**处理类型而不是值**，所以只能应用与参数类型和返回值类型
+ 该类型变量相当于一个类型容器，能够捕获用户提供的类型（具体类型，需要用户调用的时候才能确认）
+ 类型变量Type，可以是任意合法的变量名称（名字无所谓）

用途：用于多种数据类型时

#### 简化泛型函数调用

传入参数时，ts会进行 函数参数类型推断，推断出的类型是字面量类型（数值本身）

```tsx
const id3 = getId(true);			// 返回值类型：true 省略参数类型时，自动推断出为字面量类型
```

#### 泛型约束

可以为泛型**添加约束**来收缩类型（缩窄类型取值范围），有两种方式：

+ 指定更加具体的类型

  ```tsx
  function getId<Type>(value: Type[]): Type[] {
      // value.length 此时有数组的所有方法
      return value;
  }
  ```

+ extends 添加约束

  ```tsx
  interface ILength {
      length: number;
  }
  // 类型变量 Type 必须要满足 ILength 的约束
  function getLength<Type extends ILength>(value: Type): number {
      return value.length;
  }
  getLength("123");
  getLength([]);
  getLength({ length: 123 });
  ```

  Type 必须满足 extends 后面的接口要求，相当于是指定规则

#### 多个泛型变量

```tsx
function getProp<Type, Key extends keyof Type>(Obj: Type, key: Key) {
    return Obj[key];
}
```

解释：

+ keyof 关键字 接收 **一个对象类型**，**生成键名称（可能字符串或者数字）的联合类型**



#### 泛型接口

使用时，显示指定接口中的泛型类型（接口没有类型推断功能）

```tsx
interface IdFunc<Type> {
    id: (value: Type) => Type;
    ids: () => Type[];
}

let obj: IdFunc<number> = {
    id(val) {
        return val;
    },
    ids() {
        return [1, 2];
    },
};
```

+ 在接口后面添加`<类型变量>`
+ 类型变量在接口范围内，其它成员都可以用
+ 使用泛型接口时，需要**显示指定**泛型变量具体的类型

#### 泛型类

```tsx
class GenericNum<Type> {
    defaultVal: Type;
    add: (x: Type, y: Type) => Type;
}

const generic = new GenericNum<number>();
generic.defaultVal = 10;
```

+ 在类后面添加`<类型变量>`
+ 类型变量在类范围内，其它成员都可以用
+ 使用泛型类时，建议**显示指定**泛型变量具体的类型



#### 泛型工具类型

ts内置的一些工具类型，简化ts中常见的操作，它们都是基于泛型实现的

##### Partial< Type > 可选

用来构造一个类型 ，将Type的所有属性设置为可选

```tsx
interface Props {
    id: string;
    children: string[];
}
type PartialProps = Partial<Props>;
```

解读

```tsx
type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
```

+ keyof T 拿到T中所有key的联合类型
+ p in (keyof T) ，遍历联合类型
+ T[P] ，拿到T中对应P键类型，在TS 中 这叫做 **索引查询类型**

##### Readonly< Type > 只读

用来构造一个类型 ，将Type的所有属性设置为只读

```tsx
type Readonly<T> = { readonly [P in keyof T]: T[P]; }

interface Props {
    id: string;
    children: string[];
}
type ReadonlyProps = Readonly<Props>;
```



##### Pick< Type , Keys> 挑选属性

用来构造一个类型 ，从 Type中选择一组属性构造新类型

```tsx
type Pick<T, K extends keyof T> = { [P in K]: T[P]; }

interface Props {
    id: string;
    children: string[];
    title: string;
}
type PickProps = Pick<Props, "id" | "children">;
```

##### Record< Keys，Type > 创建新类型

用来创建一个新类型 ，指定类型的键和值类型

```tsx
type Record<K extends string | number | symbol, T> = { [P in K]: T; }

type RecordObj = Record<"a" | "b" | "c", string[]>;
/ 等价
type RecordObj = {
    a: string[];
    b: string[];
    c: string[];
}
```



##### 索引签名

```tsx
interface AnyObject {
    [key: string]: number | string; // 字符串索引签名
}

let anyObj: AnyObject = {
    a: 1,
    b: "1",
};

interface MyArr<T> {
    [n: number]: T; // 数字索引签名
}

let arr5: MyArr<number> = [1, 2, 3];
```



##### 映射类型

######  in

基于已有的类型，生成一个新的类型

```tsx
type InProp = "x" | "y";
type InProps2 = {
    [key in InProp]: number;
};
/* type InProps2 = { x: number; y: number; } */
```

映射类型只能在类型别名中使用，不能在接口中使用



###### keyof

```tsx
interface InProp2 {
    x: string;
    y: string;
}
type InProp3 = {
    [key in keyof InProp2]: number;
};
/* type InProp3 = { x: number; y: number; } */
```

解释：

+ 先执行 `keyof InProp2`， 得到 'x' | 'y'
+ 再执行 `in`，相当于 `key in  'x' | 'y'`



##### 索引查询类型

```tsx
type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
```

+ keyof T 拿到T中所有key的联合类型
+ p in (keyof T) ，遍历联合类型
+ T[P] ，拿到T中对应P键类型，在TS 中 这叫做 **索引查询类型**



###### 同时查询多个索引类型

```tsx
type Prop6 = {
    a: string;
    b: number;
    c: boolean;
};

type d = Prop6["a" | "c"]; // type d = string | boolean
type e = Prop6[keyof Prop6]; // type e = string | number | boolean
```



## 类型申明文件

用来为已存在的JS库提供类型信息

ts中的两种文件

+ .ts文件

  包含类型信息也包含可执行函数

+ .d.ts文件

  只包含类型信息

declare 关键字：**用于声明类型**

```tsx
declare let count: number
```











































































































