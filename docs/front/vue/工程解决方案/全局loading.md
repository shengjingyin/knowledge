```js
class Loading {
    /**
     * @param {} vm - vue实例
     */
    constructor(vm) {
        this.ctx = vm.$loading;
        this.loading = null;
        this.count = 0;
    }
    startLoading(options = {}) {
        this.loading = this.ctx({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            ...options,
        });
    }
    endLoading() {
        this.loading.close();
        this.loading = null
    }
    show(options) {
        if (this.count === 0) {
            this.startLoading(options);
        }
        this.count += 1;
    }
    hide() {
        if (this.count <= 0) return;

        this.count -= 1;

        if (this.count === 0) {
            this.endLoading();
        }
    }
}

export default Loading;
```

