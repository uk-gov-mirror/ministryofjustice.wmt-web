const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const config = require('../../../config')
require('sinon-bluebird')

const ARCHIVE_DATA_URL = '/archive-data'

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
    route = proxyquire('../../../app/routes/archive', {
        '../services/user-role-service': userRoleService,
        '../authorisation': authorisationService
      })
      app = routeHelper.buildApp(route)
    }

before(function () {
    initaliseApp()
})

describe('archive route', function () {
    it('should respond with 200 when archieve data is called', function () {
      return supertest(app).get(ARCHIVE_DATA_URL).expect(200)
    })

    it('should respond with 500 when an incorrect url is called', function () {
        return supertest(app).get(INVALID_URL).expect(500)
      })
})