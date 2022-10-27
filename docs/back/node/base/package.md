package.json 文件 与 package-lock.json 文件的作用
[http://nodejs.cn/learn/the-package-json-guide](http://nodejs.cn/learn/the-package-json-guide)
[http://nodejs.cn/learn/the-package-lock-json-file](http://nodejs.cn/learn/the-package-lock-json-file)

## package.json
package.json 文件是项目的清单，是 npm 和 yarn 存储所有已安装软件包的名称和版本的地方。
json文件的参数有：

- `version` 表明了当前的版本。
- `name` 设置了应用程序/软件包的名称。
- `description` 是应用程序/软件包的简短描述。
- `main` 设置了应用程序的入口点。
- `private` 如果设置为 `true`，则可以防止应用程序/软件包被意外地发布到 `npm`。
- `scripts` 定义了一组可以运行的 node 脚本。
- `dependencies` 设置了作为依赖安装的 `npm` 软件包的列表。
- `devDependencies` 设置了作为开发依赖安装的 `npm` 软件包的列表。
- `engines` 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
- `browserslist` 用于告知要支持哪些浏览器（及其版本）。


## package-lock.json
该文件旨在跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制（即使软件包的维护者更新了软件包）。

这解决了 package.json 一直尚未解决的特殊问题。 在 package.json 中，可以使用 semver 表示法设置要升级到的版本（补丁版本或次版本），例如：

+ 如果写入的是 〜0.13.0，则只更新补丁版本：即 0.13.1 可以，但 0.14.0 不可以。
+ 如果写入的是 ^0.13.0，则要更新补丁版本和次版本：即 0.13.1、0.14.0、依此类推。
+ 如果写入的是 0.13.0，则始终使用确切的版本。

无需将 node_modules 文件夹（该文件夹通常很大）提交到 Git，当尝试使用 npm install 命令在另一台机器上复制项目时，如果指定了 〜 语法并且软件包发布了补丁版本，则该软件包会被安装。 ^ 和次版本也一样。

如果指定确切的版本，例如示例中的 0.13.0，则不会受到此问题的影响。

可能是你，或者是其他人，会在某处尝试通过运行 npm install 初始化项目。

因此，原始的项目和新初始化的项目实际上是不同的。 即使补丁版本或次版本不应该引入重大的更改，但还是可能引入缺陷。

package-lock.json 会固化当前安装的每个软件包的版本，当运行 npm install时，npm 会使用这些确切的版本。

## npm 指令

+ 安装指定版本

```bash
npm i animate.css@4.1.1
```

