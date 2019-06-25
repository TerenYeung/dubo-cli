const
  fs = require("fs"),
  utils = require('../lib'),
  chalk = require("chalk");

function createPage(pageName, config) {
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

  let pageUrl = "";
  let suffix = "";
  if (isReact) {
    if (isJS) {
      if (isScss) {
        pageUrl = "/react/js_scss";
      } else {
        pageUrl = "/react/js_less";
      }
      suffix = ".jsx";
    } else {
      if (isScss) {
        pageUrl = "/react/ts_scss";
      } else {
        pageUrl = "/react/ts_less";
      }
      suffix = ".tsx";
    }
  } else {
    if (isJS) {
      if (isScss) {
        pageUrl = "/vue/js_scss";
      } else {
        pageUrl = "/vue/js_less";
      }
    } else {
      if (isScss) {
        pageUrl = "/vue/ts_scss";
      } else {
        pageUrl = "/vue/ts_less";
      }
    }
    suffix = ".vue";
  }

  const distPath = `${process.cwd()}/src/pages/${pageName}`;
  if (!utils.isExist(distPath)) {
    fs.mkdirSync(distPath);
  }

  utils.copyFilesToFolder(
    utils.resolve(`packages/templates/page${pageUrl}`),
    distPath
  );

  utils.replace({
    regMap: {
      '\\[pageName\\]': pageName,
    },
    src: `${process.cwd()}/src/pages/${pageName}/index${suffix}`,
    dist: `${process.cwd()}/src/pages/${pageName}/index${suffix}`
  });
  console.log(chalk.cyan(`🎉  page ${chalk.underline.yellow(pageName)} created successfully!`));
}

module.exports = createPage;
