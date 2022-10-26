#### [171. Excel 表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

```
列数的结果是
26 ^ (n - 1) * code值 + 26 ^ (n - 2) * code值 + ... + code值
```

#### [66. 加一](https://leetcode.cn/problems/plus-one/)

缝9进1

```tsx
function plusOne(digits: number[]): number[] {
    // 有进位问题，缝9进1
    digits.reverse()
    let n = digits.length, count = 1;
    for (let i = 0; i < n; i++) {
        digits[i] += count;
        // 因为只需要在末尾处+1，结果就是如果加完之后不等于10，就不有缝9进1的关系，可以直接退出，
        // 如果为10，需要考虑缝10进1，并且当前位置元素置为0
        // 最后就是如果是最后一个元素为10的话，需要额外添加一个元素1，如：99 -> 100
        if (digits[i] !== 10) {
            break
        } else {
            digits[i] = 0;
            if (i + 1 === n) {
                digits[n] = 1
            }
        }
    }
    return digits.reverse()
};
```

#### [118. 杨辉三角](https://leetcode.cn/problems/pascals-triangle/)

```tsx
// 根据题意，找到规律，
// 每一行得两端都是1
// 中间某个数值 = 上一行的前一个值 + 上一行的当前值
function generate(numRows: number): number[][] {
    const res = []

    for (let i = 0; i < numRows; i++) {
        // 初始化行
        const row = new Array(i + 1).fill(1);

        for (let j = 1; j < row.length - 1; j++) {
            // 定义值
            row[j] = res[i -1][j - 1] + res[i - 1][j]
        }

        res.push(row)
    }
    
    return res
};
```

