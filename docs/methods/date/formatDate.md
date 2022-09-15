# formatDate

> 对时间做格式化，时间戳转成字符串非常方便

```typescript
function formatDate(date: Date, format: string) {
	format = format.replace("yyyy", date.getFullYear() + "");

	const month = date.getMonth() + 1;
	format = format.replace("MM", month > 9 ? month + "" : "0" + month);

	const day = date.getDate();
	format = format.replace("dd", day > 9 ? day + "" : "0" + day);

	const h = date.getHours();
	format = format.replace("hh", h > 9 ? h + "" : "0" + h);

	const m = date.getMinutes();
	format = format.replace("mm", m > 9 ? m + "" : "0" + m);

	const s = date.getSeconds();
	format = format.replace("ss", s > 9 ? s + "" : "0" + s);

	return format;
}

// 测试用例
const t1 = formatDate(new Date(), "yyyy"); // '2022'
const t2 = formatDate(new Date(), "yyyy-MM"); // '2022-08'
const t3 = formatDate(new Date(), "yyyy-MM-dd"); // '2022-08-18'
const t4 = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"); // '2022-08-18 12:41:38'
```
