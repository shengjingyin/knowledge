# findByKV

> 返回目标子项

```TypeScript
function findByKV(arr: any[], tag: { key: string; value: any }): any | undefined {
  const { key, value } = tag;
  const i = arr.findIndex((item) => item[key] === value);
  if (i > -1) return arr[i];
}
```

![img](https://forever9.feishu.cn/space/api/box/stream/download/asynccode/?code=MDFlMWM0NTEzYmQwMzJkZjk3NWI1MWMyMTU5OWIxYWZfODNJWXJlV1ZkRG1TZUp1ekQ1bmhXcldaaVk5VW9DQW1fVG9rZW46Ym94Y24xVFJIMXk1Y3VraFZxcFp5ZERESHVkXzE2NjEwNzUxMzc6MTY2MTA3ODczN19WNA) 

比如我要取收入这一项的 data 集合，下面的 incomeData 就是收入的数据了

```TypeScript
const incomeData = findByKV(res.datas, { key: 'name', value: '收入' });
```

