## 初识 flex

### 案例一

- ：三行代码简单实现下子元素垂直、水平居中

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20210727232159208.png" style="zoom:50%;" />

  ```html
  .father { // 三行水平垂直居中 display: flex; align-items: center; justify-content: center; width:
  300px; height: 300px; background-color: pink; // pink老师，yyds！！！ }

  <div class="father">
    <span class="“son”">我是子元素</span>
  </div>
  ```

### 案例二

- ：上下 固定高度，中间自适应

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20210728205120614.png" style="zoom:50%;" />

  ```html
  * { margin: 0; padding: 0; } body { display: flex; flex-direction: column; width: 100vw;
  min-height: 100vh; background-color: pink; } // 三种写法在当前的情况下一样的效果，其实发生作用的是
  flex-grow 属性 main { /* flex: 1; */ /* flex: auto; */ flex-grow: 1; } footer, header {
  background-color: skyblue; height: 50px; }

  <body>
    <header>header</header>
    <main>main</main>
    <footer>footer</footer>
  </body>
  ```

### 案例三

- ：左边侧边栏，右边上下 固定高度，中间自适应

  ```html
  * { margin: 0; padding: 0; } body { display: flex; flex-direction: column; width: 100vw;
  min-height: 100vh; background-color: pink; } // 三种写法在当前的情况下一样的效果，其实发生作用的是
  flex-grow 属性 main { /* flex: 1; */ /* flex: auto; */ flex-grow: 1; } footer, header {
  background-color: skyblue; height: 50px; } ----------------新增样式----------------------- aside {
  width: 100px; height: 100vh; background-color: greenyellow; flex: none; overflow-y: auto; } li {
  height: 200px; } .main-container { flex: 1; display: flex; flex-direction: column; }
  ----------------------------------------------
  <body>
    <aside>
      <ul>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
      </ul>
    </aside>
    <div class="main-container">
      <header>header</header>
      <main>main</main>
      <footer>footer</footer>
    </div>
  </body>
  ```

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20210728210813837.png" style="zoom: 50%;" />

## 定义

先说说 flex 定义、简单来说 flex 包含**两部分**，一部分是**容器（父容器）**、另一部分是**项目（子项）**，就像下面的结构一样，那明白了么？就是一个容器包含了几个子项目，这两部分可以通过 flex 的一些属性进行**控制项目（子项）的位置**、**对齐方式**、**响应式的变化方式**

```html
<div class="father" style="display: flex">
  <span class="“son”">我是子元素</span>
  ......
  <span class="“son”">我是子元素</span>
</div>
```

有了[如上]()的简单展示，那么开始学习一下 flex 的具体属性值，其实并不复杂，只要多用即可掌握，记住**容器（父元素）6 个属性**、**项目（子项）6 个属性值**，都是 6 个，66 大顺，很好记对吧。

### 容器（父元素）

- **flex-direction** （主轴方向）
- flex-wrap （子元素超出是否换行）
- flex-flow （上面两个属性的综合体，可以只写这个，代替上面两个，就像字体的 font 属性一样）
- **justify-content** （定义子项在**主轴上的对齐方式**）
- **align-items** （定义子项在**交叉轴上的对齐方式**）
- align-content （定义**多根**轴线时的**轴线对齐方式**，只有一根轴线时，设置无效）

以上 6 个属性，一般常用的我加粗了，其他的少用

### 项目（子元素）

- order （定义子元素的排序，**数值越小越靠前**）
- flex-grow （定义子元素在容器**还有剩余空间时**的放大比例，默认为 0，即不放大）
- flex-shrink（与 grow 相反，定义子元素在容器**没有剩余空间时**的缩小比例，默认为 1，即所有子元素缩小一样）
- flex-basis （定义子项在**主轴上的对齐方式**）
- **flex** （定义子项在**交叉轴上的对齐方式**）
- align-self （允许当前项设置 **align-items** 并覆盖父元素的设置 ）

### 两条轴

这两条轴划定了 flex 布局总的方向，有了大方向才能指引孩子们的排列方式对不对？主轴（main-axis） and 交叉轴（cross-axis）

#### main-axis

其实简单讲：flex-direction 定义的方向就是主轴方向！默认 row

#### cross-axis

交叉轴方向与主轴方向垂直！

## 容器（父元素）

#### \* flex-direction

> 指定子项元素是如何在 flex 容器中布局的，通俗的讲是规定**子元素 横向排列** 还是 **纵向排列**，默认值（row），这里定义的就是主轴方向（横向 or 纵向，如下图所示）

首先方向有两个 横向或者纵向，其次还配有取反操作，所以共有**四个属性值**

```css
flex-direction: column-reverse | column | row(默认值) | row-reverse;
```

