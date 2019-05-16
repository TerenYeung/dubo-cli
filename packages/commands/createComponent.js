const
  fs = require("fs"),
  utils = require('../lib'),
  chalk = require("chalk");

function createComponent(componentName, config) {
  try {
    // 读取 dubo.config.js 判断一下是否在根路径
    var { lang, ui, preprocessor } = require(`${process.cwd()}/dubo.config.js`);
  } catch (err) {
    console.log(chalk.red("😭 please go to project root path"));
    process.exit(0);
  }

  const isReact = ui === "react",
    isJS = lang === "js",
    isScss = preprocessor === "scss";

  let componentUrl = "";
  let suffix = "";
  if (isReact) {
    if (isJS) {
      if (isScss) {
        componentUrl = "/react/js:scss";
      } else {
        componentUrl = "/react/js:less";
      }
      suffix = ".jsx";
    } else {
      if (isScss) {
        componentUrl = "/react/ts:scss";
      } else {
        componentUrl = "/react/ts:less";
      }
      suffix = ".tsx";
    }
  } else {
    if (isJS) {
      if (isScss) {
        componentUrl = "/vue/js:scss";
      } else {
        componentUrl = "/vue/js:less";
      }
    } else {
      if (isScss) {
        componentUrl = "/vue/ts:scss";
      } else {
        componentUrl = "/vue/ts:less";
      }
    }
    suffix = ".vue";
  }

  const distPath = `${process.cwd()}/src/components/${componentName}`;
  if (!utils.isExist(distPath)) {
    fs.mkdirSync(distPath);
  }

  utils.copyFilesToFolder(
    utils.resolve(`packages/templates/component${componentUrl}/tpl`),
    distPath
  );

  utils.replace({
    regMap: {
      '\\[componentName\\]': componentName,
    },
    src: `${process.cwd()}/src/components/${componentName}/index${suffix}`,
    dist: `${process.cwd()}/src/components/${componentName}/index${suffix}`
  });
  console.log(chalk.cyan(`🎉 component ${chalk.underline.yellow(componentName)} created successfully!`));
}

module.exports = createComponent;
