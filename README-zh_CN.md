<p align="center">
  <a href="http://ant.design">
    <img width="200" src="./assets/dubo-cli.svg">
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