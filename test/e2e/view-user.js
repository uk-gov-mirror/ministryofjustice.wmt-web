const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')

var adminUserURL

describe('View adding a new user role', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.SystemAdmin)
    adminUserURL = '/admin/user'
    return browser.url(adminUserURL).waitForExist('.breadcrumbs')
  })

  describe('should navigate to the user page', () => {
    it('with the correct breadcrumbs and heading title', () => {
      return browser.url(adminUserURL)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-page-title')
        .getText('.sln-page-title')
        .then(function (text) {
          expect(text).to.equal('User rights')
        })
    })

    it('and submit a form with a valid username', () => {
      browser.setValue('#username', 'John.Doe')
      browser.submitForm('#userForm')
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
