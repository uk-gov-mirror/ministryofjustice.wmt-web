const authorisation = require('../authorisation')

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
      return next()
    }
    authorisation.assertUserAuthenticated(req, res)
    
    return res.redirect('/hmpps/0')
  })
}
