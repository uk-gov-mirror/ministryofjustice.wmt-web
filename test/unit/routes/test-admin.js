const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const config = require('../../../config')
require('sinon-bluebird')
// const Forbidden = require('../services/errors/authentication-error').Forbidden

const ADMIN_URL = '/admin/'
const ADMIN_USER_URL = '/admin/user'
const ADMIN_USER_RIGHT_URL = '/admin/user-rights'

const USERNAME = {
  username: 'john.smith@' + config.ACTIVE_DIRECTORY_DOMAIN
}

const INVALID_USERNAME = {
  username: 'john.smith'
}

const ROLE = {
  role: 'Manager'
}

const ADMIN_USER_RIGHT_ROLES_URL = '/admin/user-rights/'

var app
var route
var userRoleService
var authorisationService
var hasRoleStub = sinon.stub()

var initaliseApp = function () {
  userRoleService = sinon.stub()
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleStub,
    isAuthenticationEnabled: sinon.stub().returned(false)
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

  it('should respond with 200 when user right is called', function () {
    initaliseApp()
    return supertest(app).get(ADMIN_USER_URL).expect(200)
  })

  it('should respond with 302 when posting an invalid username', function () {
    return supertest(app)
      .post(ADMIN_USER_RIGHT_URL)
      .send(INVALID_USERNAME).expect(302)
  })

  it('should respond with 200 when posting a role for a user', function () {
    return supertest(app)
      .post(ADMIN_USER_RIGHT_ROLES_URL)
      .field('username', USERNAME.username)
      .field('rights', ROLE.role)
  })
})
