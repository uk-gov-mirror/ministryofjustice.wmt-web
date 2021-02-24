const expect = require('chai').expect
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const CapacityDateRange = require('../../../app/services/domain/capacity-date-range')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CAPACITY_RESULTS = [
  {
    effectiveFrom: '2017-01-01',
    totalPoints: 100,
    availablePoints: 100,
    reductionHours: 6,
    armsTotalCases: 5,
    sdrs: 10,
    sdrConversions: 9,
    paroms: 8,
    oralReports: 7
  }
]

const TEAM_RESULTS = [
  {
    name: 'Test name',
    grade: 'Test grade',
    totalCases: 39,
    totalT2aCases: 29,
    linkId: 1,
    totalPoints: 40,
    availablePoints: 100,
    cmsAdjustmentPoints: 10,
    gsAdjustmentPoints: -10,
    contractedHours: 40,
    armsTotalCases: 20,
    sdrs: 10,
    sdrConversions: 9,
    paroms: 8,
    oralReports: 7
  }
]

const LDU_RESULTS = [
  {
    name: 'Test ldu 1',
    grade: 'Test grade 1',
    totalCases: 39,
    totalT2aCases: 29,
    linkId: 1,
    totalPoints: 90,
    availablePoints: 100,
    cmsAdjustmentPoints: 9,
    gsAdjustmentPoints: -10,
    contractedHours: 40,
    armsTotalCases: 20,
    sdrs: 10,
    sdrConversions: 9,
    paroms: 8
  },
  {
    name: 'Test ldu 1',
    grade: 'Test grade 2',
    totalCases: 40,
    totalT2aCases: 30,
    linkId: 1,
    totalPoints: 35,
    availablePoints: 70,
    cmsAdjustmentPoints: 7,
    gsAdjustmentPoints: -5,
    contractedHours: 40,
    armsTotalCases: 20,
    sdrs: 1,
    sdrConversions: 1,
    paroms: 3
  }
]

const EXPECTED_TEAM_BREAKDOWN = [
  {
    name: 'Test name',
    grade: 'Test grade',
    availablePoints: 100,
    totalPoints: 40,
    totalCases: 39,
    totalT2aCases: 29,
    linkId: 1,
    capacityPercentage: 40,
    cmsPercentage: 10,
    cmsPoints: 10,
    gsPoints: -10,
    gsPercentage: 20,
    armsTotalCases: 20,
    sdrs: 10,
    sdrConversions: 9,
    paroms: 8
  },
  {
    capacity: 40,
    name: 'Total / Average',
    availablePoints: 100,
    totalARMS: 20,
    totalCMS: 10,
    totalCases: 39,
    totalGs: -25,
    totalCMSPoints: 10,
    totalGSPoints: -10,
    totalSDRs: 10,
    totalParoms: 8,
    totalSdrConversions: 9,
    totalTotalT2aCases: 29,
    totalPoints: 40
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
        availablePoints: 100,
        totalPoints: 90,
        totalCases: 39,
        totalT2aCases: 29,
        linkId: 1,
        capacityPercentage: 90,
        cmsPercentage: 9,
        gsPercentage: 10,
        cmsPoints: 9,
        gsPoints: -10,
        armsTotalCases: 20,
        sdrs: 10,
        sdrConversions: 9,
        paroms: 8
      },
      {
        name: 'Test ldu 1',
        grade: 'Test grade 2',
        availablePoints: 70,
        totalPoints: 35,
        totalCases: 40,
        totalT2aCases: 30,
        linkId: 1,
        capacityPercentage: 50,
        cmsPercentage: 10,
        gsPercentage: 12.5,
        cmsPoints: 7,
        gsPoints: -5,
        armsTotalCases: 20,
        sdrs: 1,
        sdrConversions: 1,
        paroms: 3
      }
    ]
  },
  {
    name: 'Total / Average',
    availablePoints: 170,
    capacity: 73.52941176470588,
    totalCases: 79,
    totalARMS: 40,
    totalGs: -12,
    totalCMS: 9.411764705882353,
    totalCMSPoints: 16,
    totalGSPoints: -15,
    totalSDRs: 11,
    totalParoms: 11,
    totalSdrConversions: 10,
    totalTotalT2aCases: 59,
    totalPoints: 125
  }
]

const callingId = 5

let getBreadcrumbs
let getSubNav
let getWorkloadReports
let getCapacityBreakdown
let getCapacityView

const expectedTitle = breadcrumbHelper.LDU_BREADCRUMBS[0].title
const capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)

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
    getCapacityBreakdown.resolves(TEAM_RESULTS)

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
