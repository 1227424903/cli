const path = require('path')
const chalk = require('chalk')

exports.formatFeatures = (features, lead, joiner) => {
  return features.map(dep => {
    return `${lead || ''}${chalk.yellow(dep)}`
  }).join(joiner || ', ')
}

exports.checkComponentName = (name, type) => {
  let _state = false
  switch (type) {
    case 'B':
      _state = /^[A-Z]+/.test(name);
      !_state && console.log(chalk.red('Please use UpperCamelCase'))
      break;
    case 'S':
      _state = /^[a-z]+/.test(name);
      !_state && console.log(chalk.red('Please use lowerCamelCase'))
      break;
    default:
      _state = false;
      !_state && console.log(chalk.red('Please use CamelCase'))
      break;
  }

  return _state
}