### 1、保持程序在终端关闭后仍启动

> 可以用 nohup（https://www.runoob.com/linux/linux-comm-nohup.html）命令挂载.sh脚本，

-   添加自启动脚本（**路径、脚本名可以自定义**）

    ```sh
    # /root/bash/bash.sh

    /home/git/gogs/gogs web				// 需要执行的命令
    ```

-   运行 nohup 命令

    参数：

    -   **Command**：要执行的命令。

    -   **Arg**：一些参数，可以指定输出文件。

    -   **&**：让命令在后台执行，终端退出后命令仍旧执行。

        ```bash
         nohup Command [ Arg … ] [　& ]
        ```

    ```bash
    nohup /root/bash/bash.sh &
    ```

    在终端如果看到以下输出说明运行成功：

    ```bash
    appending output to nohup.out
    ```
