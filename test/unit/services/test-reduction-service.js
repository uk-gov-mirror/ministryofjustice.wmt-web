const moment = require('moment')
const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')

const proxyquire = require('proxyquire')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const Reduction = require('../../../app/services/domain/reduction')
const reductionStatusType = require('../../../app/constants/reduction-status-type')
const workloadTypes = require('../../../app/constants/workload-type')

const breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS

let addReductionStub
let updateReductionStub
let updateReductionStatusStub
let getReferenceDataStub
let getContractedHoursForWorkloadOwnerStub
let getBreadcrumbsStub
let createCalculateWorkloadTaskStub
let reductionService
let getReductionById
let getReductions
let reductionHelper
let getLatestIdsForWpRecalc
let createCourtReportsCalculationTask
let getLatestIdsForCourtReportsCalc

const newReductionId = 9
const existingReductionId = 10
const workloadOwnerId = 11
const activeStartDate = moment('10-30-2017', 'MM-DD-YYYY').toDate() // 2017-10-31T11:25:05.805Z
const activeEndDate = moment('12-30-2017', 'MM-DD-YYYY').toDate() // 2017-12-30T11:25:05.807Z

const reductionReason = {
  maxAllowanceHours: 0
}

const reduction = new Reduction('1', '10',
  [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
  [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'active note', reductionReason)

const referenceData = [
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

const baseReduction =
  {
    id: 1,
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

const activeReductions = [baseReduction]

const archivedReductions = [
  Object.assign({}, baseReduction, { id: 2, status: 'ARCHIVED' }),
  Object.assign({}, baseReduction, { id: 3, status: 'ARCHIVED' })
]

const reductionsByStatus = {
  activeReductions: activeReductions,
  scheduledReductions: [],
  archivedReductions: archivedReductions
}

const latestWorkloadStagingId = 3
const latestCourtReportsStagingId = 1
const latestWorkloadReportId = 2
const recalcIds = { workloadStagingId: latestWorkloadStagingId, workloadReportId: latestWorkloadReportId }
const crRecalcIds = { courtReportsStagingId: latestCourtReportsStagingId, workloadReportId: latestWorkloadReportId }

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
  createCourtReportsCalculationTask = sinon.stub()
  getLatestIdsForCourtReportsCalc = sinon.stub().resolves(crRecalcIds)
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
        './data/get-latest-workload-staging-id-and-workload-report-id': getLatestIdsForWpRecalc,
        './data/get-reduction-by-id': getReductionById,
        './data/create-court-reports-calculation-task': createCourtReportsCalculationTask,
        './data/get-latest-court-reports-staging-id-and-workload-report-id': getLatestIdsForCourtReportsCalc
      })
})

