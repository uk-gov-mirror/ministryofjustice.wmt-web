const wdioConfHelper = require('./helpers/wdio-conf-helper')

exports.config = wdioConfHelper({
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  baseUrl: process.env.WMT_WEB_TEST_BASEURL || 'http://localhost:3000',
  sauceConnect: true,
  capabilities: [{
    maxInstances: 1,
    browserName: 'firefox',
    platform: 'Windows 7',
    version: '17.0'
  }]
})
