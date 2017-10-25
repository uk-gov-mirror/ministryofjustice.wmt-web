const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')

var adminURL

describe('View admin role', () => {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.DataAdmin)
    adminURL = '/admin'
    return browser.url(adminURL).waitForExist('.breadcrumbs')
  })

  describe('should navigate to the admin page', () => {
    it('with the correct breadcrumbs and heading title', () => {
      return browser.url(adminURL)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-page-title')
        .getText('.sln-page-title')
        .then(function (text) {
          expect(text).to.equal('Admin')
        })
    })
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
