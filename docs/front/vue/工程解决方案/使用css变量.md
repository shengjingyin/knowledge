# 如何在vue中使用css变量动态设置样式？

有时候会有js控制css属性值的需求（主要图个简单，换个思路其实可以获取dom后再操作，但是会使代码变得更冗余、臃肿）

## 案例

在如下示例中，我想使用一个按钮组件，这个按钮的背景色和hover状态的背景色由调用者控制，此时有两种思路：一种是我监听`waves_btn`的鼠标移入移出事件，在事件的回调中动态设置dom元素的背景色（想想第一种要监听两个事件，还要动态设置，还是算了）；第二种就是采用css变量控制按钮的背景色，不需要额外的事件监听、dom操作，简单好用逼格高。第二种方法的实现主要由三步骤实现：

## 方式一

### 一、首先设置计算属性

```js
props: {
    bgColor: [Number, String],
    hoverBgColor: [Number, String],
},
computed: {
    wavesStyle() {
        return {
            // 这里的属性名就是css变量的名称，命名随意，但是要符合css变量命名规则
            // 属性值就是动态传入的props
            "--background-color": this.bgColor,
            "--background-color-hover": this.hoverBgColor,
        };
    },
}
```

### 二、添加样式到dom上

```vue
<template>
    <div class="waves_btn" :style="[wavesStyle]">
        <slot></slot>
    </div>
</template>
```

### 三、设置css属性

```css
<style lang="css" scoped>
.waves_btn {
    background-color: var(--background-color);	// 这里的变量名要和上面计算属性中的变量名一致
}
.waves_btn:hover {
    background-color: var(--background-color-hover);	// 这里的变量名要和上面计算属性中的变量名一致
}
</style>
```

经过上面这三步骤就可以达到动态设置背景色啦，唯一的注意点就是css变量名需要一致

### 案例完整代码

```vue
<template>
    <div class="waves_btn" :style="[wavesStyle]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        bgColor: [Number, String],
        hoverBgColor: [Number, String],
    },
    computed: {
        wavesStyle() {
            return {
                "--background-color": this.bgColor,
                "--background-color-hover": this.hoverBgColor,
            };
        },
    }
};
</script>

<style lang="css" scoped>
.waves_btn {
    background-color: var(--background-color);
}
.waves_btn:hover {
    background-color: var(--background-color-hover);
}
</style>
```

## 方式二

使用css中的`attr函数`

```vue
<template>
    <div class="border_text" :data-title="title">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "标题",
        },
    },
};
</script>
<style lang="less" scoped>
.border_text::before {
	content: attr(data-title);	/* 伪元素动态获取内容 */
}
</style>
```

