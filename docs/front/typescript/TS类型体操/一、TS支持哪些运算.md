```tsx
// interface SayHello {
//     (name: string): string;
// }

// const func: SayHello = (n: string) => {
//     return `${n} __ 1`
// }

// interface IPerson {
//     name: string;
//     age: number
// }

// // interface IPerson {
// //     [prop: string]: string | number
// // }

// interface PersonConstructor {
//     new (name: string, age: number): IPerson
// }

// function createPerson(ctor: PersonConstructor): IPerson {
//     return new ctor('shengjingyin', 18)
// }

// // function Person (this : IPerson,name: string, age: number) :IPerson{
// //     this.name = name
// //     this.age = age
// //     return this
// // }

// class Person {
//     name: string;
//     age: number
//     constructor(name: string, age: number) {
//         this.name = name
//         this.age = age
//     }
// }

// createPerson(Person)

// enum Transpiler {
//     Babel = 'babel',
//     Postcss = 'postcss',
//     Terser = 0, // 双向创建属性
// }
// console.log(Transpiler)

function func(str: `#${string}`) {

}

func('#')

type tuple = [string, number]

// 条件表达式
type r = 1 extends 2 ? true : false

// 静态的值自己就能算出结果来，为什么要用代码去判断呢？ 所以，类型运算逻辑都是用来做一些动态的类型的运算的，也就是对类型参数的运算。

type isTwo<T> = T extends 2 ? true : false;

type a = isTwo<1>

type First<Tuple extends unknown[]> = Tuple extends [first: infer F, ...Reset: any] ? F: never
// type First<Tuple extends unknown[]> = Tuple extends [first: infer F, ...Reset: any] ? F: never

// type N = First<[string, number, any]>


type Union = 1 | 2 | 3

type ObjType = {a: number} & {c: boolean}
// type ObjType = 


type R = {a: number, c: boolean} extends ObjType ? true : false

type D = 'aaa' & 'bbb'

// 对象、class对应的是 索引类型

type MapType<T> = {
    [key in keyof T]: [T[key] , T[key]] // 变化值
}
// keyof T ，索引查询
// T[key]  ，索引访问

interface IPerson {
    name: string
}

type C = MapType<{a: 1, b : 2}>

// 重映射

type MapType2<T> = {
    [
        // 因为索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key
        // 这里 keyof T 取出的索引就是 string | number | symbol 的联合类型
        key in keyof T as `${key & string}${key & string}`
    ]: T[key]
}
// 这里有一个number类型的索引，所以在进行运算 ${key & string} 时 等于 never 会被舍弃，最终结果没有 11 这个key
type C2 = MapType2<{a: 1, b : 2, 1: 3}>
```

