const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const {
  CONFIG
} = require('../config/index')
const {
  checkLoaderType
} = require('../lib/util')

module.exports = (name, type) => {
  const _templatePath = path.join(__dirname, '../templates/component')
  const _srcPath = path.join(process.cwd(), CONFIG.sourceBase)

  return new Promise((resolve, reject) => {
    const nameArr = name.split('/')
    const lastName = nameArr.pop()
    let hsPath = undefined
    try {
      hsPath = fs.statSync(_srcPath)
    } catch (error) {}
    if (!hsPath || !hsPath.isDirectory()) {
      reject('Please run the command in the project root directory')
    }

    const _componentDir = type === 'smart' ? CONFIG.smartPath : CONFIG.dumbPath
    const _targetPath = path.join(_srcPath, _componentDir, name)
    try {
      fs.statSync(_targetPath)
      reject('Component already exists')
    } catch (error) {}

    const cssPre = checkLoaderType(process.cwd())
    if (!cssPre) {
      reject('warning：css loader is needed')
    }

    const pathArr = []
    const metalsmith = Metalsmith(process.cwd())
      .metadata({
        componentName: lastName.slice(0, 1).toLowerCase() + lastName.slice(1),
        componentNameUP: lastName.slice(0, 1).toUpperCase() + lastName.slice(1),
        cssPre,
        [cssPre]: true
      })
      .clean(false)
      .source(_templatePath)
      .destination(_targetPath)

    metalsmith.use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()

      Object.keys(files).forEach(fileName => {
        const t = files[fileName].contents.toString()
        const n = Handlebars.compile(fileName)(meta)
        delete files[fileName]
        files[n] = {
          contents: Buffer.from(Handlebars.compile(t)(meta))
        }
        pathArr.push(path.join(CONFIG.sourceBase, _componentDir, name, n))
      })

      done()
    }).build(err => {
      if (err) {
        reject(err)
      } else {
        resolve(pathArr)
      }
    })
  })
}