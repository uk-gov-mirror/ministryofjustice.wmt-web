const expect = require('chai').expect

const workloadCapactiyHelper = require('../../../helpers/data/workload-capacity-helper')
const getWorkloadReportsViews = require('../../../../app/services/data/get-workload-report-views')

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

  it('should retrieve all the workloads within the date range for a given Region', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'region')[0].id, START_DATE, END_DATE, 'region')
    .then(function (results) {
      expect(results.length).to.equal(1)
      var expectedResults = [
        {effective_from: START_DATE, total_points: 140, sdr_points: 50, sdr_conversion_points: 50, paroms_points: 50, available_points: 145, reduction_hours: 12}
      ]
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given LDU', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'ldu')[0].id, START_DATE, END_DATE, 'ldu')
    .then(function (results) {
      expect(results.length).to.equal(1)
      var expectedResults = [
        {effective_from: START_DATE, total_points: 140, sdr_points: 50, sdr_conversion_points: 50, paroms_points: 50, available_points: 145, reduction_hours: 12}
      ]
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given Team', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'team')[0].id, START_DATE, END_DATE, 'team')
    .then(function (results) {
      expect(results.length).to.equal(1)
      var expectedResults = [
        {effective_from: START_DATE, total_points: 140, sdr_points: 50, sdr_conversion_points: 50, paroms_points: 50, available_points: 145, reduction_hours: 12}
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
