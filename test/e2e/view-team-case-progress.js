const expect = require('chai').expect

const workloadCapacityHelper = require('../helpers/data/aggregated-data-helper')

var teamId

describe('View Team overview', function () {
  before(function () {
    return workloadCapacityHelper.getTeamId()
      .then(function (result) {
        teamId = result.id
      })
  })

  it('should display case progress for team', function () {
    return browser.url('/team/' + teamId + '/overview')
      .waitForExist('.breadcrumbs')
      .waitForExist('.sln-subnav')
      .waitForExist('.sln-page-subtitle')
      .waitForExist('.data-table')
      .getText('.sln-page-subtitle')
      .then(function (text) {
        expect(text).to.equal('Team')
      })
  })
})
