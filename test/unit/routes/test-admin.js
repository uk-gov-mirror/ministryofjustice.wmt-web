const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const ADMIN_URL = '/admin/'

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
  route = proxyquire('../../../app/routes/admin', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route)
}

before(function () {
  initaliseApp()
})

describe('admin route', function () {
  it('should respond with 200 when the user has the admin role', function () {
    return supertest(app).get(ADMIN_URL).expect(200)
  })
})
