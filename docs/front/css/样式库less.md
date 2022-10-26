# 样式库

收集常用代码块

## 尺寸

常用：`.size`

```less
.sizeX(@w) {
    width: @w;
}
.sizeY(@h) {
    height: @h;
}
.size(@w, @h: @w) {
    width: @w;
    height: @h;
}
.min-size(@w, @h: @w) {
    min-width: @w;
    min-height: @h;
}
.max-size(@w, @h: @w) {
    max-width: @w;
    max-height: @h;
}
```

## 外边距

常用：`.mg`

```less
// 外边距
.no-mg() {
    margin: 0;
}
.mg-x(@l, @r: @l) {
    margin-left: @l;
    margin-right: @r;
}
.mg-y(@t, @b: @t) {
    margin-top: @t;
    margin-bottom: @b;
}
.mg(@v) {
    margin: @v;
}
.mg(@t, @l) {
    margin: @t @l;
}
.mg(@t, @r, @b) {
    margin: @t @r @b;
}
.mg(@t, @r, @b, @l) {
    margin: @t @r @b @l;
}
```

## 内边距

常用：`.pd`

```less
// 内边距
.no-pd() {
    padding: 0;
}
.pd-x(@l, @r: @l) {
    padding-left: @l;
    padding-right: @r;
}
.pd-y(@t, @b: @t) {
    padding-top: @t;
    padding-bottom: @b;
}
.pd(@v) {
    padding: @v;
}
.pd(@t, @l) {
    padding: @t @l;
}
.pd(@t, @r, @b) {
    padding: @t @r @b;
}
.pd(@t, @r, @b, @l) {
    padding: @t @r @b @l;
}
```

## 边框

常用：`.bd`

```less
// 边框
.no-bd() {
    border: none;
}
.bd(@color, @w: solid, @t: 1px) {
    border: @t @w @color;
}
.bd-t(@color, @w: solid, @t: 1px) {
    border-top: @t @w @color;
}
.bd-r(@color, @w: solid, @t: 1px) {
    border-right: @t @w @color;
}
.bd-b(@color, @w: solid, @t: 1px) {
    border-bottom: @t @w @color;
}
.bd-l(@color, @w: solid, @t: 1px) {
    border-left: @t @w @color;
}
```

## 字体

常用：`.font`、`.color`、`.lh`、`.ellipsis`

```less
.font(@c) {
    .color(@c);
}
.font(@c, @fz) {
    .color(@c);
    .fz(@fz);
}
.font(@c, @fz, @w) {
    .color(@c);
    .fz(@fz);
    .font-w(@w);
    font-family: inherit;
}

// 字体颜色 + hover
.color(@c, @hoverC) {
    color: @c;
    &:hover {
        color: @hoverC;
    }
}

// 行高、高度
.lh(@lh, @h: @lh) {
    line-height: @lh;
    height: @h;
}

// 字体大小
.fz(@fz) {
    font-size: @fz;
}

// 字体颜色
.color(@c) {
    color: @c;
}

// 默认字体
.norm-font {
    font-weight: normal;
    font-style: normal;
}
.font-w(@w) {
    font-weight: @w;
}
.font-f(@w) {
    font-family: @w;
}

// 单行显示，超出省略号
.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

// 指定行数，多行文本超出省略号
// *(！！使用时记得设置高度刚好为指定行数的高度，否则会出现意外的一行内容！！)
.ellipsis-mult (@l: 3) {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @l;
    word-break: break-all;
}
// 文字外发光效果
.glow-text(@r: 10px, @color: gold) {
    text-shadow: 0 0 @r @color;
}
```

## 背景图

常用：`.bg-img`

