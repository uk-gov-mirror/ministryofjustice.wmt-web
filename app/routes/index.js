const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
      return next()
    }
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    return res.redirect('/hmpps/0')
  })
}
