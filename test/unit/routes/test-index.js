const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const INDEX_URI = '/'
const route = require('../../../app/routes/index')

describe(`${INDEX_URI}`, function () {
  var app

  beforeEach(function () {
    app = routeHelper.buildApp(route)
  })

  describe(`GET ${INDEX_URI}`, function () {
    it('should respond with a 200', function () {
      return supertest(app)
        .get(INDEX_URI)
        .expect(200)
    })
  })
})
