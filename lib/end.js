const chalk = require('chalk')
const log = console.log

module.exports = function (target) {
  log('')
  log(chalk.bold.white('Welcome to use:'))
  log('   Issues: ' + chalk.green(`https://github.com/issues`))
  log('   Update log: ' + chalk.green(`https://github.com/`))
  log(chalk.bold.white('We suggest that you begin by typing:'))
  log(`   cd ${target}`)
  log(`   npm start`)
  log('')
}