const path = require('path')
const Handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const ora = require('ora')
const fs = require('fs-extra')
const rm = require('rimraf').sync

module.exports = (data) => {
  const spinner = ora({
    color: 'yellow',
    text: 'Building projects...'
  })
  spinner.start()
  return new Promise((resolve, reject) => {
    const _tempPath = path.join(data.projectRoot, data.tempName)
    const metalsmith = Metalsmith(process.cwd())
      .metadata(data)
      .clean(false)
      .source(_tempPath)
      .destination(data.projectRoot)

    const ignoreFile = path.join(_tempPath, 'templates.ignore')
    if (fs.existsSync(ignoreFile)) {

      metalsmith.use((files, metalsmith, done) => {
        const meta = metalsmith.metadata()

        const ignores = Handlebars.compile(fs.readFileSync(ignoreFile).toString())(meta)
          .split('\n').filter(item => !!item.length)

        Object.keys(files).forEach(fileName => {

          ignores.forEach(ignorePattern => {
            if (fileName.indexOf(ignorePattern) >= 0) {
              delete files[fileName]
            }
          })
        })
        done()
      })
    }
    metalsmith.use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()
      Object.keys(files).forEach(fileName => {
        if (!(/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(fileName))) {
          const t = files[fileName].contents.toString()
          files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
        }
      })
      done()
    }).build(err => {
      rm(_tempPath)
      if (err) {
        spinner.fail()
        reject(err)
      } else {
        spinner.succeed('Successful project construction')
        resolve(data)
      }
    })
  })
}