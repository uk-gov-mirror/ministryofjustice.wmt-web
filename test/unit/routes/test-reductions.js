const routeHelper = require('../../helpers/routes/route-helper')
const superTest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const GET_REDUCTIONS_URL = '/offender-manager/1/reductions'
const ADD_REDUCTION_PAGE_URL = '/offender-manager/1/add-reduction'
const ADD_REDUCTION_POST_URL = '/offender-manager/1/add-reduction'
const EDIT_REDUCTION_PAGE_URL = '/offender-manager/1/edit-reduction'
const EDIT_REDUCTION_POST_URL = '/offender-manager/1/edit-reduction'
const UPDATE_REDUCTION_STATUS_POST_URL = '/offender-manager/1/update-reduction-status'

const addReduction = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {},
  linkId: 1,
  referenceData: {}
}

const getReductionNoTextResult = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {}
}

const getReductionsSuccessTextResult = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  successText: 'You have successfully added a new reduction'
}

const getReductionsFailureTextResult = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {}
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
  'reduction-hours': '5',
  red_start_year: '2018',
  red_start_month: '1',
  red_start_day: '1',
  red_end_year: '2018',
  red_end_month: '7',
  red_end_day: '1',
  notes: 'This is a test note',
  status: 'SCHEDULED'
}

const failureDataToPost = {
  reductionId: 1,
  reasonForReductionId: 1,
  'reduction-hours': '5',
  red_start_year: '',
  red_start_month: '',
  red_start_day: '',
  red_end_year: '',
  red_end_month: '',
  red_end_day: '',
  notes: 'This is a test note',
  status: 'SCHEDULED'
}

var app
var route
var reductionsService
var getSubNavStub

beforeEach(function () {
  getSubNavStub = sinon.stub()
  reductionsService = sinon.stub()
  reductionsService.getReductions = sinon.stub()
  reductionsService.getAddReductionsRefData = sinon.stub()
  reductionsService.addReduction = sinon.stub()
  reductionsService.updateReduction = sinon.stub()
  reductionsService.updateReductionStatus = sinon.stub()
  reductionsService.getReductionByReductionId = sinon.stub()
  route = proxyquire('../../../app/routes/reductions', {
    '../services/reductions-service': reductionsService,
    '../services/get-sub-nav': getSubNavStub
  })
  app = routeHelper.buildApp(route)
})

describe('reductions route', function () {
  describe('For the get reductions route', function () {
    it('should respond with 200 and the correct data', function () {
      reductionsService.getReductions.resolves(getReductionNoTextResult)
      return superTest(app)
        .get(GET_REDUCTIONS_URL)
        .expect(200)
    })
  })
  describe('For the add reductions page route', function () {
    it('should respond with 200 and the correct data and no existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReduction)
      return superTest(app)
        .get(ADD_REDUCTION_PAGE_URL)
        .expect(200)
    })
  })

  describe('For the edit reductions page route', function () {
    it('should respond with 200 and the correct data and an existing reduction', function () {
      reductionsService.getAddReductionsRefData.resolves(addReduction)
      reductionsService.getReductionByReductionId.resolves(existingReduction)
      return superTest(app)
        .get(EDIT_REDUCTION_PAGE_URL + '?reductionId=' + existingReduction.id)
        .expect(200)
    })
  })

  describe('For the add reductions POST route', function () {
    it('should post the correct data and respond with 302', function () {
      reductionsService.addReduction.resolves(getReductionsSuccessTextResult)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /offender-manager/1/reductions?success=true')
    })
    it('should post the correct data and respond with 200 for existing reduction', function () {
      reductionsService.addReduction.resolves(getReductionsSuccessTextResult)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /offender-manager/1/reductions?success=true')
    })
    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(getReductionsFailureTextResult)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send(failureDataToPost)
        .expect(400)
    })
  })

  describe('For the edit reductions POST route', function () {
    it('should post the correct data and respond with 200 for existing reduction', function () {
      reductionsService.updateReduction.resolves(getReductionsSuccessTextResult)
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send(successDataToPost)
        .expect(302, 'Found. Redirecting to /offender-manager/1/reductions?edited=true')
    })
    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(getReductionsFailureTextResult)
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send({failureDataToPost})
        .expect(400)
    })
  })

  describe('For the update reduction status POST route', function () {
    it('should post the correct data with archived status and respond with 200 for existing reduction', function () {
      reductionsService.updateReductionStatus.resolves(getReductionsSuccessTextResult)
      return superTest(app)
        .post(UPDATE_REDUCTION_STATUS_POST_URL)
        .send(Object.assign({}, successDataToPost, {status: 'ARCHIVED'}))
        .expect(302, 'Found. Redirecting to /offender-manager/1/reductions?archived=true')
    })

    it('should post the correct data with deleted status and respond with 200 for existing reduction', function () {
      reductionsService.updateReductionStatus.resolves(getReductionsSuccessTextResult)
      return superTest(app)
        .post(UPDATE_REDUCTION_STATUS_POST_URL)
        .send(Object.assign({}, successDataToPost, {status: 'DELETED'}))
        .expect(302, 'Found. Redirecting to /offender-manager/1/reductions?deleted=true')
    })

    it('should post incorrect data and validation errors should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(getReductionsFailureTextResult)
      return superTest(app)
        .post(EDIT_REDUCTION_POST_URL)
        .send(failureDataToPost)
        .expect(400)
    })
  })
})
