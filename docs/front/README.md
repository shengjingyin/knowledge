前端是个比较泛岗位，有 web、移动端、小程序等岗位，在大家普遍理解下是个“做页面的”，其实前端也可以做一个很棒的产品，例如[我正在做的低代码平台](https://pgo8ie4oqj.feishu.cn/docx/WuqJd3qaDoOcunx0wi0cwmZ8nTb)、例如使用 Three 做可视化 gis。常用的技能是前端三剑客：JS、Html、CSS，外加三大框架（Vue、React、Angular）国内用的比较多的 Vue（声明式 UI 框架） 和 React（）

## 规范

通常项目中会有代码规范、命名规范（变量、文件）、提交规范

### 代码规范

```js
// 格式化配置 https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 100, // 书写宽度
  tabWidth: 2, // tab占位
  useTabs: false, // 空格
  semi: true, // 行尾分号
  singleQuote: true, // 字符串单引号
  vueIndentScriptAndStyle: false, // !<script> and <style> 缩进问题
  bracketSameLine: false, // 末尾元素的 > 收尾符号不换行
  arrowParens: 'avoid', // 单个参数的箭头函数是否需要括号
  proseWrap: 'never', // md 超出长度是否换行
  htmlWhitespaceSensitivity: 'strict', // 指定 HTML 的全局空格敏感性
  endOfLine: 'auto', // 行尾换行
};
```

常用的规范：

### 命名规范

- 所有的枚举变量, 全局变量用：**大写+下划线** 比如 STATUS, LOGIN_TYPE

- 所有的 interface, types 用：**大驼峰**, 比如 BrandData

- 所有的通用组件文件命名：**大驼峰**, 比如 Search.vue, DataList.vue

- 所有的 Views 文件命名：**小写+中横线**, 比如 person-list.vue, my-detail.ts

- 所有路由：**小写+中横线**, 比如/to-client, /data-list

- 其他的都是**小驼峰**.

### commit 规范
