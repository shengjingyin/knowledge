## [541. 反转字符串 II](https://leetcode-cn.com/problems/reverse-string-ii/)

### 题意

> 给定一个字符串 s 和一个整数 k，从字符串开头算起，每 2k 个字符反转前 k 个字符。
>
> 如果剩余字符少于 k 个，则将剩余字符全部反转。
> 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。

示例 1：

```
输入：s = "abcdefg", k = 2
输出："bacdfeg"
```

示例 2：

```
输入：s = "abcd", k = 2
输出："bacd"
```

### 分析

-   根据题意，分为两步处理即可，分为完整截取的部分和不完整截取的部分；
-   首先第一部分是：`Math.ceil(sLen / spliceLen) - 1` 部分，因为能整除，按照题意进行`每 2k 个字符反转前 k 个字符`；
-   第二部分就是最后一次截取的字符串，剩余最后一次字符串处理时也需要分两种：

    -   大于等于 k 的这种和完整截取的部分所作的处理完全一样，可以归并处理；
    -   小于 k 的这种进行反转就行

-   返回拼接好的字符串即为答案。
-   具体看代码注释，每一步都有对应的注释

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    let spliceLen = 2 * k; // 需要等份切割得长度
    let str = ""; // 返回值
    let sLen = s.length;
    let spliceNum = Math.ceil(sLen / spliceLen); // 最多需要循环得次数，输入s长度为5，k为2，只需要循环2次
    for (let i = 0; i < spliceNum; i++) {
        let waitStr = s.substr(i * spliceLen, spliceLen); // 每次循环等待处理的片段
        if (i < spliceNum - 1 || waitStr.length >= k) {
            // 这里是完整的切割 或者 剩余字符长度大于等于k的切割处理
            // 完整切割：就是整除的前一次， 5 / 4 > 向上取整为：2 所以第一次是完整的；第二次长度为1，进行方式二处理，假设是 7 / 4，那么第二次也是进行方式一处理
            let left = waitStr.substr(0, k);
            let right = waitStr.substr(k);
            str += left
                .split("")
                .reverse()
                .join("");
            str += right;
        } else {
            // 小于k的直接按题意，全部反转即可
            str += waitStr
                .split("")
                .reverse()
                .join("");
        }
    }
    return str;
};
```

### 复杂度分析

-   时间复杂度：O（n），n 是`Math.ceil(sLen / spliceLen)`的长度
-   空间复杂度：不知道啊，知道的方便告知我下么？
