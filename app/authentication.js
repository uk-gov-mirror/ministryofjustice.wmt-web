// Configure login mechanism
const passport = require('passport')
const config = require('../config')

var SamlStrategy = require('passport-saml').Strategy

module.exports = function (app) {
  if (!config.AUTHENTICATION_ENABLED) return

  passport.serializeUser(function (user, done) {
    var email = user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    var displayName = user['http://schemas.microsoft.com/identity/claims/displayname']
    console.log(user)
    done(null, {
      name: displayName,
      email: email
    })
  })

  passport.deserializeUser(function (user, done) {
    done(null, {
      name: user.name,
      email: user.email
    })
  })

  app.use(passport.initialize())

  passport.use(new SamlStrategy(
    {
      path: config.ACTIVE_DIRECTORY_RETURN_ADDRESS,
      entryPoint: config.ACTIVE_DIRECTORY_ENTRY_POINT,
      issuer: config.ACTIVE_DIRECTORY_ISSUER
    },
    function (profile, done) {
      return done(null, profile)
    })
  )

  app.use(function (req, res, next) {
    if (req.user) {
      res.locals.user = req.user
    }
    next()
  })
}
