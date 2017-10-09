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
    .waitForExist('#cred_sign_in_button')
    .setValue('#cred_userid_inputtext', username)
    .click('#cred_password_inputtext')
    .keys(password)
    .submitForm('#credentials')
}

var logout = function () {
  return browser.url('/logout')
  .pause(1000)
}

module.exports.login = login
module.exports.logout = logout
module.exports.users = USERS
