# new Vue 发生了什么？

vue 的本质是一个函数，new Vue 实际上调用的是`Vue.prototype._init`方法

```js
function Vue(options) {
  this._init(options);
}
```

在 init 方法中，会进行组件初始化【选项合并、关系属性、事件、插槽、inject、处理响应式数据（props、methods、data）、provide、生命周期、挂载】操作

上述为整个初始化的全部过程：

- 合并选项，对于子组件和根组件进行不同的处理
  - 处理根组件时，会把全局注册的组件合并到根组件的 components 中
- 代理 vm 属性
- 初始化组件实例关系属性，如：$parent、$root、$children、$refs、以及初始化状态的值\_watcher、 \_inactive
- 初始化自定义事件，事件的定义与触发都是组件自己
- 初始化插槽、渲染函数
  - 绑定`_createElement fn` 到 vm 上
  - 响应式处理`$attrs`、`$listeners`
- 调用生命周期`beforeCreate`
- 初始化 Inject（响应式的），解析时，主动**就近递归**寻找父组件上对应的 provide 属性，并不是组件见注入哈
- **初始化`state`，响应式入口**，处理组件：props、methos、data、computed、watch
- 初始化 provide，返回函数结果或者直接返回
- 调用`$mount`（如果有`$el`属性才会去自动调用`$mount`，这也是我们写过$el属性不需要写$mount 的原因）

## 源码

```js
Vue.prototype._init = function (options?: Object) {
    // 合并选项
    if (options && options._isComponent) {
      // 优化非根组件，将配置项配置到组件选项(vm.$options)中，避免异步枚举
      initInternalComponent(vm, options);
    } else {
      // 根组件走这里：进行选项合并，将全局配置项合并到根组件的局部配置上
      // 发生选项合并的地方有三个
      //  1、Vue.component(ComName, Com)，全局注册组件时（内置、自定义），合并全局配置项到注册的组件上
      //  2、{ components: { xx } } 组件内注册其它局部组件时，也会把全局配置项到注册的组件上
      //  3、这里的根组件也做了配置项合并
      // 实际上就是说，所有注册过的组件都会进行配置项合并
      vm.$options = mergeOptions(
        // 加载构造函数的选项：Vue
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    // 代理vm，不同环境代理方式不同
    initProxy(vm);	// 当前开发环境，生产环境代理方式：vm._renderProxy = vm;
    vm._self = vm;
    initLifecycle(vm);// 组件关系属性的初始化，.e.g : $parent、$root、$children
    initEvents(vm);// 初始化事件处理
    initRender(vm);// 初始化插槽、渲染函数
    callHook(vm, "beforeCreate");// 执行声明周期函数：beforeCreate
    initInjections(vm); // 初始化inject选项，递归从上级组件中主动寻找provide选项，得到{key：val}
    initState(vm);// !响应式原理的核心，处理props、methods、data、computed、watch
    initProvide(vm);// 初始化provide选项
    callHook(vm, "created");// 执行声明周期函数：created
	// 有el选项自动执行$mount挂载，后面就是执行挂载阶段
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
```
