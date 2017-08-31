const expect = require('chai').expect
const assert = require('chai').assert
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
var createCalculateWorkloadTaskStub
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
  createCalculateWorkloadTaskStub = sinon.stub()
  getContractedHoursForWorkloadOwnerStub = sinon.stub().resolves(5)
  getReferenceDataStub = sinon.stub().resolves(referenceData)
  getBreadcrumbsStub = sinon.stub().returns(breadcrumbs)
  reductionService =
    proxyquire('../../../app/services/reductions-service',
      {
        './data/insert-reduction': addReductionStub,
        './get-breadcrumbs': getBreadcrumbsStub,
        './data/get-contracted-hours-for-workload-owner': getContractedHoursForWorkloadOwnerStub,
        './data/get-reduction-reasons': getReferenceDataStub,
        './data/create-calculate-workload-points-task': createCalculateWorkloadTaskStub
      })
})

describe('services/reductions-service', function () {
  describe('Get reductions', function () {
    it('should create the result object with the right information', function () {
      var result = reductionService.getReductions(1, orgUnitConstant.OFFENDER_MANAGER.name)
      expect(result.title).to.equal('John Doe')
      expect(result.subTitle).to.equal('Offender Manager')
      assert(getBreadcrumbsStub.called)
    })
  })
  describe('Get reductions with reference data', function () {
    it('should get the reference data with the hours already worked out for each reduction reason', function () {
      return reductionService.getAddReductionsRefData(1, orgUnitConstant.OFFENDER_MANAGER.name)
        .then(function (result) {
          expect(result.referenceData).to.be.an('array')
          expect(result.title).to.equal('John Doe')
          expect(result.subTitle).to.equal('Offender Manager')
          expect(getContractedHoursForWorkloadOwnerStub.calledWith(1)).to.be.true //eslint-disable-line
          assert(getBreadcrumbsStub.called)
          assert(getReferenceDataStub.called)
        })
    })
  })
  describe('Add reduction', function () {
    it('should add a reduction', function () {
      createCalculateWorkloadTaskStub.resolves(1)
      addReductionStub.withArgs(1, reduction).resolves(1)
      return reductionService.addReduction(1, reduction)
        .then(function (result) {
          expect(createCalculateWorkloadTaskStub.calledWith(1)).to.be.true //eslint-disable-line
          expect(addReductionStub.calledWith(1, reduction)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })
  })
})
