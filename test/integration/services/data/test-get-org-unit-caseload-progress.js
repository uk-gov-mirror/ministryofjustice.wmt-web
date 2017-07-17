const expect = require('chai').expect

const workloadCapacityHelper = require('../../../helpers/data/workload-capacity-helper')
const getCaseProgress = require('../../../../app/services/data/get-org-unit-caseload-progress')

var inserts = []

var caseProgressRow = {
  communityLast16Weeks: 10,
  licenseLast16Weeks: 9,
  totalCases: 0,
  warrantsTotal: 30,
  overdueTerminationsTotal: 30,
  unpaidWorkTotal: 30
}

describe('services/data/get-org-unit-caseload-progress', function () {
  before(function (done) {
    workloadCapacityHelper.addCaseProgressDataForAllOrgUnits()
      .then(function (builtInserts) {
        inserts = builtInserts
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

  after(function (done) {
    workloadCapacityHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
