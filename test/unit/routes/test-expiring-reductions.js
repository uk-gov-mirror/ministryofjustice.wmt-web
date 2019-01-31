const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const PAGE_URL = '/admin/expiring-reductions'

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
  route = proxyquire('../../../app/routes/expiring-reductions', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route)
}

before(function () {
  initaliseApp()
})

describe('expiring reductions route', function () {
  it('should respond with 200 when the route is called as an admin', function () {
    return supertest(app).get(PAGE_URL).expect(200)
  })
})
