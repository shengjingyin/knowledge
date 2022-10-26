# hook使用场景

## 使用hook清除定时器

优点：不需要额外的在vue实例上添加属性保存定时器，就可以在销毁实例的同时销毁定时器。

```js
let timer = setTimeout(() => {
	// 定时器内容
}, 2000);
this.$once("hook:beforeDestroy", () => {
    clearTimeout(timer);
    timer = null;
});
```

## 监听子组件生命周期


```vue
<template>
    <BdaForm
        @hook:mounted="formMounted"
    ></BdaForm>
</template>

<script>
async formMounted() {
    // doing
},
</script>
```