## [551. 学生出勤记录 I](https://leetcode-cn.com/problems/student-attendance-record-i/)

### 题意

> 给你一个字符串 s 表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况（缺勤、迟到、到场）。记录中只含下面三种字符：
>
> 'A'：Absent，缺勤
> 'L'：Late，迟到
> 'P'：Present，到场
> 如果学生能够 同时 满足下面两个条件，则可以获得出勤奖励：
>
> **按 总出勤 计，学生缺勤（'A'）严格 少于两天。** > **学生 不会 存在 连续 3 天或 3 天以上的迟到（'L'）记录。**
>
> 如果学生可以获得出勤奖励，返回 true ；否则，返回 false 。

### 分析

> 这道题还是比较轻松且愉快的，按照题末两个要求进行输出即可，遍历一次，判断有没有超出条件，超出返回 false，未超出返回 true

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function(s) {
    let a = 0;
    let c = 0;
    for (let i = 0; i < s.length; i++) {
        let status = s[i];
        // 这里判断 缺勤的天数，不符合就pass，直接中止循环
        if (status === "A") {
            a++;
            if (a >= 2) return false;
        }
        // 这里判断 连续迟到的天数，若连续超过3天不符合就pass，直接中止循环，否则需要重置，因为条件中断了
        if (status === "L") {
            c++;
            if (c >= 3) return false;
        } else {
            c = 0;
        }
    }
    return true;
};
```

### 复杂度分析

-   时间复杂度：O（n），n 是 s 的长度
-   空间复杂度：O（1）
