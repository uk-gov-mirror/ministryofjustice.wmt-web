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
    reduction_hours: 6},
  { effective_from: '2017-01-02',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-01-03',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-01-04',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-01-05',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-01-06',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-01-07',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-02-01',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-02-02',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-02-03',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-02-04',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-02-05',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-02-06',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-02-07',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-03-01',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-03-02',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-03-03',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-03-04',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-03-05',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-03-06',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6},
  { effective_from: '2017-03-07',
    sdr_points: 100,
    sdr_conversion_points: 100,
    paroms_points: 100,
    available_points: 100,
    reduction_hours: 6}
]

describe('services/get-capacity-view', function () {
  it('should return a result object with a table, title and breadcrumbs object for ldu', function () {
    var getCapacityStub = sinon.stub()
    var getBreadcrumbs = sinon.stub()
    var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)
    var getCapacityView =
      proxyquire('../../../app/services/get-capacity-view',
        {'./data/get-individual-workload-reports': getCapacityStub,
          '../services/data/get-workload-report-views': getCapacityStub,
          '../services/get-breadcrumbs': getBreadcrumbs})
    getCapacityStub.resolves(CAPACITY_RESULTS)
    getBreadcrumbs.resolves(breadcrumbHelper.LDU_BREADCRUMBS)

    getCapacityView(5, capacityDateRange, 'ldu').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal('ldu Capacity')
      expect(result.breadcrumbs).to.be.an('object')
    })
  })
  it('should return a result object with a table, title and breadcrumbs object for team', function () {
    var getCapacityStub = sinon.stub()
    var getBreadcrumbs = sinon.stub()
    var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)
    var getCapacityView =
      proxyquire('../../../app/services/get-capacity-view',
        {'./data/get-individual-workload-reports': getCapacityStub,
          '../services/data/get-workload-report-views': getCapacityStub,
          '../services/get-breadcrumbs': getBreadcrumbs})
    getCapacityStub.resolves(CAPACITY_RESULTS)
    getBreadcrumbs.resolves(breadcrumbHelper.TEAM_BREADCRUMBS)

    getCapacityView(5, capacityDateRange, 'team').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal('team Capacity')
      expect(result.breadcrumbs).to.be.an('object')
    })
  })
  it('should return a result object with a table, title and breadcrumbs object for region', function () {
    var getCapacityStub = sinon.stub()
    var getBreadcrumbs = sinon.stub()
    var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)
    var getCapacityView =
      proxyquire('../../../app/services/get-capacity-view',
        {'./data/get-individual-workload-reports': getCapacityStub,
          '../services/data/get-workload-report-views': getCapacityStub,
          '../services/get-breadcrumbs': getBreadcrumbs})
    getCapacityStub.resolves(CAPACITY_RESULTS)
    getBreadcrumbs.resolves(breadcrumbHelper.REGION_BREADCRUMBS)

    getCapacityView(5, capacityDateRange, 'region').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal('region Capacity')
      expect(result.breadcrumbs).to.be.an('object')
    })
  })
  it('should return a result object with a table, title and breadcrumbs object for offender manager', function () {
    var getCapacityStub = sinon.stub()
    var getBreadcrumbs = sinon.stub()
    var capacityDateRange = new CapacityDateRange(1, 1, 2017, 31, 3, 2017)
    var getCapacityView =
      proxyquire('../../../app/services/get-capacity-view',
        {'./data/get-individual-workload-reports': getCapacityStub,
          '../services/data/get-workload-report-views': getCapacityStub,
          '../services/get-breadcrumbs': getBreadcrumbs})
    getCapacityStub.resolves(CAPACITY_RESULTS)
    getBreadcrumbs.resolves(breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS)

    getCapacityView(5, capacityDateRange, 'offenderManager').then((result) => {
      expect(result.capacityTable).to.be.an('object')
      expect(result.title).to.equal('offenderManager Capacity')
      expect(result.breadcrumbs).to.be.an('object')
    })
  })
})
