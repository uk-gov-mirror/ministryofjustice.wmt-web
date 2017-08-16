const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var teamCaseloadUrl

describe('View your caseload flow', () => {
  before(function () {
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        teamCaseloadUrl = '/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/caseload'
      })
  })

  describe('should navigate to the team caseload screen', () => {
    it('with the correct breadcrumbs, subnav and title', () => {
      return browser.url(teamCaseloadUrl)
        .waitForExist('.breadcrumbs')
        .waitForExist('.sln-subnav')
        .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/overview"]')
        .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/caseload-capacity"]')
        .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/case-progress"]')
        .waitForExist('.sln-page-subtitle')
        .getText('.sln-page-subtitle')
        .then(function (text) {
          expect(text).to.equal('Team')
        })
    })

    it('with the correct tabs and tables', () => {
      return browser.url(teamCaseloadUrl)
        .waitForExist('[href="#overall"]')
        .waitForExist('.sln-table-caseload')
        .waitForExist('[href="/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id)
        .click('[href="#custody"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="#community"]')
        .waitForExist('.sln-table-caseload')
        .click('[href="#license"]')
        .waitForExist('.sln-table-caseload')
    })
  })
})
