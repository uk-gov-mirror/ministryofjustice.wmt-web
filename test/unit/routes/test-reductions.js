const expect = require('chai').expect
const routeHelper = require('../../helpers/routes/route-helper')
const superTest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const GET_REDUCTIONS_URL = ''
const ADD_REDUCTION_PAGE_URL = ''
const ADD_REDUCTION_POST_URL = ''

const result = {
  title: 'Title',
  subTitle: 'SubTitle',
  breadcrumbs: {},
  subNav: {}
}

var app
var route
var reductions
var reductionsService
var getSubNavStub

before(function () {
  getSubNavStub = sinon.stub()
  reductionsService = sinon.stub()
  route = proxyquire('../../../app/routes/overview', {
    '../services/reductions-service': reductionsService,
    '../services/get-sub-nav': getSubNavStub
  })
  app = routeHelper.buildApp(route)
})

describe('reductions route', function () {
  describe('For the get reductions route', function () {
    it('should respond with 200 and the correct data', function () {

    })
  })
  describe('For the add reductions page route', function () {
    it('should respond with 200 and the correct data', function () {

    })
  })
  describe('For the add reductions POST route', function () {
    it('should post the correct data and respond with 200', function () {

    })
    it('should post incorrect data and failure text should be populated', function () {

    })
  })
})
