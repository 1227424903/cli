const chalk = require('chalk')
const version = require('../package.json').version
const log = console.log

module.exports = () => {
    log('-----------------------------------------------------------')
    log(chalk.blue('                                      .__  .__ '))
    log(chalk.blue('     ________________            ____ |  | |__|'))
    log(chalk.blue('   _/ ___\\_  __ \\__  \\         _/ ___\\|  | |  |'))
    log(chalk.blue('   \\  \\___|  | \\// __ \\_       \\  \\___|  |_|  |'))
    log(chalk.blue('    \\___   >__| (____  /        \\___  >____/__|'))
    log(chalk.blue('        \\/           \\/             \\/            '))
    log('-----------------------------------------------------------')
    log(chalk.cyan('cra-cli   ' + `v${version}`))
    log('-----------------------------------------------------------')
}