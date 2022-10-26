### 1、watcher

watcher 选项居然可以以数组的形式申明，触发顺序？

```js
watch: {
	msg: [
		function () {
			console.log("111", 111);
		},
		function () {
			console.log("2222", 2222);
		},
	];
}
```
