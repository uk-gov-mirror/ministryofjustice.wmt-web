const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds = []
var workloadOwnerId
var workloadOwnerGrade

describe('View overview', function () {
  before(function () {
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results
        workloadOwnerId = workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id
        return results
      })
      .then(function (builtInserts) {
        dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
        .then(function (gradeResult) {
          workloadOwnerGrade = gradeResult
        })
      })
  })

  it('should navigate to the workload owner overview page', function () {
    console.log(workloadOwnerIds)
    return browser.url('/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-grade')
      .getText('.sln-grade')
      .then(function (text) {
        expect(text).to.equal(workloadOwnerGrade)
      })
  })

  it('should navigate to the team overview page', function () {
    return browser.url('/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/offender-manager/' + workloadOwnerIds.filter((item) => item.table === 'workload_owner')[0].id + '/overview"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })

  it('should naviagte to the ldu overview page', function () {
    return browser.url('/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/team/' + workloadOwnerIds.filter((item) => item.table === 'team')[0].id + '/overview"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('LDU')
      })
  })

  it('should naviagte to the region overview page', function () {
    return browser.url('/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/ldu/' + workloadOwnerIds.filter((item) => item.table === 'ldu')[0].id + '/overview"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('Region')
      })
  })

  it('should navigate to the national overview page', function () {
    return browser.url('/hmpps/0/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('[href="/region/' + workloadOwnerIds.filter((item) => item.table === 'region')[0].id + '/overview"]')
      .getText('.sln-table-org-level')
      .then(function (text) {
        expect(text).to.equal('National')
      })
  })
})
