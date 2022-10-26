#### [825. 适龄的朋友](https://leetcode-cn.com/problems/friends-of-appropriate-ages/)

题解一（循环暴力）

```typescript
function numFriendRequests(ages: number[]): number {
    if (ages.length < 2) return 0;
    let res: number = 0;

    for (let i = 0; i < ages.length - 1; i++) {
        for (let j = i + 1; j < ages.length; j++) {
            const pass = (x, y) => {
                return ages[x] <= 0.5 * ages[y] + 7 || ages[x] > ages[y] || (ages[x] > 100 && ages[y] < 100);
            };
            if (!pass(i, j)) res++;
            if (!pass(j, i)) res++;
        }
    }
    return res;
}
```

题解二（双指针）

```js
var numFriendRequests = function(ages) {
    const n = ages.length;
    ages.sort((a, b) => a - b);
    let left = 0,
        right = 0,
        ans = 0;
    for (const age of ages) {
        if (age < 15) {
            continue;
        }
        while (ages[left] <= 0.5 * age + 7) {
            ++left;
        }
        while (right + 1 < n && ages[right + 1] <= age) {
            ++right;
        }
        ans += right - left;
    }
    return ans;
};
```

#### [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null

    let pa = headA, pb = headB
    // 长度 pa = pb 时，一遍走完如果相交，则可以直接退出 
    // 长度 pa != pb 时，那么 pa + pb = pb + pa 的，这时候如果有交点也可以找到，没交点时，最后都是null，退出循环
    while (pa !== pb) {
        pa = pa === null ? headB : pa.next
        pb = pb === null ? headA : pb.next
    }
    return pa
};
```

#### [125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)

```tsx
function isPalindrome(s: string): boolean {
    // 字符串整理：转小写，去除非英文字母、数字
    // 双指针遍历，左右同时开始
    let str = s.toLowerCase().replace(/[^a-z|\d]/g, ''),
        l = 0, r = str.length - 1, res = true;
    while (l < r) {
        let isqual = str.charAt(l) === str.charAt(r)
        if(isqual) {
            l++
            r--
        } else {
            return false
        }
    }
    return res
};
```

#### [693. 交替位二进制数](https://leetcode.cn/problems/binary-number-with-alternating-bits/)

```tsx
function hasAlternatingBits(n: number): boolean {
    const bit = n.toString(2)
    let f, s, initF, initS, l = bit.length, res = true;
    if (l == 1) return true 
    f = 0, s = 1, initF = bit[f], initS = bit[s]    // 双指针

    if (initF == initS) return res = false
    while ((bit[f] || bit[s] ) && res) {
        if (bit[f] != initF || (bit[s] !== undefined && bit[s] != initS)) return res = false
        f += 2
        s += 2
    }
    return res
};
```

#### [697. 数组的度](https://leetcode.cn/problems/degree-of-an-array/)

```tsx
function findShortestSubArray(nums: number[]): number {
    // 统计所有
    const m = new Map()
    for(let i = 0 ; i < nums.length; i++) {
        const count = !m.has(nums[i]) ? 1 : m.get(nums[i]) + 1
        m.set(nums[i], count)
    }
    // 寻找最大度的key，可能存在多个同度的结果
    let maxKey = [], maxVal = 0;

    for (let [key, val] of m) {
        if (val > maxVal) {
            maxVal = val
            maxKey = []
            maxKey.push(key)
        } else if (val == maxVal) {
            maxKey.push(key)
        }
    }
    if (maxVal === 1) return 1
    // 寻找最短子数组
    const findShortComp = (key) => {
        let startIndex: number , endInex : number 
        for (let j = 0, k = nums.length -1; j < nums.length && k >= 0; j++, k--) {

            if (nums[j] === key && startIndex == undefined) {
                startIndex = j
            }
            if (nums[k] === key && endInex == undefined) {
                endInex = k
            }
            if (startIndex && endInex) {
                break
            }
        }
        return endInex - startIndex + 1
    }

    const short = []
    for (let m = 0; m < maxKey.length; m++) {
        short.push(findShortComp(maxKey[m]))
    }
    return Math.min(...short)
};
```

#### [面试题 01.05. 一次编辑](https://leetcode.cn/problems/one-away-lcci/)

```tsx
function oneEditAway(first: string, second: string): boolean {
    // 长度差 <=1
    const firstLen = first.length, secondLen = second.length;
    if (Math.abs(firstLen - secondLen) > 1) return false

    for (let i = 0, j = 0, used = false; i < firstLen && j < secondLen;) {
        if (first[i] === second[j]) {
            i++
            j++
        } else if (used) {
            // ！第二次值不等时，说明出现过两次了，返回false
            return false
        } else {
            // 值不等时，判断两个字符串的长短，然后，长的+1，并且标记已经有过一次值不等
            [i, j] = firstLen > secondLen ? [++i, j] : firstLen < secondLen ? [i, ++j] : [++i, ++j]
            used = true
        }
    }
    return true
};
```

#### [977. 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)

```tsx
// 方法一：迭代
// function sortedSquares(nums: number[]): number[] {
//     for (let i = 0; i < nums.length; i++) {
//         nums[i] = Math.pow(nums[i], 2)
//     }
//     return  nums.sort((a, b )=> a- b)
// };
// 方法二：双指针
function sortedSquares(nums: number[]): number[] {
    // 一：因为是升序的，找到负数与正数的邻界点 borderIndex ，
    // 【0，borderIndex】为负数（平方后倒序），【borderIndex + 1，nums.length - 1】为正数（平方后正序）
    let borderIndex = -1
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            borderIndex = i
        } else {
            break
        }
    }
    let i = borderIndex , j = borderIndex + 1, ans = [], index = 0;
    while (i >= 0 || j < nums.length) {
        // 纯正数集合（顺序）
        if (i < 0) {
            ans[index] = Math.pow(nums[j], 2)
            j++
        } else if (j == nums.length) {
        // 纯负数集合（倒序）
            ans[index] = Math.pow(nums[i], 2);
            i--
        } else if (nums[i] * nums[i] < nums[j] * nums[j]) {
            // 有正有负, 负数绝对值更小一些
            ans[index] = nums[i] * nums[i];
            i--
        } else {
            // 有正有负, 负数绝对值更大一些
            ans[index] = nums[j] * nums[j];
            j++
        }

        index++
    }
    return ans
};
```

