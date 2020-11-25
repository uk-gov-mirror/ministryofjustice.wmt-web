const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')

const proxyquire = require('proxyquire')

const Link = require('../../../app/services/domain/link')
const dataHelper = require('../../helpers/data/aggregated-data-helper')

const WORKLOAD_POINTS_DETAILS = dataHelper.defaultWorkloadPoints

const WORKLOAD_POINTS_BREADCRUMBS = [
  new Link('Workload Points', '/admin/workload-points'),
  new Link('Admin', '/admin')
]

const recalcIds = {
  minWorkloadStagingId: 1,
  maxWorkloadStagingId: 10,
  workloadReportId: 99
}

const mockUserObject = {
  name: 'name'
}

let workloadPointsService
let getWorkloadPointsData
let updatePreviousWorkloadPointsEffectiveTo
let insertNewWorkloadPoints
let getWorkloadIdsForWpRecalc
let createCalculateWorkloadPointsTask
const mockUserRoleService = {
  getUserById: sinon.stub().resolves(mockUserObject)
}

before(function () {
  getWorkloadPointsData = sinon.stub().resolves(WORKLOAD_POINTS_DETAILS)
  updatePreviousWorkloadPointsEffectiveTo = sinon.stub().resolves()
  insertNewWorkloadPoints = sinon.stub().resolves()
  getWorkloadIdsForWpRecalc = sinon.stub().resolves(recalcIds)
  createCalculateWorkloadPointsTask = sinon.stub().resolves()

  workloadPointsService = proxyquire('../../../app/services/workload-points-service',
    {
      './data/get-workload-points': getWorkloadPointsData,
      './data/update-workload-points-effective-to': updatePreviousWorkloadPointsEffectiveTo,
      './data/insert-workload-points': insertNewWorkloadPoints,
      './data/get-ids-for-workload-points-recalc': getWorkloadIdsForWpRecalc,
      './data/create-calculate-workload-points-task': createCalculateWorkloadPointsTask,
      '../services/user-role-service': mockUserRoleService
    }
  )
})

describe('services/workload-points-service', function () {
  describe('getWorkloadPoints', function () {
    it('should call the getWorkloadPoints data service', function () {
      return workloadPointsService.getWorkloadPoints().then(function (results) {
        assert(getWorkloadPointsData.called)
      })
    })

    it('should return a results object with the correct title, subtitle and breadcrumbs', function () {
      return workloadPointsService.getWorkloadPoints().then(function (results) {
        expect(results.title).to.eql('Workload Points')
        expect(results.subTitle).to.eql('Admin')
        expect(results.breadcrumbs).to.eql(WORKLOAD_POINTS_BREADCRUMBS)
      })
    })

    it('should return a results object containing workload points details', function () {
      return workloadPointsService.getWorkloadPoints().then(function (results) {
        expect(results.workloadPoints).to.eql(WORKLOAD_POINTS_DETAILS)
      })
    })
  })

  describe('updateWorkloadPoints', function () {
    it('should call the necesssary functions with the correct parameters', function () {
      const returnedWorkloadPoints = Object.assign({}, WORKLOAD_POINTS_DETAILS, { previousWpId: 123 })
      return workloadPointsService.updateWorkloadPoints(returnedWorkloadPoints, false).then(function (results) {
        expect(updatePreviousWorkloadPointsEffectiveTo.calledWith(123)).to.be.true //eslint-disable-line  
        expect(insertNewWorkloadPoints.calledWith(returnedWorkloadPoints)).to.be.true //eslint-disable-line  
        expect(getWorkloadIdsForWpRecalc.calledWith(123, false)).to.be.true //eslint-disable-line  
        expect(createCalculateWorkloadPointsTask.calledWith(recalcIds.minWorkloadStagingId, recalcIds.workloadReportId, 10)).to.be.true //eslint-disable-line        
      })
    })
    it('should call the necesssary functions for t2a updated with the correct parameters', function () {
      const returnedT2aWorkloadPoints = Object.assign({}, WORKLOAD_POINTS_DETAILS, { previousWpId: 124, is_t2a: true })
      return workloadPointsService.updateWorkloadPoints(returnedT2aWorkloadPoints, true).then(function (results) {
        expect(updatePreviousWorkloadPointsEffectiveTo.calledWith(124)).to.be.true //eslint-disable-line  
        expect(insertNewWorkloadPoints.calledWith(returnedT2aWorkloadPoints)).to.be.true //eslint-disable-line  
        expect(getWorkloadIdsForWpRecalc.calledWith(124, true)).to.be.true //eslint-disable-line  
        expect(createCalculateWorkloadPointsTask.calledWith(recalcIds.minWorkloadStagingId, recalcIds.workloadReportId, 10)).to.be.true //eslint-disable-line        
      })
    })
  })
})
