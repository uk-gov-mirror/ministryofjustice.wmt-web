const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')
const orgUnitConstant = require('../../../app/constants/organisation-unit.js')
const orgUnitFinder = require('../../../app/services/helpers/org-unit-finder')
const breadcrumbHelper = require('../../helpers/breadcrumb-helper')

const CONTRACTED_HOURS = 37.5
const UPDATED_CONTRACTED_HOURS = 22

var id = 1
var breadcrumbs = breadcrumbHelper.OFFENDER_MANAGER_BREADCRUMBS
var expectedTitle = breadcrumbs[0].title
var expectedSubTitile = orgUnitFinder('name', orgUnitConstant.OFFENDER_MANAGER.name).displayText

var contractedHoursService
var getBreadcrumbs
var getContractedHoursForWorkloadOwner
var updateContractedHoursForWorkloadOwner
var createWorkloadPointsRecalculationTask
var getLatestIdsForWpRecalc

var recalcIds = { workloadStagingId: 3, workloadReportId: 2 }

beforeEach(function () {
  getContractedHoursForWorkloadOwner = sinon.stub()
  updateContractedHoursForWorkloadOwner = sinon.stub()
  createWorkloadPointsRecalculationTask = sinon.stub()
  getBreadcrumbs = sinon.stub().returns(breadcrumbs)
  getLatestIdsForWpRecalc = sinon.stub().resolves(recalcIds)
  contractedHoursService =
    proxyquire('../../../app/services/contracted-hours-service',
      {
        './data/get-contracted-hours-for-workload-owner': getContractedHoursForWorkloadOwner,
        './data/update-contracted-hours-for-workload-owner': updateContractedHoursForWorkloadOwner,
        './data/create-calculate-workload-points-task': createWorkloadPointsRecalculationTask,
        './data/get-latest-workload-staging-id-and-workload-report-id': getLatestIdsForWpRecalc,
        './get-breadcrumbs': getBreadcrumbs
      })
})

describe('services/contracted-hours-service', function () {
  describe('getContractedHours', function () {
    it('should call get-breadcrumbs and return a results object with breadcrumbs, title, subtitle and contracted hours', function () {
      getContractedHoursForWorkloadOwner.withArgs(id).resolves(CONTRACTED_HOURS)
      return contractedHoursService.getContractedHours(id, orgUnitConstant.OFFENDER_MANAGER.name)
      .then(function (result) {
        assert(getBreadcrumbs.called)
        expect(result.breadcrumbs).to.eql(breadcrumbs)
        expect(result.subTitle).to.eql(expectedSubTitile)
        expect(result.title).to.eql(expectedTitle)
        expect(result.contractedHours).to.eql(CONTRACTED_HOURS)
      })
    })

    it('should call get-contracted-hours-for-workload-owner with the correct parameters', function () {
      getContractedHoursForWorkloadOwner.withArgs(id).resolves(CONTRACTED_HOURS)
      return contractedHoursService.getContractedHours(id, orgUnitConstant.OFFENDER_MANAGER.name)
      .then(function (result) {
        expect(getContractedHoursForWorkloadOwner.calledWith(id)).to.be.true //eslint-disable-line
      })
    })

    it('should throw error when called with team organisational unit', function () {
      getContractedHoursForWorkloadOwner.withArgs(id).resolves(CONTRACTED_HOURS)
      expect(() => contractedHoursService.getContractedHours(id, orgUnitConstant.TEAM.name)).to.throw(/Can only get contracted hours for an offender manager/) //eslint-disable-line
    })
  })

  describe('updateContracedHours', function () {
    it('should call update-contracted-hours-for-workload-owner with correct parameters', function () {
      updateContractedHoursForWorkloadOwner.withArgs(id, UPDATED_CONTRACTED_HOURS).resolves(1)
      return contractedHoursService.updateContractedHours(id, orgUnitConstant.OFFENDER_MANAGER.name, UPDATED_CONTRACTED_HOURS)
      .then(function (result) {
        expect(updateContractedHoursForWorkloadOwner.calledWith(id, UPDATED_CONTRACTED_HOURS)).to.be.true //eslint-disable-line
        expect(getLatestIdsForWpRecalc.calledWith(id)).to.be.true //eslint-disable-line
        expect(createWorkloadPointsRecalculationTask.calledWith(3, 2)).to.be.true //eslint-disable-line
      })
    })

    it('should throw error when called with team organisational unit', function () {
      updateContractedHoursForWorkloadOwner.withArgs(id, UPDATED_CONTRACTED_HOURS).resolves(1)
      expect(() => contractedHoursService.updateContractedHours(id, orgUnitConstant.TEAM.name, UPDATED_CONTRACTED_HOURS)).to.throw(/Can only update contracted hours for an offender manager/) //eslint-disable-line    
    })

    it('should throw error when no record is updated', function () {
      updateContractedHoursForWorkloadOwner.withArgs(id, UPDATED_CONTRACTED_HOURS).resolves(0)
      return contractedHoursService.updateContractedHours(id, orgUnitConstant.OFFENDER_MANAGER.name, UPDATED_CONTRACTED_HOURS)
      .then(function () {
        assert.fail()
      })
      .catch(function (err) {
        expect(err.message).to.eql('Offender manager with id: 1 has not had contracted hours updated')
      })
    })
  })
})
