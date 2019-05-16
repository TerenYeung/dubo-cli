#!/usr/bin/env node
const
  chalk = require('chalk'),
  version = require('../package.json').version,
  program = require('commander'),
  initialize = require('../packages/commands/initialize'),
  createPage = require('../packages/commands/createPage'),
  createComponent = require('../packages/commands/createComponent')

program
  .version(version, '-v, --version')
  .description('Dubo CLI is the Standard Tooling for Mobile Web Development.');

program
  .command('init [project]')
  .description('initialize dubo project')
  .action(project => {
    const projectName = project || 'dubo';
    initialize(projectName);
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

program.parse(process.argv);