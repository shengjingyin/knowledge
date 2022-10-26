oo（object oriented）编程

起步

### 1.1.2. b）什么是Node.js？

按照 [Node.js官方网站主页](https://nodejs.org/en/) 的说法:

```
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
```

从这段介绍来看，解读要点如下

- Node.js 不是 JavaScript 应用，不是语言（JavaScript 是语言），不是像 Rails(Ruby)、 Laravel(PHP) 或 Django(Python) 一样的框架，也不是像 Nginx 一样的 Web 服务器。Node.js 是 JavaScript 运行时环境
- 构建在 Chrome's V8 这个著名的 JavaScript 引擎之上，Chrome V8 引擎以 C/C++ 为主，相当于使用JavaScript 写法，转成 C/C++ 调用，大大的降低了学习成本
- 事件驱动（event-driven），非阻塞 I/O 模型（non-blocking I/O model），简单点讲就是每个函数都是异步的，最后由 **Libuv** 这个 C/C++ 编写的事件循环处理库来处理这些 I/O 操作，隐藏了非阻塞 I/O 的具体细节，简化并发编程模型，让你可以轻松的编写高性能的Web应用，所以它是轻量（lightweight）且高效（efficient）的
- 使用 `npm` 作为包管理器，目前 `npm` 是开源库里包管理最大的生态，功能强大，截止到
  - 2017年12月，模块数量超过 60 万+
  - 2021年12月，模块数量超过 180 万+，周下载 216 亿+，周下载 1286 亿+。

### 1.1.3. c）基本原理

下面是一张 Node.js 早期的架构图，来自 Node.js 之父 Ryan Dahl 的演讲稿，在今天依然不过时，它简要的介绍了 Node.js 是基于 Chrome V8引擎构建的，由事件循环（Event Loop）分发 I/O 任务，最终工作线程（Work Thread）将任务丢到线程池（Thread Pool）里去执行，而事件循环只要等待执行结果就可以了。

![img](https://i5ting.github.io/How-to-learn-node-correctly/media/14912707129964/14912763353044.png)

核心概念

- Chrome V8 是 Google 发布的开源 JavaScript 引擎，采用 C/C++ 编写，在 Google 的 `Chrome` 浏览器中被使用。Chrome V8 引擎可以独立运行，也可以用来嵌入到 C/C++ 应用程序中执行。
- Event Loop 事件循环（由 `libuv` 提供）
- Thread Pool 线程池（由 `libuv` 提供）

梳理一下

- Chrome V8 是 JavaScript 引擎
- Node.js 内置 Chrome V8 引擎，所以它使用的 JavaScript 语法
- JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事
- 单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
- 如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 I/O 很慢，不得不等着结果出来，再往下执行
- CPU 完全可以不管 I/O 设备，挂起处于等待中的任务，先运行排在后面的任务
- 将等待中的 I/O 任务放到 Event Loop 里
- 由 Event Loop 将 I/O 任务放到线程池里
- 只要有资源，就尽力执行

我们再换一个维度看一下

<img src="https://i5ting.github.io/How-to-learn-node-correctly/media/14912707129964/14992384974942.png" alt="img" style="zoom:50%;" /> 

核心

- Chrome V8 解释并执行 JavaScript 代码（这就是为什么浏览器能执行 JavaScript 原因）
- `libuv` 由事件循环和线程池组成，负责所有 I/O 任务的分发与执行

在解决并发问题上，异步是最好的解决方案，可以拿排队和叫号机来理解

- 排队：在排队的时候，你除了等之外什么都干不了
- 叫号机：你要做的是先取号码，等轮到你的时候，系统会通知你，这中间，你可以做任何你想做的事儿

Node.js 其实就是帮我们构建类似的机制。我们在写代码的时候，实际上就是取号的过程，由 Event Loop 来接受处理，而真正执行操作的是具体的线程池里的 I/O 任务。之所以说 Node.js 是单线程，就是因为在接受任务的时候是单线程的，它无需进程/线程切换上下文的成本，非常高效，但它在执行具体任务的时候是多线程的。

Node.js 公开宣称的目标是 “旨在提供一种简单的构建可伸缩网络程序的方法”，毫无疑问，它确实做到了。这种做法将并发编程模型简化了，Event Loop和具体线程池等细节被 Node.js 封装了，继而将异步调用 Api 写法暴露给开发者。真是福祸相依，一方面简化了并发编程，另一方面在写法上埋下了祸根，这种做法的好处是能让更多人轻而易举的写出高性能的程序！

在Node.js Bindings层做的事儿就是将 Chrome V8 等暴露的 `C/C++` 接口转成JavaScript Api，并且结合这些 Api 编写了 Node.js 标准库，所有这些 Api 统称为 Node.js SDK，后面模块章节会有更详细的讨论。

微软在2016年宣布在MIT许可协议下开放 Chakra 引擎，并以 `ChakraCore` 为名在 Github 上开放了源代码，`ChakraCore` 是一个完整的 JavaScript 虚拟机，它拥有着和 `Chakra` 几乎相同的功能与特性。微软向 Node.js 主分支提交代码合并请求，让 Node.js 用上 `ChakraCore`引擎，即 [nodejs/node-chakracore](https://github.com/nodejs/node-chakracore) 项目。实际上微软是通过创建名为 `V8 shim` 的库的赋予了 `ChakraCore` 处理谷歌 Chrome V8 引擎指令的能力，其原理示意图如下

![img](https://i5ting.github.io/How-to-learn-node-correctly/media/14912707129964/15018598977763.jpg) 

目前，Node.js 同时支持这2种 JavaScript 引擎，二者性能和特性上各有千秋，`ChakraCore` 在特性上感觉更潮一些，曾经是第一个支持 `Async函数` 的引擎，但目前 Node.js 还是以 Chrome V8 引擎为主， `ChakraCore` 版本需要单独安装，大家了解一下就好。

![image-20220104141059528](https://gitee.com/sjy666666/docs/raw/master/image-20220104141059528.png)

- 2.3 关于 Node 的书几乎都过时了，我该买哪本？

答： 1）Node in action和了不起的Node.js是入门的绝好书籍，非常简单，各个部分都讲了，但不深入，看了之后，基本就能用起来了 2）当你用了一段之后，你会对Node.js的运行机制好奇，为啥呢？这时候去读朴大的《深入浅出Node.js》一书就能够解惑。原因很简单，九浅一深一书是偏向底层实现原理的书，从操作系统，并发原理，node源码层层解读。如果是新手读，难免会比较郁闷。 3)实践类的可以看看雷宗民（老雷）和赵坤（nswbmw）写的书

Node.js程序员，也见过很多面试题，汇总一下，大致有以下9个点：

1. 基本的Node.js几个特性，比如事件驱动、非阻塞I/O、Stream等
2. 异步流程控制相关，Promise是必问的
3. 掌握1种以上Web框架，比如Express、Koa、Thinkjs、Restfy、Hapi等，会问遇到过哪些问题、以及前端优化等常识
4. 数据库相关，尤其是SQL、缓存、Mongodb等
5. 对于常见Node.js模块、工具的使用，观察一个人是否爱学习、折腾
6. 是否熟悉linux，是否独立部署过服务器，有+分
7. js语法和es6、es7，延伸CoffeeScript、TypeScript等，看看你是否关注新技术，有+分
8. 对前端是否了解，有+分
9. 是否参与过或写过开源项目，技术博客、有+分

### 1.3.5. Node.js应用场景

《Node.js in action》一书里说，Node.js 所针对的应用程序有一个专门的简称：DIRT。它表示数据密集型实时（data-intensive real-time）程序。因为 Node.js 自身在 I/O 上非常轻量，它善于将数据从一个管道混排或代理到另一个管道上，这能在处理大量请求时持有很多开放的连接，并且只占用一小部分内存。它的设计目标是保证响应能力，跟浏览器一样。

这话不假，但在今天来看，DIRT 还是范围小了。其实 DIRT 本质上说的 I/O 处理的都算，但随着大前端的发展，Node.js 已经不再只是 I/O 处理相关，而是更加的“Node”！

Node.js 使用场景主要分为4大类

![屏幕快照 2017-05-17 07.25.05](https://i5ting.github.io/How-to-learn-node-correctly/media/14912707129964/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-05-17%2007.25.05.png)

- 1）跨平台：覆盖你能想到的面向用户的所有平台，传统的PC Web端，以及PC客户端 `nw.js/electron` 、移动端 `cordova`、HTML5、`react-native`、`weex`，硬件 `ruff.io` 等
- 2）Web应用开发：网站、Api、RPC服务等
- 3）前端：三大框架 React \ `Vue` \ `Angular` 辅助开发，以及工程化演进过程（使用`Gulp` /Webpack 构建 Web 开发工具）
- 4）工具：`npm`上各种工具模块，包括各种前端预编译、构建工具 `Grunt` / `Gulp`、脚手架，命令行工具，各种奇技淫巧等

下面列出具体的 Node.js 的使用场景，以模块维度划分

| 分类           | 描述                                                         | 相关模块                                                     |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 网站           | 类似于 `cnodejs.org` 这样传统的网站                          | `Express` / `Koa`                                            |
| Api            | 同时提供给移动端，PC，`H5` 等前端使用的 `HTTP Api` 接口      | `Restify` / `HApi`                                           |
| Api代理        | 为前端提供的，主要对后端Api接口进行再处理，以便更多的适应前端开发 | `Express` / `Koa`                                            |
| IM即时聊天     | 实时应用，很多是基于 `WebSocket`协议的                       | `Socket.io` / `sockjs`                                       |
| 反向代理       | 提供类似于 `nginx` 反向代理功能，但对前端更友好              | `anyproxy` / `node-http-proxy` / `hiproxy`                   |
| 前端构建工具   | 辅助前端开发，尤其是各种预编译，构建相关的工具，能够极大的提高前端开发效率 | `Grunt` / `Gulp` / `Bower` / `Webpack` / `Fis3` / `YKit`     |
| 命令行工具     | 使用命令行是非常酷的方式，前端开发自定义了很多相关工具，无论是shell命令，node脚本，还是各种脚手架等，几乎每个公司\小组都会自己的命令行工具集 | `Cordova` / `Shell.js`                                       |
| 操作系统       | 有实现，但估计不太会有人用                                   | `NodeOS`                                                     |
| 跨平台打包工具 | 使用 Web 开发技术开发PC客户端是目前最流行的方式，会有更多前端开发工具是采用这种方式的 | PC端的electron、nw.js，比如钉钉PC客户端、微信小程序IDE、微信客户端，移动的Cordova，即老的Phonegap，还有更加有名的一站式开发框架Ionicframework |
| P2P            | 区块链开发、BT客户端                                         | `webtorrent` / `ipfs`                                        |
| 编辑器         | `Atom` 和 `VSCode` 都是基于 `electron` 模块的                | `electron`                                                   |
| 物联网与硬件   | ruff.io和很多硬件都支持node sdk                              | `ruff`                                                       |

Node.js 应用场景非常丰富，比如 Node.js 可以开发操作系统，但一般我都不讲的，就算说了也没多大意义，难道大家真的会用吗？一般，我习惯将 Node.js 应用场景分为7个部分。

1）初衷，server端，不想成了前端开发的基础设施 2）命令行辅助工具，甚至可以是运维 3）移动端：cordova，pc端：nw.js和electron 4）组件化，构建，代理 5）架构，前后端分离、api proxy 6）性能优化、反爬虫与爬虫 7) 全栈最便捷之路

| 编号 | 场景               | 说明                                                         |
| ---- | ------------------ | ------------------------------------------------------------ |
| 1    | 反向代理           | Node.js可以作为nginx这样的反向代理，虽然线上我们很少这样做，但它确确实实可以这样做。比如node-http-proxy和anyproxy等，其实使用Node.js做这种请求转发是非常简单的，在后面的http章节里，有单独的讲解。 |
| 2    | 爬虫               | 有大量的爬虫模块，比如node-crawler等，写起来比python要简单一些，尤其搭配jsdom（node版本的jQuery）类库的，对前端来说尤其友好 |
| 3    | 命令行工具         | 所有辅助开发，运维，提高效率等等可以用cli做的，使用node来开发都非常合适，是编写命令行工具最简单的方式，java8以后也参考了node的命令行实现 |
| 4    | 微服务与RPC        | node里有各种rpc支持，比如node编写的dnode，seneca，也有跨语言支持的grpc，足够应用了 |
| 5    | 微信公众号开发     | 相关sdk，框架非常多，是快速开发的利器                        |
| 6    | 前端流行SSR && PWA | SSR是服务器端渲染，PWA是渐进式Web应用，都是今年最火的技术。如果大家用过，一定对Node.js不陌生。比如React、Vuejs都是Node.js实现的ssr。至于pwa的service-worker也是Node.js实现的。那么为啥不用其他语言实现呢？不是其他语言不能实现，而是使用Node.js简单、方便、学习成本低，轻松获得高性能，如果用其他语言，我至少还得装环境 |

可以说目前大家能够看到的、用到的软件都有 Node.js 身影，当下最流行的软件写法也大都是基于 Node.js 的，比如 PC 客户端 [luin/medis](https://github.com/luin/medis) 采用 `electron` 打包，写法采用 React + Redux。我自己一直的实践的【Node全栈】，也正是基于这种趋势而形成的。在未来，Node.js 的应用场景会更加的广泛，更多参见 [sindresorhus/awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs)。

### 1.3.6. Node核心：异步流程控制

Node.js是为异步而生的，它自己把复杂的事儿做了（高并发，低延时），交给用户的只是有点难用的Callback写法。也正是坦诚的将异步回调暴露出来，才有更好的流程控制方面的演进。也正是这些演进，让Node.js从DIRT（数据敏感实时应用）扩展到更多的应用场景，今天的Node.js已经不只是能写后端的JavaScript，已经涵盖了所有涉及到开发的各个方面，而Node全栈更是热门种的热门。

直面问题才能有更好的解决方式，Node.js的异步是整个学习Node.js过程中重中之重。

- \1) 异步流程控制学习重点
- 2）Api写法：Error-first Callback 和 EventEmitter
- 3）中流砥柱：Promise
- 4）终极解决方案：Async/Await

#### 1.3.6.1. 1) 异步流程控制学习重点

我整理了一张图，更直观一些。从09年到现在，8年多的时间里，整个Node.js社区做了大量尝试，其中曲折足足够写一本书的了。大家先简单了解一下。

![Screen Shot 2017-04-05 at 08.43.08](https://i5ting.github.io/How-to-learn-node-correctly/media/14913280187332/Screen%20Shot%202017-04-05%20at%2008.43.08.png)

- 红色代表Promise，是使用最多的，无论async还是generator都可用
- 蓝色是Generator，过度货
- 绿色是Async函数，趋势

**结论**：Promise是必须会的，那你为什么不顺势而为呢？

**推荐**：使用Async函数 + Promise组合，如下图所示。

其实，一般使用是不需要掌握上图中的所有技术的。对于初学者来说，先够用，再去深究细节。所以，精简一下，只了解3个就足够足够用了。

![Screen Shot 2017-04-05 at 08.43.34](https://i5ting.github.io/How-to-learn-node-correctly/media/14913280187332/Screen%20Shot%202017-04-05%20at%2008.43.34.png)

结论

1. Node.js SDK里callback写法必须会的。
2. Node.js学习重点: Async函数与Promise
   1. 中流砥柱：Promise
   2. 终极解决方案：Async/Await

### 1.3.7. Web编程要点

一般，后端开发指的是 Web 应用开发中和视图渲染无关的部分，主要是和数据库交互为主的重业务型逻辑处理。但现在架构升级后，Node.js 承担了前后端分离重任之后，有了更多玩法。从带视图的**传统Web应用**和**面向Api接口应用**，到通过 RPC 调用封装对数据库的操作，到提供前端 Api 代理和网关，服务组装等，统称为**后端开发**，不再是以往只有和数据库打交道的部分才算后端。这样，就可以让前端工程师对开发过程可控，更好的进行调优和性能优化。

对 Node.js 来说，一直没有在后端取得其合理的占有率，原因是多方面的，暂列几条。

- 1）利益分配，已有实现大多是Java或者其他语言，基本是没法撼动的，重写的成本是巨大的，另外，如果用Node写了，那么那些写Java的人怎么办？抢人饭碗，这是要拼命的。
- 2）Node相对年轻，大家对Node的理解不够，回调和异步流程控制略麻烦，很多架构师都不愿意花时间去学习。尽管在Web应用部分处理起来非常简单高效，但在遇到问题时并不容易排查定位，对开发者水平要求略高。
- 3）开发者技能单一，很多是从前端转过来的，对数据库，架构方面知识欠缺，对系统设计也知之不多，这是很危险的，有种麻杆打狼两头害怕的感觉。
- 4）Node在科普、培训、布道等方面做的并不好，国外使用的非常多，国内却很少人知道，不如某些语言做得好。

尽管如此，Node.js 还是尽人皆知，卷入各种是非风口，也算是在大前端浪潮中大红大紫。原因是它的定位非常明确，补足以 JavaScript 为核心的全栈体系中服务器部分。开发也是人，能够同时掌握并精通多门语言的人毕竟不多，而且程序员的美德是“懒”，能使用 JavaScript 一门语言完成所有事儿，为什么要学更多呢？

对于 Web 应用大致分2种，带视图的**传统Web应用**和**面向Api接口应用**，我们先看一下 Node.js Web 应用开发框架的演进时间线大致如下：

- 2010年 TJ Holowaychuk 写的 Express
- 2011年 Derby.js 开始开发，8月5日，WalmartLabs 的一位成员 Eran Hammer 提交了 Hapi 的第一次git记录。Hapi 原本是 Postmile 的一部分，并且最开始是基于 Express 构建的。后来它发展成自己自己的框架，
- 2012年1月21日，专注于 Rest api 的 Restify 发布1.0版本，同构的 Meteor 开始投入开发，最像Rails 的 Sails 也开始了开发
- 2013年 TJ Holowaychuk 开始玩 es6 generator，编写 `co` 这个 Generator 执行器，并开始了Koa 项目。2013 年下半年李成银开始 ThinkJS，参考 ThinkPHP
- 2014年4月9日，Express 发布4.0，进入4.x时代持续到今天，MEAN.js 开始随着 MEAN 架构的提出开始开发，意图大一统，另外 Total.js 开始起步，最像PHP里 Laravel 或 Python 里的 Django 或 ASP.NET MVC的框架，代表着 Node.js 的成熟，开始从其他语言里的成熟框架借鉴
- 2015年8月22日，下一代 Web 框架 Koa 发布1.0，可以在Node.js v0.12下面，通过`co` 和 generator实现同步逻辑，那时候 `co` 还是基于 `thunkfy` 的，在2015年10月30日，ThinkJS发布了首个基于 Es2015+ 特性开发的 v2.0 版本
- 2016 年 09 月，蚂蚁金服的 Eggjs，在 JSConf China 2016 上亮相并宣布开源
- 2017年2月，下一代Web框架 Koa 发布v2.0正式版

我们可以根据框架的特性进行分类

| 框架名称           | 特性                             | 点评                                                         |
| ------------------ | -------------------------------- | ------------------------------------------------------------ |
| Express            | 简单、实用，路由中间件等五脏俱全 | 最著名的Web框架                                              |
| Derby.js && Meteor | 同构                             | 前后端都放到一起，模糊了开发便捷，看上去更简单，实际上上对开发来说要求更高 |
| Sails、Total       | 面向其他语言，Ruby、PHP等        | 借鉴业界优秀实现，也是 Node.js 成熟的一个标志                |
| MEAN.js            | 面向架构                         | 类似于脚手架，又期望同构，结果只是蹭了热点                   |
| Hapi和Restfy       | 面向Api && 微服务                | 移动互联网时代Api的作用被放大，故而独立分类。尤其是对于微服务开发更是利器 |
| ThinkJS            | 面向新特性                       | 借鉴ThinkPHP，并慢慢走出自己的一条路，对于Async函数等新特性支持，无出其右，新版v3.0是基于Koa v2.0的作为内核的 |
| Koa                | 专注于异步流程改进               | 下一代Web框架                                                |
| Egg                | 基于Koa，在开发上有极大便利      | 企业级Web开发框架                                            |

对于框架选型

- 业务场景、特点，不必为了什么而什么，避免本末倒置
- 自身团队能力、喜好，有时候技术选型决定团队氛围的，需要平衡激进与稳定
- 出现问题的时候，有人能够做到源码级定制。Node.js 已经有8年历史，但模块完善程度良莠不齐，如果不慎踩到一个坑里，需要团队在无外力的情况能够搞定，否则会影响进度

> Tips：个人学习求新，企业架构求稳，无非喜好与场景而已

Node.js 本来就为了做后端而设计的，这里我们再看看利益问题。Node.js 向后端延伸，必然会触动后端开发的利益。那么 Proxy 层的事儿，前后端矛盾的交界处，后端不想变，前端又求变，那么长此以往，Api接口会变得越来越恶心。后端是愿意把Api的事儿叫前端的，对后端来说，只要你不动我的数据库和服务就可以。

但是 Node.js 能不能做这部分呢？答案是能的，这个是和 Java、PHP 类似的，一般是和数据库连接到一起，处理带有业务逻辑的。目前国内大部分都是以 Java、PHP 等为主，所以要想吃到这部分并不容易。

- 小公司，创业公司，新孵化的项目更倾向于 Node.js ，简单，快速，高效
- 微服务架构下的某些服务，使用 Node.js 开发，是比较合理的

国内这部分一直没有做的很好，所以 Node.js 在大公司还没有很好的被应用，安全问题、生态问题、历史遗留问题等，还有很多人对 Node.js 的误解。

- 单线程很脆弱，这是事实，但单线程不等于不能多核并发，而且你还有集群呢
- 运维，其实很简单，比其他语言之简单，日志采集、监控也非常简单
- 模块稳定性，对于 `MongoDB`、`MySQL`、`Redis` 等还是相当不错，但其他的数据库支持可能没那么好。
- 安全问题是个伪命题，所有框架面临的都是一样的。

这些对于提供Api服务来说已经足够了，本书后面有大量篇幅讲如何使用 Koa 框架来构建Api服务。

Web编程核心

- 异步流程控制（前面讲过了）
- 基本框架 Koa或Express，新手推荐Express，毕竟资料多，上手更容易。如果有一定经验，推荐Koa，其实这些都是为了了解Web编程原理，尤其是中间件机制理解。
- 数据库 mongodb或mysql都行，mongoose和Sequelize、bookshelf，TypeOrm等都非常不错。对于事务，不是Node.js的锅，是你选的数据库的问题。另外一些偏门，想node连sqlserver等估计还不成熟，我是不会这样用的。
- 模板引擎， ejs，jade，nunjucks。理解原理最好。尤其是extend，include等高级用法，理解布局，复用的好处。其实前后端思路都是一样的。