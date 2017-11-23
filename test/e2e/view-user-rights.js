const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const config = require('../../config')

var adminUserURL
var username = 'John.Doe@' + config.ACTIVE_DIRECTORY_DOMAIN

describe('View adding a new user role', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.SystemAdmin)
    adminUserURL = '/admin/user'
    return browser.url(adminUserURL).waitForExist('.breadcrumbs')
  })

  describe('should navigate to the user rights page', () => {
    it('with the correct breadcrumbs, heading title and roles to select from', () => {
      return browser.url(adminUserURL)
        .waitForExist('.breadcrumbs')
        .setValue('#username', username)
        .submitForm('#userForm')
        .waitForExist('.sln-page-title')
        .getText('.sln-page-title')
        .then(function (text) {
          expect(text).to.equal('User rights')
        })
        .isSelected('#dataAdminRadio')
        .click('#systemAdminRadio')
        .isSelected('#systemAdminRadio')
        .click('#managerRadio')
        .isSelected('#managerRadio')
        .click('#staffRadio')
        .isSelected('#staffRadio')
        .submitForm('#userRightForm')
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
