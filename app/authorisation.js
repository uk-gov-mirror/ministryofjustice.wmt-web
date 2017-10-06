const config = require('../config')
const Unauthorized = require('./services/errors/authentication-error').Unauthorized
const Forbidden = require('./services/errors/authentication-error').Forbidden

var assertUserAuthenticated = function (req) {
  if (isAuthenticationEnabled()) {
    if (!req.user) {
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
