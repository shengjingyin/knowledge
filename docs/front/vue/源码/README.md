# vue源码阅读

本地项目地址：D:\Project\vue-dev

```bash
npm run dev
```



### 构建文件分类

|                               | UMD                | CommonJS                   | ES Module          |
| ----------------------------- | ------------------ | -------------------------- | ------------------ |
| **Full**                      | vue.js             | vue.common.js              | vue.esm.js         |
| **Runtime-only**              | vue.runtime.js     | vue.runtime.common.js      | vue.runtime.esm.js |
| **Full (production)**         | vue.min.js         | vue.common.prod.js         |                    |
| **Runtime-only (production)** | vue.runtime.min.js | vue.runtime.common.prod.js |                    |

### 名词解释

- **Full**：这是一个全量的包，包含编译器（`compiler`）和运行时（`runtime`）。
- **Compiler**：编译器，负责将模版字符串（即你编写的类 html 语法的模版代码）编译为 JavaScript 语法的 render 函数。
- **Runtime**：负责创建 Vue 实例、渲染函数、patch 虚拟 DOM 等代码，基本上除了编译器之外的代码都属于运行时代码。
- **UMD**：兼容 CommonJS 和 AMD 规范，通过 CDN 引入的 vue.js 就是 UMD 规范的代码，包含编译器和运行时。
- **CommonJS**：典型的应用比如 nodeJS，CommonsJS 规范的包是为了给 browserify 和 webpack 1 这样旧的打包器使用的。他们默认的入口文件为 `vue.runtime.common.js`。
- **ES Module**：现代 JavaScript 规范，ES Module 规范的包是给像 webpack 2 和 rollup 这样的现代打包器使用的。这些打包器默认使用仅包含运行时的 `vue.runtime.esm.js` 文件。

### 运行时（Runtime）+ 编译器（Compiler） vs. 只包含运行时（Runtime-only）

如果你需要动态编译模版（比如：将字符串模版传递给 `template` 选项，或者通过提供一个挂载元素的方式编写 html 模版），你将需要编译器，因此需要一个完整的构建包。

当你使用 `vue-loader` 或者 `vueify` 时，`*.vue` 文件中的模版在构建时会被编译为 JavaScript 的渲染函数。因此你不需要包含编译器的全量包，只需使用只包含运行时的包即可。

只包含运行时的包体积要比全量包的体积小 30%。因此尽量使用只包含运行时的包，如果你需要使用全量包，那么你需要进行如下配置：

#### webpack

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
```

#### Rollup

```js
const alias = require('rollup-plugin-alias')

rollup({
  // ...
  plugins: [
    alias({
      'vue': 'vue/dist/vue.esm.js'
    })
  ]
})
```

#### Browserify

Add to your project's `package.json`:

```js
{
  // ...
  "browser": {
    "vue": "vue/dist/vue.common.js"
  }
}
```

## 源码目录结构

通过目录结构的阅读，对源码有一个大致的了解，知道哪些东西需要去哪看。

```
├── benchmarks                  性能、基准测试
├── dist                        构建打包的输出目录
├── examples                    案例目录
├── flow                        flow 语法的类型声明
├── packages                    一些额外的包，比如：负责服务端渲染的包 vue-server-renderer、配合 vue-loader 使用的的 vue-template-compiler，还有 weex 相关的
│   ├── vue-server-renderer
│   ├── vue-template-compiler
│   ├── weex-template-compiler
│   └── weex-vue-framework
├── scripts                     所有的配置文件的存放位置，比如 rollup 的配置文件
├── src                         vue 源码目录
│   ├── compiler                编译器
│   ├── core                    运行时的核心包
│   │   ├── components          全局组件，比如 keep-alive
│   │   ├── config.js           一些默认配置项
│   │   ├── global-api          全局 API，比如熟悉的：Vue.use()、Vue.component() 等
│   │   ├── instance            Vue 实例相关的，比如 Vue 构造函数就在这个目录下
│   │   ├── observer            响应式原理
│   │   ├── util                工具方法
│   │   └── vdom                虚拟 DOM 相关，比如熟悉的 patch 算法就在这儿
│   ├── platforms               平台相关的编译器代码
│   │   ├── web
│   │   └── weex
│   ├── server                  服务端渲染相关
├── test                        测试目录
├── types                       TS 类型声明
```



