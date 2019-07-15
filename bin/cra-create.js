const program = require('commander')
const chalk = require('chalk')

program
  .usage('<component-name> [options]')
  .description('generate a component')
  .option('-d, --dumb', 'dumb components')
  .option('-s, --smart', 'smart components')
  .parse(process.argv)

let componentName = program.args[0]
const {
  smart,
  dumb
} = program

if (!componentName || !(smart || dumb) || (smart && dumb)) {
  program.help()
  return
}

const {
  checkComponentName
} = require('../lib/util')
const generateComponent = require('../lib/generateComponent')

const isHump = checkComponentName(componentName.split('/')[0], smart ? 'S' : 'B')

if (!isHump) {
  process.exit(1)
}

generateComponent(componentName, smart ? 'smart' : 'dumb')
  .then(res => {
    res && res.forEach((item) => {
      console.log(chalk.cyan('🎉 create: ') + item)
    })
  })
  .catch(err => {
    console.log(chalk.red(err))
  })