![](https://gitee.com/sjy666666/image-host/raw/master/img/bg2015071005.png)

#### flex-wrap

> 可以让子元素**在必要时换行**，默认值（no-wrap），这里必要时是指子元素太多了，**父元素的宽度不够**，子元素应不应该换行

```css
flex-wrap: 'nowrap' (默认值) | 'wrap' | 'wrap-reverse';
```

#### flex-flow

> 没有特殊的功能，仅仅提供 `flex-direction` + `flex-wrap` 的简写形式

```css
flex-flow: < 'flex-direction' > < 'flex-wrap' >;
```

#### \* justify-content

> 定义主轴方向如何对齐，<u>这个属性和`flex-direction`的属性值有很大关系</u>！

```css
justify-content: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'initial'
  | 'inherit';
```

- flex-start，子元素左对齐（向左贴合靠拢），子元素之间是没有空隙的；

- flex-end，子元素右对齐（都向右贴合靠拢了）；

- **center**，项目在父元素中居中；

- **space-between**，两边子元素两端对齐，其余的子元素均分剩余宽度（这个是指父元素宽度减去所有子元素宽度之和后的多余宽度，将有中间的子元素去均分它，比如当前中间有一个子元素，那么剩余宽度将一分为二，围绕在中间子元素两边，依次类推，中间有两个子元素时，剩余空间将分成三等分）；

- **space-around**，剩余分配空间比例如图上所示 ！道理和上面的 space-between 一样；

- **space-evenly**，剩余分配空间比例如图上所示 ！道理和上面的 space-between 一样；

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/justify.png" style="zoom: 50%;" />

  justify-content 小结：主要定义子项在主轴上如何排列，常用属性一加粗，当然这个属性的值并不是只有列举出来的 6 个，更多请看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)

#### \* align-items

> 定义子项在交叉轴（侧轴）上如何对齐，我常用的有`center`、`flex-end`、`flex-start`，最好你能去[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)上看看它提供的实例，以便于自己的理解。

```css
align-items: 'flex-start' | 'center' | 'flex-end';
```

- flex-start，子项垂直方向（别称：侧轴、交叉轴）顶部对齐

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20210802210059356.png" style="zoom:33%;" />

- center，子项垂直方向（别称：侧轴、交叉轴）居中

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20210802210241137.png" style="zoom: 33%;" />

- flex-end，子项垂直方向（别称：侧轴、交叉轴）底部对齐

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20210802210339755.png" style="zoom:33%;" />

#### align-content

> **定义多条轴线时，轴线之间该如何排列**，属性值和 justify-content 差不多，我常用的有`center`、`end`、`start`，最好你能去[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content)上看看它提供的实例，以便于自己的理解，我这里就不赘述了。

注意点：单根轴线时，你设置什么值都无效！！

```css
align-content: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' |
  'space-evenly';
```

## 项目（子元素）

> flex 布局可对每个项目自行定义具体的属性，主要是关于**剩余空间多余、缺少时**，子元素该如何去应对

#### \* flex-grow

> 当剩余空间**多余**时，子元素的扩张规则，默认值为：0，即有剩余空间也不扩张（如果想做自适应撑开的布局，基本要设置这个属性值）

意思就是比如三个子元素，**每个设置为 1**，那么三个**子元素均分**，有一个设置的为 2，那么它瓜分剩余空间的权重就多一点！，下图所示的数字代表`flex-grow`属性值

![](https://gitee.com/sjy666666/image-host/raw/master/img/flex-grow.png)

#### \* flex-shrink

这个正好和上面的 grow 相反

> 当剩余空间**不足**时，子元素的收缩规则，默认值为：1，即大家（子元素们 ）都等比例缩放（如果想做**定宽**的，那么设置为 0 是个很好的选择）

#### flex-basis

> 用于设置或检索弹性盒伸缩**基准值**，这时候子项设置的`width`会失效，

```css
flex-basis: 'number(一个长度单位或者一个百分比)' | 'auto';
```

注意点：

- 当属性值是**百分比**时，是<u>以父容器的宽度作为百分比参考点</u>；
- 当属性值是**auto**时，就以当前子项的宽度为基准值，比如设置了`width：200px`，那么基准值就是这个

#### \* flex

> 这个也是简写，扩张、收缩、基础

```css
flex: < 'flex-grow' > < 'flex-shrink' > < 'flex-basis' >;
```

- 简写，有几个简写需要记住下，如下表：

  | 简写         | 含义              | 白话文           |
  | ------------ | ----------------- | ---------------- |
  | `flex: 1`    | flex: 1, 1, 0%;   | 自适应收缩、扩张 |
  | `flex: auto` | flex: 1, 1, auto; | 自适应收缩、扩张 |
  | `flex: none` | flex: 0, 0, auto; | 不收缩也不扩张   |

- flex 值解释

  - 当值为一个非负数字时，
  - 当值为一个长度或者百分比时
  - 当值为两个非负数字时
  - 当值为一个非负数字和一个长度或者百分比时

#### \* order

> 定义子元素的排列顺序，数值越小越靠前，<u>可以是负数</u>，默认值为 0

正常情况下，就是按照你`dom`结构进行排序，突发情况就是你想让中间的排列靠前，又不想调动`dom`结构位置，此时这个属性就产生作用，如下图所示，left 本应该是在最左边，但是给了一个 order 属性为 1，怎么可以把它安排到末尾位置

<img src="https://gitee.com/sjy666666/image-host/raw/master/img/order.png" style="zoom: 50%;" />

#### align-self

> 允许重新定义该子项的`align-items`的属性值

父元素只能统一定义每个子元素的**交叉轴对齐方式**，但是也允许下面的子元素有权利去覆盖父元素设置的**交叉轴对齐方式**，相当于就是样式覆盖了，我们平常也经常也到 css 样式被覆盖的问题，就是权重影响的，可以类似的也这么理解，子元素的`align-self`比父元素的`align-items`权重高
