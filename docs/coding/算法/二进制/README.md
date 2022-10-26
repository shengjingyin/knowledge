#### [67. 二进制求和](https://leetcode-cn.com/problems/add-binary/)

#### [696. 计数二进制子串](https://leetcode.cn/problems/count-binary-substrings/)

```tsx
function countBinarySubstrings(s: string): number {
    // 统计每个相同字符出现的频率
    const n = s.length
    let i = 0, ans = 0, last = 0
    while (i < n) {
        let count = 0, char = s.charAt(i)

        while (i < n && s.charAt(i) == char) {
            count++
            i++
        }
        // counts.push(count)
        ans += Math.min(last, count)	// 具有相同数量的连续 1 和 0：换成满足的条件就是取相邻字符中最小的那个
        last = count
    }
    return ans
};
```

