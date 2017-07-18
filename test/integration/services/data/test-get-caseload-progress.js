const expect = require('chai').expect

const workloadCapacityHelper = require('../../../helpers/data/workload-capacity-helper')
const getCaseProgress = require('../../../../app/services/data/get-caseload-progress')

var inserts = []

var omCaseProgressRow = {
  name: 'Test_Forename Test_Surname',
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 5,
  warrantsTotal: 30,
  overdueTerminationsTotal: 30,
  unpaidWorkTotal: 30
}

var teamCaseProgressRow = {
  name: 'Test Team',
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 5,
  warrantsTotal: 30,
  overdueTerminationsTotal: 30,
  unpaidWorkTotal: 30
}

var teamWithTwoOmRow = {
  name: 'Test Team',
  communityLast16Weeks: 20,
  licenseLast16Weeks: 18,
  totalCases: 10,
  warrantsTotal: 60,
  overdueTerminationsTotal: 60,
  unpaidWorkTotal: 60
}

var lduCaseProgressRow = {
  name: 'Test LDU',
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 5,
  warrantsTotal: 30,
  overdueTerminationsTotal: 30,
  unpaidWorkTotal: 30
}

var lduWithTwoTeamsRow = {
  name: 'Test LDU',
  communityLast16Weeks: 30,
  licenseLast16Weeks: 27,
  totalCases: 15,
  warrantsTotal: 90,
  overdueTerminationsTotal: 90,
  unpaidWorkTotal: 90
}

var regionCaseProgressRow = {
  name: 'Test Region',
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 5,
  warrantsTotal: 30,
  overdueTerminationsTotal: 30,
  unpaidWorkTotal: 30
}

var regionWithTwoLdusRow = {
  name: 'Test Region',
  communityLast16Weeks: 40,
  licenseLast16Weeks: 36,
  totalCases: 20,
  warrantsTotal: 120,
  overdueTerminationsTotal: 120,
  unpaidWorkTotal: 120
}

describe('services/data/get-org-unit-caseload-progress', function () {
  before(function (done) {
    workloadCapacityHelper.addCaseProgressDataForAllOrgUnits()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve current caseload progress for an offender manager', function (done) {
    getCaseProgress(inserts.filter((item) => item.table === 'workload_owner')[0].id, 'offender-manager')
      .then(function (results) {
        var omResults =
          [
            omCaseProgressRow
          ]
        expect(results).to.eql(omResults)
        done()
      })
  })

  it('should retrieve current caseload progress for all workload owners on a team with one OM', function (done) {
    var teamWithOneOffenderManager = [
      omCaseProgressRow
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
      omCaseProgressRow,
      omCaseProgressRow
    ]
    getCaseProgress(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(teamWithMultipleOffenderManagers)
        done()
      })
  })

  it('should retrieve current caseload progress for all teams in an LDU with multiple teams', function (done) {
    var lduWithMultipleTeams = [
      teamWithTwoOmRow,
      teamCaseProgressRow
    ]
    getCaseProgress(inserts.filter((item) => item.table === 'ldu')[0].id, 'ldu')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(lduWithMultipleTeams)
        done()
      })
  })

  it('should retrieve current caseload progress for all teams in an LDU with one team', function (done) {
    var lduWithOneTeam = [
      teamCaseProgressRow
    ]
    getCaseProgress(inserts.filter((item) => item.table === 'ldu')[1].id, 'ldu')
      .then(function (results) {
        expect(results.length).to.eql(1)
        expect(results).to.eql(lduWithOneTeam)
        done()
      })
  })

  it('should retrieve current caseload progress for all LDUs in a region', function (done) {
    var regionWithTwoLdus = [
      lduWithTwoTeamsRow,
      lduCaseProgressRow
    ]
    getCaseProgress(inserts.filter((item) => item.table === 'region')[0].id, 'region')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(regionWithTwoLdus)
        done()
      })
  })

  it('should retrieve current caseload progress for all regions in the system', function (done) {
    getCaseProgress(undefined, 'hmpps')
      .then(function (results) {
        expect(results.length).to.be.greaterThan(1)
        expect(results).to.contain(regionWithTwoLdusRow)
        expect(results).to.contain(regionCaseProgressRow)
        done()
      })
  })

  after(function (done) {
    workloadCapacityHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
