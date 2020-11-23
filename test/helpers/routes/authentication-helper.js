const config = require('../../../config')

const USERS = {
  DataAdmin: 'Data.AdminTest',
  SystemAdmin: 'System.AdminTest',
  Manager: 'Manager.Test',
  Staff: 'Staff.Test'
}

const login = function (user) {
  const password = process.env.WMT_E2E_TEST_PWD
  const username = user + '@' + config.ACTIVE_DIRECTORY_DOMAIN

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

const logout = function () {
  return browser.url('/logout')
    .pause(1000)
}

module.exports.login = login
module.exports.logout = logout
module.exports.users = USERS
