const config = require('../config')
const messages = require('./constants/messages')

var assertUserAuthenticated = function (req, res) {
  if (isAuthenticationEnabled()) {
    if (!req.user) {
      return res.redirect('/login')
    }
  }
}

var hasRole = function (req, res, roles, message) {
  // Check if role exists
  if (roles instanceof Array){
    if (roles.includes(req.user.user_role)) {
      // return as role exists
      return
    }
  }
  // no role exist; deny access
  return res.status(403).render('includes/message', {
    heading: messages.ACCESS_DENIED,
    message: message
  })
}

var isAuthenticationEnabled = function () {
  return (config.AUTHENTICATION_ENABLED === 'true')
}

module.exports.hasRole = hasRole
module.exports.assertUserAuthenticated = assertUserAuthenticated
module.exports.isAuthenticationEnabled = isAuthenticationEnabled
