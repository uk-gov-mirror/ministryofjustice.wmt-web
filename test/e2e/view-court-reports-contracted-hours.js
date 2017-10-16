const expect = require('chai').expect
const authenticationHelper = require('../helpers/routes/authentication-helper')
const crDataHelper = require('../helpers/data/court-reports-aggregated-data-helper')
const workloadTypes = require('../../app/constants/workload-type')

var workloadOwnerIds = []
var workloadOwnerId
var workloadOwnerDefaultUrl

describe('View contracted hours for court reporter', function () {
  before(function () {
    authenticationHelper.login(authenticationHelper.users.Manager)
    return crDataHelper.selectIdsForCourtReporterWorkloadOwner()
    .then(function (results) {
      workloadOwnerIds = results
      workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
      workloadOwnerDefaultUrl = '/' + workloadTypes.COURT_REPORTS + '/offender-manager/' + workloadOwnerId
    })
  })

  it('should navigate to the court reporter contracted-hours page', function () {
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
  })

  after(function () {
    authenticationHelper.logout()
  })
})
