const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const ora = require('ora')

module.exports = (projectName) => {
  const isExistsDir = fs.existsSync('node_modules')

  if (isExistsDir) {
    console.log(chalk.red('you shoud generate the project in a folder without dir of node_modules'))
    process.exit(1)
  }


  let next = undefined
  let rootName = path.basename(process.cwd())
  const fileList = glob.sync('*')
  const spinner = ora({
    color: 'yellow',
    text: 'Creating directory...'
  })

  if (fileList.length) {
    if (fileList.filter(name => {
        const fileName = path.resolve(process.cwd(), name)
        const isDir = fs.statSync(fileName).isDirectory()
        return name === projectName && isDir
      }).length !== 0) {
      spinner.fail(`Project ${projectName} already exists`)
      process.exit(1)
    }
    next = Promise.resolve({
      projectRoot: path.resolve(process.cwd(), projectName),
      name: projectName
    })
  } else if (rootName === projectName) {
    next = inquirer.prompt([{
      name: 'build',
      message: 'do you want to generate the project under this folder?',
      type: 'confirm',
      default: true
    }]).then(answer => {
      return Promise.resolve({
        projectRoot: path.resolve(process.cwd(), answer.build ? '.' : projectName),
        projectName
      })
    })
  } else {
    next = Promise.resolve({
      projectRoot: path.resolve(process.cwd(), projectName),
      name: projectName
    })
  }
  return next
}