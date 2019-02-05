const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const SEARCH_URL = '/officer-search/'

var app
var route
var userRoleService
var authorisationService
var hasRoleStub = sinon.stub()

var initaliseApp = function () {
  userRoleService = sinon.stub()
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleStub
  }
  route = proxyquire('../../../app/routes/search', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route)
}

before(function () {
  initaliseApp()
})

describe('search route', function () {
  it('should respond with 200 when the /officer-search route is called', function () {
    return supertest(app).get(SEARCH_URL).expect(200)
  })
})
