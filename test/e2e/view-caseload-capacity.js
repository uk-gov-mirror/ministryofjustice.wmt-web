const expect = require('chai').expect

const workloadCapacityHelper = require('../helpers/data/workload-capacity-helper')

var workloadOwnerIds = []

describe('View your caseload capacity flow', () => {
  before(function () {
    return workloadCapacityHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
      })
  })

  it('should navigate to the workload owner caseload capacity screen', () => {
    return browser.url('/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.heading-secondary')
      .getValue('.heading-secondary', function (title) {
        expect(title).to.contains('Offender Manager Capacity')
      })
  })

  it('should navigate to the ldu caseload capacity screen', () => {
    return browser.url('/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.heading-secondary')
      .getValue('.heading-secondary', function (title) {
        expect(title).to.contains('Ldu Capacity')
      })
  })

  it('should navigate to the region caseload capacity screen', () => {
    return browser.url('/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/caseload-capacity')
    .waitForExist('.breadcrumbs')
    .waitForExist('.plot-container.plotly')
    .waitForExist('.heading-secondary')
    .getValue('.heading-secondary', function (title) {
      expect(title).to.equal('Region Capacity')
    })
  })

  it('should navigate to the team caseload capacity screen', () => {
    return browser.url('/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.heading-secondary')
      .getValue('.heading-secondary', function (title) {
        expect(title).to.equal('Team Capacity')
      })
  })
})
