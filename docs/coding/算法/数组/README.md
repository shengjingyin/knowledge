#### [1046. 最后一块石头的重量](https://leetcode-cn.com/problems/last-stone-weight/)

要找到最大值，最小值，并且从原数组内删除，求得差值后再添加进入原数组

#### [605. 种花问题](https://leetcode.cn/problems/can-place-flowers/)

遍历查询0的连续数量，记录每次连续的0可以种植的花数量，求和就是最大可中数量

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

#### [682. 棒球比赛](https://leetcode.cn/problems/baseball-game/)

根据规则去维护分数数组

```tsx
function calPoints(ops: string[]): number {
    let score:number[] = [];
    for (let i = 0 ; i < ops.length; i++) {
        const curSymble = ops[i], scoreLen = score.length

        switch(curSymble) {
            case '+':
                const a = score[scoreLen - 1] + score[scoreLen - 2]
                score.push(a)
                break
            case 'D':
                const b = score[scoreLen - 1] * 2
                score.push(b)
                break
            case 'C':
                score.pop()
                break
            default:
                score.push(+curSymble)
                break
        }
    }
    return score.reduce((a, b) => a + b, 0)
};
```

#### [1128. 等价多米诺骨牌对的数量](https://leetcode.cn/problems/number-of-equivalent-domino-pairs/)

+ 二元组表示 + 计数

  ```
  
  ```

  

+ 暴力

  ```tsx
  function numEquivDominoPairs(dominoes: number[][]): number {
      let i = 0, len = dominoes.length, res = 0;
      if (len < 2) return 0
      for (; i < len - 1; i++) {
          const a  = dominoes[i]
          for (let j = i + 1; j < len; j++) {
              const b = dominoes[j]
              if (isDomino(a, b)) {
                  res += 1
              }
          }
      }
      return res
  };
  
  function isDomino(a , b) {
      return a[0] === b[0] && a[1] === b[1] || a[0] === b[1] && a[1] === b[0]
  }
  ```

  
