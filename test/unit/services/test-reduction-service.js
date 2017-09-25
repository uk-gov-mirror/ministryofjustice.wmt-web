const moment = require('moment')
const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')

const proxyquire = require('proxyquire')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const Reduction = require('../../../app/services/domain/reduction')
const reductionStatusType = require('../../../app/constants/reduction-status-type')

var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS

var addReductionStub
var updateReductionStub
var updateReductionStatusStub
var getReferenceDataStub
var getContractedHoursForWorkloadOwnerStub
var getBreadcrumbsStub
var createCalculateWorkloadTaskStub
var reductionService
var getReductionById
var getReductions
var reductionHelper
var getLatestIdsForWpRecalc

var newReductionId = 9
var existingReductionId = 10
var workloadOwnerId = 11
var activeStartDate = moment().subtract(30, 'days').toDate()
var activeEndDate = moment().add(30, 'days').toDate()
var reduction = new Reduction('1', '10',
  [activeStartDate.getDate(), activeStartDate.getMonth(), activeStartDate.getFullYear()],
  [activeEndDate.getDate(), activeEndDate.getMonth(), activeEndDate.getFullYear()], 'active note')

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

var baseReduction =
  { id: 1,
    workloadOwnerId: 507,
    hours: 5,
    reductionReasonId: 1,
    categoryId: 1,
    reasonShortName: 'Disability',
    allowancePercentage: null,
    reductionStartDate: '11 Sep 16',
    reductionEndDate: '09 Sep 27',
    notes: null,
    status: 'ACTIVE'
  }

var activeReductions = [ baseReduction ]

var archivedReductions = [
  Object.assign({}, baseReduction, { id: 2, status: 'ARCHIVED' }),
  Object.assign({}, baseReduction, { id: 3, status: 'ARCHIVED' })
]

var reductionsByStatus = {
  activeReductions: activeReductions,
  scheduledReductions: [],
  archivedReductions: archivedReductions
}

var recalcIds = { workloadId: 3, workloadReportId: 2 }

beforeEach(function () {
  addReductionStub = sinon.stub()
  updateReductionStub = sinon.stub()
  updateReductionStatusStub = sinon.stub()
  createCalculateWorkloadTaskStub = sinon.stub()
  getContractedHoursForWorkloadOwnerStub = sinon.stub().resolves(5)
  getReferenceDataStub = sinon.stub().resolves(referenceData)
  getBreadcrumbsStub = sinon.stub().returns(breadcrumbs)
  getReductionById = sinon.stub()
  getReductions = sinon.stub()
  reductionHelper = {
    getReductionsByStatus: sinon.stub().returns(reductionsByStatus)
  }
  getLatestIdsForWpRecalc = sinon.stub().resolves(recalcIds)
  reductionService =
    proxyquire('../../../app/services/reductions-service',
      {
        './helpers/reduction-helper': reductionHelper,
        './data/get-reductions': getReductions,
        './data/insert-reduction': addReductionStub,
        './data/update-reduction': updateReductionStub,
        './data/update-reduction-status': updateReductionStatusStub,
        './get-breadcrumbs': getBreadcrumbsStub,
        './data/get-contracted-hours-for-workload-owner': getContractedHoursForWorkloadOwnerStub,
        './data/get-reduction-reasons': getReferenceDataStub,
        './data/create-calculate-workload-points-task': createCalculateWorkloadTaskStub,
        './data/get-latest-workload-and-workload-report-id': getLatestIdsForWpRecalc,
        './data/get-reduction-by-id': getReductionById
      })
})

describe('services/reductions-service', function () {
  describe('Get reductions', function () {
    it('should create the result object with the right information', function () {
      getReductions.resolves([])
      return reductionService.getReductions(1, orgUnitConstant.OFFENDER_MANAGER.name)
        .then(function (result) {
          assert(getReductions.called)
          assert(getBreadcrumbsStub.called)
          expect(result.title).to.equal('John Doe')
          expect(result.subTitle).to.equal('Offender Manager')
          expect(result.activeReductions).to.eql(activeReductions)
          expect(result.scheduledReductions).to.eql([])
          expect(result.archivedReductions).to.eql(archivedReductions)
        })
    })
  })
  describe('Get reductions reference data', function () {
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
    it('should add a new reduction when no valid reduction Id given', function () {
      createCalculateWorkloadTaskStub.resolves(1)
      addReductionStub.withArgs(workloadOwnerId, reduction).resolves(newReductionId)
      return reductionService.addReduction(workloadOwnerId, reduction)
        .then(function (result) {
          expect(getLatestIdsForWpRecalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
          expect(createCalculateWorkloadTaskStub.calledWith(3, 2)).to.be.true //eslint-disable-line
          expect(addReductionStub.calledWith(workloadOwnerId, reduction)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })
  })

  describe('Update reduction', function () {
    it('should update reduction when reduction Id given', function () {
      createCalculateWorkloadTaskStub.resolves(1)
      updateReductionStub.withArgs(existingReductionId, workloadOwnerId, reduction).resolves(existingReductionId)
      return reductionService.updateReduction(workloadOwnerId, existingReductionId, reduction)
        .then(function (result) {
          expect(getLatestIdsForWpRecalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
          expect(createCalculateWorkloadTaskStub.calledWith(3, 2)).to.be.true //eslint-disable-line
          expect(updateReductionStub.calledWith(existingReductionId, workloadOwnerId,reduction)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })
  })

  describe('Update reduction status', function () {
    it('should update reduction status when reduction Id given', function () {
      var newReductonStatus = reductionStatusType.ARCHIVED
      createCalculateWorkloadTaskStub.resolves(1)
      updateReductionStatusStub.withArgs(existingReductionId, newReductonStatus).resolves(existingReductionId)
      return reductionService.updateReductionStatus(workloadOwnerId, existingReductionId, newReductonStatus)
        .then(function (result) {
          expect(getLatestIdsForWpRecalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
          expect(createCalculateWorkloadTaskStub.calledWith(3, 2)).to.be.true //eslint-disable-line
          expect(updateReductionStatusStub.calledWith(existingReductionId, newReductonStatus)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })
  })

  describe('Get Reduction By reduction Id', function () {
    it('should call on to data service with correct reduction id and return reduction', function () {
      getReductionById.resolves(reduction)
      return reductionService.getReductionByReductionId(existingReductionId)
      .then(function (result) {
        expect(getReductionById.calledWith(existingReductionId)).to.be.true //eslint-disable-line
        expect(result).to.eql(reduction)
      })
    })

    it('should not call on to service for undefined id and return undefined', function () {
      return reductionService.getReductionByReductionId(undefined)
      .then(function (result) {
        expect(getReductionById.called).to.be.false //eslint-disable-line        
        expect(result).to.equal(undefined)
      })
    })
  })
})
