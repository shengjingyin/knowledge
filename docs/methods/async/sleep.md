# sleep

> 睡眠，通常没有接口的时候想要模拟异步的过程可以使用，比 setTimeout 方便

```typescript
const sleep = (time: number) =>
	new Promise((resolve) => setTimeout(resolve, time));

// 异步函数体内调用
async function func() {
	// 暂停200ms后执行
	await sleep(200);
}
```
