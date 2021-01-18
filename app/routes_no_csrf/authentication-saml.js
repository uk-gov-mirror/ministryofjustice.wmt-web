const passport = require('passport')
const logger = require('../logger')

module.exports = function (router) {
  router.get('/login', passport.authenticate('saml'), function (req, res) {
    setRedirectTo(req.session, req.headers.referer)
    return res.redirect('/hmpps/0')
  })

  router.post('/login', passport.authenticate('saml'), function (req, res) {
    if (req.user) {
      logger.info(req.user.nameID, 'logged in.')
    }
    return res.redirect(req.session.redirectTo || '/')
  })

  router.get('/logout', function (req, res) {
    setRedirectTo(req.session, req.headers.referer)
    passport.logout(req, res)
    if (req.user) {
      logger.info(req.user.nameID, 'logged out.')
    }
    req.logout()
  })
}

const setRedirectTo = function (session, redirectTo) {
  if (session && redirectTo) {
    session.redirectTo = redirectTo
  }
}
