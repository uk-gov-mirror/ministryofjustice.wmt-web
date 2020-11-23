const config = require('../config')
const Unauthorized = require('./services/errors/authentication-error').Unauthorized
const Forbidden = require('./services/errors/authentication-error').Forbidden

const assertUserAuthenticated = function (req) {
  if (isAuthenticationEnabled()) {
    if (!req.user) {
      // To handle bookmarks we need to store unauthenticated requests only
      if ((req.path !== '/') && (req.path !== '/login')) {
        req.session.redirectTo = req.path
      }
      throw new Unauthorized('Unauthorized', '/login')
    }
  }
}

const hasRole = function (req, roles) {
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

const isAuthenticationEnabled = function () {
  return (config.AUTHENTICATION_ENABLED === 'true')
}

const getAuthorisedUserRole = function (req) {
  const result = {
    authorisation: isAuthenticationEnabled(),
    userRole: ''
  }
  if (req.user) {
    result.userRole = req.user.user_role
  }
  return result
}

module.exports.hasRole = hasRole
module.exports.assertUserAuthenticated = assertUserAuthenticated
module.exports.isAuthenticationEnabled = isAuthenticationEnabled
module.exports.getAuthorisedUserRole = getAuthorisedUserRole
