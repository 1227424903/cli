#!/usr/bin/env node

const program = require('commander')
const printLogo = require('./../lib/print')
const checkNodeVison = require('./../lib/checkNodeVison')
const package = require('../package.json')
printLogo()
checkNodeVison()

program.version(package.version)
    .description(package.description)
    .usage('<command> [project-name]')
    .command('init', 'create new app')
    .command('create', 'generate a component')
    .on('--help', () => {
        console.log('Examples:')
        console.log('  $ cra init demo')
        console.log('  $ cra create componentA -d')
        console.log('  $ cra create pageA -s')
    })
    .parse(process.argv)