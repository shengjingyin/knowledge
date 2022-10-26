# 私有化 git 服务部署 - Gogs

> 搭建自己的阿里云代码仓储服务器

## 下载

-   进入 gogs 官网(https://dl.gogs.io/0.12.3/)找到下载列表，选择一个复制下载链接

-   进入 linux，创建你一个你想放的文件路径，使用 wget 命令下载包

    > 我下载的位置是：/root/softWare

    ```bash
    wget https://dl.gogs.io/0.12.3/gogs_0.12.3_linux_amd64.tar.gz
    ```

-   完了之后解压压缩包

    ```bash
    tar -xvf gogs_0.12.3_linux_amd64.tar.gz
    ```

    获得以下文件

    ```bash
    ├── gogs
    ├── LICENSE
    ├── README.md
    ├── README_ZH.md
    └── scripts
    ```

*   新增三个文件夹，分别：保存运行时的数据、错误日志、仓库的根目录
    ```bash {1,4,7}
    ├── data
    ├── gogs
    ├── LICENSE
    ├── log
    ├── README.md
    ├── README_ZH.md
    ├── repositories
    └── scripts
    ```

-   启动 gogs 服务，gogs 二进制文件就是启动文件

    ```bash
    ./gogs web
    ```

-   会看到启动端口号，默认 3000（需要把**阿里云防护**和**linux 防火墙**这**两个地方**开放对应端口）

-   自动挂起后台

    nohup 详细介绍（https://blog.csdn.net/x763795151/article/details/99695096） 执行 bash.sh 并后台挂起，只要电脑不关机就行

    ```bash
    语法
    # nohup sh xxx.sh &>/dev/null &

    实例
    [root@iZwz9ak77b07qfr068gwncZ /]# nohup sh root/bash/bash.sh &>/dev/null &
    ```

    > &>/dev/null , 代表无底洞

## 参考资料

-   [搭建视频 地址](https://www.bilibili.com/video/BV1DE411k7rq)
-   [搭建视频对应的文档地址](https://www.bilibili.com/read/cv3824120?spm_id_from=333.788.b_636f6d6d656e74.9)
