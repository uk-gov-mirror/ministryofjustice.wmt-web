const config = require('../config')

function isAuthenticated (req) {
  if (!req.isAuthenticated() || !req.user) {
    var error = new Error('unauthenticated')
    error.status = 401
    throw error
  }
}

function hasRole (req, role) {
  if (!config.AUTHENTICATION_ENABLED) {
    return false
  }
  isAuthenticated(req)
  if (req.user.user_role === role) {
    return true
  }
  return false
}

module.exports.hasRole = hasRole
