const expect = require('chai').expect

const workloadCapactiyHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadReportsForIndividual = require('../../../../app/services/data/get-individual-workload-reports')

var startDate
var endDate

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

var inserts = []

describe('services/data/get-capacity-for-individual', function () {
  before(function (done) {
    workloadCapactiyHelper.addWorkloadCapacitiesForOffenderManager()
    .then(function (builtInserts) {
      inserts = builtInserts
    })
    .then(function () {
      workloadCapactiyHelper.getWorkloadReportEffectiveFromDate()
      .then(function (result) {
        startDate = result.effective_from
        endDate = new Date((startDate.getTime() + ONE_DAY_IN_MS))
        done()
      })
    })
  })

  it('should retrieve all the workloads within the date range', function (done) {
    getWorkloadReportsForIndividual(inserts.filter((item) => item.table === 'workload_owner')[0].id, startDate, endDate)
    .then(function (results) {
      expect(results.length).to.equal(1)
      var expectedResults = [
        {effective_from: startDate, total_points: 50, available_points: 25, reduction_hours: 3}
      ]
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  after(function (done) {
    workloadCapactiyHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
