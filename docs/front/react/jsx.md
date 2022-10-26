> #### jsx语法规则

+ dom可以使用 括号 写入，而不需要字符串表达式（不是字符串）

+ jsx中的表达式需要使用花括号包裹`{ <js表达式> }`

  ```jsx
  <h1 id={id.toUpperCase()}></h1>
  ```

+ 应用样式 类名时，使用`className`替代`class`

  ```jsx
  <h1 className="title"></h1>
  ```

+ 样式书写，需要两个花括号（外层花括号，代表表达式，内层花括号表示对象）

  ```jsx
  <h1 style={{ background: "#000" }}></h1>
  ```

+ 必须只有一个根标签

+ 标签必须闭合
+ jsx中的元素，首字母有影响
  + 小写字母开头，转为html中同名标签
  + 大写字母开头，转为react中组件
  
  

> #### jsx 循环

+ 循环可以使用表达式 + map函数

+ 循环必须使用唯一key（react默认index），在添加巷移除项时会做diff进行性能优化

+ 官方建议使用字符串的key

    ```jsx
    const frameList = ["Vue", "React", "Angular"];
    const VDom = (
        <ul>
            {frameList.map((frame, i) => (
                <li key={i + ""}>{frame}</li>
            ))}
        </ul>
    );
    ```

