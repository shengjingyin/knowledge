#### [706. 设计哈希映射](https://leetcode.cn/problems/design-hashmap/)

```tsx
class MyHashMap {
    myMap = {}

    put(key: number, value: number): void {
        this.myMap[key] = value
    }

    get(key: number): number {
        if (this.myMap.hasOwnProperty(key)) {
            return this.myMap[key]
        } else  {
            return -1
        }
    }

    remove(key: number): void {
        const hasKey = this.get(key)
        if (hasKey > -1) {
            delete this.myMap[key]
        }
    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
```

