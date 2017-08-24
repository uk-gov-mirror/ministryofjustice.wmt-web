const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')

const proxyquire = require('proxyquire')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const Reduction = require('../../../app/services/domain/reduction')

var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS

var addReductionStub
var getReferenceDataStub
var getContractedHoursForWorkloadOwnerStub
var getBreadcrumbsStub
var reductionService

var reduction = new Reduction(1, 1, new Date(), new Date(), 'This is a test note')

var referenceData = [
  {
    reason: 'Test Reason',
    reason_short_name: 'T',
    category: 'Test Category',
    allowance_percentage: 100,
    max_allowance_percentage: undefined,
    months_to_expiry: 6
  },
  {
    reason: 'Test Reason 2',
    reason_short_name: 'T',
    category: 'Test Category 2',
    allowance_percentage: 100,
    max_allowance_percentage: undefined,
    months_to_expiry: 6
  }
]

before(function () {
  addReductionStub = sinon.stub()
  getContractedHoursForWorkloadOwnerStub = sinon.stub().resolves(5)
  getReferenceDataStub = sinon.stub().resolves(referenceData)
  getBreadcrumbsStub = sinon.stub().returns(breadcrumbs)
  reductionService =
    proxyquire('../../../app/services/reductions-service',
      {
        './data/insert-reduction': addReductionStub,
        './get-breadcrumbs': getBreadcrumbsStub,
        './data/get-contracted-hours-for-workload-owner': getContractedHoursForWorkloadOwnerStub,
        './data/get-reduction-reasons': getReferenceDataStub
      })
})

describe('services/reductions-service', function () {
  describe('Get reductions', function () {
    it('should create the result object with the right information', function () {
      var result = reductionService.getReductions(1, orgUnitConstant.OFFENDER_MANAGER.name)
      expect(result.title).to.equal('John Doe')
      expect(result.subTitle).to.equal('Offender Manager')
    })
  })
  describe('Get reductions with reference data', function () {
    it('should get the reference data with the hours already worked out for each reduction reason', function () {
      return reductionService.getAddReductionsRefData(1, orgUnitConstant.OFFENDER_MANAGER.name)
        .then(function (result) {
          expect(result.referenceData).to.be.an('array')
          expect(result.title).to.equal('John Doe')
          expect(result.subTitle).to.equal('Offender Manager')
        })
    })
  })
  describe('Add reduction', function () {
    it('should add a reduction', function () {
      addReductionStub.withArgs(1, reduction).resolves(1)
      return reductionService.addReduction(1, reduction)
        .then(function (result) {
          expect(result).to.equal(1)
        })
    })
  })
})
