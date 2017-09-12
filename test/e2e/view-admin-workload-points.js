const expect = require('chai').expect

var workloadPointsUrl = '/admin/workload-points'

describe('View / edit Workload Points', () => {
  describe('should navigate to the admin workload points screen', () => {
    it('with the correct breadcrumbs and headings', () => {
      return browser.url(workloadPointsUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-page-title')
        .getText('.sln-page-title')
        .then(function (text) {
          expect(text).to.equal('Workload Points')
        })
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('Admin')
        })
    })

    it('with the correct tabs and elements', () => {
      return browser.url(workloadPointsUrl)
        .waitForExist('[href="#custody"]')
        // .getText('.sln-page-subtitle')
        // .then(function (text) {
        //   expect(text).to.equal('Offender Manager')
        // })
        // .waitForExist('.sln-table-caseload')
        // .click('[href="#license"]')
        // .waitForExist('.sln-table-caseload')
        // .click('[href="#community"]')
        // .waitForExist('.sln-table-caseload')
        // .click('[href="#other"]')
        // .waitForExist('.sln-table-caseload')

        // Check for all required tabs
        // .waitForExist('.js-plotly-plot')
        // .waitForExist('.sln-page-subtitle')
        // .getText('.sln-page-subtitle')
        // .then(function (text) {
        //   expect(text).to.equal('Offender Manager')
        // })
    })
  })
})
