#### [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

```tsx
function lengthOfLongestSubstring(s: string): number {
    // 存储一个集合，两个指针，左指针固定，右指针右移，
    // 如果之前没遇到，添加进集合，遇到了则停止右移，结算当前长度，与当前结果比较，保存较大值
    const tmp = new Set(), len = s.length;
    let ans = 0, r = -1;

    for (let i = 0; i < len; i++) {
        if (i !== 0) {
            tmp.delete(s.charAt(i - 1)) // 删除前一个
        }

        while (r + 1 < len && !tmp.has(s[r + 1])) {
            tmp.add(s.charAt(r + 1))
            ++r
        }

        ans = Math.max(ans, r - i + 1)
    }
    return ans
};
```

