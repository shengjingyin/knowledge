# git

## commit 规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

大致分为三个部分(使用空行分割):

- 标题行: 必填, 描述主要修改类型和内容
- 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
- 页脚注释: 放 Breaking Changes 或 Closed Issues

### commit 的类型

- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本
- workflow: 工作流相关文件修改

### 提交免登录

- 设置 url（添加账号密码）

正常情况下，添加远程 url 即可

```bash

https://gitee.com/sjy666666/freedom2.0.git

```

可以在 url 中添加账密，下次免登录

```bash

https://( username:password@ )gitee.com/sjy666666/freedom2.0.git


# 实例

https://shengjignyin:password@gitee.com/sjy666666/freedom2.0.git

```
