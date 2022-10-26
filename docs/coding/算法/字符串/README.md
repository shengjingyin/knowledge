#### [859. 亲密字符串](https://leetcode.cn/problems/buddy-strings/)

```tsx
function buddyStrings(s: string, goal: string): boolean {
    // 长度必须相等
    let m = s.length, n = goal.length;
    if (m != n || m == 1) return false

    let diff_count = 0, max_show_count = 0, a = [], b = []
    for(let i = 0; i < m; i++) {
        if (s[i] != goal[i]) {
            ++diff_count
            a.push(s[i])
            b.push(goal[i])
        }
        max_show_count = Math.max(max_show_count, findSymbleCount(s, s[i]))
    }
    const condition1 = diff_count === 2,
        condition2 = diff_count === 0 && max_show_count > 1;
    if (condition1 || condition2) {
        return true 
    } else {
        return false
    }
};

function findSymbleCount (str: string, key: string) {
    let i = str.indexOf(key), count = 0;

    while (i !== -1) {
        count++
        i = str.indexOf(key, i + 1)
    }
    return count
}
```

