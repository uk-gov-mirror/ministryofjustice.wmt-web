const expect = require('chai').expect
const config = require('../../../../knexfile').integrationTests
const knex = require('knex')(config)

const workloadCapactiyHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadReportsViews = require('../../../../app/services/data/get-workload-report-views')

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

var startDate
var endDate

var expectedResults
var inserts = []

var getExpectedNationalCapacity = function (fromDate, toDate) {
  return knex('national_capacity_view')
    .where('effective_from', '>=', fromDate)
    .where('effective_from', '<=', toDate)
    .select('total_points',
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
    })
    .then(function () {
      workloadCapactiyHelper.getWorkloadReportEffectiveFromDate()
      .then(function (result) {
        startDate = result.effective_from
        endDate = new Date((startDate.getTime() + 360 * ONE_DAY_IN_MS))
        expectedResults = [
          {
            effective_from: startDate,
            total_points: 50,
            available_points: 25,
            reduction_hours: 3
          }
        ]
        done()
      })
    })
  })

  it('should retrieve all the workloads within the date range at National level', function (done) {
    var queryResults
    getWorkloadReportsViews(undefined, startDate, endDate, 'hmpps')
    .then(function (results) {
      queryResults = results
      getExpectedNationalCapacity(startDate, endDate).then(function (capacityResults) {
        expect(queryResults).to.eql(capacityResults)
      })
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given Region', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'region')[0].id, startDate, endDate, 'region')
    .then(function (results) {
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given LDU', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'ldu')[0].id, startDate, endDate, 'ldu')
    .then(function (results) {
      expect(results).to.eql(expectedResults)
      done()
    })
  })

  it('should retrieve all the workloads within the date range for a given Team', function (done) {
    getWorkloadReportsViews(inserts.filter((item) => item.table === 'team')[0].id, startDate, endDate, 'team')
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
