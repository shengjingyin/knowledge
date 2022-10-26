# jsonwebtoken

## 为什么需要token？

## 如何颁发token？

```js
const jwt = require('jsonwebtoken')

const generateToken = function (uid, scope) {
    const secretKey = '123131313133'  // 密钥
    const expiresIn = '1d'  // 过期时间
    const token = jwt.sign({
        uid,
        scope
    }, secretKey, {
        expiresIn
    })

    return token
}
```



## 如何验证token？