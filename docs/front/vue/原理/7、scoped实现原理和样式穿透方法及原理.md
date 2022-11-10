> 原文链接：https://blog.csdn.net/weixin_45272449/article/details/123083687

## scoped

- 为组件实例生成一个唯一标识，给组件中的每个标签对应的 dom 元素添加一个标签属性，data-v-xxxx
- 给`<style scoped>`中的每个选择器的最后一个选择器添加一个属性选择器，原选择器[data-v-xxxx]，如：原选择器为.container #id div，则更改后选择器为.container #id div[data-v-xxxx]

.e.g

```vue
<template>
  <div class="example">hello world</div>
</template>
<style scoped>
.example {
  color: red;
}
</style>
```

转译后

```vue{2,5}
<template>
  <div class="example" data-v-49729759>hello world</div>
</template>
<style scoped>
.example[data-v-49729759] {
  color: red;
}
</style>
```

## 样式穿透

用了样式穿透后，在 deep 之后的选择器最后就不会加上标识

```vue {8-9}
<!-- 父组件 -->
<template>
  	<div class="main">
        <HelloWorld msg="Vite + Vue" />
    </div>
</template>
<style lang="less" scoped>
.main :deep(.title) {
    background-color: blue;
}
</style>
```

```vue {6-7}
<!-- 子组件 -->
<template>
 	<h1 class="title">{{ msg }}</h1>
</template>
<style lang="less" scoped>
.title {
    background-color: pink;
}
</style>
```

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0a5dedc2e0248778259f031828a6f1d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" style="zoom:50%;" /> 

样式穿透的属性后面没有唯一标识