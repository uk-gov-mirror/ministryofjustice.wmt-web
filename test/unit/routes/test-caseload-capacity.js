const route = require('../../../app/routes/offender-manager-capacity')
const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')

// test data
const OFFENDER_MANAGER_CAPACITY_URI = '/caseload-capacity/offendermanager'
const ID = 1
const DATE = '2017-03-01T00:00:00Z'
const CAPACITY_FROM_DAY = 'capacity-from-day='
const CAPACITY_FROM_MONTH = 'capacity-from-month='
const CAPACITY_FROM_YEAR = 'capacity-from-year='

const CAPACITY_TO_DAY = 'capacity-to-day='
const CAPACITY_TO_MONTH = 'capacity-to-month='
const CAPACITY_TO_YEAR = 'capacity-to-year='

describe('/caseload-capacity', function () {
  var app

  beforeEach(function () {
    app = routeHelper.buildApp(route)
  })

  describe(`GET ${OFFENDER_MANAGER_CAPACITY_URI}`, function () {
    it('should respond with a 200 when valid URI is used', function () {
      return supertest(app)
        .get(OFFENDER_MANAGER_CAPACITY_URI + '/' + ID)
        .expect(200)
    })

    it('should respond with a 200 when valid URI and from/to date query is used', function () {
      return supertest(app)
        .get(OFFENDER_MANAGER_CAPACITY_URI + '/' + ID + '?' +
        CAPACITY_FROM_DAY + '01&' +
        CAPACITY_FROM_MONTH + '01&' +
        CAPACITY_FROM_YEAR + '2017&' +
        CAPACITY_TO_DAY + '31&' +
        CAPACITY_TO_MONTH + '03&' +
        CAPACITY_TO_YEAR + '2017')
        .expect(200)
    })

    // Tests do not use app.js where 404 handler is defined. Defaults to 500.

    it('should respond with a 500 when id is missing'
      , function () {
        return supertest(app)
          .get(OFFENDER_MANAGER_CAPACITY_URI)
          .expect(500)
      })

    it('should respond with a 500 when user id parameter is missing', function () {
      return supertest(app)
        .get(OFFENDER_MANAGER_CAPACITY_URI + '?date=' + DATE)
        .expect(500)
    })
  })
})
