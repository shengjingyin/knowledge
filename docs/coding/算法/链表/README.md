#### [83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)

```tsx
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

function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head) return null

    let cur = head;
    while (cur.next) {
        // 如果当前值与下一个值相等，直接跳过下一个，链接当前next为下一个next['next']，
        // 总的来说：就是控制链表的next指向
        if (cur.val === cur.next?.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
};
```

