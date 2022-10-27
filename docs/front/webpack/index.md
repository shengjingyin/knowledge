# webpack

本文主要研究 webpack5，它是一个**静态资源打包工具**，将整个项目引入的所有资源编译打包成为一个目录输出一个或多个文件，打包出来的文件是浏览器可运行的，把 webpack 输出的文件叫做`bundle`

## 功能介绍

webpack 本身功能有限，仅支持打包 js 文件、图片（webpack5 默认把图片处理的 file-loader 和 url-loader 内置了），处理其他文件类型需要下载对应 loader

不同的模式下，对 JS 处理程度不一样：

- 开发模式（development），仅编译 JS 中的`ES module`语法
- 生产模式（production），编译 JS 中的`ES module`语法 + 压缩代码（tree-shaking 摇树）

## 基础使用

### 初始化项目

```bash
npm init -y
```

### 下载依赖

```bash
npm i webpack webpack-cli -D
```

### 构建产物

```bash
npx webpack <入口路径> --mode=development

# .e.g
npx webpack ./src/main.js --mode=development
```

#### 解析 npx webpack 指令流程？

首先 **./node_modules/.bin** 目录下包含 **当前项目**可运行指令 ， `npx `指令会去该目录下寻找对应运行指令，而 webpack 指令会去寻找项目根目录下的`webpack.config.js`文件，读取其中的配置。

如果没有配置文件，就需要使用上面示例的写法进行打包。

## 基本配置

webpack 默认执行配置文件**webpack.config.js**，一共分为 5 大类，`entry`、`output`、`module`、`plugin`、`mode`

### 1、准备 webpack 配置文件

在项目根目录下创建`webpack.config.js`

```js
module.exports = {
  // 入口
  entry: '',
  // 输出
  output: {},
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: '',
};
```

因为 webpack 是基于 node，所以该文件采用 commonjs 规范

### 2、修改配置文件

```js
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    clean: true,
  },
  mode: 'development',
};
```

<h3>3、运行指令</h3>

```bash
npx webpack
```

## 加载样式资源

### Css

#### 1、安装依赖

```bash
npm install --save-dev css-loader style-loader
```

#### 2、添加配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

`css-loader`，将 css 文件编译成 commonjs 模块，css 资源最终导入到 JS 中

`style-loader`，创建`<style>`标签，将样式内容插入到 html 中

### Less、S[ac]ss、Styles

样式预处理器需要在样式配置中额外添加对应 loader

#### 1、安装依赖

```bash
npm install --save-dev <对应预处理器loader>

# .e.g
npm install --save-dev less-loader less
# .e.g
npm install --save-dev sass-loader sass
# .e.g
npm install --save-dev stylus stylus-loader
```

#### 2、添加配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
};
```

## 加载图片

webpack5 内置支持图片加载，所以不用单独添加 loader，图片优化点

### 小图片转 base64

优点：

- 减少请求网络资源次数

缺点：

- 转换之后，比之前图片的资源更大，体积大约提升约 30%，只适用于小图片，转换边界值可以根据实际业务场景定义

```js
{
    test: /\.(png|jpe?g|gif)$/,
    type: "asset",
    generator: {
        filename: "images/[hash][ext][query]", // 文件可以单独控制输出目录
    },
    parser: {
        dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
        },
    },
},
```

## 加载字体图表

### 准备字体文件

加载阿里巴巴字体库

首先要去把需要的字体加入购物车后下载下来，下载下来的文件中有一个 **demo_index.html** 文件，这个文件打开有三种使用 iconfont 方法，按照上面操作即可

### 添加配置

```js
{
    test: /\.(woff2|ttf|woff)$/,
    type: "asset/resource", // 相当于过去的file-loader，只会对文件原封不动的输出
    generator: {
        filename: "fonts/[hash:8][ext][query]", // 文件可以单独控制输出目录
    },
},
```

## 加载其它资源

```js
// 处理其它资源，不需要对源文件操作
{
    test: /\.(woff2|ttf|woff|mp3|mp4|avi)$/,
    type: "asset/resource", // 相当于过去的file-loader，只会对文件原封不动的输出
    generator: {
        filename: "fonts/[hash:8][ext][query]", // 文件可以单独控制输出目录
    },
},
```

## 处理 JS 资源

因为 webpack 对 js 的处理是有限的，只能编译`ES module`语法，一些高级（es6）语法低版本浏览器无法识别，其次对于代码检测也可以在这里一起处理

- js 兼容，可用 babel
- 代码检测，可用 eslint

### Eslint

Eslint 被 facebook 收购，而其又是 react 研发者，所以默认支持 react，vue 需要增加插件才能支持

#### 1、配置文件

配置文件位于根目录，有多种写法：

- 单独配置文件

  - .eslintrc

  - .eslintrc.js

  - .eslintrc.json

    区别在于文件语法不同

- 也可以不用配置 文件，在 package.json 中配置 eslintConfig

#### 2、具体配置

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // 继承
  extends: ['airbnb-base'],
  // 解析
  parser: '@typescript-eslint/parser',
  // 解析选项
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // 插件
  plugins: ['@typescript-eslint'],
  // 规则
  rules: {},
};
```

