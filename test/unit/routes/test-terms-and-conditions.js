const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const TERMS_CONDITIONS_URL = '/terms-and-conditions'

let app
let route
let authorisationService

before(function () {
  authorisationService = {
    assertUserAuthenticated: sinon.stub()
  }
  route = proxyquire('../../../app/routes/terms-and-conditions', {
    '../authorisation': authorisationService
  })
  app = routeHelper.buildApp(route)
})

describe('terms and conditions route', function () {
  it('should respond with 200 when terms and conditions route is requested', function () {
    return supertest(app).get(TERMS_CONDITIONS_URL).expect(200)
  })
})
