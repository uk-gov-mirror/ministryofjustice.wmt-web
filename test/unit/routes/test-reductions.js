// const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const superTest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const GET_REDUCTIONS_URL = '/offender-manager/1/reductions'
const ADD_REDUCTION_PAGE_URL = '/offender-manager/1/add-reduction'
const ADD_REDUCTION_POST_URL = '/offender-manager/1/add-reduction'

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
  breadcrumbs: {},
  successText: 'You have successfully added a new reduction'
}

var app
var route
var reductionsService
var getSubNavStub

before(function () {
  getSubNavStub = sinon.stub()
  reductionsService = sinon.stub()
  reductionsService.getReductions = sinon.stub()
  reductionsService.getAddReductionsRefData = sinon.stub()
  reductionsService.addReduction = sinon.stub()
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
    it('should respond with 200 and the correct data', function () {
      reductionsService.getAddReductionsRefData.resolves(addReduction)
      return superTest(app)
        .get(ADD_REDUCTION_PAGE_URL)
        .expect(200)
    })
  })
  describe('For the add reductions POST route', function () {
    it('should post the correct data and respond with 200', function () {
      reductionsService.addReduction.resolves(getReductionsSuccessTextResult)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send({'reasonForReductionId': 1, 'hours': 5, 'reductionStartDate': '01/06/2017', 'reductionEndDate': '01/06/2017', 'notes': 'This is a test note'})
        .expect(307, 'Temporary Redirect. Redirecting to /offender-manager/1/reductions')
    })
    it('should post incorrect data and failure text should be populated', function () {
      reductionsService.getAddReductionsRefData.resolves(getReductionsFailureTextResult)
      return superTest(app)
        .post(ADD_REDUCTION_POST_URL)
        .send({'reasonForReductionId': 1, 'hours': 5, 'reductionStartDate': '', 'reductionEndDate': '', 'notes': 'This is a test note'})
        // Expect a redirect
        .expect(307, 'Temporary Redirect. Redirecting to /offender-manager/1/add-reduction')
    })
  })
})
