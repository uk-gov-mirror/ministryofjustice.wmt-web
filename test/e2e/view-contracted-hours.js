const expect = require('chai').expect
const authenticationHerlp = require('../helpers/routes/authentication-helper')
const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var workloadOwnerId
var workloadOwnerDefaultUrl

describe('View contracted hours', function () {
  before(function () {
    authenticationHerlp.login(authenticationHerlp.users.Manager)
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        workloadOwnerDefaultUrl = '/offender-manager/' + workloadOwnerId
      }).then(function () {
        return browser.url(workloadOwnerDefaultUrl + '/contracted-hours').waitForExist('.breadcrumbs')
      })
  })

  it('should navigate to the workload owner contracted-hours page', function () {
    return browser.url(workloadOwnerDefaultUrl + '/contracted-hours')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-form-action')
      .waitForExist('[href="' + workloadOwnerDefaultUrl + '/overview"]')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should be accessible via the Contracted Hours tab when on any other tab', () => {
    return browser.url(workloadOwnerDefaultUrl + '/overview')
      .waitForExist('.sln-subnav')
      .click('[href="' + workloadOwnerDefaultUrl + '/contracted-hours"]')
      .waitForExist('.sln-form-action')
      .click('[href="' + workloadOwnerDefaultUrl + '/caseload-capacity"]')
      .waitForExist('.sln-subnav')
      .click('[href="' + workloadOwnerDefaultUrl + '/contracted-hours"]')
      .waitForExist('.sln-form-action')
      .click('[href="' + workloadOwnerDefaultUrl + '/case-progress"]')
      .waitForExist('.sln-subnav')
      .click('[href="' + workloadOwnerDefaultUrl + '/contracted-hours"]')
      .waitForExist('.sln-form-action')
  })

  after(function () {
    authenticationHerlp.logout()
  })
})
