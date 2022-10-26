# 动效

## 盒子 Hover

::: demo

```vue
<Effect></Effect>
```

:::

## 文字 Hover 下划线

::: demo

```vue
<template>
	<div class="hover-underline" style="width: 200px; height: 100px; background: pink;">
		测试文章测试文章测试文章测试文章
	</div>
</template>
<style lang="less">
.hover-underline {
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
}
</style>
```

:::
