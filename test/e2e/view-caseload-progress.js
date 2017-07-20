const expect = require('chai').expect

const caseProgressDataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []

describe('View caseload progress flow', () => {
  before(function () {
    return caseProgressDataHelper.selectIdsForWorkloadOwner()
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
      .waitForExist('.js-plotly-plot')
      .waitForExist('.sln-page-subtitle')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Offender Manager')
      })
  })

  it('should navigate to the team caseload progress screen', () => {
    return browser.url('/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/case-progress')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/caseload-capacity"]')
      .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })

  it('should navigate to the ldu caseload progress screen', () => {
    return browser.url('/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/case-progress')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/caseload-capacity"]')
      .waitForExist('[href="/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('LDU')
      })
  })

  it('should navigate to the region caseload progress screen', () => {
    return browser.url('/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/case-progress')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/caseload-capacity"]')
      .waitForExist('[href="/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Region')
      })
  })

  it('should navigate to the national caseload progress screen', () => {
    return browser.url('/hmpps/0/case-progress')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/hmpps/0/caseload-capacity"]')
      .waitForExist('[href="/hmpps/0/case-progress"]')
      .waitForExist('.js-plotly-plot')
      .waitForExist('.breadcrumbs', true)
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })
})
