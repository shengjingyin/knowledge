<img src="https://gitee.com/sjy666666/image-host/raw/master/img/image-20221106123009173.png" alt="image-20221106123009173" style="zoom:50%;" />

## bash 解释器

|     |     |     |
| --- | --- | --- |
|     | >   |     |
|     | >>  |     |
|     | 2>  |     |
|     | &>  |     |
|     | 2>> |     |

管道 | （过滤）

<img src="D:\Project\image-host\img\image-20221106165743535.png" alt="image-20221106165743535" style="zoom:67%;" />

bash 解释器本身是解释器，所以不需要文件有可执行（x）权限，所以即使文件没有可执行权限，也能执行 sh

```
bash first.sh
sh first.sh
```

![image-20221106172752148](D:\Project\image-host\img\image-20221106172752148.png)

## 变量

变量名：由数字、number、下划线 组成，不能以数字开头

```bash
msg="变量1"

msg2=2

echo $msg + $msg2 	# 输出： 变量1 + 2
```
