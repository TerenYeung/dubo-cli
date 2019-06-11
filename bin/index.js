#!/usr/bin/env node
const
  chalk = require('chalk'),
  semver = require('semver'),
  request = require('request'),
  version = require('../package.json').version,
  program = require('commander'),
  minimist = require('minimist'),
  initialize = require('../packages/commands/initialize'),
  createPage = require('../packages/commands/createPage'),
  createComponent = require('../packages/commands/createComponent'),
  pull = require('../packages/commands/pull'),
  ora = require('ora'),
  config = require('../packages/commands/config');

// 检查Node版本
if (!semver.gte(process.version, '9.0.0')) {
  console.log(
    chalk.red(
      `你使用的node版本${process.version}, ` +
        'dubo-cli 依赖 node 9.x 或以上版本，请升级本地的 node 环境\n'
    )
  )
}

// check version
function checkVersion(done) {
  const spinner = ora({
    text: chalk.green(`checking version...`),
  }).start();

  request({
    url: 'https://registry.npmjs.org/dubo-cli',
    timeout: 1000
  }, (err, res, body) => {
    spinner.stop();
    if (!err & res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = version
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of dubo-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }
    }
    done()
  })
}

function help() {
  console.log('')
  console.log(' How to use:')
  console.log(` If you want to use ${chalk.cyan('imgcook')}, you need run ${chalk.yellow('dubo config set')} to init config folder at first time. Command dubo equals dubo-cli.`)
  console.log()
  console.log('   - dubo config ls   查看配置')
  console.log('   - dubo config set  设置配置')
  console.log('   - dubo config --get <key>  从配置中获取值')
  console.log('   - dubo config --set <key> <value> 设置单个配置')
  console.log('   - dubo config remove  移除配置')
  console.log('   - dubo config --json 输出json值')
  console.log('   - dubo init [project]  初始化一个dubo项目')
  console.log('   - dubo page [page] 生成一个新页面')
  console.log('   - dubo component [component] 生成一个新的component')
  console.log('   - dubo pull <moduleid> [--path <path> <imgPath>] 从imgcook上拉取代码, 默认当前路径, path指定文件路径, imgPath指定图片路径')
  console.log()
}

// Config
program
  .command('config [value]')
  .description('inspect and modify the imgcook config')
  .option('--get <key>', 'Get value from option')
  .option('--set <key> <value>', 'Set option value')
  .option('remove', 'Remove config file')
  .option('--json', 'Outputs JSON result only')
  .allowUnknownOption()
  .action(async (value, cmd) => {
    config(value, minimist(process.argv.slice(3)));
  })

program
  .command('init [project]')
  .description('initialize dubo project')
  .action(project => {
    checkVersion(() => {
      const projectName = project || 'dubo';
      initialize(projectName);
    })
  })

program
  .command('page [page]')
  .description('create new page')
  .action(pageName => {
    if (!pageName) {
      console.log( chalk.red('😭 page name cannot be empty!'));
      process.exit(0);
    } else {
      createPage(pageName);
    }
  })

program
  .command('component [component]')
  .description('create new component')
  .action(component => {
    if (!component) {
      console.log( chalk.red('😭 component name cannot be empty!'));
      process.exit(0);
    } else {
      createComponent(component);
    }
  })

program
  .command('pull <moduleid>')
  .description('pull module code from imgcook')
  .option('-p, --path <path> <imgPath>', 'Absolute or relative path, current path default')
  .allowUnknownOption()
  .action(async (value, cmd) => {
    pull(value, cmd, minimist(process.argv.slice(3)))
  })

program
  .command('help')
  .description('more help info')
  .allowUnknownOption()
  .action(async () => {
    help()
  })


program
  .version(version, '-v, --version')
  .usage('<command> [options]')
  .description('Dubo CLI is the Standard Tooling for Mobile Web Development.')

program.parse(process.argv)

// no cmd output help
if (!process.argv.slice(2).length) {
  program.outputHelp()
}