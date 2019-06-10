<p align="center">
  <a href="http://ant.design">
    <img width="400" src="./assets/dubo-cli.svg">
  </a>
</p>

<!-- <h1 align="center">Dubo CLI</h1> -->

<div align="center">

Dubo CLI is the Standard Tooling for Mobile Web Development.

 ![language](https://img.shields.io/badge/language-node-gcf.svg) [![npm package](https://img.shields.io/npm/v/dubo-cli.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) [![NPM downloads](http://img.shields.io/npm/dm/dubo-cli.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) ![license](https://img.shields.io/badge/license-Anti%20996-99ccff.svg)


</div>

![start](./assets/demo.gif)

English | [简体中文](./README-zh_CN.md)

## ✨ Features

- Use webpack@4 as bundler and integrate features of dynamic import, decorator, code-spliting.
- Available to choose javascript or typescript as programming language.
- Select vue and react as one of UI library.
- Clearly structured directory.
- Integrate **font subsetting** workflow in webpack.
- Integrate **upyun auto upload** workflow in webpack.
- Support service worker configuration.
- Use node-gettext to implemente i18n plan.

## 📦 Install

```bash
npm install dubo-cli -g
```

## 🔨 Usage

Initialize one project:

```bash
$ dubo-cli init helloworld
```

And quickly create one page:

```bash
$ dubo-cli page user
```

Or quickly create one component:

```bash
$ dubo-cli component modal
```

## 🤜🏼 Structured directory

Take [ts-react-scss](./examples/ts-react-scss) for example, structured directory as follows:

```js
├── build                                                 // webpack bundler file
│   ├── config.js
│   ├── constants.js
│   ├── fontmin-webpack-plugin.js                           // customize font subsetting plugin
│   ├── fontmin.txt                                         // what text do you want to subset
│   ├── index.html                                          // template file
│   ├── loaders.js                                          // loaders file
│   ├── optimization.js
│   ├── plugins.js                                          // plugins file
│   ├── scripts                                             // customize scripts, use for detact assets variation
│   │   ├── assets-hash.txt                                 // assets folder hash
│   │   ├── fontmin-hash.txt                                // fontmin.txt hash
│   │   └── index.js
│   ├── upload.js                                           // upyun upload script
│   ├── upyun-upload-webpack-plugin.js                      // upyun upload customize plugin
│   ├── utils.js
│   └── webpack.config.js
├── dubo.config.js                                          // dubo project configuration file
├── package.json
├── postcss.config.js
├── src
│   ├── App.tsx                                             // component main entry
│   ├── README.md
│   ├── assets                                              // assets folder for font, img or media
│   │   ├── font
│   │   └── img
│   ├── components                                          // components folder for common component or sub component
│   │   └── @shared
│   ├── constant
│   ├── index.tsx                                           // app main entry
│   ├── lib                                                 // customize library
│   ├── locales                                             // i18n file
│   ├── pages                                               // pages folder for page component
│   ├── router.tsx                                          // router file
│   ├── service-register.js                                 // service worker file
│   ├── services                                            // network io
│   ├── store                                               // state management
│   ├── styles                                              // common style
│   ├── sw.js
│   ├── types                                               // typescript types file here
│   └── utils                                               // utils library
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
  lang: 'ts',                                           // project language
  ui: 'react',                                          // project ui library
  preprocessor: 'scss'                                  // project preprocessor
}

const devConfig = {
  ...baseConfig,
  pwa: false,                                           // open pwa
  project: 'ts-react-scss' || 'dubo',                   // project name
  env,                                                  // enviroment variable
  assetsPath: '/src/assets/',                           // assets path
  distPublicPath: '/dist/',                             // build path
  sourceMap: true,
  openssl: false,                                       // use https
  /*
    webpack-dev-server 是否开启 https，具体本机生成证书方法和配置方法详见：
    https://juejin.im/post/5a6db896518825732d7fd8e0
    https://webpack.docschina.org/configuration/dev-server/
  */
  https: {
    key: '',    // local https root secret
    cert: '',   // local https secret
    ca: '',     // local https certiciate
  }
}

const prodConfig = {
  ...baseConfig,
  ...devConfig,
  pwa: true,
  env,
  staticUrl: STATIC_URL,                                // cdn path
  assetsPath: STATIC_URL,
  distPublicPath: `/activity/${'ts-react-scss' || 'dubo'}/dist/`,
  sourceMap: false,
  bundleAnalyzerReport: false,                          // generate webpack bundleAnalyzerReport
  cdn: {                                                // upyun ftp account
    service: process.env.UPYUN_SERVICE || '',
    operator: process.env.UPYUN_OPERATOR || '',
    passwd: process.env.UPYUN_PASSWD || '',
    remoteFilePath: '',                                 // upyun ftp remote path
    filePath: ''                                        // upyun ftp local path
  },
}

module.exports = isProd ? prodConfig : devConfig
```