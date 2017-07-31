const expect = require('chai').expect

const helper = require('../../../helpers/data/aggregated-data-helper')
const getCaseProgress = require('../../../../app/services/data/get-caseload-progress')

var inserts = []

var baseCaseProgressRow = {
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 5,
  warrantsTotal: 30,
  overdueTerminationsTotal: 30,
  unpaidWorkTotal: 30
}

describe('services/data/get-org-unit-caseload-progress', function () {
  before(function (done) {
    helper.addCaseProgressDataForAllOrgUnits()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve current caseload progress for an offender manager', function (done) {
    console.log('workload owner id: ' + inserts.filter((item) => item.table === 'workload_owner')[0].id)
    getCaseProgress(inserts.filter((item) => item.table === 'workload_owner')[0].id, 'offender-manager')
      .then(function (results) {
        var omResults = [
          helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow)
        ]
        expect(results).to.eql(omResults)
        done()
      })
  })

  it('should retrieve current caseload progress for all workload owners on a team with one OM', function (done) {
    var teamWithOneOffenderManager = [
      helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow)
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
      helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow),
      helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow)
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
      helper.rowGenerator('Test Team', baseCaseProgressRow, 2),
      helper.rowGenerator('Test Team', baseCaseProgressRow)
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
      helper.rowGenerator('Test Team', baseCaseProgressRow)
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
      helper.rowGenerator('Test LDU', baseCaseProgressRow, 3),
      helper.rowGenerator('Test LDU', baseCaseProgressRow)
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
        expect(results).to.contain(helper.rowGenerator('Test Region', baseCaseProgressRow, 4))
        expect(results).to.contain(helper.rowGenerator('Test Region', baseCaseProgressRow))
        done()
      })
  })

  after(function (done) {
    helper.removeInsertedData(inserts)
      .then(() => done())
  })
})
