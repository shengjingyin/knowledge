raf，全名：`requestAnimationFrame`，（看起来名称比较长，其实是纸老虎，合计 api 只有 2 个，设置动画和取消动画，稍后介绍取消动画 api），它会告诉浏览器——你希望执行一个动画（fn），并且要求浏览器在**下次重绘之前调用指定的回调函数**更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

## 实例

本实例运用了两个 api：`设置动画：requestAnimationFrame`、`取消动画：cancelAnimationFrame`

`requestAnimationFrame`返回一个 id（和`setInterval`类似），通过这个 id 使用`cancelAnimationFrame`可以取消这个动画设置（和`clearInterval`类似）

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Document</title>
        <style>
            #e {
                width: 100px;
                height: 100px;
                background: red;
                position: absolute;
                left: 0;
                top: 0;
                zoom: 1;
            }
        </style>
    </head>
    <body>
        <div id="e"></div>
        <script>
            var e = document.querySelector("#e");
            var dirRight = true;
            var left = 0;
            var rafId = null;
            function render() {
                if (dirRight) {
                    if (left < 100) {
                        e.setAttribute("style", `left: ${left++}px`);
                    } else {
                        dirRight = false;
                    }
                } else {
                    if (left > 0) {
                        e.setAttribute("style", `left: ${left--}px`);
                    } else {
                        dirRight = true;
                    }
                }
            }
            // setInterval(render, 1000 / 60);	// 传统js动画方式

            (function loop() {
                render();
                rafId = requestAnimationFrame(loop);
                if (left === 50) {
                    cancelAnimationFrame(rafId); // 取消动画
                }
            })();
        </script>
    </body>
</html>
```

### 时间不稳定解决办法

通过在 loop 函数前后设置时间戳，获取每次的时间戳之差，就可以得到循环之间的时间间隔

```js
var t0 = new Date().getTime(),
    t1 = null,
    diff = null;
(function loop() {
    t1 = new Date().getTime();
    diff = t1 - t0;
    console.log("🚀 ~ loop ~ diff", diff);
    to = t1;
    render();
    rafId = requestAnimationFrame(loop);
    if (left === 50) {
        cancelAnimationFrame(rafId); // 取消动画
    }
})();
```

## 特点

-   `requestAnimationFrame`会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率。

-   优化点

    -   在隐藏或不可见的元素中，`requestAnimationFrame`将不会进行重绘或回流，这当然就意味着更少的 CPU、GPU 和内存使用量。
    -   `requestAnimationFrame`是由浏览器专门为动画提供的 API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了 CPU 开销。

## 兼容性

![image-20220421095720908](D:\Project\image-host\img/image-20220421095720908.png)