describe('services/reductions-service', function () {
  describe('Get reductions', function () {
    it('should create the result object with the right information for standard OM', function () {
      getReductions.resolves([])
      return reductionService.getReductions(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.PROBATION)
        .then(function (result) {
          expect(getReductions.calledWith(1)).to.be.eql(true)
          expect(getBreadcrumbsStub.calledWith(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.PROBATION)).to.be.eql(true)
          expect(result.title).to.equal('John Doe')
          expect(result.subTitle).to.equal('Offender Manager')
          expect(result.activeReductions).to.eql(activeReductions)
          expect(result.scheduledReductions).to.eql([])
          expect(result.archivedReductions).to.eql(archivedReductions)
        })
    })

    it('should create the result object with the right information for court-reporter', function () {
      getReductions.resolves([])
      return reductionService.getReductions(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.COURT_REPORTS)
        .then(function (result) {
          expect(getReductions.calledWith(1)).to.be.eql(true)
          expect(getBreadcrumbsStub.calledWith(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.COURT_REPORTS)).to.be.eql(true)
          expect(result.title).to.equal('John Doe')
          expect(result.subTitle).to.equal('Offender Manager')
          expect(result.activeReductions).to.eql(activeReductions)
          expect(result.scheduledReductions).to.eql([])
          expect(result.archivedReductions).to.eql(archivedReductions)
        })
    })
  })

  describe('Get reductions reference data', function () {
    it('should get the reference data with the hours already worked out for each reduction reason for standard OM', function () {
      return reductionService.getAddReductionsRefData(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.PROBATION)
        .then(function (result) {
          expect(result.referenceData).to.be.an('array')
          expect(result.title).to.equal('John Doe')
          expect(result.subTitle).to.equal('Offender Manager')
        expect(getContractedHoursForWorkloadOwnerStub.calledWith(1)).to.be.true //eslint-disable-line
          expect(getBreadcrumbsStub.calledWith(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.PROBATION)).to.be.eql(true)
          assert(getReferenceDataStub.called)
        })
    })

    it('should get the reference data with the hours already worked out for each reduction reason for court-reporter', function () {
      return reductionService.getAddReductionsRefData(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.COURT_REPORTS)
        .then(function (result) {
          expect(result.referenceData).to.be.an('array')
          expect(result.title).to.equal('John Doe')
          expect(result.subTitle).to.equal('Offender Manager')
        expect(getContractedHoursForWorkloadOwnerStub.calledWith(1)).to.be.true //eslint-disable-line
          expect(getBreadcrumbsStub.calledWith(1, orgUnitConstant.OFFENDER_MANAGER.name, workloadTypes.COURT_REPORTS)).to.be.eql(true)
          assert(getReferenceDataStub.called)
        })
    })
  })

  describe('Add reduction', function () {
    it('should add a new reduction when no valid reduction Id given and call create wpc task for standard OM', function () {
      createCalculateWorkloadTaskStub.resolves(1)
      addReductionStub.withArgs(workloadOwnerId, reduction).resolves(newReductionId)
      return reductionService.addReduction(workloadOwnerId, reduction, workloadTypes.PROBATION)
        .then(function (result) {
        expect(getLatestIdsForWpRecalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
        expect(createCalculateWorkloadTaskStub.calledWith(latestWorkloadStagingId, latestWorkloadReportId, 1)).to.be.true //eslint-disable-line
        expect(addReductionStub.calledWith(workloadOwnerId, reduction)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })

    it('should add a new reduction when no valid reduction Id given and call create wpc task for court-reporter OM', function () {
      createCourtReportsCalculationTask.resolves(1)
      addReductionStub.withArgs(workloadOwnerId, reduction).resolves(newReductionId)
      return reductionService.addReduction(workloadOwnerId, reduction, workloadTypes.COURT_REPORTS)
        .then(function (result) {
        expect(getLatestIdsForCourtReportsCalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
        expect(createCourtReportsCalculationTask.calledWith(latestCourtReportsStagingId, latestWorkloadReportId, 1)).to.be.true //eslint-disable-line
        expect(addReductionStub.calledWith(workloadOwnerId, reduction)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })
  })

  describe('Update reduction', function () {
    it('should update reduction and create worker task when reduction Id given for standard OM', function () {
      createCalculateWorkloadTaskStub.resolves(1)
      updateReductionStub.withArgs(existingReductionId, workloadOwnerId, reduction).resolves(existingReductionId)
      return reductionService.updateReduction(workloadOwnerId, existingReductionId, reduction, workloadTypes.PROBATION)
        .then(function (result) {
          expect(getLatestIdsForWpRecalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
          expect(createCalculateWorkloadTaskStub.calledWith(latestWorkloadStagingId, latestWorkloadReportId, 1)).to.be.true //eslint-disable-line
          expect(updateReductionStub.calledWith(existingReductionId, workloadOwnerId,reduction)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })

    it('should update reduction and create worker task when reduction Id given for court-reporter', function () {
      createCourtReportsCalculationTask.resolves(1)
      updateReductionStub.withArgs(existingReductionId, workloadOwnerId, reduction).resolves(existingReductionId)
      return reductionService.updateReduction(workloadOwnerId, existingReductionId, reduction, workloadTypes.COURT_REPORTS)
        .then(function (result) {
          expect(getLatestIdsForCourtReportsCalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
          expect(createCourtReportsCalculationTask.calledWith(latestCourtReportsStagingId, latestWorkloadReportId, 1)).to.be.true //eslint-disable-line
          expect(updateReductionStub.calledWith(existingReductionId, workloadOwnerId,reduction)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })
  })

  describe('Update reduction status', function () {
    it('should update reduction status and create worker task when reduction Id given for standard OM', function () {
      const newReductonStatus = reductionStatusType.ARCHIVED
      createCalculateWorkloadTaskStub.resolves(1)
      updateReductionStatusStub.withArgs(existingReductionId, newReductonStatus).resolves(existingReductionId)
      return reductionService.updateReductionStatus(workloadOwnerId, existingReductionId, newReductonStatus, workloadTypes.PROBATION)
        .then(function (result) {
        expect(getLatestIdsForWpRecalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
        expect(createCalculateWorkloadTaskStub.calledWith(latestWorkloadStagingId, latestWorkloadReportId, 1)).to.be.true //eslint-disable-line
        expect(updateReductionStatusStub.calledWith(existingReductionId, newReductonStatus)).to.be.true //eslint-disable-line
          expect(result).to.equal(1)
        })
    })

    it('should update reduction status and create worker task when reduction Id given for court-reporter', function () {
      const newReductonStatus = reductionStatusType.ARCHIVED
      createCourtReportsCalculationTask.resolves(1)
      updateReductionStatusStub.withArgs(existingReductionId, newReductonStatus).resolves(existingReductionId)
      return reductionService.updateReductionStatus(workloadOwnerId, existingReductionId, newReductonStatus, workloadTypes.COURT_REPORTS)
        .then(function (result) {
        expect(getLatestIdsForCourtReportsCalc.calledWith(workloadOwnerId)).to.be.true //eslint-disable-line
        expect(createCourtReportsCalculationTask.calledWith(latestCourtReportsStagingId, latestWorkloadReportId)).to.be.true //eslint-disable-line
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
