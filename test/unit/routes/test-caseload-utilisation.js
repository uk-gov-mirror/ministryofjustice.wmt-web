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
const UTILISATION_FROM_DAY = 'utilisation-from-day='
const UTILISATION_FROM_MONTH = 'utilisation-from-month='
const UTILISATION_FROM_YEAR = 'utilisation-from-year='

const UTILISATION_TO_DAY = 'utilisation-to-day='
const UTILISATION_TO_MONTH = 'utilisation-to-month='
const UTILISATION_TO_YEAR = 'utilisation-to-year='


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

    it('should respond with a 200 when valid URI and from/to date query is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?"
        + UTILISATION_FROM_DAY + "01&"
        + UTILISATION_FROM_MONTH + "01&"
        + UTILISATION_FROM_YEAR + "2017&"
        + UTILISATION_TO_DAY + "31&"
        + UTILISATION_TO_MONTH + "03&"
        + UTILISATION_TO_YEAR + "2017")
        .expect(200)
    })

    it('should respond with a 400 when valid URI and invalid from day is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?"
        + UTILISATION_FROM_DAY + "33&"
        + UTILISATION_FROM_MONTH + "01&"
        + UTILISATION_FROM_YEAR + "2017&"
        + UTILISATION_TO_DAY + "31&"
        + UTILISATION_TO_MONTH + "31&"
        + UTILISATION_TO_YEAR + "2017")
        .expect(400)
    })

    it('should respond with a 400 when valid URI and invalid from month is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?"
        + UTILISATION_FROM_DAY + "01&"
        + UTILISATION_FROM_MONTH + "jeff&"
        + UTILISATION_FROM_YEAR + "2017&"
        + UTILISATION_TO_DAY + "31&"
        + UTILISATION_TO_MONTH + "31&"
        + UTILISATION_TO_YEAR + "2017")
        .expect(400)
    })

    it('should respond with a 400 when valid URI and invalid from year is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?"
        + UTILISATION_FROM_DAY + "01&"
        + UTILISATION_FROM_MONTH + "01&"
        + UTILISATION_FROM_YEAR + "&"
        + UTILISATION_TO_DAY + "31&"
        + UTILISATION_TO_MONTH + "31&"
        + UTILISATION_TO_YEAR + "2017")
        .expect(400)
    })

    it('should respond with a 400 when valid URI and invalid from day is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?"
        + UTILISATION_FROM_DAY + "01&"
        + UTILISATION_FROM_MONTH + "01&"
        + UTILISATION_FROM_YEAR + "2017&"
        + UTILISATION_TO_DAY + "33&"
        + UTILISATION_TO_MONTH + "31&"
        + UTILISATION_TO_YEAR + "2017")
        .expect(400)
    })

    it('should respond with a 400 when valid URI and invalid from month is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?"
        + UTILISATION_FROM_DAY + "01&"
        + UTILISATION_FROM_MONTH + "01&"
        + UTILISATION_FROM_YEAR + "2017&"
        + UTILISATION_TO_DAY + "31&"
        + UTILISATION_TO_MONTH + "jeff&"
        + UTILISATION_TO_YEAR + "2017")
        .expect(400)
    })

    it('should respond with a 400 when valid URI and invalid to year is used', function () {

      return supertest(app)
        .get(OFFENDER_MANAGER_UTILISATION_URI + "/" + ID + "?"
        + UTILISATION_FROM_DAY + "01&"
        + UTILISATION_FROM_MONTH + "01&"
        + UTILISATION_FROM_YEAR + "2017&"
        + UTILISATION_TO_DAY + "31&"
        + UTILISATION_TO_MONTH + "31&"
        + UTILISATION_TO_YEAR + "")
        .expect(400)
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