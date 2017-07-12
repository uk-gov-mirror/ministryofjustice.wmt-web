const expect = require('chai').expect

const workloadCapacityHelper = require('../helpers/data/workload-capacity-helper')

var inserts = []

describe('View your caseload capacity flow', () => {
  before(function () {
    return workloadCapacityHelper.selectIdsForWorkloadOwner()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should navigate to the workload owner caseload capacity screen', () => {
    return browser.url('/offender-manager/' + inserts.filter((item) => item.table === 'workload_owner')[0].id + '/caseload-capacity')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.heading-large')
      .getValue('.heading-large', function (title) {
        expect(title).to.equal('Offender Manager Capacity')
      })
  })

  it('should navigate to the ldu caseload capacity screen', () => {
    return browser.url('/ldu/' + inserts.filter((item) => item.table === 'ldu')[0].id + '/caseload-capacity')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.heading-large')
      .getValue('.heading-large', function (title) {
        console.log(title)
        expect(title).to.equal('Ldu Capacity')
      })
  })

  it('should navigate to the region caseload capacity screen', () => {
    return browser.url('/region/' + inserts.filter((item) => item.table === 'region')[0].id + '/caseload-capacity')
    .waitForExist('.plot-container.plotly')
    .waitForExist('.heading-large')
    .getValue('.heading-large', function (title) {
      expect(title).to.equal('Region Capacity')
    })
  })

  it('should navigate to the team caseload capacity screen', () => {
    return browser.url('/team/' + inserts.filter((item) => item.table === 'team')[0].id + '/caseload-capacity')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.heading-large')
      .getValue('.heading-large', function (title) {
        expect(title).to.equal('Team Capacity')
      })
  })
})
