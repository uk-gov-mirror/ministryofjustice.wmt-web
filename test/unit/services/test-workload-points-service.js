const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
require('sinon-bluebird')
const proxyquire = require('proxyquire')

const Link = require('../../../app/services/domain/link')
const dataHelper = require('../../helpers/data/aggregated-data-helper')

const WORKLOAD_POINTS_DETAILS = dataHelper.defaultWorkloadPoints

var WORKLOAD_POINTS_BREADCRUMBS = [
  new Link('Workload Points', '/admin/workload-points'),
  new Link('Admin', '/admin')
]

var recalcIds = {
  minWorkloadStagingId: 1,
  maxWorkloadStagingId: 10,
  workloadReportId: 99
}

var mockUserObject = {
  name: 'name'
}

var workloadPointsService
var getWorkloadPointsData
var updatePreviousWorkloadPointsEffectiveTo
var insertNewWorkloadPoints
var getWorkloadIdsForWpRecalc
var createCalculateWorkloadPointsTask
var mockUserRoleService = {
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
      var returnedWorkloadPoints = Object.assign({}, WORKLOAD_POINTS_DETAILS, { previousWpId: 123 })
      return workloadPointsService.updateWorkloadPoints(returnedWorkloadPoints).then(function (results) {
        expect(updatePreviousWorkloadPointsEffectiveTo.calledWith(123)).to.be.true //eslint-disable-line  
        expect(insertNewWorkloadPoints.calledWith(returnedWorkloadPoints)).to.be.true //eslint-disable-line  
        expect(getWorkloadIdsForWpRecalc.calledWith(123)).to.be.true //eslint-disable-line  
        expect(createCalculateWorkloadPointsTask.calledWith(recalcIds.minWorkloadStagingId, recalcIds.workloadReportId, 10)).to.be.true //eslint-disable-line        
      })
    })
  })
})
