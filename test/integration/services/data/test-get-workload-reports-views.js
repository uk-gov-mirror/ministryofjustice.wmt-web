const expect = require('chai').expect
const knex = require('../../../knex').integrationTests

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadReportsViews = require('../../../../app/services/data/get-workload-report-views')

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

let startDate
let endDate

let expectedResults
let inserts = []

const getExpectedNationalCapacity = function (fromDate, toDate) {
  return knex('national_capacity_view')
    .where('effective_from', '>=', fromDate)
    .where('effective_from', '<=', toDate)
    .select('total_points',
      'available_points',
      'effective_from',
      'reduction_hours',
      'contracted_hours')
    .then(function (results) {
      return results
    })
}

describe('services/data/get-workload-report-views', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
      .then(function () {
        return dataHelper.getWorkloadReportEffectiveFromDate()
          .then(function (result) {
            startDate = result.effective_from.toISOString()
            endDate = new Date((result.effective_from.getTime() + 360 * ONE_DAY_IN_MS)).toISOString()
            expectedResults = [
              {
                effective_from: new Date(startDate),
                total_points: 50,
                available_points: 25,
                reduction_hours: 3,
                contracted_hours: 37.5
              }
            ]
          })
      })
  })

  it('should retrieve all the workloads within the date range at National level', function () {
    let queryResults
    return getWorkloadReportsViews(undefined, startDate, endDate, 'hmpps')
      .then(function (results) {
        queryResults = results
        return getExpectedNationalCapacity(startDate, endDate).then(function (capacityResults) {
          expect(queryResults).to.have.deep.members(capacityResults)
        })
      })
  })

  it('should retrieve all the workloads within the date range for a given Region', function () {
    return getWorkloadReportsViews(inserts.filter((item) => item.table === 'region')[0].id, startDate, endDate, 'region')
      .then(function (results) {
        expect(results).to.eql(expectedResults)
      })
  })

  it('should retrieve all the workloads within the date range for a given LDU', function () {
    return getWorkloadReportsViews(inserts.filter((item) => item.table === 'ldu')[0].id, startDate, endDate, 'ldu')
      .then(function (results) {
        expect(results).to.eql(expectedResults)
      })
  })

  it('should retrieve all the workloads within the date range for a given Team', function () {
    return getWorkloadReportsViews(inserts.filter((item) => item.table === 'team')[0].id, startDate, endDate, 'team')
      .then(function (results) {
        expect(results).to.eql(expectedResults)
      })
  })

  it('should retrieve all the workloads within the date range for an OM', function () {
    return getWorkloadReportsViews(inserts.filter((item) => item.table === 'workload_owner')[0].id, startDate, endDate, 'offender-manager')
      .then(function (results) {
        expect(results.length).to.equal(1)
        expect(results).to.eql(expectedResults)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
