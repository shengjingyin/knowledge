## 二叉平衡树

可以看出当节点数目一定，保持树的左右两端保持平衡，树的查找效率最高。**这种左右子树的高度相差不超过 1 的树为平衡二叉树。**

## 对称二叉树

检查它是否轴对称。

<!-- ![image-20220511140447316](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220511140447316.png)  -->

## 练习题

### 深度优先搜索

#### [257. 二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

#### [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

#### [100. 相同的树](https://leetcode-cn.com/problems/same-tree/)

#### [965. 单值二叉树](https://leetcode-cn.com/problems/univalued-binary-tree/)

### 前序遍历

#### [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

根 -> 左 -> 右

```tsx
function preorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  preTraverse(root, res);
  return res;
}

function preTraverse(root: TreeNode, res: number[]) {
  if (root) {
    res.push(root.val);
    preTraverse(root.left, res);
    preTraverse(root.right, res);
  }
}
```

### 后续遍历

左 -> 右 -> 根

```tsx
function postorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  postTraverse(root, res);
  return res;
}

function postTraverse(root: TreeNode, res: number[]) {
  if (root) {
    postTraverse(root.left, res);
    postTraverse(root.right, res);
    res.push(root.val);
  }
}
```

#### [110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)

- 自上而下查询高度

  ```tsx
  function isBalanced(root: TreeNode | null): boolean {
    if (!root) {
      return true;
    } else {
      return (
        Math.abs(height(root.left) - height(root.right)) <= 1 &&
        isBalanced(root.left) &&
        isBalanced(root.right)
      );
    }
  }
  // 计算树的高度
  function height(root: TreeNode | null): number {
    if (!root) {
      return 0;
    } else {
      const hl = height(root.left),
        hr = height(root.right);
      return Math.max(hl, hr) + 1;
    }
  }
  ```

- 自下而上查询高度

  ```

  ```

#### [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

#### [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

```tsx
function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;

  let min_depth = Infinity;

  if (root.left) {
    min_depth = Math.min(minDepth(root.left), min_depth);
  }

  if (root.right) {
    min_depth = Math.min(minDepth(root.right), min_depth);
  }

  return min_depth + 1;
}
```
