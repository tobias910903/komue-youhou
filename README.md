## 油猴插件开发

##### 安装依赖

```
yarn
```

##### 启动服务

```
yarn dev
```

##### 构建项目

```
yarn build
```

#### 复制代码到油猴控制面板
tampermonkey.js
```
// ==UserScript==
// @name         插件名称
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  一个描述
// @author       admin@lihuyong.com
// @match        https://*/*
// @match        http://*/*
// @grant        GM_xmlhttpRequest
// @license      MIT
// ==/UserScript==

;(function () {

  // ./dist/app.boundle.js 打包之后的代码 
    
})()
```

#### 发布到托管平台
```
https://greasyfork.org/zh-CN
```

#### 相关文档
```
https://www.tampermonkey.net/documentation.php?ext=dhdg&version=4.6
```
