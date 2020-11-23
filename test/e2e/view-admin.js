const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')

let adminURL
let workloadPointsURL

describe('View admin role', () => {
  before(function () {
    authenticationHelper.login(authenticationHelper.users.DataAdmin)
    adminURL = '/admin'
    workloadPointsURL = '/admin/workload-points'
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

    it('with the correct breadcrumbs and heading title', () => {
      return browser.url(adminURL)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-page-title')
        .waitForExist('.sln-page-title')
        .click('[href="' + workloadPointsURL + '"')
    })
  })

  after(function () {
    authenticationHelper.logout()
  })
})
