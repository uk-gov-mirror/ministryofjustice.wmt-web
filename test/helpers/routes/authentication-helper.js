const config = require('../../../config')

const USERS = {
  DataAdmin: 'test.E2E.DataAdmin',
  SystemAdmin: 'test.E2E.SystemAdmin',
  Manager: 'test.E2E.Manager',
  Staff: 'test.E2E.Staff'
}

const login = async function (user) {
  let submit
  const password = process.env.WMT_E2E_TEST_PWD
  const username = user + '@' + config.ACTIVE_DIRECTORY_DOMAIN

  await browser.url('/')

  // Username
  const usernameInput = await $('#i0116')
  submit = await $('#idSIButton9')
  await usernameInput.setValue(username)
  await submit.click()

  await browser.pause(2000)
  // Password
  const passwordInput = await $('#i0118')
  submit = await $('#idSIButton9')
  await passwordInput.setValue(password)
  await submit.click()
  await browser.pause(2000)
}

const logout = async function () {
  await browser.url('/logout')
  await browser.pause(1000)
}

module.exports.login = login
module.exports.logout = logout
module.exports.users = USERS
