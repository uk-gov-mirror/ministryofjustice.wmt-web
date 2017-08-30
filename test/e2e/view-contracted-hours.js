const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var workloadOwnerId
var workloadOwnerDefaultUrl

describe('View overview', function () {
  before(function () {
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        workloadOwnerDefaultUrl = '/offender-manager/' + workloadOwnerId
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
})
