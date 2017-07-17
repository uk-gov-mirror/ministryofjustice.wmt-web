const expect = require('chai').expect

const workloadCapacityHelper = require('../../../helpers/data/workload-capacity-helper')
const getCaseProgress = require('../../../../app/services/data/get-caseload-progress')

var inserts = []

var caseProgressRow = {
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 5,
  warrantsTotal: 30,
  overdueTerminationsTotal: 30,
  unpaidWorkTotal: 30
}

var lduWithOneTeamRow = caseProgressRow

var lduWithTwoTeamsRow = {
  communityLast16Weeks: 20,
  licenseLast16Weeks: 18,
  totalCases: 10,
  warrantsTotal: 60,
  overdueTerminationsTotal: 60,
  unpaidWorkTotal: 60
}

describe('services/data/get-org-unit-caseload-progress', function () {
  before(function (done) {
    workloadCapacityHelper.addCaseProgressDataForAllOrgUnits()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  // TODO check that is it indeed current - no effective_to date
  it('should retrieve current caseload progress for a workload owner', function (done) {
    getCaseProgress(inserts.filter((item) => item.table === 'workload_owner')[0].id, 'offender-manager')
      .then(function (results) {
        var expectedResults =
          [
            caseProgressRow
          ]
        expect(results).to.eql(expectedResults)
        done()
      })
  })

  it('should retrieve current caseload progress for all workload owners on a team with one OM', function (done) {
    var teamWithOneOffenderManager = [
      caseProgressRow
    ]
    getCaseProgress(inserts.filter((item) => item.table === 'team')[1].id, 'team')
      .then(function (results) {
        expect(results.length).to.eql(1)
        expect(results).to.eql(teamWithOneOffenderManager)
        done()
      })
  })

  it('should retrieve current caseload progress for all workload owners on a team with mutiple OMs', function (done) {
    var teamWithMultipleOffenderManagers = [
      caseProgressRow,
      caseProgressRow
    ]
    getCaseProgress(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(teamWithMultipleOffenderManagers)
        done()
      })
  })

  it('should retrieve current caseload progress for all teams in an LDU', function (done) {
    var lduWithMultipleTeams = [
      lduWithTwoTeamsRow,
      lduWithOneTeamRow
    ]
    getCaseProgress(inserts.filter((item) => item.table === 'ldu')[0].id, 'ldu')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(lduWithMultipleTeams)
        done()
      })
  })

  after(function (done) {
    workloadCapacityHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
