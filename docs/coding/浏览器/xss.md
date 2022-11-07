跨站脚本攻击（cross site script），通过插入的形式攻击，当然还得需要代码的配合，简单形式就是`innerHTML`.

#### 1.1 demo

比如说下面有个表单输入，页面内容如下，然后在输入框内输入以下内容就会产生简单的攻击了：

> 这里 onerror 能执行任意 JS 语句，包括发送请求

```js
<img src="text.js" onerror="alert(123)" />
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>XSS</title>
  </head>
  <body>
    <div>
      用户名：<input type="textarea" id="user" />
      <button type="submit" id="submit">提交</button>
    </div>
    <div>
      输入结果：
      <div id="content"></div>
    </div>
  </body>
  <script>
    const $input = document.getElementById('user');
    const $submit = document.getElementById('submit');
    const $content = document.getElementById('content');
    $submit.addEventListener('click', () => {
      $content.innerHTML = $input.value;
    });
  </script>
</html>
```

效果

![xss.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5305c0e9623b4bd2a55bf49bd36a44b3~tplv-k3u1fbpfcp-watermark.image?)
