# ceilNum

> 向上取：整十、整百、整千。对于坐标轴的纵轴，一般业务方期望取整，可以使用。

```typescript
function ceilNum(num: number) {
	let bit = 0;
	if (num < 10) {
		return 10;
	}
	while (num >= 10) {
		num /= 10;
		bit += 1;
	}
	return Math.ceil(num) * Math.pow(10, bit);
}

// 测试用例
ceilNum(1001); // 2000
ceilNum(345); // 400
ceilNum(12); // 20
```
