#!/usr/bin/env node

const program = require('commander')
//const checkPackageVersion = require('../lib/checkPackageVersion')
//const package = require('../package.json')


program.usage('<project-name>').parse(process.argv)

const projectName = program.args[0]
if (!projectName) {
    program.help()
    return
}

// checkPackageVersion(packageName, () => {
//     main()
//   })

const generateProjectName = require('../lib/generateProject')
const download = require('../lib/download')
const generator = require('../lib/generateTemplate')
const install = require('../lib/install')
const end = require('../lib/end')
const inquirer = require('../lib/inquirer')

const main = async () => {

    const projectData = await generateProjectName(projectName)

    const inquirerData = await inquirer()

    const downData = await download(projectName)

    const {
        projectRoot
    } = await generator({
        ...projectData,
        ...inquirerData,
        ...downData
    })

    //await install(projectRoot)

    end(projectRoot)
}
main()