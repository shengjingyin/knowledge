![image-20220305111001122](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c34254f810364feb843f266af8ff944f~tplv-k3u1fbpfcp-zoom-1.image)

## dns 域名解析

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e0fd73d761a4652b9f29ab54b04ca53~tplv-k3u1fbpfcp-watermark.image?)

本地 DNS 服务器由 ISP 管理（常见的 ISP 管理有：电信、移动网络服务商），本地 DNS 服务器收到请求后，先查看自己的缓存，如果有则返回对于的 ip 地址（并显示 non-authoritative 非权威）

本地 DNS 服务器解析过程（www.baidu.com）：首先寻找根域名服务器解析.com地址、得到.com地址后寻找根域名服务器解析baidu.com的地址，得到baidu.com地址再去找权威域名服务器解析完整地址。解析过程是一个**迭代**的过程。

浏览器向本地 DNS 服务器查询 ip 地址的过程是一个**递归**过程：

​ 从浏览器发出请求后，查询步骤如下：浏览器缓存（chrome 有效时长 60s 最多 100 个） -> 本地 Host 文件（C:\Windows\System32\drivers\etc\hosts） -> 本地 DNS 服务器缓存（网络供应商那）

[详细解析过程](https://blog.csdn.net/bangshao1989/article/details/121913780)

## TCP 连接

三次连接与四次挥手？

TCP 是一种**面向连接的、可靠的、基于字节流**的传输层通信协议，在发送数据前，通信双方必须在彼此间建立一条连接。所谓的“连接”，其实是客户端和服务端保存的一份关于对方的信息，如 ip 地址、端口号等。TCP 可以看成是一种字节流，它会处理 IP 层或以下的层的丢包、重复以及错误问题。在连接的建立过程中，双方需要交换一些连接的参数。这些参数可以放在 TCP 头部。一个 TCP 连接由一个 4 元组构成，分别是两个 IP 地址和两个端口号。一个 TCP 连接通常分为**三个阶段：连接、数据传输、退出（关闭）**。通过三次握手建立一个链接，通过四次挥手来关闭一个连接。当一个连接被建立或被终止时，交换的报文段只包含 TCP 头部，而没有数据。

### TCP 报文的头部结构

在了解 TCP 连接之前先来了解一下 TCP 报文的头部结构。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b2d7f599f8b4167af6e09aad0886cfc~tplv-k3u1fbpfcp-watermark.image?)

图片

上图中有几个字段需要重点介绍下： （1）序号：seq 序号，占 32 位，用来标识从 TCP 源端向目的端发送的字节流，发起方发送数据时对此进行标记。 （2）确认序号：ack 序号，占 32 位，只有 ACK 标志位为 1 时，确认序号字段才有效，ack=seq+1。 （3）标志位：共 6 个，即 URG、ACK、PSH、RST、SYN、FIN 等，具体含义如下：

- ACK：确认序号有效。
- FIN：释放一个连接。
- PSH：接收方应该尽快将这个报文交给应用层。
- RST：重置连接。
- SYN：发起一个新连接。
- URG：紧急指针（urgent pointer）有效。需要注意的是：不要将确认序号 ack 与标志位中的 ACK 搞混了。确认方 ack=发起方 seq+1，两端配对。

### 三次握手

三次握手的本质是**确认通信双方收发数据的能力**

首先，我让信使运输一份信件给对方，对方收到了，那么他就知道了我的发件能力和他的收件能力是可以的。于是他给我回信，我若收到了，我便知我的发件能力和他的收件能力是可以的，并且他的发件能力和我的收件能力是可以。然而此时他还不知道他的发件能力和我的收件能力到底可不可以，于是我最后回馈一次，他若收到了，他便清楚了他的发件能力和我的收件能力是可以的。这，就是三次握手。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1753c9b5674a44b8ba67bbb504de06fd~tplv-k3u1fbpfcp-watermark.image?)

- 第一次握手：客户端要向服务端发起连接请求，首先客户端随机生成一个起始序列号 ISN(比如是 100)，那客户端向服务端发送的报文段包含 SYN 标志位(也就是 SYN=1)，序列号 seq=100。
- 第二次握手：服务端收到客户端发过来的报文后，发现 SYN=1，知道这是一个连接请求，于是将客户端的起始序列号 100 存起来，并且随机生成一个服务端的起始序列号(比如是 300)。然后给客户端回复一段报文，回复报文包含 SYN 和 ACK 标志(也就是 SYN=1,ACK=1)、序列号 seq=300、确认号 ack=101(客户端发过来的序列号+1)。
- 第三次握手：客户端收到服务端的回复后发现 ACK=1 并且 ack=101,于是知道服务端已经收到了序列号为 100 的那段报文；同时发现 SYN=1，知道了服务端同意了这次连接，于是就将服务端的序列号 300 给存下来。然后客户端再回复一段报文给服务端，报文包含 ACK 标志位(ACK=1)、ack=301(服务端序列号+1)、seq=101(第一次握手时发送报文是占据一个序列号的，所以这次 seq 就从 101 开始，需要注意的是**不携带数据的 ACK 报文是不占据序列号的**，所以后面第一次正式发送数据时 seq 还是 101)。当服务端收到报文后发现 ACK=1 并且 ack=301，就知道客户端收到序列号为 300 的报文了，就这样客户端和服务端通过 TCP 建立了连接。

