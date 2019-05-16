const
  fs = require('fs'),
  utils = require('../lib'),
  path = require('path'),
  createTemplate = require('../lib/createTemplate'),
  ora = require('ora'),
  chalk = require('chalk'),
  inquirer = require('inquirer'),
  figlet = require('figlet')

function initialize(projectName) {
  figlet('Dubo CLI ···', (err, data) => {
    if (err) {
      console.log(chalk.red(`😑 Something went wrong at ${err}`));
      return false;
    }

    const
      welcomeText = chalk.blue(data),
      initialText = chalk.cyan('🥝 Initializing', chalk.underline.yellow(projectName), 'project...')

    console.log(welcomeText);
    console.log(initialText);
    console.log('\n');
    initProject(projectName);
  })
}

let spinner = null;

function initProject(projectName) {
  const cwd = path.resolve(process.cwd(), projectName);

  if (utils.isExist(projectName)) {
    inquirer
      .prompt({
        name: 'overwrite',
        type: 'confirm',
        message: `project ${projectName} alreay existed, are you sure to overwrite ?`,
        validate: input => {
          if (input.toLowerCase() !== 'y' && input.toLowerCase() !== 'n') {
            return 'please input y/N !'
          }
          return true;
        }
      })
      .then(answers => {
        if (answers.overwrite) {
          spinner = ora({
            text: chalk.red(`previous ${projectName} folder removing...`),
            color: 'white'
          }).start();


          utils.removeFolder(cwd);
          fs.mkdirSync(cwd);
          spinner.stop();
          createTemplate(projectName);
        }
      })
  } else {
    fs.mkdirSync(cwd);
    createTemplate(projectName);
  }
}

module.exports = initialize;