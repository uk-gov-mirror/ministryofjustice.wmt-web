const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')

const Link = require('../../../app/services/domain/link')

const WORKLOAD_POINTS_DETAILS = {
  comm_tier_1: 11,
  comm_tier_2: 12,
  comm_tier_3: 13,
  comm_tier_4: 14,
  comm_tier_5: 15,
  comm_tier_6: 16,
  comm_tier_7: 17,
  cust_tier_1: 21,
  cust_tier_2: 22,
  cust_tier_3: 23,
  cust_tier_4: 24,
  cust_tier_5: 25,
  cust_tier_6: 26,
  cust_tier_7: 27,
  lic_tier_1: 31,
  lic_tier_2: 32,
  lic_tier_3: 33,
  lic_tier_4: 34,
  lic_tier_5: 35,
  lic_tier_6: 36,
  lic_tier_7: 37,
  user_id: 123,
  sdr: 4,
  sdr_conversion: 5,
  nominal_target_spo: 1234,
  nominal_target_po: 5678,
  default_contracted_hours_po: 37,
  default_contracted_hours_pso: 38,
  weighting_o: 10,
  weighting_w: 20,
  weighting_u: 70,
  paroms_enabled: 1,
  parom: 99,
  effective_from: '2017-04-01',
  effective_to: null
}

var WORKLOAD_POINTS_BREADCRUMBS = [
  new Link('Workload Points', '/admin/workload-points'),
  new Link('Admin', '/admin')
]

var workloadPointsService
var getWorkloadPointsData

before(function () {
  getWorkloadPointsData = sinon.stub()
  workloadPointsService =
    proxyquire('../../../app/services/workload-points-service',
      {
        './data/get-workload-points': getWorkloadPointsData
      })
  getWorkloadPointsData.resolves(WORKLOAD_POINTS_DETAILS)
})

describe('services/workload-points-service', function () {
  describe('getWorkloadPoints', function () {
    it('should call the getWorkloadPoints data service', function () {
      workloadPointsService.getWorkloadPoints().then(function (results) {
        assert(getWorkloadPointsData.called)
      })
    })

    it('should return a results object with the correct title, subtitle and breadcrumbs', function () {
      workloadPointsService.getWorkloadPoints().then(function (results) {
        expect(results.title).to.eql('Workload Points')
        expect(results.subTitle).to.eql('Admin')
        expect(results.breadcrumbs).to.eql(WORKLOAD_POINTS_BREADCRUMBS)
      })
    })

    it('should return a results object containing workload points details', function () {
      workloadPointsService.getWorkloadPoints().then(function (results) {
        expect(results.workloadPoints).to.eql(WORKLOAD_POINTS_DETAILS)
      })
    })
  })
})
