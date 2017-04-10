const proxyquire = require('proxyquire')
const route = require('../../../app/routes/offender-manager-utilisation')
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const sinon = require('sinon')
const expect = require('chai').expect

// test data
const OFFENDER_MANAGER_UTILISATION_URI = '/caseload-utilisation/offendermanager'
const ID = 1
const DATE = '2017-03-01T00:00:00Z'
const YEAR = 2016

describe('/caseload-utilisation', function () {

  var app

  beforeEach(function () {
    app = routeHelper.buildApp(route)
  })

  describe(`GET ${OFFENDER_MANAGER_UTILISATION_URI}`, function () {

    it('should respond with a 200 when valid URI is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID)
        .expect(200)
    })

    it('should respond with a 200 when valid URI and date query is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?date=" + DATE)
        .expect(200)
    })

    // Tests do not use app.js where 404 handler is defined. Defaults to 500.

    it('should respond with a 500 when id is missing'
      , function () {
        return supertest(app)
          .get(OFFENDER_MANAGER_UTILISATION_URI)
          .expect(500)
    })

    it('should respond with a 500 when user id parameter is missing', function () {
      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "?date=" + DATE)
        .expect(500)
    })
  })
})