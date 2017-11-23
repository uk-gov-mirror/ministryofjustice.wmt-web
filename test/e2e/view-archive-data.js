const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const config = require('../../config')

var adminArchiveURL

describe('View archive data', () => {
  before(function () {
    authenticationHelper.login(authenticationHelper.users.DataAdmin)
    adminArchiveURL = '/archive-data'
    return browser.url(adminArchiveURL).waitForExist('.breadcrumbs')
  })
      describe('should navigate to the archive page', () => {
        it('with the correct breadcrumbs and heading title', () => {
          return browser.url(adminArchiveURL)
            .waitForExist('.breadcrumbs')
            .waitForExist('.sln-page-title')
            .getText('.sln-page-title')
            .then(function (text) {
              expect(text).to.equal('Archive')
            })
        })
    })

    after(function () {
        authenticationHelper.logout()
      })
})