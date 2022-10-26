## 起步

```js
module: {
    //加载器配置
    rules:
        {
            test: /.(less)$/,
            use: ["vue-style-loader", "css-loader", "less-loader"],
        },
    ],
},
```

## 样式库

收集常用代码块，使用的预处理器是[less](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)，less 常用且让人容易忽视的功能有

### @规则嵌套和冒泡

@ 规则（例如 @media 或 @supports）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）。

```less
.component {
	width: 300px;
	@media (min-width: 768px) {
		width: 600px;
		@media (min-resolution: 192dpi) {
			background-image: url(/img/retina2x.png);
		}
	}
	@media (min-width: 1280px) {
		width: 800px;
	}
}
```

编译为：

```less
.component {
	width: 300px;
}
@media (min-width: 768px) {
	.component {
		width: 600px;
	}
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
	.component {
		background-image: url(/img/retina2x.png);
	}
}
@media (min-width: 1280px) {
	.component {
		width: 800px;
	}
}
```

### 复用已经写好的样式

提供.button 类

```less
.bundle {
	.button {
		display: block;
		border: 1px solid black;
		background-color: grey;
		&:hover {
			background-color: white;
		}
	}
	.tab {
	}
	.citation {
	}
}
```

复用.button 类

```less
#header a {
	color: orange;
	.bundle.button(); // 还可以书写为 .bundle > .button 形式
}
```

### 变量

```less
// Variables
@images: "../img";

// Usage
body {
	color: #444;
	background: url("@{images}/white-sand.png");
}
```

### 父级选择器

```less
.button {
	&-ok {
		background-image: url("ok.png");
	}
}
```

编译为

```less
.button-ok {
	background-image: url("ok.png");
}
```

```less
.link {
	& + & {
		color: red;
	}

	& & {
		color: green;
	}

	&& {
		color: blue;
	}

	&,
	&ish {
		color: cyan;
	}
}
```

编译为

```less
.link + .link {
	color: red;
}
.link .link {
	color: green;
}
.link.link {
	color: blue;
}
.link,
.linkish {
	color: cyan;
}
```

### 改变顺序

```less
.header {
	.menu {
		.no-borderradius & {
			background-image: url("images/button-background.png");
		}
	}
}
```

编译为

```less
.no-borderradius .header .menu {
	background-image: url("images/button-background.png");
}
```

### 合并

```less
.mixin() {
	transform+_: scale(2);
}
.myclass {
	.mixin();
	transform+_: rotate(15deg);
}
```

编译为

```less
.myclass {
	transform: scale(2) rotate(15deg);
}
```

合并需要使用`+_`或者`+`对属性做标记

### **混入**

这是使用`less`的重头戏，很多重复的且经常要用的可以用混入进行封装，就像是使用函数一样，调用即可！

例子

-   带了圆括号的混入，不会输出到样式表内

    > 如果你不想增加你的样式表内容，可以使用此项（带括号）

```less
.wrap() {
	text-wrap: wrap;
	white-space: -moz-pre-wrap;
	white-space: pre-wrap;
	word-wrap: break-word;
}

pre {
	.wrap();
}
```

编译为

```less
pre {
	text-wrap: wrap;
	white-space: -moz-pre-wrap;
	white-space: pre-wrap;
	word-wrap: break-word;
}
```

-   不带圆括号的混入，会输出到样式表内

```less
.wrap {
	text-wrap: wrap;
	white-space: -moz-pre-wrap;
	white-space: pre-wrap;
	word-wrap: break-word;
}

pre {
	.wrap();
}
```

编译为

```less
.wrap {
	text-wrap: wrap;
	white-space: -moz-pre-wrap;
	white-space: pre-wrap;
	word-wrap: break-word;
}
pre {
	text-wrap: wrap;
	white-space: -moz-pre-wrap;
	white-space: pre-wrap;
	word-wrap: break-word;
}
```

### 参数

```less
.padding(@t, @l) {
	padding: @t @l;
}
.pad(20px, 30px);
```

编译为

```less
.pad {
	padding: 20px 30px;
}
```

### 递归混入

重点！！很多规律性的可以一次性生成，比如 margin、padding、width、height

```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
	.column-@{i} {
		width: (@i * 100% / @n);
	}
	.generate-columns(@n, (@i + 1)); // 进入下一次循环
}
```

编译为

```less
.column-1 {
	width: 25%;
}
.column-2 {
	width: 50%;
}
.column-3 {
	width: 75%;
}
.column-4 {
	width: 100%;
}
```
