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

  it('should retrieve current caseload progress for an offender manager', function (done) {
    getIndividualCaseloadProgress(inserts.filter((item) => item.table === 'offender_manager')[0].id)
      .then(function (results) {
        expect(results.length).to.equal(1)
        var expectedResults = [
          {
            community_last_16_weeks: 10,
            license_last_16_weeks: 9,
            total_cases: 0,
            warrants_total: 210,
            overdue_terminations_total: 210,
            unpaid_work_total: 210
          }]
        expect(results).to.eql(expectedResults)
        done()
      })
  })

  after(function (done) {
    workloadCapacityHelper.removeWorkloadCapactitiesForOffenderManager(inserts)
      .then(() => done())
  })
})
