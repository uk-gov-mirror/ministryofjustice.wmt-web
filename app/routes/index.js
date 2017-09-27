const passport = require('passport')

module.exports = function (router) {
  router.get('/', function (req, res) {
    if (req.isAuthenticated() && req.user) {
        return res.redirect('/hmpps/0')
    } else {
      return res.redirect('/login')
    }
  })
}
