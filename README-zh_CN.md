<p align="center">
  <a href="http://ant.design">
    <img width="400" src="./assets/dubo-cli.svg">
  </a>
</p>

<!-- <h1 align="center">Dubo CLI</h1> -->

<div align="center">

Dubo CLI 是一个快速创建移动端网页模板的开发工具。

 ![languuage](https://img.shields.io/badge/language-node-gcf.svg) [![npm package](https://img.shields.io/npm/v/dubo-cli.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) [![NPM downloads](http://img.shields.io/npm/dm/dubo-cli.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) ![license](https://img.shields.io/badge/license-Anti%20996-99ccff.svg)


</div>

![start](./assets/demo.gif)

[English](./README.md) | 简体中文

## ✨ 特性

- 使用 webpack@4 作为构建工具，同时集成动态引入、装饰器和代码分离等特性。
- JavaScript 和 Typescript 作为可选编程语言。
- 可选 UI 库，vue 或是 react。
- 结构化开发目录。
- webpack 集成字体子集截取工作流。
- webpack 集成又拍云自动上传工作流。
- 支持 service worker 配置。
- 使用 node-gettext 作为国际化方案。

## 📦 安装

```bash
npm install dubo-cli -g
```

## 🔨 使用

初始化项目：

```bash
$ dubo-cli init helloworld
```

快速创建新页面：

```bash
$ dubo-cli page user
```

快速创建新组件：

```bash
$ dubo-cli component modal
```

## 🤜🏼 结构化目录

以 [ts-react-scss](./examples/ts-react-scss) 为例, 目录结构信息如下：

```js
├── build                                                   // webpack 构建文件夹
│   ├── config.js
│   ├── constants.js
│   ├── fontmin-webpack-plugin.js                           // 自定义字体子集截取插件
│   ├── fontmin.txt                                         // 待提取字体子集
│   ├── index.html                                          // 模板文件
│   ├── loaders.js                                          // webpack loaders 文件
│   ├── optimization.js
│   ├── plugins.js                                          // webpack plugins 文件
│   ├── scripts                                             // 自定义脚本，用于检测 assets 和 fontmin.txt 文件的变动
│   │   ├── assets-hash.txt                                 // assets 文件夹 hash 值
│   │   ├── fontmin-hash.txt                                // fontmin.txt 文件 hash 值
│   │   └── index.js
│   ├── upload.js                                           // 又拍云上传脚本
│   ├── upyun-upload-webpack-plugin.js                      // 又拍云上传自定义插件
│   ├── utils.js
│   └── webpack.config.js
├── dubo.config.js                                          // dubo 项目配置文件
├── package.json
├── postcss.config.js
├── src
│   ├── App.tsx                                             // 组件主入口文件
│   ├── README.md
│   ├── assets                                              // 静态资源文件夹
│   │   ├── font
│   │   └── img
│   ├── components                                          // 组件文件夹，用于放置公用组件和子组件
│   │   └── @shared
│   ├── constant
│   ├── index.tsx                                           // App 入口文件
│   ├── lib                                                 // 自定义库
│   ├── locales                                             // 国际化文件夹
│   ├── pages                                               // 页面级别组件
│   ├── router.tsx                                          // 路由文件
│   ├── service-register.js                                 // service worker 文件
│   ├── services                                            // 网络 io 封装
│   ├── store                                               // 状态管理
│   ├── styles                                              // 公用样式
│   ├── sw.js
│   ├── types                                               // typescirpt 类型定义
│   └── utils                                               // 通用库
├── tsconfig.json
└── tslint.json
```

dubo.config.js file use for configuration of App:

```js
const
  fs = require('fs'),
  env = process.env.NODE_ENV,
  isProd = process.env.NODE_ENV === 'production';

const STATIC_URL = '';

/**
 * @warning baseConfig cannot be delete, use for dubo-cli to create new page or component
 */
const baseConfig = {
  lang: 'ts',                                           // 项目语言
  ui: 'react',                                          // 项目 UI 库
  preprocessor: 'scss'                                  // 项目预处理器
}

const devConfig = {
  ...baseConfig,
  pwa: false,                                           // 开启 service worker
  project: 'ts-react-scss' || 'dubo',                   // 项目名称
  env,                                                  // 环境变量
  assetsPath: '/src/assets/',                           // assets 文件路径
  distPublicPath: '/dist/',                             // build 文件路径
  sourceMap: true,
  openssl: false,                                       // use https
  /*
    webpack-dev-server 是否开启 https，具体本机生成证书方法和配置方法详见：
    https://juejin.im/post/5a6db896518825732d7fd8e0
    https://webpack.docschina.org/configuration/dev-server/
  */
  https: {
    key: '',    // 本机 https 根秘钥
    cert: '',   // 本机 https 域秘钥
    ca: '',     // 本机 https 根证书
  }
}

const prodConfig = {
  ...baseConfig,
  ...devConfig,
  pwa: true,
  env,
  staticUrl: STATIC_URL,                                // cdn 路径
  assetsPath: STATIC_URL,
  distPublicPath: `/activity/${'ts-react-scss' || 'dubo'}/dist/`,
  sourceMap: false,
  bundleAnalyzerReport: false,                          // 是否生成 webpack 构建报告
  cdn: {                                                // 又拍云 ftp 账户
    service: process.env.UPYUN_SERVICE || '',
    operator: process.env.UPYUN_OPERATOR || '',
    passwd: process.env.UPYUN_PASSWD || '',
    remoteFilePath: '',                                 // 又拍云 ftp 远程路径
    filePath: ''                                        // 又拍云 ftp 本地路径
  },
}

module.exports = isProd ? prodConfig : devConfig
```