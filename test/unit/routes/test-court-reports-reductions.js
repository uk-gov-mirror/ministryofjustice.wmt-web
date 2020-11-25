const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const superTest = require('supertest')
const proxyquire = require('proxyquire').noPreserveCache()
const roles = require('../../..//app/constants/user-roles')
const hasRoleFunction = require('../../../app/authorisation').hasRole
const orgUnit = require('../../../app/constants/organisation-unit')
const workloadType = require('../../../app/constants/workload-type')

const sinon = require('sinon')

const GET_REDUCTIONS_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/1/reductions'
const TEAM_GET_REDUCTIONS_URL = '/' + workloadType.COURT_REPORTS + '/team/1/reductions'
const INVALID_GET_REDUCTIONS_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/reductions'
const ADD_REDUCTION_PAGE_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/1/add-reduction'
const TEAM_ADD_REDUCTION_PAGE_URL = '/' + workloadType.COURT_REPORTS + '/team/1/add-reduction'
const INVALID_ADD_REDUCTION_PAGE_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/add-reduction'
const ADD_REDUCTION_POST_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/1/add-reduction'
const EDIT_REDUCTION_PAGE_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/1/edit-reduction'
const TEAM_EDIT_REDUCTION_PAGE_URL = '/' + workloadType.COURT_REPORTS + '/team/1/edit-reduction?reductionId=123'
const INVALID_EDIT_REDUCTION_PAGE_URL = '/' + workloadType.COURT_REPORTS + '/team//edit-reduction?reductionId=123'
const EDIT_REDUCTION_POST_URL = '/' + workloadType.COURT_REPORTS + '/offender-manager/1/edit-reduction'

const getReductionNoTextResult = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {}
}

const addReductionsRefData = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [],
  referenceData: [{ id: 1, maxAllowanceHours: 0 }]
}

const addReduction = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {},
  linkId: 1,
  referenceData: {}
}

const existingReduction = {
  id: 1,
  reductionReasonId: 2,
  reductionHours: 12,
  effective_from: new Date(2000, 8, 1),
  effective_to: new Date(2000, 9, 1)
}

const successDataToPost = {
  id: undefined,
  reasonForReductionId: '1',
  reductionHours: '5',
  redStartYear: '2018',
  redStartMonth: '1',
  redStartDay: '1',
  redEndYear: '2018',
  redEndMonth: '7',
  redEndDay: '1',
  notes: 'This is a test note',
  status: 'SCHEDULED',
  workloadType: workloadType.COURT_REPORTS
}

const failureDataToPost = {
  reductionId: 1,
  reasonForReductionId: 1,
  reductionHours: '5',
  redStartYear: '',
  redStartMonth: '',
  redStartDay: '',
  redEndYear: '',
  redEndMonth: '',
  redEndDay: '',
  notes: 'This is a test note',
  workloadType: workloadType.COURT_REPORTS
}

const reductionsHistory = [{
  reasonShortName: 'SPOC lead',
  hours: 1.8,
  notes: '',
  reductionStartDate: '11/06/2018',
  reductionEndDate: '21/06/2021',
  status: 'ACTIVE',
  updatedDate: '16/12/2019 17:50',
  name: '',
  reductionId: 32716
}]

const returnedId = 1

let app
let route
let reductionsService
let getLastUpdated
let getSubNavStub
let authorisationService
const validRole = roles.MANAGER

const createMiddleWare = function () {
  return function (req, res, next) {
    req.user = {
      user_role: validRole
    }
    next()
  }
}

const initaliseApp = function (middleware) {
  authorisationService = {
    hasRole: hasRoleFunction,
    isUserAuthenticated: sinon.stub().returns(true)
  }
  getSubNavStub = sinon.stub()
  getLastUpdated = sinon.stub().resolves(new Date(2017, 11, 1))
  reductionsService = sinon.stub()
  reductionsService.getReductions = sinon.stub()
  reductionsService.getAddReductionsRefData = sinon.stub()
  reductionsService.addReduction = sinon.stub()
  reductionsService.updateReduction = sinon.stub()
  reductionsService.updateReductionStatus = sinon.stub()
  reductionsService.getReductionByReductionId = sinon.stub()
  reductionsService.getOldReductionForHistory = sinon.stub()
  reductionsService.addOldReductionToHistory = sinon.stub()
  reductionsService.getReductionsHistory = sinon.stub()
  route = proxyquire('../../../app/routes/reductions', {
    '../services/data/get-last-updated': getLastUpdated,
    '../services/reductions-service': reductionsService,
    '../authorisation': authorisationService,
    '../services/get-sub-nav': getSubNavStub
  })
  app = routeHelper.buildApp(route, middleware)
}

beforeEach(function () {
  initaliseApp(createMiddleWare())
})

