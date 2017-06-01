const expect = require('chai').expect

const workloadCapactiyHelper = require('../../../helpers/data/workload-capacity-helper')
const getCapacityForIndividual = require('../../../../app/services/data/get-capacity-for-individual')

const START_DATE = new Date(2010, 0, 1)
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

  it('should retrieve all the workloads withiin the date range', function (done) {
    getCapacityForIndividual(inserts.filter((item) => item.table === 'workload_owner')[0].id, START_DATE, END_DATE)
    .then(function (results) {
      expect(results.length).to.equal(2)
      var expectedResults = [
        {workload_report_date: END_DATE, capacity_percentage: 200},
        {workload_report_date: START_DATE, capacity_percentage: 200}
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
