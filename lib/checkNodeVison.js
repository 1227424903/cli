const chalk = require('chalk')
const semver = require('semver')
const package = require('./../package.json');
module.exports = (wanted = package.config.node, project = package.name) => {
    if (!semver.satisfies(process.version, wanted)) {
        console.log(chalk.red(
            'You are using Node ' + process.version + ', but this version of ' + project +
            ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
        ))
    }
}