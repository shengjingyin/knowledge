## 向上取整十\整百\整千

首位字符向上取整 `Math.ceil(number)`， 0 的个数 取决于 **bite** 值，最后的单位 `Math.pow(10, bite)`

```js
const ceilNumber = (number) => {
	let bite = 0;
	if (number < 10) {
		return 10;
	}
	while (number >= 10) {
		number /= 10;
		bite += 1;
	}
	return Math.ceil(number) * Math.pow(10, bite);
};
```
