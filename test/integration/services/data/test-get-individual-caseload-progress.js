const expect = require('chai').expect

const workloadCapacityHelper = require('../../../helpers/data/workload-capacity-helper')
const getIndividualCaseloadProgress = require('../../../../app/services/data/get-individual-caseload-progress')

var inserts = []

describe('services/data/get-individual-caseload-progress', function () {
  before(function (done) {
    workloadCapacityHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve current caseload progress for an workload owner', function (done) {
    getIndividualCaseloadProgress(inserts.filter((item) => item.table === 'workload_owner')[0].id)
      .then(function (results) {
        var expectedResults =
          {
            communityLast16Weeks: 10,
            licenseLast16Weeks: 9,
            totalCases: 0,
            warrantsTotal: 30,
            overdueTerminationsTotal: 30,
            unpaidWorkTotal: 30
          }
        expect(results).to.eql(expectedResults)
        done()
      })
  })

  after(function (done) {
    workloadCapacityHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
