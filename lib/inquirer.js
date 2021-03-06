const inquirer = require('inquirer')
const {
  formatFeatures
} = require('./util')
const defaultChoices = ['React-router', 'Redux', 'Scss']

module.exports = async () => {
  let next = undefined
  const _data = {}

  /* default or select */
  const presetPrompt = [{
    type: 'list',
    message: 'Please pick a preset:',
    name: 'preset',
    choices: [{
        name: `default (${formatFeatures(defaultChoices)})`,
        value: 0
      },
      {
        name: 'Manually select features',
        value: 1
      }
    ]
  }]
  const {
    preset
  } = await inquirer.prompt(presetPrompt)

  if (!preset) {
    // default value
    return Promise.resolve({
      router: true,
      redux: true,
      scss: true,
      mobile: false
    })
  }

  /* check */
  const featuresPrompt = [{
    type: "checkbox",
    message: "Check the features needed for your project:",
    name: "features",
    choices: [{
        name: "CSS Pre-processors",
        value: 'cssPre',
        checked: true
      },
      {
        name: "react-router",
        value: 'router'
      },
      {
        name: "redux",
        value: 'redux'
      },
      {
        name: "flexible (rem)",
        value: 'mobile'
      },
      {
        name: "PWA (Progressive Web App)",
        value: 'pwa'
      }
    ]
  }]
  const {
    features
  } = await inquirer.prompt(featuresPrompt)

  features.forEach((currentValue) => {
    _data[currentValue] = true
  })

  if (!_data.cssPre) {
    next = Promise.resolve(_data)
    return next
  }

  /* CSS Pre-processors */
  const cssPrePrompt = [{
    type: 'list',
    message: 'Pick a CSS pre-propcessor (PostCSS, Autoprefixer and CSS Modules are supported by default):',
    name: 'cssPre',
    choices: [{
        name: 'Sacc/SCSS',
        value: 'scss'
      },
      {
        name: 'Less',
        value: 'less'
      },
      {
        name: 'Stylus',
        value: 'stylus'
      }
    ]
  }]
  const {
    cssPre
  } = await inquirer.prompt(cssPrePrompt)

  _data[cssPre] = true
  next = Promise.resolve(_data)

  return next
}