# TS中的协变、逆变

类型系统分为两种：一种是名义类型系统，另外一种是结构类型系统，TS属于结构类型系统

在TS中结构类似则具有父子关系，如下：

```
interface Name {
    name: string;
}

interface Age {
    age: number
}
// 从结构上看，Son是子类型
interface Son {
    name: string;
    age: number;
}
```

> 子类比父类更具体（属性更多），Son 是 Name 和 Age 的共有子类型，Name、Age没有关联，后面使用的案例都是使用这三个接口


![image-20220807170003889.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34459c65ffa64040b941749d7bc45c45~tplv-k3u1fbpfcp-watermark.image?) 

## 协变

然后接着来讲第一个变化：协变【子类型能够赋值给父类型】

```
let t0: Name
let t1: Age
let t2: Son

t0 = {name: 'name'}
t1 = {age: 18}
t2 = {name: 'son', age: 18}

// 类型不相关，不能进行赋值（不具备父子关系），这里是【不变】
t0 = t1 // 报错！ Property 'name' is missing in type 'Age' but required in type 'Name'.

// 子类型可以赋值给父类型，类型收缩是安全的，因为t2 有2个属性 name、age，所以赋值给 t0（name）是够用的，多的一个age没用到也没关系，所以类型是安全的，这就是协变
t0 = t2 
// 同理
t1 = t2
```

在这里对变量进行赋值时，由于有接口的约束，所以并不能像JS中那样随意赋值，由于 `Name` 和 `Age` 接口没有关联，所以 `t0 = t1` 会报错；但是 `t0 = t2` 和 `t1 = t2` 都可以正常通过TS校验，因为 `t2` 的类型 `Son` 是 `Name` 和 `Age` 的共有子类型。

这种子类型能够赋值给父类型，在TS中称之为：协变

## 逆变

听名字能猜出这和协变的关系是相反的，也就是说【父类型可以赋值给子类型】，接着来验证这一点

> 重点注意函数参数 param 的类型变化

```
let getName: (param: Name) => void
getName = (param) => {
    console.log(param.name)
}

let getSex: (param: Son) => void
getSex = (param) => {
    console.log(param.sex)
}

getSex = getName   // getSex 要求参数是Son，getName 要求参数是 Name，因为Name是父类型，当把父类型赋值给子类型时，使用参数的属性都是在父类型范围内，所以在子类型来看是安全的
// 反之，子类型赋值给父类型时，因为子类型会用 age, sex，这超出了父类型的范围，所以TS认为这是不安全的
getName = getSex // 报错！ Type 'Name' is missing the following properties from type 'Son': age, sex
```

> 需要开启TS配置 【`strictFunctionTypes`】才能使函数的参数仅支持逆变，不开启则支持**双向协变**（参数既可以是父类也可以是子类，这2种都不会报错）
>
> ```
> 关闭strictFunctionTypes后，这两种赋值都不会报错
> getSex = getName
> getName = getSex
> ```

## 不变

当类型不是父子关系时，相互赋值时，不会通过TS检验

```
// 类型不相关，不能进行赋值（不具备父子关系），这里是【不变】
t0 = t1 // 报错！ Property 'name' is missing in type 'Age' but required in type 'Name'.
```

> Name类型与Age类型结构不相关，不具备父子关系，所以不能相互赋值





## 学习记录

```tsx
interface Person {
    name: string;
    age: number;
} 

interface Guang {
    name: string;
    age: number;
    hobbies: string[]
}

let person: Person = {
    name: '',
    age: 20
};
let guang: Guang = {
    name: 'guang',
    age: 20,
    hobbies: ['play game', 'writing']
};

person = guang;

let printName: (person: Person) => void
printName = (person) => {
    console.log(person.name)
}

let printHibbies: (guang: Guang) => void
// gunag 是 person 的子类型，
// 所以 person = guang, 类型收缩是安全的，Son 有三个属性 name、age、hobbies，所以赋值给 Person（name、age）是够用的，多的一个hobbies没用到也没关系，所以类型是安全的，这就是协变


printHibbies = (guang) => {
    console.log(guang.hobbies)
}

printHibbies = printName
// 开启 strictFunctionTypes 时ts只支持逆变，false支持协变、逆变
// printHibbies 函数是需要 hobbies 属性的，但是 printName 的类型中只有 name、age，没有hobbies
// printName = printHibbies

type T1 = string

type T2 = '123'




type T4<T extends string> = T

const a7 : T4<'123'> = '123'
const a8: string = a7   // 子类型赋值给父类型，这是协变

type T10 = string | number

// 联合类型转交叉类型
type G<T> =  (T extends T ? ((x: T) => undefined) : never ) extends  ((x: infer R) => undefined) 
                ? R
                : never 

type T11 = G<T10>       // string & number  = never
type T12 = G<{name: string} | {age: number}>

// type T12 = {
//     name: string;
// } & {
//     age: number;
// }

interface Name {
    name: string;
}

interface Age {
    age: number
}

interface Son {
    name: string;
    age: number;
    sex: string;
}

let t0: Name
let t1: Age
let t2: Son

t0 = {name: 'name'}
t1 = {age: 18}
t2 = {name: 'son', age: 18, sex: '1'}
// 类型不相关，不能进行赋值（不具备父子关系）
t0 = t1 // Property 'name' is missing in type 'Age' but required in type 'Name'.
t0 = t2 // 子类型可以赋值给父类型，类型收缩是安全的，因为t2 有2个属性 name、age，所以赋值给 t0（name）是够用的，多的一个age没用到也没关系，所以类型是安全的，这就是协变
// 同理
t1 = t2

// 逆变

// type Func = (a: Son) => void

// let func: Func = (a: Age) => void

// func(t2)
// func(t0) // 使用的时候仍然还是按照 Func（子类型） 进行限制
let getName: (param: Name) => void
getName = (param) => {
    console.log(param.name)
}

let getSex: (param: Son) => void
// gunag 是 person 的子类型，
// 所以 person = guang, 类型收缩是安全的，Son 有三个属性 name、age、hobbies，所以赋值给 Person（name、age）是够用的，多的一个hobbies没用到也没关系，所以类型是安全的，这就是协变


getSex = (param) => {
    console.log(param.sex)
}

getSex = getName   // getSex 要求参数是Son，getName 要求参数是 Name，因为Name是父类型，当把父类型赋值给子类型时，使用参数的属性都是在父类型范围内，所以在子类型来看是安全的
// 反之，子类型赋值给父类型时，因为子类型会用 age, sex，这超出了父类型的范围，所以TS认为这是不安全的
getName = getSex // Type 'Name' is missing the following properties from type 'Son': age, sex
```

