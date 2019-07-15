const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')
const TEMP = '.download-temp'


module.exports = (target) => {
  target = path.join(target || '.', TEMP)
  const spinner = ora({
    color: 'yellow',
    text: 'Downloading template file...'
  })
  spinner.start()
  return new Promise((resolve, reject) => {
    download(`1227424903/react-template#master`, target, (err) => {
      if (err) {
        spinner.fail()
        reject(err)
      } else {
        spinner.succeed('Template file is downloaded successfully')
        resolve({
          tempName: TEMP
        })
      }
    })
  })
}