const appConfig = require('../config.js')

exports.config = {
  specs: ['./test/e2e/**/*.js'],
  exclude: [],
  maxInstances: 1,
  baseUrl: appConfig.BASE_URL,
  capabilities: [{
    maxInstances: 1,
    browserName: 'phantomjs'
  }],
  sync: false,
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 500000
  }
}
