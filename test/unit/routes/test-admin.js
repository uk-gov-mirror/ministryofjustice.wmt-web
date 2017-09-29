const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const config = require('../../../config')
require('sinon-bluebird')

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

const ADMIN_USER_RIGHT_ROLES_URL = '/admin/user-rights/' + USERNAME.username

var app
var route
var userRoleService

before(function () {
  userRoleService = sinon.stub()
  route = proxyquire('../../../app/routes/admin', {
    '../services/user-role-service': userRoleService
  })
  app = routeHelper.buildApp(route)
})

describe('admin route', function () {
  it('should respond with 200, redirect to AD login page', function () {
    return supertest(app).get(ADMIN_URL).expect(200)
  })

  it('should respond with 200 when user right is called', function () {
    return supertest(app).get(ADMIN_USER_URL).expect(200)
  })

  it('should respond with 200 when posting a username', function () {
    return supertest(app).post(ADMIN_USER_RIGHT_URL).send(USERNAME).expect(200)
  })

  it('should respond with 302 when posting an invalid username', function () {
    return supertest(app).post(ADMIN_USER_RIGHT_URL).send(INVALID_USERNAME).expect(302)
  })

  it('should respond with 200 when posting a role for a user', function () {
    return supertest(app)
            .post(ADMIN_USER_RIGHT_ROLES_URL)
            .field('username', USERNAME.username)
            .field('rights', ROLE.role)
  })
})
