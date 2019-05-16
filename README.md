<p align="center">
  <a href="http://ant.design">
    <img width="200" src="./assets/dubo-cli.svg">
  </a>
</p>

<!-- <h1 align="center">Dubo CLI</h1> -->

<div align="center">

Dubo CLI is the Standard Tooling for Mobile Web Development.

 ![languuage](https://img.shields.io/badge/language-node-gcf.svg) [![npm package](https://img.shields.io/npm/v/dubo-cli.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) [![NPM downloads](http://img.shields.io/npm/dm/dubo-cli.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) ![license](https://img.shields.io/badge/license-Anti%20996-99ccff.svg)


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