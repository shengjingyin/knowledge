vue3 更好的支持 TS

响应式原理不同：Proxy

2.x 响应式的处理方式：是对属性做遍历+递归，只能对已经存在的属性响应式，如果修改/添加一个原本不存在的属性，那么是无法触发响应式的

3.x 使用 Proxy 监听对象，属于这个对象的所有操作都会被 监听操作 捕获，

3.x 响应式是惰性的，使用 Proxy 并不能监听到对象深层次的属性变化，因此它的处理方式是在 getter 中去递归响应式，这样做的好处是真正访问到的内部属性才会变成响应式，也就是按需实现响应式，减少性能消耗除了弥补 2.x 的缺点外，也会带来性能上的提升

新的特性：

1、Composition Api

提供了很多新的 api

2、新的内置组件

3、其它变更

- 生命周期钩子变更

- 移除 `$on`、`$once`、`$off`

* 创建 App 的方式不一样

```js
// vue3
import { createApp } from 'vue';
const app = createApp({
  /* 根组件选项 */
});
```

```js
// vue2
new Vue({
  render: h => h(App),
}).$mount('#app');
```

- 新增 setup 函数 以及 setup 语法糖

## 响应式

### reactive

`reactive()` API 有两条限制：

1. **仅对对象类型有效**（对象、数组和 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#使用键的集合对象)），而对 `string`、`number` 和 `boolean` 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。

2. 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们**不可以随意地“替换”一个响应式对象**，因为这将导致对初始引用的响应性连接丢失：

   ```js
   let state = reactive({ count: 0 });

   // 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
   state = reactive({ count: 1 });
   ```

### ref

ref 会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value`

### shallowReactive

## computed

`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**，计算属性会自动追踪响应式依赖。并且 **计算属性值会基于其响应式依赖被缓存** 和 Vue2 一样

**可写计算属性**：可以通过同时提供 getter 和 setter 来创建

```js
const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  // setter
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ');
  },
});
```

### 最佳实践

#### Getter 不应有副作用

**不要在 getter 中做异步请求或者更改 DOM**，一个计算属性的声明中描述的是如何根据其他值派生一个值

#### 避免直接修改计算属性值

从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——**应该更新它所依赖的源状态以触发新的计算**。

## class

- 组件有多个根元素，指定哪个元素来接收这个 class

  ```html
  <!-- MyComponent 模板使用 $attrs 时 -->
  <p :class="$attrs.class">Hi!</p>
  <span>This is a child component</span>
  ```

  ```html
  <MyComponent class="baz" />
  ```

## style

当你在 `:style` 中使用了需要[浏览器特殊前缀](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)的 CSS 属性时，**Vue 会自动为他们加上相应的前缀**。Vue 是在运行时检查该属性是否支持在当前浏览器中使用。如果浏览器不支持某个属性，那么将尝试加上各个浏览器特殊前缀，以找到哪一个是被支持的。

## `v-if` vs. `v-show`

`v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

`v-if` 也是**惰性**的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

相比之下，`v-show` 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS `display` 属性会被切换。

总的来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适。

### 区别

`v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用。

`v-if`可以在一个 `<template>` 元素上使用

## `v-if` 和 `v-for`

当 `v-if` 和 `v-for` 同时存在于一个元素上的时候，`v-if` 会首先被执行

## 生命周期钩子与 2 版本不同

<img src="https://cn.vuejs.org/assets/lifecycle.16e4c08e.png" style="zoom:33%;" />

## watch

在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

### `watch` vs. `watchEffect`

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` **只追踪明确侦听的数据源**。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，**自动追踪所有能访问到的响应式属性**。这更方便，而且代码往往更简洁，但有时其**响应性依赖关系会不那么明确**。

### 后置刷新

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。如果想在侦听器回调中能访问被 Vue 更新**之后**的 DOM，你需要指明 `flush: 'post'` 选项：

```js
watch(source, callback, {
  flush: 'post',
});

