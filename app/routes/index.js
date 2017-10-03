const config = require('../../config')

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
      return next()
    }
    if (config.AUTHENTICATION_ENABLED === 'true') {
      if (req.isAuthenticated() && req.user) {
        return res.redirect('/hmpps/0')
      } else {
        return res.redirect('/login')
      }
    } else {
      return res.redirect('/hmpps/0')
    }
  })
}
