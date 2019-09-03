const userSearch = require('../services/data/search-for-user')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get('/user-search', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    return userSearch(req.query.name).then(function (results) {
      res.send(results)
    })
  })
}
