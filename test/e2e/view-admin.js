const expect = require('chai').expect

var adminURL

describe('View admin role', () => {
  before(function () {
    adminURL = '/admin'
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
})
