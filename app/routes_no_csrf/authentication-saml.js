const passport = require('passport')

module.exports = function (router) {
  router.post('/login', passport.authenticate('saml'), function (req, res) {
    return res.redirect('/hmpps/0')
  })

  router.get('/logout', function (req, res) {
    passport.logout(req, res)
    req.logout()
  })
}
