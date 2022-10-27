快慢指针就是定义两根指针，移动的速度一快一慢，以此来制造出自己想要的差值。**这个差值可以让我们找到链表上相应的节点。**

### 2.1 找中间值

一般的思路是：先遍历一次链表，记录住一共有多少个节点，然后，再次遍历找寻中点。

利用快慢指针，我们来看看这个问题会变成什么样。思路如下：**我们把一个链表看成一个跑道，假设 a 的速度是 b 的两倍，那么当 a 跑完全程后，b 刚好跑一半，以此来达到找到中间节点的目的。**

如下图，最开始，slow 与 fast 指针都指向链表第一个节点，然后 slow 每次移动一个指针，fast 每次移动两个指针。

<!-- ![image-20220510085007283](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220510085007283.png)  -->

### 2.2 判断链表中的环

还是把链表比作一条跑道，链表中有环，那么这条跑道就是一条圆环跑道，在一条圆环跑道中，两个人有速度差，那么迟早两个人会相遇，只要相遇那么就说明有环。

为了不失一般性，我们在环上加了额外的两个节点，我们可以想象一下，只要两个指针跑进了环里，那么因为存在速度差，他们之间的距离总会由远及近，然后相遇，在远离。像极了我们人世间某些人在你生命中匆匆而过的感觉。

<!-- ![image-20220510085219553](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220510085219553.png)  -->

> 快慢指针中，因为每一次移动后，快指针都会比慢指针多走一个节点，所以他们之间在进入环状链表后，不论相隔多少个节点，慢指针总会被快指针赶上并且重合，此时就可以判断必定有环。

#### [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

```tsx
function hasCycle(head: ListNode | null): boolean {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast == slow) {
      return true;
    }
  }
  return false;
}
```

### 2.3 删除倒数第 n 个节点

删除倒数第 n 个节点，那就等于是要我们先找出待删除元素前一个元素，也就是第 n-1 个节点。聪明的你肯定发现了，我们又把这个问题转化为找链表上的某个节点的问题了，这是快慢指针最擅长的场景。

那如何找第(n-1)个元素呢？我们一开始就让 fast 指针比 slow 指针快 n+1 个元素，接下来，两个指针都是一步一步来往下走。那么当 fast 指针走完时，slow 指针就刚刚好停留在第(n-1)个元素上。

以下图解了 n=2 时的情形（其中 dummyHead 是我们手动加上去的虚拟头节点）：

<!-- ![image-20220510085623061](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220510085623061.png) -->
