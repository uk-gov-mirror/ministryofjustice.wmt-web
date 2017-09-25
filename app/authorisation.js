const config = require('../config')

function isAuthenticated(req) {
  if (!req.isAuthenticated() || !req.user) {
    var error = new Error('unauthenticated')
    error.status = 401
    throw error
  }
}

function isDataAdmin(req) {
  if (!config.AUTHENTICATION_ENABLED) {
    return false
  }
  isAuthenticated(req)
  if (req.user.user_role === 'Data Admin') {
    return true
  }
  return false
}

function isSystemAdmin(req) {
  if (!config.AUTHENTICATION_ENABLED) {
    return false
  }
  isAuthenticated(req)
  if (req.user.user_role === 'System Admin') {
    return true
  }
  return false
}

function isManager(req) {
  if (!config.AUTHENTICATION_ENABLED) {
    return false
  }
  isAuthenticated(req)
  if (req.user.user_role === 'Manager') {
    return true
  }
  return false
}

module.exports.isAuthenticated = isAuthenticated
module.exports.isDataAdmin = isDataAdmin
module.exports.isSystemAdmin = isSystemAdmin
module.exports.isManager = isManager
