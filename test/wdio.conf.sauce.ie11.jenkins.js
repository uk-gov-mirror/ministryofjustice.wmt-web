const wdioConfHelper = require('./helpers/wdio-conf-helper')

exports.config = wdioConfHelper({
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  baseUrl: process.env.WMT_BASE_URL || 'http://localhost:3000',
  sauceConnect: true,
  capabilities: [{
    maxInstances: 1,
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '11.0'
  }]
})
