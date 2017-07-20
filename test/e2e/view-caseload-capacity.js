const expect = require('chai').expect

const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')

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
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id + '/caseload-capacity"]')
      .waitForExist('[href="/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id + '/case-progress"]')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should navigate to the team caseload capacity screen', () => {
    return browser.url('/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/caseload-capacity"]')
      .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/case-progress"]')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })

  it('should navigate to the ldu caseload capacity screen', () => {
    return browser.url('/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/caseload-capacity')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/caseload-capacity"]')
      .waitForExist('[href="/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/case-progress"]')
      .waitForExist('.plot-container.plotly')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('LDU')
      })
  })

  it('should navigate to the region caseload capacity screen', () => {
    return browser.url('/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/caseload-capacity')
    .waitForExist('.breadcrumbs')
    .waitForExist('.sln-subnav')
    .waitForExist('[href="/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/caseload-capacity"]')
    .waitForExist('[href="/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/case-progress"]')
    .waitForExist('.plot-container.plotly')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Region')
      })
  })

  it('should navigate to the national caseload capacity screen', () => {
    return browser.url('/hmpps/0/caseload-capacity')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/hmpps/0/caseload-capacity"]')
      .waitForExist('[href="/hmpps/0/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .waitForExist('.breadcrumbs', true)
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })
})
