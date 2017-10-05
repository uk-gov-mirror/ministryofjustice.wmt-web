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

const TEAM_REULTS = [
  { name: 'Test name',
    grade: 'Test grade',
    totalCases: 39,
    linkId: 1,
    totalPoints: 50,
    availablePoints: 100,
    cmsAdjustmentPoints: 10,
    contractedHours: 40
  }
]

const LDU_RESULTS = [
  {
    name: 'Test ldu 1',
    grade: 'Test grade 1',
    totalCases: 39,
    linkId: 1,
    totalPoints: 50,
    availablePoints: 100,
    cmsAdjustmentPoints: 10,
    contractedHours: 40
  },
  {
    name: 'Test ldu 1',
    grade: 'Test grade 2',
    totalCases: 40,
    linkId: 1,
    totalPoints: 50,
    availablePoints: 100,
    cmsAdjustmentPoints: 10,
    contractedHours: 40
  }
]

const EXPECTED_TEAM_BREAKDOWN = [
  { name: 'Test name',
    grade: 'Test grade',
    totalCases: 39,
    linkId: 1,
    capacityPercentage: 50,
    cmsPercentage: 20
  }
]

const EXPECTED_LDU_BREAKDOWN = [
  {
    name: 'Test ldu 1',
    linkId: 1,
    grades: [
      {
        name: 'Test ldu 1',
        grade: 'Test grade 1',
        totalCases: 39,
        linkId: 1,
        capacityPercentage: 50,
        cmsPercentage: 20
      },
      {
        name: 'Test ldu 1',
        grade: 'Test grade 2',
        totalCases: 40,
        linkId: 1,
        capacityPercentage: 50,
        cmsPercentage: 20
      }
    ]
  }
]

const callingId = 5

var getBreadcrumbs
var getSubNav
var getWorkloadReports
var getCapacityBreakdown
var getCapacityView

var expectedTitle = breadcrumbHelper.LDU_BREADCRUMBS[0].title
var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)

beforeEach(function () {
  getWorkloadReports = sinon.stub()
  getCapacityBreakdown = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbHelper.LDU_BREADCRUMBS)
  getSubNav = sinon.stub()
  getCapacityView = proxyquire('../../../app/services/get-capacity-view',
    {
      './data/get-workload-report-views': getWorkloadReports,
      './data/get-capacity-breakdown': getCapacityBreakdown,
      './get-breadcrumbs': getBreadcrumbs,
      './get-sub-nav': getSubNav
    })
})

describe('services/get-capacity-view', function () {
  it('should return a result object with a table, title and breadcrumbs object for ldu', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getCapacityBreakdown.resolves(LDU_RESULTS)

    return getCapacityView(callingId, capacityDateRange, 'ldu').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'ldu')).to.be.equal(true)
      expect(getCapacityBreakdown.calledWith(callingId, 'ldu')).to.be.equal(true)
      expect(result.capacityBreakdown).to.be.eql(EXPECTED_LDU_BREAKDOWN)
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for team', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getCapacityBreakdown.resolves(TEAM_REULTS)

    return getCapacityView(callingId, capacityDateRange, 'team').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'team')).to.be.equal(true)
      expect(getCapacityBreakdown.calledWith(callingId, 'team')).to.be.equal(true)
      expect(result.capacityBreakdown).to.be.eql(EXPECTED_TEAM_BREAKDOWN)
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for region', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getCapacityBreakdown.resolves(LDU_RESULTS)

    return getCapacityView(callingId, capacityDateRange, 'region').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'region')).to.be.equal(true)
      expect(getCapacityBreakdown.calledWith(callingId, 'region')).to.be.equal(true)
      expect(result.capacityBreakdown).to.be.eql(EXPECTED_LDU_BREAKDOWN)
    })
  })

  it('should return a result object with a table, title and breadcrumbs object for offender manager', function () {
    getWorkloadReports.resolves(CAPACITY_RESULTS)
    getCapacityBreakdown.resolves(LDU_RESULTS)

    return getCapacityView(callingId, capacityDateRange, 'offender-manager').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal(expectedTitle)
      expect(result.breadcrumbs).to.be.an('Array')
      expect(getWorkloadReports.calledWith(callingId, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), 'offender-manager')).to.be.equal(true)
      expect(getCapacityBreakdown.called).to.be.equal(false)
      expect(result.capacityBreakdown).to.be.eql([])
    })
  })
})
