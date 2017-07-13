const expect = require('chai').expect

const workloadCapacityHelper = require('../helpers/data/workload-capacity-helper')

var workloadOwnerIds = []

describe('View caseload progress flow', () => {
  before(function () {
    return workloadCapacityHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
      })
  })

  it('should navigate to the workload owner caseload progress screen', () => {
    return browser.url('/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      // Check the href for case progress using the id exists
      .click('[href="/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id + '/case-progress"]')
      .waitForExist('.sln-page-subtitle')
      .waitForExist('.js-plotly-plot')
      .getValue('.sln-page-subtitle', function (title) {
        expect(title).to.equal('Offender Manager')
      })
  })
})
