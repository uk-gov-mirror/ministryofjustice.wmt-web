const routeHelper = require('../../helpers/routes/route-helper')
const superTest = require('supertest')
const proxyquire = require('proxyquire').noPreserveCache()
const roles = require('../../..//app/constants/user-roles')
const hasRoleFunction = require('../../../app/authorisation').hasRole
const sinon = require('sinon')

const workloadTypes = require('../../../app/constants/workload-type')

const GET_REDUCTIONS_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/reductions'
const ADD_REDUCTION_PAGE_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/add-reduction'
const ADD_REDUCTION_POST_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/add-reduction'
const EDIT_REDUCTION_PAGE_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/edit-reduction'
const EDIT_REDUCTION_POST_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/edit-reduction'
const UPDATE_REDUCTION_STATUS_POST_URL = '/' + workloadTypes.PROBATION + '/offender-manager/1/update-reduction-status'

const addReductionsRefData = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: [],
  referenceData: [{ id: 1, maxAllowanceHours: 0 }]
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
  reductionReason: { maxAllowanceHours: 0 }
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
  notes: 'This is a test note'
}

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
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleFunction
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
    '../services/reductions-service': reductionsService,
    '../services/data/get-last-updated': getLastUpdated,
    '../authorisation': authorisationService,
    '../services/get-sub-nav': getSubNavStub
  })
  app = routeHelper.buildApp(route, middleware)
}

beforeEach(function () {
  initaliseApp(createMiddleWare())
})

describe('reductions route', function () {
  describe('For the get reductions route', function () {
    it('should respond with 200 when correct role is passed', function () {
      reductionsService.getReductions.resolves(addReductionsRefData)
      return superTest(app)
        .get(GET_REDUCTIONS_URL)
        .expect(200)
    })
  })

  describe('For the get reductions route', function () {
    it('should respond with 200 and the correct data', function () {
      reductionsService.getReductions.resolves(addReductionsRefData)
      return superTest(app)
        .get(GET_REDUCTIONS_URL)
        .expect(200)
    })
  })

  describe('For the add reductions page route', function () {
    it('should respond with 200 and the correct data and no existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      return superTest(app)
        .get(ADD_REDUCTION_PAGE_URL)
        .expect(200)
    })
  })

  describe('For the edit reductions page route', function () {
    it('should respond with 200 and the correct data and an existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.getReductionsHistory.resolves()
      reductionsService.getReductionByReductionId.resolves(existingReduction)
      return superTest(app)
        .get(EDIT_REDUCTION_PAGE_URL + '?reductionId=' + existingReduction.id)
        .expect(200)
    })
  })

  describe('For the add reductions POST route', function () {
    it('should post the correct data and respond with 302', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.addReduction.resolves()
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /' + workloadTypes.PROBATION + '/offender-manager/1/reductions')
    })

    it('should post the correct data and respond with 200 for existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.addReduction.resolves(returnedId)
      reductionsService.getOldReductionForHistory.resolves()
      reductionsService.addOldReductionToHistory.resolves()
      reductionsService.getReductionsHistory.resolves()
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /' + workloadTypes.PROBATION + '/offender-manager/1/reductions')
    })

    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(failureDataToPost)
        .expect(400)
    })
  })

  describe('For the edit reductions POST route', function () {
    it('should post the correct data and respond with 200 for existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.updateReduction.resolves()
      reductionsService.getOldReductionForHistory.resolves()
      reductionsService.addOldReductionToHistory.resolves()
      reductionsService.getReductionsHistory.resolves()
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /' + workloadTypes.PROBATION + '/offender-manager/1/reductions')
    })

    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.getOldReductionForHistory.resolves()
      reductionsService.addOldReductionToHistory.resolves()
      reductionsService.getReductionsHistory.resolves()
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send(failureDataToPost)
        .expect(400)
    })
  })

  describe('For the update reduction status POST route', function () {
    it('should post the correct data with archived status and respond with 200 for existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.updateReductionStatus.resolves(returnedId)
      reductionsService.getOldReductionForHistory.resolves()
      reductionsService.addOldReductionToHistory.resolves()
      reductionsService.getReductionsHistory.resolves()
      return superTest(app)
        .post(UPDATE_REDUCTION_STATUS_POST_URL)
        .send(Object.assign({}, successDataToPost, { status: 'ARCHIVED' }))
        .expect(302, 'Found. Redirecting to /' + workloadTypes.PROBATION + '/offender-manager/1/reductions?archived=true')
    })

    it('should post the correct data with deleted status and respond with 200 for existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.updateReductionStatus.resolves(returnedId)
      reductionsService.getOldReductionForHistory.resolves()
      reductionsService.addOldReductionToHistory.resolves()
      reductionsService.getReductionsHistory.resolves()
      return superTest(app)
        .post(UPDATE_REDUCTION_STATUS_POST_URL)
        .send(Object.assign({}, successDataToPost, { status: 'DELETED' }))
        .expect(302, 'Found. Redirecting to /' + workloadTypes.PROBATION + '/offender-manager/1/reductions?deleted=true')
    })

    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(addReductionsRefData)
      reductionsService.updateReductionStatus.resolves(returnedId)
      reductionsService.getOldReductionForHistory.resolves()
      reductionsService.addOldReductionToHistory.resolves()
      reductionsService.getReductionsHistory.resolves()
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send(failureDataToPost)
        .expect(400)
    })
  })
})
