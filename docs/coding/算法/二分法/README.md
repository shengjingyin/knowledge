二分法，核心是：移动左右边界，动态计算中间值

#### [704. 二分查找](https://leetcode.cn/problems/binary-search/)

```tsx
function search(nums: number[], target: number): number {
    // 二分查找
    let l = 0, r = nums.length - 1, res = -1;

    while (l <= r && res == -1) {
        const mid  = Math.floor((r - l) / 2 ) + l
        // 中间值大于目标值，则取右边界为中间值的左侧一个
        if (nums[mid] > target) {
            r = mid - 1
        // 中间值小于目标值，则取左边界为中间值的右侧一个
        } else if (nums[mid] < target) {
            l = mid + 1
        } else {
            return res = mid
        }
    }
    return res
};
```

#### [278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version/)

```tsx
var solution = function(isBadVersion: any) {

    return function(n: number): number {
        let left =1,
            right = n;
        while(left < right) {
            const mindle = Math.floor(left + (right - left) / 2)
            if (isBadVersion(mindle)) {
                right = mindle
            } else {
                left = mindle + 1
            }
        }
        return left
    };
};
```

#### [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)

```tsx
function searchInsert(nums: number[], target: number): number {
    let index = nums.indexOf(target)
    if (index > -1) {
        return index
    }  else {
       for(let i = 0 ; i < nums.length; i++){
            if(nums[i]>target)return i;
        }
        return nums.length;
    }
};
```



#### [374. 猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)



#### [344. 反转字符串](https://leetcode.cn/problems/reverse-string/)

```tsx
function reverseString(s: string[]): void {
    let len = s.length,
        l = 0,
        r = len - 1;

    while (l < r) {
        const tmp = s[r];
        s[r] = s[l];
        s[l] = tmp;
        l++;
        r--;
    }
};
```

#### [557. 反转字符串中的单词 III](https://leetcode.cn/problems/reverse-words-in-a-string-iii/)

> 在上一题的基础上，做一层循环反转

```tsx
function reverseWords(s: string): string {
    const s_arr = s.split(' ')
    let ans = []
    for (let i = 0; i < s_arr.length; i++) {
        const str_arr = s_arr[i].split('')
        reverseString(str_arr)
        ans.push(str_arr.join(''))
    }
    return ans.join(' ')
};
```

#### [283. 移动零](https://leetcode.cn/problems/move-zeroes/)

+ 交换 0 与 非0 位置，保持非0元素顺序

  ```tsx
  function moveZeroes(nums: number[]): void {
      let len = nums.length,
          s = 0,
          f = 1;
  
      while (f < len) {
          while (nums[s] != 0 && s < len - 1) {
              s++;
          }
          if (f <= s) f = s + 1;
          while (f < len && nums[f] == 0) {
              f++;
          }
          const s_val = nums[s],
              f_val = nums[f];
          if (s_val == 0 && f_val) {
              const tmp = f_val;
              nums[f] = nums[s];
              nums[s] = tmp;
              s++;
              f++;
          }
      }
  };
  ```

  

+ 交换 0 与 非0 位置，不保持非0元素顺序

  ```tsx
  function moveZeroes(nums: number[]): void {
      let len = nums.length,
          l = 0,
          r = len - 1;
  
      while (l < r) {
          const l_val = nums[l],
              r_val = nums[r];
          if (l_val == 0 && r_val != 0) {
              const tmp = r_val;
              nums[r] = nums[l];
              nums[l] = tmp;
              l++;
              r--;
          }
          if (r_val == 0) {
              r--;
          }
          if (l_val != 0) {
              l++;
          }
      }
  }
  ```

  

