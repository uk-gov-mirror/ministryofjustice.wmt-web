const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const config = require('../../../config')

const USER_URL = '/admin/user'
const USER_RIGHT_URL = '/admin/user-rights'

const USERNAME = {
  username: 'john.smith@' + config.ACTIVE_DIRECTORY_DOMAIN
}

const INVALID_USERNAME = {
  username: 'john.smith'
}

const ROLE = {
  role: 'Manager'
}

let app
let route
let userRoleService
let authorisationService
const hasRoleStub = sinon.stub()

const initaliseApp = function () {
  userRoleService = sinon.stub()
  authorisationService = {
    assertUserAuthenticated: sinon.stub(),
    hasRole: hasRoleStub
  }
  route = proxyquire('../../../app/routes/user-rights', {
    '../services/user-role-service': userRoleService,
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route)
}

before(function () {
  initaliseApp()
})

describe('user rights route', function () {
  it('should respond with 200 when user right is called', function () {
    return supertest(app).get(USER_URL).expect(200)
  })

  it('should respond with 302 when posting an invalid username', function () {
    return supertest(app)
      .post(USER_RIGHT_URL)
      .send(INVALID_USERNAME).expect(302)
  })

  it('should respond with 200 when posting a role for a user', function () {
    return supertest(app)
      .post(USER_RIGHT_URL)
      .field('username', USERNAME.username)
      .field('rights', ROLE.role)
  })
})
