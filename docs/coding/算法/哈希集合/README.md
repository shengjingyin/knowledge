#### [705. 设计哈希集合](https://leetcode.cn/problems/design-hashset/)

```tsx
class MyHashSet {
    mySet: number [] = []

    add(key: number): void {
        const existKey = this.contains(key)
        if (!existKey) {
            this.mySet.push(key)
        }
    }

    remove(key: number): void {
        const index = this.mySet.findIndex(item => item == key)
        if (index > -1) {
            this.mySet.splice(index, 1)
        }
    }

    contains(key: number): boolean {
        return this.mySet.findIndex(item => item == key) > -1
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
```

#### [202. 快乐数](https://leetcode.cn/problems/happy-number/)

```tsx
function isHappy(n: number): boolean {
    let numSet = new Set();

    const getNext = (n : number) => {
        let ans: number = 0
        const str = n + ''
        for (let i = 0; i < str.length; i++) {
            ans += Math.pow(+str[i], 2)
        }
        return ans
    }
    while (n != -1 && !numSet.has(n)) {
        numSet.add(n)
        n = getNext(n)
    }
    return n === 1
};
```

#### [219. 存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii/)

```tsx
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    // 维护一个字典，存储已经出现过的数字及下标，维护时，查询是否已存入，若存入计算最小距离
    const numMap = new Map()
    let min_near = Infinity
    for (let i = 0; i < nums.length; i++) {
        if (numMap.has(nums[i])) {
            const pre_index = numMap.get(nums[i]), diffI = i - pre_index;
            if (diffI < min_near) min_near = diffI
        }
        numMap.set(nums[i], i)
    }
    return min_near <= k
};
```