describe('court-reports reductions route', function () {
  describe('For the get reductions route', function () {
    it('should respond with 200 when correct role is passed', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(GET_REDUCTIONS_URL)
        .expect(200)
        .then(function () {
        expect(getSubNavStub.calledWith('1', orgUnit.OFFENDER_MANAGER.name, GET_REDUCTIONS_URL, workloadType.COURT_REPORTS)).to.be.true //eslint-disable-line
        expect(reductionsService.getReductions.calledWith('1', orgUnit.OFFENDER_MANAGER.name, workloadType.COURT_REPORTS)).to.be.true //eslint-disable-line
        })
    })

    it('should respond with 500 when non OM orgunit passed', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(TEAM_GET_REDUCTIONS_URL)
        .expect(500)
    })

    it('should respond with 500 when no OM id is passed', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(INVALID_GET_REDUCTIONS_URL)
        .expect(500)
    })
  })

  describe('For the add reductions page route', function () {
    it('should respond with 200 and the correct data and no existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReduction)
      return superTest(app)
        .get(ADD_REDUCTION_PAGE_URL)
        .expect(200)
        .then(function (results) {
        expect(getSubNavStub.calledWith(1, orgUnit.OFFENDER_MANAGER.name, ADD_REDUCTION_PAGE_URL, workloadType.COURT_REPORTS)).to.be.true //eslint-disable-line
          expect(reductionsService.getAddReductionsRefData.calledWith(1, orgUnit.OFFENDER_MANAGER.name, workloadType.COURT_REPORTS))
        })
    })

    it('should respond with 500 when non OM orgunit passed', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(TEAM_ADD_REDUCTION_PAGE_URL)
        .expect(500)
    })

    it('should respond with 500 when no OM id is passed', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(INVALID_ADD_REDUCTION_PAGE_URL)
        .expect(500)
    })
  })

  describe('For the edit reductions page route', function () {
    it('should respond with 200 and the correct data and an existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReduction)
      reductionsService.getReductionByReductionId.resolves(existingReduction)
      reductionsService.getReductionsHistory.resolves()
      const url = EDIT_REDUCTION_PAGE_URL + '?reductionId=' + existingReduction.id
      return superTest(app)
        .get(url)
        .expect(200)
        .then(function (results) {
        expect(getSubNavStub.calledWith(1, orgUnit.OFFENDER_MANAGER.name, EDIT_REDUCTION_PAGE_URL, workloadType.COURT_REPORTS)).to.be.true //eslint-disable-line
          expect(reductionsService.getAddReductionsRefData.calledWith(1, orgUnit.OFFENDER_MANAGER.name, workloadType.COURT_REPORTS))
          expect(reductionsService.getReductionByReductionId.calledWith(existingReduction.id)).to.be.eql(true)
        })
    })

    it('should respond with 500 when non OM orgunit passed', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(TEAM_EDIT_REDUCTION_PAGE_URL)
        .expect(500)
    })

    it('should respond with 500 when no OM id is passed', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(INVALID_EDIT_REDUCTION_PAGE_URL)
        .expect(500)
    })
  })

  describe('For the add reductions POST route', function () {
    it('should post the correct data and respond with 302', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.addReduction.resolves(returnedId)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /' + workloadType.COURT_REPORTS + '/offender-manager/1/reductions')
        .then(function (results) {
          expect(reductionsService.addReduction.called).to.be.eql(true)
        })
    })

    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.addReduction.resolves(returnedId)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(failureDataToPost)
        .expect(400)
        .then(function (results) {
          expect(reductionsService.addReduction.called).to.be.eql(false)
        expect(getSubNavStub.called).to.be.true //eslint-disable-line
        })
    })
  })

  describe('For the edit reductions POST route', function () {
    it('should post the correct data and respond with 200 for existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.updateReduction.resolves(returnedId)
      reductionsService.getReductionsHistory.resolves(reductionsHistory)
      reductionsService.getOldReductionForHistory.resolves(reductionsHistory[0])
      reductionsService.addOldReductionToHistory.resolves()
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /' + workloadType.COURT_REPORTS + '/offender-manager/1/reductions')
        .then(function (results) {
          expect(reductionsService.updateReduction.called).to.be.eql(true)
        })
    })
    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.updateReduction.resolves(returnedId)
      reductionsService.getOldReductionForHistory.resolves()
      reductionsService.addOldReductionToHistory.resolves()
      reductionsService.getReductionsHistory.resolves()
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send(failureDataToPost)
        .expect(400)
        .then(function (results) {
          expect(reductionsService.updateReduction.called).to.be.eql(false)
          expect(getSubNavStub.called).to.be.true //eslint-disable-line          
        })
    })
  })
})
