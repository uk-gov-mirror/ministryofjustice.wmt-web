const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const DisplayTable = require('../../../app/services/domain/display-table')
const CapacityDateRange = require('../../../app/services/domain/capacity-date-range')

const HEADINGS_MONTH = '2017-01-06'
const VALUES_CAPACITY = 80
const REDUCTION_HOURS = 6
const CAPACITY_RESULTS = [
  { workload_report_date: '2017-01-01',
    capacity_percentage: 100,
    reductions: 6},
  { workload_report_date: '2017-01-02',
    capacity_percentage: 90,
    reductions: 6},
  { workload_report_date: '2017-01-03',
    capacity_percentage: 87,
    reductions: 6},
  { workload_report_date: '2017-01-04',
    capacity_percentage: 120,
    reductions: 6},
  { workload_report_date: '2017-01-05',
    capacity_percentage: 90,
    reductions: 6},
  { workload_report_date: '2017-01-06',
    capacity_percentage: 80,
    reductions: 6},
  { workload_report_date: '2017-01-07',
    capacity_percentage: 90,
    reductions: 6},
  { workload_report_date: '2017-02-01',
    capacity_percentage: 30,
    reductions: 6},
  { workload_report_date: '2017-02-02',
    capacity_percentage: 90,
    reductions: 6},
  { workload_report_date: '2017-02-03',
    capacity_percentage: 60,
    reductions: 6},
  { workload_report_date: '2017-02-04',
    capacity_percentage: 120,
    reductions: 6},
  { workload_report_date: '2017-02-05',
    capacity_percentage: 30,
    reductions: 6},
  { workload_report_date: '2017-02-06',
    capacity_percentage: 50,
    reductions: 6},
  { workload_report_date: '2017-02-07',
    capacity_percentage: 70,
    reductions: 6},
  { workload_report_date: '2017-03-01',
    capacity_percentage: 30,
    reductions: 6},
  { workload_report_date: '2017-03-02',
    capacity_percentage: 90,
    reductions: 6},
  { workload_report_date: '2017-03-03',
    capacity_percentage: 60,
    reductions: 6},
  { workload_report_date: '2017-03-04',
    capacity_percentage: 120,
    reductions: 6},
  { workload_report_date: '2017-03-05',
    capacity_percentage: 30,
    reductions: 6},
  { workload_report_date: '2017-03-06',
    capacity_percentage: 50,
    reductions: 6},
  { workload_report_date: '2017-03-07',
    capacity_percentage: 70,
    reductions: 6}
]

describe('services/get-capacity-table', function () {
  it('should return a DisplayTable with valid headers and values', function (done) {
    var getCapacity = sinon.stub()
    var getCapacityTable =
      proxyquire('../../../app/services/get-capacity-table', {'./data/get-capacity-for-individual': getCapacity})

    var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)

    getCapacity.resolves(CAPACITY_RESULTS)
    getCapacityTable(5, capacityDateRange).then((results) => {
      expect(results.headings[5]).to.equal(HEADINGS_MONTH)
      expect(results.rows[0].values[5]).to.equal(VALUES_CAPACITY)
      expect(results.rows[1].values[1]).to.equal(REDUCTION_HOURS)
      expect(results instanceof DisplayTable)
      done()
    })
  })
})
