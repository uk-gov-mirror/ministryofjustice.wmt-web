const expect = require('chai').expect

const dataHelper = require('../helpers/data/aggregated-data-helper')

var workloadOwnerIds
var workloadOwnerGrade

describe('View overview', () => {
  before(function () {
    return dataHelper.selectIdsForWorkloadOwner()
      .then(function (results) {
        workloadOwnerIds = results[0]
        return results
      })
      .then(function (results) {
        dataHelper.selectGradeForWorkloadOwner(results[0].id)
        .then(function (gradeResult) {
          workloadOwnerGrade = gradeResult
        })
      })
  })

  it('should navigate to the overview page', () => {
    return browser.url('/offender-manager/' + workloadOwnerIds.id + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-grade')
      .getText('.sln-grade')
      .then(function (text) {
        expect(text).to.equal(workloadOwnerGrade)
      })
  })
})
