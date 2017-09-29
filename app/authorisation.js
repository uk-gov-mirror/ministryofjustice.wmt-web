const config = require('../config')

var isAuthenticated = function (req) {
  if (!req.isAuthenticated() || !req.user) {
    var error = new Error('Unauthorized')
    error.status = 401
    throw error
  }
}

var hasRole = function (req, role) {
  var hasRole = false
  if (config.AUTHENTICATION_ENABLED !== 'true') {
    hasRole = false
  } else {
    isAuthenticated(req)
    if (req.user.user_role === role) {
      hasRole = true
    }
  }
  return hasRole
}

module.exports.hasRole = hasRole