##### 继承 extends

通常会使用 extends 继承现有规则，避免 rules 配置项过多，rules 规则优先级 > extends 规则优先级

`.eslintrc` 配置文件可以包含下面的一行：

```
"extends": "eslint:recommended"
```

由于这行，所有在 [规则页面](http://eslint.cn/docs/rules) 被标记为 “” 的规则将会默认开启。

现有以下较为有名的规则：

- [Eslint 官方的规则 open in new window](https://eslint.bootcss.com/docs/rules/)：`eslint:recommended`
- [Vue Cli 官方的规则 open in new window](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`
- [React Cli 官方的规则 open in new window](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`

> 如果不是官方规则，需要另外安装

##### 规则 rules

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

#### 3、在 webpack 中使用

1、下载包

```bash
npm i eslint-webpack-plugin eslint -D
```

2、定义 Eslint 配置文件

- .eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
  },
};
```

3、配置 webpack.config.js 文件

```js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
module.exports = {
  ...
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
    }),
  ]
  ...
};
```

4、运行指令即可在控制台看到报错内容

```bash
npx webpack
```

#### 4、.eslintignore 文件

这个文件是写给 vscode 中的 eslint 插件的，项目中的 eslint 插件是可以在 webpack.config.js 文件中读取到对应的配置，但是 vscode 中的插件是读取不到的，这时候一些编译结果也会被 vscode 中的 eslint 读取并保报错，解决办法就是**使用.eslintignore 忽视文件**

```
dist
node_modules
```

#### 5、注意点

因为在项目中安装 elint 并不能及时提示出哪里有问题，只能编译后才能发现问题点，所以**建议把 vscode 中的 eslint 扩展插件也安装**，这样在写代码的时候，vscode 能及时发现问题点！

### babel

js 编译器，将 es6 语法转换向后兼容的 js 语法

#### 1、配置文件

有多种写法：

- `babel.config.*`，根目录
  - babel.config.js
  - babel.config.json
- `.babelrc.*`，根目录
  - .babelrc
  - .babelrc.js
  - .babelrc.json
- 也可以不用配置 文件，在 package.json 中配置 babel

#### 2、具体配置

以`babel.config.js`为例

```javascript
module.exports = {
  // 预设
  presets: [],
};
```

1、presets 预设

简单理解：就是一组 Babel 插件, 扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，允许使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

#### 3、在 webpack 中使用

比较简单，作为 loader 使用

1、安装

```bash
npm install -D babel-loader @babel/core @babel/preset-env
```

2、配置

```js
// webpack.config.js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    },
  ];
}
```

```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
};
```

## 处理 html 资源

打包会生成多个 js、css 文件，并且还可能 有依赖关系，所以需要处理成自动引入打包生成的资源的插件**[HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/#installation)**

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
```

## 开发服务器

[webpack-dev-serve]()，代码变动时，自动编译

1、安装

```bash
npm install webpack-dev-server --save-dev
```

2、显示配置（可不声明）

```js
// webpack.config.js
module.exports = {
  // 开发服务器，不会输出资源，在内存中编译打包
  devServer: {
    host: 'localhost', // 启动服务器域名
    port: '3030', // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
};
```

3、运行

```bash
npx webpack serve
```

## 生产模式

配置 mode 为 production

```
npx webpack --config ./webpack.prod.js
```

## Css

### 提取 css 为单独文件

单独打包 css 文件，通过 link 标签引入，使用[mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin)

1、安装

```
npm install --save-dev mini-css-extract-plugin
```

2、配置

需要在 loader 和 plugin 处一起配置

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // style-loader 替换为 MiniCssExtractPlugin.loader
      },
    ],
  },
};
```

### Css 样式兼容性处理

1、下载包

```
npm i postcss-loader postcss postcss-preset-env -D
```

postcss-loader 依赖于 postcss，postcss 依赖于 postcss-preset-env

2、配置

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

在 `css-loader` 和 `style-loader` **之前**使用它，但是在其他预处理器（例如：`sass|less|stylus-loader`）**之后**使用

```js
// postcss.config.js
module.exports = {
  plugins: [
    'postcss-preset-env', // 兼容处理大多数样式问题
  ],
};
```

```json
// package.json
{
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```

> 含义：覆盖 99%的浏览器，并且没有 dead，并且只要最后两个版本，求交集

### css 压缩

[CssMinimizerWebpackPlugin](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)支持 缓存、并发运行

1、安装

```
npm install css-minimizer-webpack-plugin --save-dev
```

2、配置

```js
// webpack.config.js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
  plugins: [new CssMinimizerPlugin()],
};
```

## html 压缩

默认情况下，webpack5 在生产环境下自动压缩 html、js
