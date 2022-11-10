-   申明保存配置项的同时，申明当前作用域内的局部变量（opts 与 vm.$options 指向相同），方便后面的调用。

    ```js
    const opts = (vm.$options = Object.create(vm.constructor.options));
    ```

-   快速将 this.props 转移到 this.上

    ```tsx
    export function proxy(target: Object, sourceKey: string, key: string) {
    	sharedPropertyDefinition.get = function proxyGetter() {
    		return this[sourceKey][key];
    	};
    	sharedPropertyDefinition.set = function proxySetter(val) {
    		this[sourceKey][key] = val;
    	};
    	// 代理属性
    	Object.defineProperty(target, key, sharedPropertyDefinition);
    }
    ```

-   高级函数返回函数时，写上名字

    ```js
    function createComputedGetter(key) {
    	return function computedGetter() {};
    }
    ```

-   返回值

    ```js
    return (cache[key] = res); // 返回的实际是 res : cache[key]
    ```

-   正则变量

    ```tsx
    const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
    const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 正则变量
    ```

-   调试源代码，可以看**调用堆栈**，方便寻找调用顺序