```less
.bg-c(@color) {
    background-color: @color;
}
.bg-img(@u) {
    background-image: url(@u);
    .bg-normal();
}
.bg-img(@u1, @u2) {
    background-image: url(@u1);
    .bg-normal();
    &:hover {
        background-image: url(@u2);
    }
}
.bg-normal {
    .bg-size(100%, 100%);
    .bg-repeat(no-repeat);
    .bg-p(center, center);
}
.bg-size(@w, @h: @w) {
    background-size: @w @h;
}
.bg-repeat(@v) {
    background-repeat: @v;
}
.bg-p(@x, @y) {
    background-position: @x, @y;
}
```

## 布局

常用：`.flex`、`.abs`、`.coord`

```less
// el type
.dib {
    display: inline-block;
}
.db {
    display: block;
}
.di {
    display: inline;
}
.dn {
    display: none;
}
.flex {
    display: flex;
}
// position
.fixed {
    position: fixed;
}
.abs {
    position: absolute;
}
.relative {
    position: relative;
}
/* 坐标 */
.coord(@v) {
    .coord(@v, @v, @v, @v);
}
.coord(@v1, @v2) {
    .coord(@v1, @v2, @v1, @v2);
}
.coord(@v1, @v2, @v3) {
    .coord(@v1, @v2, @v3, @v2);
}
.coord(@t, @r, @b, @l) {
    top: @t;
    right: @r;
    bottom: @b;
    left: @l;
}
.coord-x(@r, @l: @r) {
    left: @l;
    right: @r;
}
.coord-y(@t, @b: @t) {
    top: @t;
    bottom: @b;
}
// float
.fl {
    float: left;
}
.fr {
    float: right;
}
```

### 居中

```less
.cent(abs) {
    .abs();
    .coord(0);
    margin: auto;
}
.cent-x(abs) {
    .abs();
    .coord-x(0);
    margin-left: auto;
    margin-right: auto;
}
.cent-y(abs) {
    .abs();
    .coord-y(0);
    margin-top: auto;
    margin-bottom: auto;
}
.cent(flex) {
    .flex();
    align-items: center;
    justify-content: center;
}
```

### flex

命名太长了，基本不实用

```less
.flex-justify(@val) {
    justify-content: @val; //space-between
}
.flex-wrap(@val) {
    flex-wrap: @val;
}
.flex-dir(@val) {
    flex-direction: @val; //column  column-reverse  row-reverse
}
.align-items(@val) {
    align-items: @val;
}
```

## 设置滚动条样式

vuepreess 暂时不支持 less（不会拓展）

相关文档：[vue 官方文档](https://vuepress.vuejs.org/zh/guide/using-vue.html#%E4%BD%BF%E7%94%A8%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8)
[添加 less](https://www.vuepress.cn/zh/config/#less)

::: demo

```vue
<template>
    <div class="set_scrollbar" style="width: 200px; height: 100px; background: pink; overflow-y: scroll">
        <div style="width: 100px;height: 400px; background: blue;"></div>
    </div>
</template>
<style lang="less">
.set_scrollbar {
    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar
    // 整个滚动条.
    &::-webkit-scrollbar {
        width: 14px;
        height: 14px;
        padding: 0;
        @media (max-width: 550px) {
            width: 7px;
            height: 7px;
        }
    }
    // 滚动条上的按钮 (上下箭头).
    &::-webkit-scrollbar-button {
        display: block;
        width: 0;
        height: 0;
    }
    // 滚动条上的滚动滑块.
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: rgba(128, 133, 144, 0.3);
    }
    // 滚动条轨道.
    &::-webkit-scrollbar-track {
        border-radius: 2px;
        background: rgba(128, 133, 144, 0.1);
    }
    // 当同时有垂直滚动条和水平滚动条时交汇的部分.
    &::-webkit-scrollbar-corner {
        background-color: transparent;
    }
}
</style>
```

:::

## 清除浮动

```less
.clearfix {
    display: block;
    zoom: 1;
    &:after {
        content: " ";
        display: block;
        font-size: 0;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
```

## 文字不可选中

```less
.unselect {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
```

## 鼠标

```less
.pointer {
    cursor: pointer;
}
.forbid {
    cursor: not-allowed;
}
```
