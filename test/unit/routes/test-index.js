// const routeHelper = require('../../helpers/routes/route-helper')
// const supertest = require('supertest')
// const INDEX_URI = '/'
// const proxyquire = require('proxyquire')

// describe(`${INDEX_URI}`, function () {
//   var app
//   var passport = {}

//   passport.authenticate = function (req, res, next) {
//     return (strategy) => next()
//   }

//   beforeEach(function () {
//     var route = proxyquire(
//       '../../../app/routes/index', {
//         'passport': passport
//       })
//     app = routeHelper.buildApp(route)
//   })

//  // TODO:
//  // Test is failing, need to mock passport.authenticate.
//  // The test should be returning 200 but its currently returning 403.
//   describe(`POST ${INDEX_URI}`, function () {
//     it('should respond with a 200', function () {
//       return supertest(app)
//         .post(INDEX_URI)
//         .expect(200)
//     })
//   })
// })