### 四次挥手

四次挥手的目的是**关闭一个连接**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf899a38c2fe46d0b5367c83d0233b26~tplv-k3u1fbpfcp-watermark.image?)

比如客户端初始化的序列号 ISA=100，服务端初始化的序列号 ISA=300。TCP 连接成功后客户端总共发送了 1000 个字节的数据，服务端在客户端发 FIN 报文前总共回复了 2000 个字节的数据。

- 第一次挥手：当客户端的数据都传输完成后，客户端向服务端发出连接释放报文(当然数据没发完时也可以发送连接释放报文并停止发送数据)，释放连接报文包含 FIN 标志位(FIN=1)、序列号 seq=1101(100+1+1000，其中的 1 是建立连接时占的一个序列号)。需要注意的是**客户端发出 FIN 报文段后只是不能发数据了，但是还可以正常收数据**；另外 FIN 报文段即使不携带数据也要**占据一个序列号**。
- 第二次挥手：服务端收到客户端发的 FIN 报文后给客户端回复确认报文，确认报文包含 ACK 标志位(ACK=1)、确认号 ack=1102(客户端 FIN 报文序列号 1101+1)、序列号 seq=2300(300+2000)。此时服务端处于关闭等待状态，而不是立马给客户端发 FIN 报文，这个状态还要持续一段时间，**因为服务端可能还有数据没发完**。
- 第三次挥手：服务端将最后数据(比如 50 个字节)发送完毕后就向客户端发出连接释放报文，报文包含 FIN 和 ACK 标志位(FIN=1,ACK=1)、确认号和第二次挥手一样 ack=1102、序列号 seq=2350(2300+50)。
- 第四次挥手：客户端收到服务端发的 FIN 报文后，向服务端发出确认报文，确认报文包含 ACK 标志位(ACK=1)、确认号 ack=2351、序列号 seq=1102。**注意客户端发出确认报文后不是立马释放 TCP 连接，而是要经过 2MSL(最长报文段寿命的 2 倍时长)后才释放 TCP 连接**。**而服务端一旦收到客户端发出的确认报文就会立马释放 TCP 连接，所以服务端结束 TCP 连接的时间要比客户端早一些**。

### 常见面试题

#### 1. 为什么 TCP 连接的时候是 3 次？2 次不可以吗？

- 因为需要考虑连接时**丢包**的问题，如果只握手 2 次，第二次握手时如果服务端发给客户端的确认报文段丢失，此时服务端已经准备好了收发数(可以理解服务端已经连接成功)据，而客户端一直没收到服务端的确认报文，所以客户端就不知道服务端是否已经准备好了(可以理解为客户端未连接成功)，这种情况下客户端不会给服务端发数据，也会忽略服务端发过来的数据。如果是三次握手，即便发生丢包也不会有问题，比如如果第三次握手客户端发的确认 ack 报文丢失，服务端在一段时间内没有收到确认 ack 报文的话就会重新进行第二次握手，也就是服务端会重发 SYN 报文段，客户端收到重发的报文段后会再次给服务端发送确认 ack 报文。

#### 2. 为什么 TCP 连接的时候是 3 次，关闭的时候却是 4 次？

- 因为只有在客户端和服务端**都没有数据要发送**的时候才能断开 TCP。而客户端发出 FIN 报文时只能保证客户端没有数据发了，服务端还有没有数据发客户端是不知道的。而服务端收到客户端的 FIN 报文后只能先回复客户端一个确认报文来告诉客户端我服务端已经收到你的 FIN 报文了，但我服务端还有一些数据没发完，等这些数据发完了服务端才能给客户端发 FIN 报文(所以不能一次性将确认报文和 FIN 报文发给客户端，就是这里多出来了一次)。

#### 3. 为什么客户端发出第四次挥手的确认报文后要等 2MSL 的时间才能释放 TCP 连接？

- 这里同样是要考虑丢包的问题，如果第四次挥手的报文丢失，**服务端没收到确认 ack 报文就会重发第三次挥手的报文**，这样报文一去一回最长时间就是 2MSL，所以需要等这么长时间来确认服务端确实已经收到了。

## 发送 http 请求

客户端发送 http 请求，服务端响应，返回响应结果

TCP 连接建立后，浏览器就可以利用 HTTP／HTTPS 协议向服务器发送请求了。这里就开始和**缓存相关**了，

### 强缓存与协商缓存，缓存的特征是什么（请求头）

