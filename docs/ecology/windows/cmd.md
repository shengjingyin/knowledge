## tree

https://blog.csdn.net/gaowenju1991/article/details/106719438/

> 使用`tree /?` 可以打出以下提示符

`TREE [drive:][path] [/F][/a]`

/F 显示每个文件夹中文件的名称。 /A 使用 ASCII 字符，而不使用扩展字符。

将树输出到文件内

```bash
tree /F > txt.txt
```

## 查询某个端口占用情况

### 查询端口占用情况

```bash
netstat -aon | findstr :8499
```

![image-20220301220842544](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220301220842544.png)

### 查询 12788 端口的任务名称

```bash
tasklist | findstr 12788
```

![image-20220301220906612](https://gitee.com/sjy666666/image-host/raw/master/img/image-20220301220906612.png)
