## 作用

## 应用场景

## 原理

在渲染列表 删除 或者 新增 元素 都会触发 `updateChildren` （也就是 diff）中，通过 diff 可以找到是要在哪个位置删除或者添加元素，通过四组对比：

- 老开、新开
- 老结束、新结束
- 老开、新结束
- 老结束、新开

通过这四个对比，如果找到相似 VNode，那么进行 `patchVnode`；

如果没找到那么遍历老节点列表（会保存下来遍历结果），看看是否有当前节点，没有则创建新元素，有的话说明是要删除元素

判断是否是相似 VNode（key 的作用），相似 VNode 的 key 必须要相同

key 的作用就是判断是否是相似节点，有唯一 key 那么判断相似节点就有唯一性；如果没有 key 那么只能依据 VNode 的特征去判断，有可能不正确，所以会出现未正确渲染的情况

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  );
}
```

```js
// Diff 原理
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0; // 旧节点，第一个下标
  let oldEndIdx = oldCh.length - 1; // 旧节点，最后一个下标
  let oldStartVnode = oldCh[0]; // 旧，第一个节点
  let oldEndVnode = oldCh[oldEndIdx]; // 旧，最后一个节点

  let newStartIdx = 0; // 新节点，第一个下标
  let newEndIdx = newCh.length - 1; // 新节点，最后一个下标
  let newStartVnode = newCh[0]; // 新，第一个节点
  let newEndVnode = newCh[newEndIdx]; // 新，最后一个节点

  let oldKeyToIdx, // 旧节点key，对应下标的对象集合
    idxInOld, // 新节点在旧节点列表中的下标
    vnodeToMove, // 需要被移动的VNode
    refElm; // 参考节点

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  const canMove = !removeOnly;

  if (process.env.NODE_ENV !== 'production') {
    checkDuplicateKeys(newCh); // 检查新节点的key是否重复
  }
  // 当 老 开始下标 <= 老 结束下标 && 新 开始下标 <= 新 结束下标 时，进行比对
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 跳过因为元素位移留下的undefined，在下面会有对应的移位操作
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    }
    // 如果 老开始节点 类似 新开始节点
    else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 递归调用
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
      // 老开、新开 往后移一位
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    }
    // 如果 老结束节点 类似 新结束节点
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 递归调用
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
      // 老结束、新结束 往前移一位
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    }
    // 如果 老开始节点 类似 新结束节点
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      // 递归调用
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
      // 旧第一个节点，右移动到 当前父节点的 最后面位置，视图立即呈现
      canMove &&
        nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
      // 老开往后移一位、新结束往前移一位
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    }
    // 如果 老结束节点 类似 新开始节点
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      // 递归调用
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
      // 旧最后一个节点，左移动到 当前父节点的 最前面的位置，视图立即呈现
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // 老结束往前移一位、新开始往后移一位
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    }
    // 如果 上面四种都没匹配上，那么需要遍历一遍才能知道
    else {
      // 创建一个老节点中 key与oldCh下标的 对应关系 对象 {key: 下标}
      if (isUndef(oldKeyToIdx)) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }

      // 寻找新开节点在老节点中的位置
      // 如果命中对应关系 oldKeyToIdx[key]，直接取回对应老节点的下标，O(1) 复杂度
      // 如果没命中，需要遍历老节点列表，找索引，O(n) 复杂度
      /* 
          老
          新：start {key: 3}
        */
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

      // 如果没有对应老节点的下标，则是新建元素
      if (isUndef(idxInOld)) {
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
      } else {
        // 存在下标，
        vnodeToMove = oldCh[idxInOld];
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 一般走这里，对比老、新节点
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldCh[idxInOld] = undefined;
          // 因为这里找出来的是新节点对应开始索引的位置，老节点在中间部位，这时移动节点
          // 就需要把老节点移动到当前老开始节点的前面（有可能前面有元素）
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
        } else {
          // same key but different element. treat as new element
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      // 因为老节点对应列表已经被置为false了，所以不需要重置老节点索引
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 如果老开始索引 > 老结束索引，说明有元素新增
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
  }
  // 如果新开始索引 > 新结束索引，说明有元素被删除
  else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```

#### 不使用 key

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

#### 使用 key

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```vue
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```

**建议尽可能在使用 `v-for` 时提供 `key` attribute**，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 Vue 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联，`key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

#### 应用场景

- 完整地触发组件的生命周期钩子
- 触发过渡

例如：

```
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```

当 `text` 发生改变时，`<span>` 总是会被替换而不是被修改，因此会触发过渡。
