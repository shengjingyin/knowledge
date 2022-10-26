# vue-cli

一个vue3的脚手架，包含一下功能：

- [x] babel
- [x] eslint
- [x] 热更新
- [x] vue、vue-router集成
- [x] 构建文件输出分类、文件命名
- [x] css压缩与提取单文件、兼容浏览器处理
- [x] less、sass、stylus集成
- [x] 常见图片、视频资源集成、图片压缩
- [x] js压缩、拆分bundle
- [x] 路径别名、解析后缀名

## 安装包

```bash
cnpm i -D mini-css-extract-plugin eslint-webpack-plugin css-minimizer-webpack-plugin css-loader less-loader sass-loader stylus-loader less sass babel-loader @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/eslint-parser webpack webpack-cli webpack-dev-server html-webpack-plugin cross-env eslint
```

+ 图片

```bash
cnpm i image-minimizer-webpack-plugin imagemin -D

cnpm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev #无损
```

+ css兼容

```bash
cnpm i -D postcss postcss-loader postcss-preset-env
```

+ copy

```bash
cnpm i -D copy-webpack-plugin
```

+ vue

```bash
cnpm install -S vue vue-router

cnpm install -D vue-loader vue-template-compiler vue-style-loader @vue/cli-plugin-babel eslint-plugin-vue
```



## 项目配置

### webpack.config.js

包含生产环境配置与开发环境配置，未开启多进程（项目大的时候再开启）

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 加载html
const TerserWebpackPlugin = require("terser-webpack-plugin"); // css压缩

const ESLintWebpackPlugin = require("eslint-webpack-plugin"); // eslint
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css压缩
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // 无损压缩图片
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取css为单独一个文件
const { VueLoaderPlugin } = require("vue-loader"); // vue HRM
const { DefinePlugin } = require("webpack"); // 定义插件变量
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const getStyleLoader = (lastLoader) => {
    return [
        isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
        "css-loader",
        // postcss-loader 配合 postcss.config.js + package.json中的 browserslist 字段来进行样式兼容
        "postcss-loader",
        lastLoader,
    ].filter(Boolean);
};

module.exports = {
    entry: "./src/main.js",
    output: {
        path: isProduction ? path.resolve(__dirname, "dist") : undefined,
        filename: isProduction ? "js/[name].[contenthash:8].js" : "js/[name].js",
        chunkFilename: isProduction ? "js/[name].[contenthash:8].chunk.js" : "js/[name].chunk.js",
        assetModuleFilename: "media/[name].[hash:8].js",
        clean: isProduction,
    },
    module: {
        rules: [
            {
                oneOf: [
                    // 样式处理
                    {
                        test: /\.css$/,
                        // postcss-loader 配合 postcss.config.js + package.json中的 browserslist 字段来进行样式兼容
                        use: getStyleLoader(),
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader("less-loader"),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader("sass-loader"),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader("stylus-loader"),
                    },
                    // 资源处理
                    {
                        test: /\.(png|jpe?g|gif)$/, // 图片相关资源
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 4 * 1024, // 4kb
                            },
                        },
                    },
                    {
                        test: /\.(woff2|ttf|woff|mp3|mp4|avi)$/, // 视频相关资源
                        type: "asset/resource", // asset/resource ，表示对资源不进行处理，原样返回
                    },
                    // js处理
                    {
                        test: /\.js$/,
                        use: [
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启缓存
                                    cacheCompression: false, // 缓存文件不需要压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 开启runtime文件，减少babel【什么】体积
                                },
                            },
                        ],
                    },
                ],
            },
            // vue处理
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/vue-loader"),
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        isProduction &&
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css", // 入口文件导入的css命名
                chunkFilename: "css/[name].[contenthash:8].chunk.css", // 非入口文件导入的css命名
            }),
        new VueLoaderPlugin(), // vue 插件
        // cross-env 定义全局变量给webpack
        // DefinePlugin 定义全局变量给Vue
        new DefinePlugin({
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
        }),
        // eslint,
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, "src"),
            // include: path.resolve(__dirname, "src"),
            exclude: path.resolve(__dirname, "node_modules"), // 排除
            cache: true,
            cacheLocation: path.resolve(__dirname, "node_modules/.cache/eslint"),
            // threads, 多进程，项目不大时不需要开启
        }),
        isProduction &&
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "public"),
                        to: path.resolve(__dirname, "dist"),
                        toType: "dir",
                        noErrorOnMissing: true,
                        globOptions: {
                            ignore: ["**/index.html"],
                        },
                        info: {
                            minimized: true,
                        },
                    },
                ],
            }),
    ].filter(Boolean),
    optimization: {
        minimize: isProduction, //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                // parallel: threads, // 多进程数量
            }),
            // 压缩图片
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
        // 激活代码分割
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
    },
    resolve: {
        extensions: [".vue", ".js", ".json"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? undefined : "cheap-module-source-map", //source-map 文件比较大
    performance: false,
    devServer: {
        host: "127.0.0.1",
        port: "1522",
        hot: true,
        compress: true,
        historyApiFallback: true, // 解决vue-router刷新404问题
    },
};
```

### babel.config.js

```js
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
};
```

### .eslintrc.js

```js
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
    parserOptions: {
        parser: "@babel/eslint-parser",
    },
};
```

### postcss.config.js

```js
module.exports = {
    plugins: [
        "postcss-preset-env", // 兼容处理大多数样式问题
    ],
};
```

### package.json

```js
{
    "name": "vue-cli",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.dev.js",
    "scripts": {
        "start": "npm run dev",
        "dev": "cross-env NODE_ENV=development webpack serve --config ./webpack.config.js",
        "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@babel/core": "^7.18.5",
        "@babel/eslint-parser": "^7.18.2",
        "@babel/plugin-transform-runtime": "^7.18.5",
        "@vue/cli-plugin-babel": "^5.0.6",
        "babel-loader": "^8.2.5",
        "copy-webpack-plugin": "^11.0.0",
        "cross-env": "^7.0.3",
        "css-loader": "^6.7.1",
        "css-minimizer-webpack-plugin": "^4.0.0",
        "eslint": "^8.18.0",
        "eslint-plugin-vue": "^9.1.1",
        "eslint-webpack-plugin": "^3.1.1",
        "html-webpack-plugin": "^5.5.0",
        "image-minimizer-webpack-plugin": "^3.2.3",
        "imagemin": "^8.0.1",
        "imagemin-gifsicle": "^7.0.0",
        "imagemin-jpegtran": "^7.0.0",
        "imagemin-optipng": "^8.0.0",
        "imagemin-svgo": "^10.0.1",
        "less": "^4.1.3",
        "less-loader": "^11.0.0",
        "mini-css-extract-plugin": "^2.6.1",
        "postcss": "^8.4.14",
        "postcss-loader": "^7.0.0",
        "postcss-preset-env": "^7.7.1",
        "sass": "^1.52.3",
        "sass-loader": "^13.0.0",
        "stylus-loader": "^7.0.0",
        "vue-loader": "^17.0.0",
        "vue-style-loader": "^4.1.3",
        "vue-template-compiler": "^2.6.14",
        "webpack": "^5.73.0",
        "webpack-cli": "^4.10.0",
        "webpack-dev-server": "^4.9.2"
    },
    "browserslist": [
        "last 2 version",
        "> 1%",
        "not dead"
    ],
    "dependencies": {
        "vue": "^3.2.37",
        "vue-router": "^4.0.16"
    }
}
```

