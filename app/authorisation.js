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
  if (isAuthenticationEnabled()) {
    isAuthenticated(req)
    if (req.user.user_role === role) {
      hasRole = true
    }
  }
  return hasRole
}


var isAuthenticationEnabled = function() {
  return (config.AUTHENTICATION_ENABLED === 'true')
}

module.exports.hasRole = hasRole
module.exports.isAuthenticationEnabled = isAuthenticationEnabled
