const expect = require('chai').expect

const workloadCapactiyHelper = require('../../../helpers/data/workload-capacity-helper')
const getWorkloadReportsForIndividual = require('../../../../app/services/data/get-individual-workload-reports')

const START_DATE = new Date(2009, 0, 1)
const END_DATE = new Date(2010, 0, 31)

var inserts = []

describe('services/data/get-capacity-for-individual', function () {
  before(function (done) {
    workloadCapactiyHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve all the workloads within the date range', function (done) {
    getWorkloadReportsForIndividual(inserts.filter((item) => item.table === 'workload_owner')[0].id, START_DATE, END_DATE)
    .then(function (results) {
      expect(results.length).to.equal(2)
      var expectedResults = [
        {effective_from: START_DATE, total_points: 50, sdr_points: 50, sdr_conversion_points: 50, paroms_points: 50, available_points: 100, reduction_hours: 3},
        {effective_from: START_DATE, total_points: 20, sdr_points: 0, sdr_conversion_points: 0, paroms_points: 0, available_points: 10, reduction_hours: 3}
      ]
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  after(function (done) {
    workloadCapactiyHelper.removeWorkloadCapactitiesForOffenderManager(inserts)
      .then(() => done())
  })
})
