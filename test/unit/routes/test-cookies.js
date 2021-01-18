const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const COOKIES_URL = '/cookies'

let app
let route
let authorisationService

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub()
  }
  route = proxyquire('../../../app/routes/cookies', {
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route)
})

describe('cookies route', function () {
  it('should respond with 200 when the cookies route is requested', function () {
    return supertest(app).get(COOKIES_URL).expect(200)
  })
})
