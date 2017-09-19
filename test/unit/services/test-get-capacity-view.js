const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')

const proxyquire = require('proxyquire')
const CapacityDateRange = require('../../../app/services/domain/capacity-date-range')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CAPACITY_RESULTS = [
  { effective_from: '2017-01-01',
    total_points: 100,
    available_points: 100,
    reduction_hours: 6}
]

const INDIVIDUAL_RESULTS = [
  { name: 'Test name',
    grade: 'Test grade',
    totalCases: 39,
    linkId: 1,
    total_points: 50,
    available_points: 100,
    cmsReductionHours: 10,
    contractedHours: 40
  }
]

const EXPECTED_TEAM_BREAKDOWN = [
  { name: 'Test name',
    grade: 'Test grade',
    totalCases: 39,
    linkId: 1,
    capacityPercentage: 50,
    cmsPercentage: 25
  }
]

const callingId = 5

var getBreadcrumbs
var getSubNav
var getWorkloadReports
var getWorkloadReportsForOrg
var getCapacityView

var expectedTitle = breadcrumbHelper.LDU_BREADCRUMBS[0].title
var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)

beforeEach(function () {
  getWorkloadReports = sinon.stub()
  getWorkloadReportsForOrg = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbHelper.LDU_BREADCRUMBS)
  getSubNav = sinon.stub()
  getCapacityView = proxyquire('../../../app/services/get-capacity-view',
    {
      './data/get-workload-report-views': getWorkloadReports,
      './data/get-workload-reports-for-org': getWorkloadReportsForOrg,
      './get-breadcrumbs': getBreadcrumbs,
      './get-sub-nav': getSubNav
    })
})

describe('services/get-capacity-view', function () {
  it('should return a result object with a table, title and breadcrumbs object for ldu', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getWorkloadReportsForOrg.resolves(undefined)

    return getCapacityView(callingId, capacityDateRange, 'ldu').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'ldu')).to.be.equal(true)
      expect(getWorkloadReportsForOrg.called).to.be.equal(false)
      expect(result.capacityBreakdown).to.be.eql([])
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for team', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getWorkloadReportsForOrg.resolves(INDIVIDUAL_RESULTS)

    return getCapacityView(callingId, capacityDateRange, 'team').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'team')).to.be.equal(true)
      expect(getWorkloadReportsForOrg.calledWith(callingId, 'offender-manager')).to.be.equal(true)
      expect(result.capacityBreakdown).to.be.eql(EXPECTED_TEAM_BREAKDOWN)
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for region', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getWorkloadReportsForOrg.resolves(undefined)

    return getCapacityView(callingId, capacityDateRange, 'region').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'region')).to.be.equal(true)
      expect(getWorkloadReportsForOrg.called).to.be.equal(false)
      expect(result.capacityBreakdown).to.be.eql([])
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for offender manager', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getWorkloadReportsForOrg.resolves(undefined)

    return getCapacityView(callingId, capacityDateRange, 'offender-manager').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'offender-manager')).to.be.equal(true)
      expect(getWorkloadReportsForOrg.called).to.be.equal(false)
      expect(result.capacityBreakdown).to.be.eql([])
    })
  })
})
