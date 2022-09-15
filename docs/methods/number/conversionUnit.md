# conversionUnit

> 将数值转成对应的单位，对于大数据的展示比较友好，一般会对 echart 数据做这种转换。

```typescript
function conversionUnit(num: number, fixed = 1) {
	const unit = ["万", "亿"],
		origin = num;
	let bit = -1;
	if (num < 10000)
		return {
			val: `${num}`,
			unit: "",
			merge: num.toFixed(fixed),
			origin,
			multiple: 1,
		};
	while (num >= 10000) {
		num /= 10000;
		bit += 1;
	}
	return {
		val: num.toFixed(fixed),
		unit: unit[bit],
		merge: `${num.toFixed(fixed)}${unit[bit]}`,
		origin,
		multiple: Math.pow(10, (bit + 1) * 4),
	};
}

// 测试用例
conversionUnit(1231313);
// {val: '123.1', unit: '万', merge: '123.1万', origin: 1231313, multiple: 10000}
conversionUnit(12313132312);
// {val: '123.1', unit: '亿', merge: '123.1亿', origin: 12313132312, multiple: 100000000}
```
