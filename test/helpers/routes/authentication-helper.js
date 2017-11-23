const config = require('../../../config')

var USERS = {
  DataAdmin: 'Data.AdminTest',
  SystemAdmin: 'System.AdminTest',
  Manager: 'Manager.Test',
  Staff: 'Staff.Test'
}

var login = function (user) {
  var password = process.env.WMT_E2E_TEST_PWD
  var username = user + '@' + config.ACTIVE_DIRECTORY_DOMAIN

  return browser.url('/login')
    .waitForExist('#i0116')
    .setValue('#i0116', username)
    .click('#idSIButton9')
    .pause(1000)
    .setValue('#i0118', password)
    .pause(1000)
    .click('#idSIButton9')
    .pause(1000)
    .click('#idSIButton9')
}

var logout = function () {
  return browser.url('/logout')
  .pause(1000)
}

module.exports.login = login
module.exports.logout = logout
module.exports.users = USERS
