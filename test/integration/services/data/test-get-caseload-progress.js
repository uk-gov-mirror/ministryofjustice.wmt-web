const expect = require('chai').expect

const helper = require('../../../helpers/data/aggregated-data-helper')
const getCaseProgress = require('../../../../app/services/data/get-caseload-progress')

let inserts = []

const baseCaseProgressRow = {
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 5,
  warrantsTotal: 240,
  overdueTerminationsTotal: 240,
  unpaidWorkTotal: 240
}

describe('services/data/get-org-unit-caseload-progress', function () {
  before(function () {
    return helper.addCaseProgressDataForAllOrgUnits()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve current caseload progress for an offender manager', function () {
    return getCaseProgress(inserts.filter((item) => item.table === 'workload_owner')[0].id, 'offender-manager')
      .then(function (results) {
        const omResults = [
          helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow)
        ]
        expect(results).to.eql(omResults)
      })
  })

  it('should retrieve current caseload progress for all workload owners on a team with one OM', function () {
    const teamWithOneOffenderManager = [
      helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow)
    ]
    return getCaseProgress(inserts.filter((item) => item.table === 'team')[1].id, 'team')
      .then(function (results) {
        expect(results.length).to.eql(1)
        expect(results).to.eql(teamWithOneOffenderManager)
      })
  })

  it('should retrieve current caseload progress for all workload owners on a team with mutiple OMs', function () {
    const teamWithMultipleOffenderManagers = [
      helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow),
      helper.rowGenerator('Test_Forename Test_Surname', baseCaseProgressRow)
    ]
    return getCaseProgress(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(teamWithMultipleOffenderManagers)
      })
  })

  it('should retrieve current caseload progress for all teams in an LDU with multiple teams', function () {
    const lduWithMultipleTeams = [
      helper.rowGenerator('Test Team', baseCaseProgressRow, 2),
      helper.rowGenerator('Test Team', baseCaseProgressRow)
    ]
    return getCaseProgress(inserts.filter((item) => item.table === 'ldu')[0].id, 'ldu')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(lduWithMultipleTeams)
      })
  })

  it('should retrieve current caseload progress for all teams in an LDU with one team', function () {
    const lduWithOneTeam = [
      helper.rowGenerator('Test Team', baseCaseProgressRow)
    ]
    return getCaseProgress(inserts.filter((item) => item.table === 'ldu')[1].id, 'ldu')
      .then(function (results) {
        expect(results.length).to.eql(1)
        expect(results).to.eql(lduWithOneTeam)
      })
  })

  it('should retrieve current caseload progress for all LDUs in a region', function () {
    const regionWithTwoLdus = [
      helper.rowGenerator('Test LDU', baseCaseProgressRow, 3),
      helper.rowGenerator('Test LDU', baseCaseProgressRow)
    ]
    return getCaseProgress(inserts.filter((item) => item.table === 'region')[0].id, 'region')
      .then(function (results) {
        expect(results.length).to.eql(2)
        expect(results).to.eql(regionWithTwoLdus)
      })
  })

  it('should retrieve current caseload progress for all regions in the system', function () {
    return getCaseProgress(undefined, 'hmpps')
      .then(function (results) {
        expect(results.length).to.be.greaterThan(1)
        expect(results).to.deep.contain(helper.rowGenerator('Test Region', baseCaseProgressRow, 4))
        expect(results).to.deep.contain(helper.rowGenerator('Test Region', baseCaseProgressRow))
      })
  })

  after(function () {
    return helper.removeInsertedData(inserts)
  })
})
