const
  utils = require('../lib'),
  ora = require('ora'),
  chalk = require('chalk'),
  inquirer = require('inquirer'),
  fs = require('fs'),
  path = require('path'),
  figlet = require('figlet'),
  childProcess = require('child_process'),
  fse = require('fs-extra');

const
  queryMap = {
    lang: 'please select one language',
    ui: 'which UI Library you prefer',
    preprocessor: 'use one preprocessor for project',
    imageCook: 'Use imgcook to generate template and style code from sketch or ps ?'
  }

const queryList = [
  {
    name: queryMap.lang,
    type: 'list',
    choices: ['javascript', 'typescript']
  },
  {
    name: queryMap.ui,
    type: 'list',
    choices: ['react', 'vue']
  },
  {
    name: queryMap.preprocessor,
    type: 'list',
    choices: ['sass/scss', 'less']
  }
];

let spinner = null;

function createTemplate(projectName) {
  const cwd = path.resolve(process.cwd(), projectName);

  inquirer
  .prompt(queryList)
  .then(answers => {
    const
      projectUrl = utils.resolve(projectName),
      buildUrl = utils.resolve('packages/templates/build'),
      srcUrl = utils.resolve('packages/templates/src');

    spinner = ora({
      text: chalk.cyan(`project ${projectName} creating...`),
      color: 'white'
    }).start();

    const
      isJS = answers[queryMap.lang] === 'javascript',
      isReact = answers[queryMap.ui] === 'react',
      isScss = answers[queryMap.preprocessor] === 'sass/scss',
      answer = {isJS, isReact, isScss};

    // copy dubo.config.js
    utils.copyFile(utils.resolve('packages/templates/dubo.config.js'), cwd);
    utils.replace({
      regMap: {
        '\\[lang\\]': isJS ? 'js' : 'ts',
        '\\[ui\\]': isReact ? 'react' : 'vue',
        '\\[preprocessor\\]': isScss ? 'scss' : 'less',
        '\\[project\\]': projectName,
      },
      src: `${cwd}/dubo.config.js`,
      dist: `${cwd}/dubo.config.js`
    });

    createBuildFolder(answer, projectName, cwd);
    createConfigFolder(answer, projectName, cwd);
    createSrcFolder(answer, projectName, cwd);
    spinner.succeed(chalk.cyan(`project ${projectName} created!`));
  })
}

function createBuildFolder(answer, projectName, cwd) {
  // 判断 build folder 是否存在
  if (!utils.isExist(`${cwd}/build`)) {
    fs.mkdirSync(`${cwd}/build`);
  }

  // copy 构建公共文件
  utils.copyFilesToFolder(utils.resolve('packages/templates/build/common'), `${cwd}/build`);

  // 根据 ui library 选择 copy 对应 loaders
  const loadersUrl = answer.isReact
    ? `packages/templates/build/loaders/react/${answer.isJS ? 'js' : 'ts'}`
    : `packages/templates/build/loaders/vue/${answer.isJS ? 'js' : 'ts'}`;

    utils.copyFilesToFolder(utils.resolve(loadersUrl), `${cwd}/build`);

  // 根据 ui library 选择 copy 对应 plugins
  const pluginsUrl = answer.isReact
    ? `packages/templates/build/plugins/react`
    : `packages/templates/build/plugins/vue`;

    utils.copyFilesToFolder(utils.resolve(pluginsUrl), `${cwd}/build`);

  // 根据 language 和 UI library 改写 webpack.config.js 中的 entry file
  const entrySuffix = answer.isReact
  ? answer.isJS
    ? '.jsx'
    : '.tsx'
  : answer.isJS
    ? '.js'
    : '.ts';

  utils.replace({
    regMap: {
      '\\[entrySuffix\\]': entrySuffix
    },
    src: `${cwd}/build/webpack.config.js`,
    dist: `${cwd}/build/webpack.config.js`
  });
}

function createConfigFolder(answer, projectName, cwd) {
    // copy 公共配置文件
    utils.copyFilesToFolder(utils.resolve('packages/templates/root_config/common'), `${cwd}`);
    
    // copy ui 配置文件
    utils.copyFilesToFolder(utils.resolve(`packages/templates/root_config/${answer.isReact ? 'react' : 'vue'}`), `${cwd}`);

    // copy 语言配置文件
    if (!answer.isJS) {
      utils.copyFilesToFolder(utils.resolve('packages/templates/root_config/ts'), `${cwd}`);
    }
}

