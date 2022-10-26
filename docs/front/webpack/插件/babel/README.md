# babel

## 一般配置

```js
{
    "presets": [
        "babel-preset-stage-3"
    ],
    "plugins": [
        "transform-amd-to-commonjs",
        "transform-es2015-modules-commonjs",
        "transform-vue-jsx"
    ]
}
```

## presets

## **plugins**

## 常见问题

### 兼容 ES6 扩展运算符

-   扩展`presets`，需要先安装`babel-preset-stage-3`

    ```
    npm i -D babel-preset-stage-3
    ```

-   配置`.babelrc`文件

    ```js
    {
        "presets": [
            "babel-preset-stage-3"
        ]
    }
    ```
