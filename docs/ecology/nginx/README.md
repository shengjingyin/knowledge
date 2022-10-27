# nginx

> windows 下使用 nginx

## 基本操作

```bash
# 启动
start nginx
# 关机
nginx -s stop   // 是快速关闭，不管有没有正在处理的请求。
nginx -s quit   // 是一个优雅的关闭方式，Nginx在退出前完成已经接受的连接请求。
# 重启
nginx -s reload
# 查看状态(windows命令)
tasklist /fi "imagename eq nginx.exe"
# 查看状态(linux命令)
ps -ef | grep nginx
```

## 参数

### location 指令

```conf
location [= | ~ | ~* | ^~]url {

}
```

- = ：要求与 url 严格匹配
- ~ ：表示 url **包含正则，区分大小写**
- ~\* ：表示 url **包含正则，不区分大小写**
- ^~ ：表示 url **不包含正则**，要求 nginx 服务器找到 url 和请求字符串匹配度最高的 location，立即使用此 location

## 配置

### 正向代理与反向代理

- 正向代理

  浏览器不能直接访问谷歌，需要在客户端（浏览器）配置中间代理服务器间接访问，这个就叫正向代理（目标服务器和代理服务器我们都知道他的地址 ）。

   <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20220107223520483.png" alt="image-20220107223520483" style="zoom:67%;" />

* 反向代理

  客户端对代理是无感知的，不需要任何配置就能访问。客户端将请求发送给反向代理服务器，由反向代理服务器选择目标服务器获取数据后，在返回客户端，此时目标服务器和反向代理服务器对外暴露的就是一个服务器（代理服务器 nginx），隐藏了真实的服务器 ip 地址。

  <img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20220107223443530.png" alt="image-20220107223443530" style="zoom:67%;" />

  ```conf {3,2,7}
  server {
      listen       8100;
      server_name  127.0.0.1;

      location /mtex/ {
          client_max_body_size 50m;
          proxy_pass http://192.168.1.131:8100/mtex/; # 反向代理

          proxy_buffer_size 64k;
          proxy_buffers   4 32k;
          proxy_busy_buffers_size 64k;

  		proxy_set_header Upgrade $http_upgrade;
  		proxy_set_header Connection "upgrade";
  		proxy_read_timeout 600s;
      }
  }

  ```

### 负载均衡

单个服务器解决不了，我们增加服务器数量，然后将请求分发到各个服务器上，将原先集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器；一台服务宕机，另外一台也能顶起来

<img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20220107224016595.png" alt="image-20220107224016595" style="zoom: 50%;" />

```conf {2,3,4,5,6,7,12,13,14}
http {
	upstream myserver {
        # ip_hash;  访问方式
        # fair;  访问方式
        server 127.0.0.1:7000 weight=3; // weight 可控制权重
        server 127.0.0.1:4000 weight=1;
    }
    server {
        listen       5000;
        server_name  127.0.0.1;

        location /demo/ {
            proxy_pass http://myserver;
        }
    }
}
```

- 访问策略
  - 轮询（默认），逐一分配，如果后台服务 down 掉，则剔除
  - weight，控制访问比列，值越大，权重越大
  - ip_hash，每个请求按访问 ip 的 hash 结果分配，这样每个客户端固定访问一个后端服务器，可以解决 session 问题
  - fair，根据服务响应时间来分配请求，响应时间短的优先匹配

### 动静分离

把动态页面和静态页面交给不同的服务器解析，加快解析速度。降低原来单个服务器的压力。

<img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20220109105604607.png" alt="image-20220109105604607" style="zoom: 80%;" />

nginx 两种方式实现动静分离

- 动态服务和静态文件分开，静态文件放在独立的服务器上（通过 nginx 转发过来）
- 动态服务和静态文件一起发布，通过 nginx 来分开

expires，设置资源过期时间，适合不经常改动的文件，在过期时间内，客户端访问时，通过比对**文件的最后修改日期**是否改变来确定是否响应缓存文件

具体实现

```conf {2,3,4,5,6,7,12,13,14,16,17,18,19}
http {
	upstream myserver {
        # ip_hash;  访问方式
        # fair;  访问方式
        server 127.0.0.1:7000 weight=3; // weight 可控制权重
        server 127.0.0.1:4000 weight=1;
    }
    server {
        listen       5000;
        server_name  127.0.0.1;

        location /demo/ {
            proxy_pass http://myserver;
        }

        location /img/ {
           alias  D:/Project/simple/temp/img/;
           autoindex on; // 找不到资源时，提供资源目录
           expires 10s; // 过期时间 10s，10d，最长30d
        }
    }
}
```

- 效果

  ![image-20220109113213430](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220109113213430.png)

* autoindex on; 找不到资源时，提供资源目录

  ![image-20220109112042115](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220109112042115.png)

### 高可用

背景：nginx 也有可能会宕机，配置多台 nginx，借助 keepalived（无 windows 版本）提供虚拟路由，主备 nginx 绑定到该虚拟路由，由 keepalived 检测主 nginx 是否存活，是否切换

![image-20220109114635883](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220109114635883.png)

### 最佳实践

### nginx 原理

## 常见问题

### 开启 gzip 压缩

### 缓存

### 解决跨域问题

```js
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
```

### 解决 cooike 携带不上的问题

- nginx 配置：

```js {3}
add_header Access-Control-Allow-Origin $http_origin;
add_header Access-Control-Allow-Headers "Cache-Control,Origin,X-Requested-With,Content-Type,Accept,token,Access-Token,x-csrf-token,Authorization";
add_header Access-Control-Allow-Credentials true;	// 允许携带cooike
add_header Access-Control-Allow-Methods *;
```

- axios 配置

```js
axios.defaults.withCredentials = true;
```

### 502 服务器 error

> 错误详情：nginx connect()错误(10061: No connection could be made because the target machine actively refused it) 六成是因为服务地址转错了

比如我的（错误之前）：

```bash
location /mtex/cda/ {
    proxy_pass http://127.0.0.1:8621/mtex/cda/;
}
```

因为我的是端口填错了，所以修改之后（端口由 8621 改成 8611）

```bash
location /mtex/cda/ {
    proxy_pass http://127.0.0.1:8611/mtex/cda/;
}
```