function createSrcFolder(answer, projectName, cwd) {
  // 判断 src folder 是否存在
  if (!utils.isExist(`${cwd}/src`)) {
    fs.mkdirSync(`${cwd}/src`);
  }

  // copy common file
  utils.copyFilesToFolder(utils.resolve('packages/templates/src/common'), `${cwd}/src`);

  // copy specific language file
  utils.copyFilesToFolder(utils.resolve(`packages/templates/src/${answer.isReact ? 'react' : 'vue'}/${answer.isJS ? 'js' : 'ts'}`), `${cwd}/src`);

  if (!answer.isReact) {
    // 修改 App.vue 的模板变量
    utils.replace({
      regMap: {
        '\\[preprocessor\\]': answer.isScss ? 'scss' : 'less',
      },
      src: `${cwd}/src/App.vue`,
      dist: `${cwd}/src/App.vue`
    });
  }

  // copy page folder
  createInitPageFile(answer, projectName, cwd);
  // create init components folder
  createInitComponent(answer, projectName, cwd);
  // create style folder
  createStyleFolder(answer, projectName, cwd);
}

function createInitPageFile(answer, projectName, cwd) {
  // 判断 pages/Index folder 是否存在
  if (!utils.isExist(`${cwd}/src/pages/Index`)) {
    fs.mkdirSync(`${cwd}/src/pages/Index`);
  }

  let pageUrl = '';
  let suffix = '';
  if (answer.isReact) {
    if (answer.isJS) {
      if (answer.isScss) {
        pageUrl = '/react/js:scss';
      } else {
        pageUrl = '/react/js:less';
      }
      suffix = '.jsx';
    } else {
      if (answer.isScss) {
        pageUrl = '/react/ts:scss';
      } else {
        pageUrl = '/react/ts:less';
      }
      suffix = '.tsx';
    }
  } else {
    if (answer.isJS) {
      if (answer.isScss) {
        pageUrl = '/vue/js:scss';
      } else {
        pageUrl = '/vue/js:less';
      }
    } else {
      if (answer.isScss) {
        pageUrl = '/vue/ts:scss';
      } else {
        pageUrl = '/vue/ts:less';
      }
    }
    suffix = '.vue';
  }

  utils.copyFilesToFolder(utils.resolve(`packages/templates/page${pageUrl}`), `${cwd}/src/pages/Index`);
  // 修改组件名
  utils.replace({
    regMap: {
      '\\[pageName\\]': 'Index',
    },
    src: `${cwd}/src/pages/Index/index${suffix}`,
    dist: `${cwd}/src/pages/Index/index${suffix}`
  });
}

function createInitComponent(answer, projectName, cwd) {
    let componentUrl = '';
    let suffix = '';
    if (answer.isReact) {
      if (answer.isJS) {
        if (answer.isScss) {
          componentUrl = '/react/js:scss';
        } else {
          componentUrl = '/react/js:less';
        }
        suffix = '.jsx';
      } else {
        if (answer.isScss) {
          componentUrl = '/react/ts:scss';
        } else {
          componentUrl = '/react/ts:less';
        }
        suffix = '.tsx';
      }
    } else {
      if (answer.isJS) {
        if (answer.isScss) {
          componentUrl = '/vue/js:scss';
        } else {
          componentUrl = '/vue/js:less';
        }
      } else {
        if (answer.isScss) {
          componentUrl = '/vue/ts:scss';
        } else {
          componentUrl = '/vue/ts:less';
        }
      }
      suffix = '.vue';
    }
  
    utils.copyFilesToFolder(utils.resolve(`packages/templates/component${componentUrl}/@shared`), `${cwd}/src/components/@shared`);
}

function createStyleFolder(answer, projectName, cwd) {
  utils.copyFilesToFolder(utils.resolve(`packages/templates/styles/${answer.isScss ? 'scss' : 'less'}`), `${cwd}/src/styles`);
  // 修改组件名

  let suffix = '';

  if (answer.isReact) {
    suffix = answer.isJS ? '.jsx' : '.tsx';
  } else {
    suffix = answer.isJS ? '.js' : '.ts';
  }

  utils.replace({
    regMap: {
      '\\[styleSuffix\\]': answer.isScss ? 'scss' : 'less',
    },
    src: `${cwd}/src/index${suffix}`,
    dist: `${cwd}/src/index${suffix}`
  });
}

module.exports = createTemplate;