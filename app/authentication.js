// Configure login mechanism
const session = require('express-session')
const passport = require('passport')
const config = require('../config')
const SamlStrategy = require('passport-saml').Strategy
const logger = require('./logger')

const userRoleService = require('./services/user-role-service')

module.exports = function (app) {
  if (config.AUTHENTICATION_ENABLED !== 'true') {
    passport.logout = function (req, res) { return res.status(501).redirect('/') }
    return
  }

  passport.serializeUser(function (user, done) {
    var name = user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    var displayName = user['http://schemas.microsoft.com/identity/claims/displayname']
    var nameID = user.nameID
    var nameIDFormat = user.nameIDFormat
    // Remove the domain from the username
    var username = userRoleService.removeDomainFromUsername(name)
    // Get the role for the user
    return userRoleService.getUserByUsername(username).then(function (result) {
      var user = {
        id: 0  // assume its a Staff user
      }
      if (result) {
        user.id = result.id // actual user exists
      }
      return userRoleService.getRoleByUsername(username).then(function (role) {
        done(null, {
          userId: user.id,
          name: displayName,
          username: username,
          user_role: role.role,
          nameID: nameID,
          nameIDFormat: nameIDFormat
        })
      })
    })
  })

  passport.deserializeUser(function (user, done) {
    done(null, {
      userId: user.userId,
      name: user.name,
      username: user.username,
      user_role: user.user_role,
      nameID: user.nameID,
      nameIDFormat: user.nameIDFormat
    })
  })

  var sessionOptions = {
    name: 'wmt-start-application',
    secret: config.APPLICATION_SECRET,
    resave: config.RESAVE_SESSION,
    saveUninitialized: config.SAVE_UNINITIALIZED_SESSION,
    cookie: {
      maxAge: parseInt(config.SESSION_COOKIE_MAXAGE),
      secure: config.SECURE_COOKIE === 'true'
    }
  }

  app.use(session(sessionOptions))
  app.use(passport.initialize())
  app.use(passport.session())

  var samlStrategy = new SamlStrategy(
    {
      path: config.ACTIVE_DIRECTORY_RETURN_ADDRESS,
      entryPoint: config.ACTIVE_DIRECTORY_ENTRY_POINT,
      issuer: config.ACTIVE_DIRECTORY_ISSUER
    },
    function (profile, done) {
      return done(null, profile)
    })

  passport.use(samlStrategy)

  passport.logout = function (req, res) {
    if (!req.user) {
      return res.redirect('/')
    }
    var saml = {
      nameID: req.user.username + '@' + config.ACTIVE_DIRECTORY_DOMAIN,
      nameIDFormat: req.user.nameIDFormat
    }
    req.user.saml = saml
    samlStrategy.logout(req, function (err, request) {
      if (err) {
        logger.error({ error: err })
      }
      return res.redirect(request)
    })
  }

  app.use(function (req, res, next) {
    if (req.user) {
      res.locals.user = req.user
    }
    next()
  })
}
