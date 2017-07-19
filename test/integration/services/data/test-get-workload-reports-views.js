const expect = require('chai').expect

const workloadCapactiyHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadReportsViews = require('../../../../app/services/data/get-workload-report-views')

const START_DATE = new Date(2009, 0, 1)
const END_DATE = new Date(2010, 0, 31)

var inserts = []

describe('services/data/get-workload-report-views', function () {
  before(function (done) {
    workloadCapactiyHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  var expectedResult = {
    effective_from: START_DATE,
    total_points: 20,
    sdr_points: 0,
    sdr_conversion_points: 0,
    paroms_points: 0,
    available_points: 10,
    reduction_hours: 3
  }

  it('should retrieve all the workloads within the date range for a given Region', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'region')[0].id, START_DATE, END_DATE, 'region')
    .then(function (results) {
      var expectedResults = [expectedResult]
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given LDU', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'ldu')[0].id, START_DATE, END_DATE, 'ldu')
    .then(function (results) {
      var expectedResults = [expectedResult]
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given Team', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'team')[0].id, START_DATE, END_DATE, 'team')
    .then(function (results) {
      var expectedResults = [expectedResult]
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  after(function (done) {
    workloadCapactiyHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
