const expect = require('chai').expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const DisplayTable = require('../../../app/services/domain/display-table')
const CapacityDateRange = require('../../../app/services/domain/capacity-date-range')


const HEADINGS_MONTH = '2017-01-06'
const VALUES_UTILISATION = 80
const UTILISATION_RESULTS = [
  { workload_report_date: '2017-01-01', capacity_percentage: 100},
  { workload_report_date: '2017-01-02', capacity_percentage: 90},
  { workload_report_date: '2017-01-03', capacity_percentage: 87},
  { workload_report_date: '2017-01-04', capacity_percentage: 120},
  { workload_report_date: '2017-01-05', capacity_percentage: 90},
  { workload_report_date: '2017-01-06', capacity_percentage: 80},
  { workload_report_date: '2017-01-07', capacity_percentage: 90},
  { workload_report_date: '2017-02-01', capacity_percentage: 30},
  { workload_report_date: '2017-02-02', capacity_percentage: 90},
  { workload_report_date: '2017-02-03', capacity_percentage: 60},
  { workload_report_date: '2017-02-04', capacity_percentage: 120},
  { workload_report_date: '2017-02-05', capacity_percentage: 30},
  { workload_report_date: '2017-02-06', capacity_percentage: 50},
  { workload_report_date: '2017-02-07', capacity_percentage: 70},
  { workload_report_date: '2017-03-01', capacity_percentage: 30},
  { workload_report_date: '2017-03-02', capacity_percentage: 90},
  { workload_report_date: '2017-03-03', capacity_percentage: 60},
  { workload_report_date: '2017-03-04', capacity_percentage: 120},
  { workload_report_date: '2017-03-05', capacity_percentage: 30},
  { workload_report_date: '2017-03-06', capacity_percentage: 50},
  { workload_report_date: '2017-03-07', capacity_percentage: 70}
]

describe('services/get-utilisation-table', function () {

  it('should return a DisplayTable with valid headers and values', function () {

    var getUtilisation = sinon.stub().returns(UTILISATION_RESULTS)
    var getUtilisationTable
      = proxyquire('../../../app/services/get-utilisation-table', {'./data/get-utilisation': getUtilisation})

    var capacityDateRange = new CapacityDateRange(01,01,2017,31,03,2017)

    var results  = getUtilisationTable('offendermanager', 5, capacityDateRange)
    expect(results.headings[5]).to.equal(HEADINGS_MONTH)
    expect(results.rows[0].values[5]).to.equal(VALUES_UTILISATION)
    expect(results instanceof DisplayTable)

  })
})
