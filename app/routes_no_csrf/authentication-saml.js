const passport = require('passport')
module.exports = function (router) {
  router.post('/authentication-saml',
            passport.authenticate('saml'), function (req, res) {
              return res.redirect('/')
            })
  router.get('/authentication-saml',
            passport.authenticate('saml'), function (req, res) {
              return res.redirect('/')
            })
}
