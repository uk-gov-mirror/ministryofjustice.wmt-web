const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
  router.get('/admin', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
    var userRole
    var noAuth = false
    if (!req.user) {
      noAuth = true
    } else {
      userRole = req.user.user_role
    }
    return res.render('admin', {
      title: 'Admin',
      userRole: userRole,
      noAuth: noAuth
    })
  })
}
