const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerId
var workloadOwnerGrade

describe('View overview', function () {
  before(function () {
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        var workloadOwnerIds = results.filter((item) => item.table === 'workload_owner')
        workloadOwnerId = workloadOwnerIds[0].id
        return results
      })
      .then(function (results) {
        dataHelper.selectGradeForWorkloadOwner(workloadOwnerId)
        .then(function (gradeResult) {
          workloadOwnerGrade = gradeResult
        })
      })
  })

  it('should navigate to the overview page', function () {
    return browser.url('/offender-manager/' + workloadOwnerId + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-grade')
      .getText('.sln-grade')
      .then(function (text) {
        expect(text).to.equal(workloadOwnerGrade)
      })
  })
})
