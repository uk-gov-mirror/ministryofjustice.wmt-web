const config = require('../config')

var isUserAuthenticated = function (req) {
  var result = false
  if (isAuthenticationEnabled()) {
    if (!req.isAuthenticated() || !req.user) {
      result = false
    } else {
      result = true
    }
  } else {
    result = true
  }
  return result
}

var isUserAuthorised = function (req) {
  if (!req.isAuthenticated() || !req.user) {
    var error = new Error('Unauthorized')
    error.status = 401
    throw error
  }
}

var hasRole = function (req, role) {
  var hasRole = false
  if (isAuthenticationEnabled()) {
    isUserAuthorised(req)
    if (req.user.user_role === role) {
      hasRole = true
    }
  } else {
    hasRole = true
  }
  return hasRole
}

var accessDenied = function (res, heading, message) {
  return res.status(403).render('includes/message', {
    heading: heading,
    message: message
  })
}

var isAuthenticationEnabled = function () {
  return (config.AUTHENTICATION_ENABLED === 'true')
}

module.exports.hasRole = hasRole
module.exports.accessDenied = accessDenied
module.exports.isUserAuthenticated = isUserAuthenticated
