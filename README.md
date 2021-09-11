## 介绍

本项目是基于 `rollup` 搭建的油猴脚本开发项目，免去复制粘贴的尴尬，免去写原生 `js` 的繁琐

1. 支持 `npm` 包引入
2. 支持 `vue`
3. 支持 `typescript`
4. 支持 `less`
5. 支持 `png、jpg、svg、gif` 等等静态资源引入（会转成 base64，建议大图片自己丢图床吧）
6. 支持 `json` 文件解析为对象
7. 支持 `dotenv` 环境变量（可参考 vue-cli 的 env 文件）
8. 内置 `eslint`、`stylelint`、`prettier`
9. 开发时会开启 `server`

## 使用

```bash
git clone https://github.com/2214962083/rollup-tampermonkey.git # 克隆本项目
cd rollup-tampermonkey # 进入项目文件夹
npm i # 安装依赖

npm run dev # 启动服务, 会开启一个服务，默认是 127.0.0.1:8090
npm run build # 打包
```

打包后的 `xxx.iife.js` 文件就是最终代码

## 开发指南

1. 安装油猴[(chrome store 搜 tampermonkey)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN)
2. 安装完后进入油猴， `点击设置` -> `通用` -> `配置模式`，选择 `高级`
3. 第二部后，往下滑，找到 `外部` -> `更新间隔` -> 选择 `总是`
4. 新建一个脚本，填入以下代码，举例子

```js
// ==UserScript==
// @name         tampermonkey-rollup
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.bilibili.com
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// @require      http://127.0.0.1:8090/TampermonkeyExample.iife.js
// ==/UserScript==

;(function () {
  console.log('脚本执行了...')
})()
```

5. 执行 `npm run dev` ，然后每次改完代码保存都会自动编译，浏览器要刷新两次才可以看到最新效果，这是油猴的 `@require` 内部缓存问题

### 提示一下

头部注释 `@require` 是本项目提供 `xxx.iife.js` 的地址，自己配 `@match`
具体看[油猴文档](https://www.tampermonkey.net/documentation.php?ext=dhdg&locale=zh)

想改配置自己去 `rollup.config.ts` 改
