/**
 * img-cook 官方plugin 用来处理工程目录
 * 示例：https://github.com/imgcook/imgcook-cli/tree/master/packages/%40imgcook/cli-plugin-generate
 */

const
  fse = require('fs-extra'),
  chalk = require('chalk');

const generatePlugin = async (value, option) => {
  await fse.writeFile(
    `${option.filePath}/${option.panelName}`,
    value,
    'utf8'
  )
  return {
    ...option,
    message: 'succeed',
  }
}

module.exports = (...args) => {
  return generatePlugin(...args).catch(err => {
    console.log(chalk.red(err))
  })
}