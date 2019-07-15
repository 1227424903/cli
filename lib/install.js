const {
  execSync
} = require('child_process')
const chalk = require('chalk')
module.exports = (root) => {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.green('>')} Install dependencies`)

    try {
      execSync(`cd ${root} && npm i`, {
        stdio: 'inherit'
      })
      resolve(root)
    } catch (error) {
      console.log('-------------------------------------------')
      console.log(`${chalk.red('install failed, please try again')}${chalk.yellow('npm install')}`)
      console.log('-------------------------------------------')
      reject(error)
    }
  })
}