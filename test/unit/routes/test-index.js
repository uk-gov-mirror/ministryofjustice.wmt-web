const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const route = require('../../../app/routes/index')
const expect = require('chai').expect

describe('routes/index', function () {
  const ROUTE = '/'

  var app

  beforeEach(function () {
    app = routeHelper.buildApp(route)
  })

  describe(`GET ${ROUTE}`, function () {
    it('should respond with a 200', function () {
      return supertest(app)
        .get(ROUTE)
        .expect(200)
    })
  })
})