强缓存： 浏览器不发送 http 请求，直接从浏览器缓存中读取资源

协商缓存：浏览器发送 http 请求，服务器根据资源状态确定返回的是 304 状态码还是重新发送新文件

> 浏览器在客户端，会有一个内存空间用于存储有缓存相关的 http 请求；
>
> 在下一次请求发出前，浏览器会到内存空间找到相同 url 的 http 请求
>
> 如果上一次 http 请求的响应头中有 http 缓存相关的字段
>
> 将判断是否命中强缓存，如果是则不发送请求，如果不是则把缓存相关的响应头字段处理成相应的请求头字段发出

### 强缓存

- **expires**: Wed, 28 Sep 2022 14:47:39 GMT； 资源过期时间；
- **cache-control**：max-age=31536000；资源有效时间；

> `cache-control` 比 `expires`，优先级高，同时存在，`cache-control`设置有效

[MDN Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

```js
const time = new Date(new Date().getTime() + 100 * 1000);

res.setHeader('Expires', time.toUTCString()); // Expires 需要设置GMT格式的时间

res.setHeader('Cache-Control', 'max-age=30');
```

为什么有了`Expries`还需要`Cache-Control`？

- `Cache-Control`是设置时间长度； `Expires`是设置时间点；

- `Expires`的一个缺点是它的时间是**参照电脑本地时间**的，如果本地时间错乱的话，那么缓存可能就会失效；所以如果既有`Expires`又有`Cache-Control`，那么就忽略掉`Expires`。

一般缓存这块现在也不用后台配置了，基本上使用 nginx 代理配置一下就行了

### 协商缓存

- **last-modified**：Fri, 24 Sep 2021 08:18:45 GMT；最后修改时间

  第一次请求时，服务器设置响应头`last-modified`，下一次请求客户端将会携带`if-modified-since`，返回**状态码 304 代表协商缓存**

  ```js
  const info = fs.statSync('./index.html');

  const requestLastModifyTime = req.headers['if-modified-since'];

  const lastModifyTime = info.mtime.toUTCString();

  // 协商缓存策略
  if (requestLastModifyTime && requestLastModifyTime === lastModifyTime) {
    console.log('catch!');
    res.statusCode = 304;
    res.end();
    return;
  }

  console.log('no catch!');
  res.setHeader('last-modified', lastModifyTime);
  const html = fs.readFileSync('./index.html', 'utf-8');
  res.end(html);
  ```

* **etag**： 1a48df81c320e53921360926cedb56aa；

  etag 是对文件内容进行标识，如果内容改变则，标识改变

  ```js
  // 创建etag
  const buffer = fs.readFileSync('./index.html'); // 二进制流文件
  const hashTool = createHash('md5');
  hashTool.update(buffer, 'utf-8');
  const etag = hashTool.digest('hex'); //生成md5加密的唯一标识
  const requestEtag = req.headers['if-none-match'];

  if (requestEtag && requestEtag === etag) {
    console.log('catch!');
    res.statusCode = 304;
    res.end();
    return;
  }

  console.log('no catch!');
  res.setHeader('etag', etag);
  const html = fs.readFileSync('./index.html', 'utf-8');
  res.end(html);
  ```

> `etag` 比 `last-modified`，优先级高，同时存在，`etag`设置有效

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28e3c643a0a042f0989530122bf97835~tplv-k3u1fbpfcp-watermark.image?)

[强缓存、协商缓存](https://blog.csdn.net/qq_32438227/article/details/115125382)

## 浏览器渲染

获取 HTML（标记语言）后，解析 DOM

- 一开始浏览器得到的是显示字节内容的 HTML 文件

- 所以要把 字节 转换为 字符 （人类看的懂）

- 然后因为 html 是标记语言，然后浏览器可以把字符转成 token，这里的 token 可以理解为浏览器认识的符号标签

- 然后会把 token 转成节点对象 （含有自己的属性 方法），
- 所有的节点对象连在一起就是 DOM 树了（文本对象模型）

然后遇到样式会解析成 CSSOM（与解析 DOM 类似）：

- 字节 转换为 字符 （人类看的懂）

- 字符转成 token

- 然后会把 token 转成节点对象
- 所有的节点对象连在一起就是 CSSOM 树了（文本对象模型）

DOM 和 CSSOM 是两个独立的模型，需要把它们结合起来形成渲染树

渲染树上的内容是页面能够呈现的内容(不呈现的内容不会出现在渲染树上)，比如 meta、link 标签就不会当作内容呈现出来，设置了 `display: none` 的也不会呈现

接下来进行布局，布局是依照盒子模型来的，每个元素可以看作是一个盒子，然后这些盒子在页面上进行排列和嵌套

再接着浏览器进行绘制，把渲染树以像素的形式绘制在页面。

样式解析流程

### dom 树和 render 树有什么区别？

dom 树包含所有已创建的可见与不可见的元素，渲染树只包含可见元素
