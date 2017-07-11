const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')

const proxyquire = require('proxyquire')
const CapacityDateRange = require('../../../app/services/domain/capacity-date-range')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CAPACITY_RESULTS = [
  { effective_from: '2017-01-01',
    total_points: 100,
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6}
]

var getCapacityStub
var getBreadcrumbs
var getSubNav
var getCapacityView

var expectedTitle = breadcrumbHelper.LDU_BREADCRUMBS[0].title
var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)

before(function () {
  getCapacityStub = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbHelper.LDU_BREADCRUMBS)
  getSubNav = sinon.stub()
  getCapacityView = proxyquire('../../../app/services/get-capacity-view',
    {'./data/get-individual-workload-reports': getCapacityStub,
      './data/get-workload-report-views': getCapacityStub,
      './get-breadcrumbs': getBreadcrumbs,
      './get-sub-nav': getSubNav})
})

describe('services/get-capacity-view', function () {
  it('should return a result object with a table, title and breadcrumbs object for ldu', function (done) {
    getCapacityStub.resolves(CAPACITY_RESULTS)

    getCapacityView(5, capacityDateRange, 'ldu').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      done()
    })
  })
  it('should return a result object with a table, title and breadcrumbs object for team', function (done) {
    getCapacityStub.resolves(CAPACITY_RESULTS)

    getCapacityView(5, capacityDateRange, 'team').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      done()
    })
  })
  it('should return a result object with a table, title and breadcrumbs object for region', function (done) {
    getCapacityStub.resolves(CAPACITY_RESULTS)

    getCapacityView(5, capacityDateRange, 'region').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      done()
    })
  })
  it('should return a result object with a table, title and breadcrumbs object for offender manager', function (done) {
    getCapacityStub.resolves(CAPACITY_RESULTS)

    getCapacityView(5, capacityDateRange, 'offender-manager').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      done()
    })
  })
})
