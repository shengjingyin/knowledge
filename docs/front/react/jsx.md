## 为什么会有 jsx

采用 react 核心库的 `createElement` api 创建元素太过繁琐（类似 vue 中的 h 函数），使用 jsx 可以直接写出嵌套的 vdom 关系

通过 babel 翻译后的结果还是 `createElement`

> #### jsx 语法规则

- dom 可以使用 括号 写入，而不需要字符串表达式（不是字符串）

- jsx 中的**表达式**需要使用花括号包裹`{ <js表达式> }`

  > 表达式：能够 return 的则是表达式，像 for、if 语句则不是表达式

  ```jsx
  <h1 id={id.toUpperCase()}></h1>
  ```

- 应用样式 类名时，使用`className`替代`class`

  ```jsx
  <h1 className="title"></h1>
  ```

- 样式书写，需要两个花括号（外层花括号，代表表达式，内层花括号表示对象）

  ```jsx
  <h1 style={{ background: '#000' }}></h1>
  ```

- 必须只有一个根标签

- 标签必须闭合

- jsx 中的元素，首字母有影响

  - 小写字母开头，转为 html 中同名标签
  - 大写字母开头，转为 react 中组件

> #### jsx 循环

- 循环可以使用表达式 + map 函数

- 循环必须使用唯一 key（react 默认 index），在添加巷移除项时会做 diff 进行性能优化

- 官方建议使用字符串的 key

  ```jsx
  const frameList = ['Vue', 'React', 'Angular'];
  const VDom = (
    <ul>
      {frameList.map((frame, i) => (
        <li key={i + ''}>{frame}</li>
      ))}
    </ul>
  );
  ```
