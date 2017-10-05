const passport = require('passport')
const logger = require('../logger')

module.exports = function (router) {
  router.get('/login', passport.authenticate('saml'), function (req, res) {
    console.log('----------')
    return res.redirect('/hmpps/0')
  })

  router.post('/login', passport.authenticate('saml'), function (req, res) {
    if (req.user) {
      logger.info(req.user.nameID, 'logged in.')
    }
    return res.redirect('/')
  })

  router.get('/logout', function (req, res) {
    passport.logout(req, res)
    if (req.user) {
      logger.info(req.user.nameID, 'logged out.')
    }
    req.logout()
  })
}
