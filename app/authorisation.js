const config = require('../config')
const Unauthorized = require('./services/errors/authentication-error').Unauthorized
const Forbidden = require('./services/errors/authentication-error').Forbidden

var assertUserAuthenticated = function (req) {
  if (isAuthenticationEnabled()) {
    if (!req.user) {
      // Check if the request is coming from a valid user and
      // store their last request. This is used to handle bookmark links
      if ((req.path !== '/') && (req.path !== '/login')) {
        req.session.redirectTo = req.path
      }
      throw new Unauthorized('Unauthorized', '/login')
    }
  }
}

var hasRole = function (req, roles) {
  if (isAuthenticationEnabled()) {
    if (roles instanceof Array) {
      if (!roles.includes(req.user.user_role)) {
        throw new Forbidden('Unauthorized', 'includes/message')
      }
    } else {
      throw new Forbidden('Unauthorized', 'includes/message')
    }
  }
}

var isAuthenticationEnabled = function () {
  return (config.AUTHENTICATION_ENABLED === 'true')
}

module.exports.hasRole = hasRole
module.exports.assertUserAuthenticated = assertUserAuthenticated
module.exports.isAuthenticationEnabled = isAuthenticationEnabled