watchEffect(callback, {
  flush: 'post',
});
```

后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`

```js
import { watchPostEffect } from 'vue';

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

### 停止侦听器

用**同步**语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。

如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。

要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数：

```js
const unwatch = watchEffect(() => {});

// ...当该侦听器不再需要时
unwatch();
```

## ref

### `v-for` 中的模板引用

当在 `v-for` 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：

## setup

- 使用了 `<script setup>` 的组件是**默认私有**的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露

- 通过 `<script setup>`，导入的组件都在模板中直接可用。

- 正在搭配 TypeScript 使用 `<script setup>` ，也可以使用**类型标注**来声明 props：

  ```tsx
  <script setup lang="ts">
  defineProps<{
    title?: string
    likes?: number
  }>()
  </script>
  ```

  当使用基于类型的声明时，我们失去了为 props **声明默认值**的能力。这可以通过 `withDefaults` 编译器宏解决：

  ```tsx
  export interface Props {
    msg?: string;
    labels?: string[];
  }
  const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two'],
  });
  ```

## 动态组件

`:is` 的值可以是以下几种：

- 被注册的组件名
- 导入的组件对象
- 一般的 HTML 元素

当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 [`` 组件](https://cn.vuejs.org/guide/built-ins/keep-alive.html)强制被切换掉的组件仍然保持“存活”的状态。

## prop

props 都遵循着**单向绑定**原则，**不应该**在子组件中去更改一个 prop。

### 使用一个对象绑定多个 prop

```js
const post = {
  id: 1,
  title: 'My Journey with Vue',
};
```

```html
<BlogPost v-bind="post" />
```

而这实际上等价于：

```html
<BlogPost :id="post.id" :title="post.title" />
```

### 禁用 Attributes 继承

如果**不想要**一个组件自动地继承 attribute，你可以在组件选项中设置 `inheritAttrs: false`。

如果你使用了 `<script setup>`，你需要一个额外的 `<script>` 块来书写这个选项声明：

```vue
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
};
</script>

<script setup>
// ...setup 部分逻辑
</script>
```

这些透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。

## attrs

```vue
<script setup>
import { useAttrs } from 'vue';
const attrs = useAttrs(); // 访问一个组件的所有透传 attribute：
</script>
```

虽然这里的 `attrs` 对象总是反映为最新的透传 attribute，但**它并不是响应式的** (考虑到性能因素)。你不能通过侦听器去监听它的变化。如果你需要响应性：

- 可以使用 prop；

- 也可以使用 `onUpdated()` 使得在每次更新时结合最新的 `attrs` 执行副作用；

## v-model

当使用在一个组件上时，`v-model` 会被展开为如下的形式：

```html
<CustomInput :modelValue="searchText" @update:modelValue="newValue => searchText = newValue" />
```

要让这个例子实际工作起来，`<CustomInput>` 组件内部需要做两件事：

1. 将内部原生 `input` 元素的 `value` attribute 绑定到 `modelValue` prop
2. 输入新的值时在 `input` 元素上触发 `update:modelValue` 事件

这里是相应的代码：

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
```

现在 `v-model` 也可以在这个组件上正常工作了：

```
<CustomInput v-model="searchText" />
```

## provide/inject

当提供 / 注入响应式的数据时，**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**。

```vue{11-14}
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue';

const { location, updateLocation } = inject('location');
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```



## 组合式函数











## 自定义指令





## 内置组件

### KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

#### 包含/排除

可以通过 `include` 和 `exclude` prop 来定制包含/排除行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

```html
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
```

#### 最大缓存实例数

如果缓存的实例数量即将超过指定的那个最大数量，则**最久没有被访问的缓存实例将被销毁**

```html
<KeepAlive :max="10">
```

#### 缓存实例的生命周期

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'
onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})
onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```





---



### Teleport

不需要再顾虑 DOM 结构的问题。





















