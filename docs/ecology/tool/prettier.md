> 之前也用到过，但是没有搞懂过，就在此时写这篇文章的我也是懵懵懂懂，文章也许有比较多的纰漏，欢迎有使用经验的大佬们指点一下 ✍

## 前言

正式安装前，先介绍下我项目的环境：vue2.x + webpack，其它项目还需要安装其它包噢

`eslint`和`prettier`都需要`vscode`安装扩展，项目内也需要安装对应的包才能生效

## vscode 安装扩展

这两个是必备的！

![image-20220105225924854](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220105225924854.png)

## 项目内安装对应的`prettier`和`eslint`包

### 安装包

```json
{
  "devDependencies": {
    "prettier": "^2.3.2",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-loader": "2.1.1",
    "eslint-plugin-prettier": "^3.4.1",
    "eslint-plugin-vue": "^7.17.0"
  }
}
```

```bash
 npm install --save-dev prettier eslint eslint-loader eslint-plugin-vue eslint-plugin-prettier eslint-config-prettier
```

### 生成 eslint 配置文件

```bash
.\node_modules\.bin\eslint --init
```

按照提示一步一步选择下去，我选的是 json 文件配置，完成选项后，会帮你生成一个文件`.eslintrc.json`，会按照你选的选项进行初始化配置。

![image-20220105230638949](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220105230638949.png)

![image-20220105230729564](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220105230729564.png)

这是生成的初始配置文件

```json
/.eslintrc.json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
}
```

### 配置`.eslintrc.json`规则文件

因为我要配合`prettier`做格式化，所以需要把`eslint`配置文件需要做一些调整

```json
/.eslintrc.json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:vue/essential",
        // 启用eslint-plugin-prettier和eslint-config-prettier，使编辑器显示错误提示，确保这项是扩展数组中的最后一个配置
        "plugin:prettier/recommended"	// 这里加了 prettier 插件
    ],
    "parserOptions": {
        "sourceType": "module", // 允许使用import导入
        "ecmaVersion": 12
    },
    "plugins": ["vue"],
    "rules": {
        // 自定义规则，有些规则prettier也没有，需要在这里进行补充
        "prettier/prettier": "error",	// 表示使用prettier的规则
        "no-ternary": "off",
        "no-unused-vars": "error"	// 禁止申明未使用的变量，这个一般都需要，但是prettier没有这个，需要在这单独写
    }
}
```

相关 rules 传送门：[eslint 中文文档](http://eslint.cn/docs/rules/)（tips：如果开发中遇到什么不想要的报错可以根据报错信息，找对应的 rule 并把其关闭即可）

### 配置`.eslintignore`忽略列表文件

有很多文件夹其实不需要进行 eslint 检测的，比如 node_modules、dist 文件等。`.eslintignore`的语法和`.gitignore`一样，可以参考这篇文章：[传送门](https://www.cnblogs.com/kevingrace/p/5690241.html)

```
/.eslintignore

/node_modules/
/.vscode/
/static_dist/
/static_init/
/*.js

/static_dev/*
!/static_dev/noh_app/script/plugin2x/saxmodule/intelligentCockpit/
```

### 配置`.prettierrc.json`格式化风格文件

主要配置一些常见的配置，如下：

```json
//.prettierrc.json
{
  "tabWidth": 4,
  "printWidth": 160,
  "useTabs": false,
  "endOfLine": "auto",
  "singleQuote": false,
  "semi": true,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

### 配置 vscode settins 文件

```json
{
  // eslint配置项，保存时自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 默认使用prettier格式化支持的文件
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 自动设定eslint工作区
  "eslint.workingDirectories": [{ "mode": "auto" }],
  // 保存格式化
  "editor.formatOnSave": true
}
```

### 效果

配置完上面的，然后**记得把 vscode 器重启下**，应该没太大问题，我刚刚也在测试项目上走了一遍。

下面是我的一个使用效果，使用`ctrl + s`保存即可修复`eslint`报错。

![](https://gitee.com/sjy666666/image-host/raw/master/img/eslint效果.gif)

![](https://gitee.com/sjy666666/image-host/raw/master/img/image-20210830202832738.png)

哇咔咔，舒服的雅痞，再也不用担心代码风格不统一了

## 小结

> eslint+prettier 这对组合使用的主要思想是：把检测、格式化的工作交给 prettier，以 prettier 的规则为检测规则，eslint 只负责展示报错信息，所以 rules 这块使用`"prettier/prettier": "error"`即可展示`prettier`的报错展示信息，但有的规则`prettier`也没有啊对不对，比如禁止申明未使用的变量，这时我要用 eslint 的规则，只需要在后面添加即可。也许我理解的也不对，欢迎指正。

##### 参考资料

**【这里讲了为什么使用 eslint-plugin-prettier 和 eslint-config-prettier】（https://github.com/prettier/eslint-plugin-prettier）**

**【typescript 使用 eslint+prettier 视频】（https://www.bilibili.com/video/BV1354y1q7gH）**

**【typescript 使用 eslint+prettier 文档】（https://github.com/DCLangX/howToAutoFixTypescript）**

```bash
npm install -g depcheck

depcheck
```
