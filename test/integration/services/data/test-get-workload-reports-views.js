const expect = require('chai').expect
const config = require('../../../../knexfile').integrationTests
const knex = require('knex')(config)

const workloadCapactiyHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadReportsViews = require('../../../../app/services/data/get-workload-report-views')

const START_DATE = new Date(2009, 0, 1)
const END_DATE = new Date(2010, 0, 31)

var inserts = []

var getExpectedNationalCapacity = function (fromDate, toDate) {
  return knex('national_capacity_view')
    .where('effective_from', '>=', fromDate)
    .where('effective_from', '<=', toDate)
    .select('total_points',
            'sdr_points',
            'sdr_conversion_points',
            'paroms_points',
            'available_points',
            'effective_from',
            'reduction_hours')
    .then(function (results) {
      return results
    })
}

describe('services/data/get-workload-report-views', function () {
  before(function (done) {
    workloadCapactiyHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  var expectedResults = [
    {
      effective_from: START_DATE,
      total_points: 20,
      sdr_points: 0,
      sdr_conversion_points: 0,
      paroms_points: 0,
      available_points: 10,
      reduction_hours: 3
    }
  ]

  it('should retrieve all the workloads within the date range at National level', function (done) {
    var queryResults
    getWorkloadReportsViews(undefined, START_DATE, END_DATE, 'hmpps')
    .then(function (results) {
      queryResults = results
      getExpectedNationalCapacity(START_DATE, END_DATE).then(function (capacityResults) {
        expect(queryResults).to.eql(capacityResults)
      })
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given Region', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'region')[0].id, START_DATE, END_DATE, 'region')
    .then(function (results) {
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given LDU', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'ldu')[0].id, START_DATE, END_DATE, 'ldu')
    .then(function (results) {
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given Team', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'team')[0].id, START_DATE, END_DATE, 'team')
    .then(function (results) {
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  after(function (done) {
    workloadCapactiyHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
