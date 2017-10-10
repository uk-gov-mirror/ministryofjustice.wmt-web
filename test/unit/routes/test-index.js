const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const INDEX_URI = '/'
const proxyquire = require('proxyquire')
const sinon = require('sinon')

describe(`${INDEX_URI}`, function () {
  var app
  var passport = {}
  var mockConfig = {
    AUTHENTICATION_ENABLED: false
  }
  var authorisationService = {
    isUserAuthenticated: sinon.stub().returns(true)
  }

  passport.authenticate = function (req, res, next) {
    return (strategy) => next()
  }

  beforeEach(function () {
    var route = proxyquire(
      '../../../app/routes/index', {
        'passport': passport,
        '../authorisation': authorisationService,
        '../../config': mockConfig
      })
    app = routeHelper.buildApp(route)
  })

  describe(`POST ${INDEX_URI}`, function () {
    it('should respond with a 200', function () {
      return supertest(app)
        .get(INDEX_URI)
        .expect(302)
    })
  })
  describe(`GET ${INDEX_URI + '?HPP&TRUE=1/0'}`, function () {
    it('should respond with an error', function () {
      return supertest(app)
        .get(INDEX_URI + '?HPP=TRUE/0')
        .expect(500)
    })
  })
})
