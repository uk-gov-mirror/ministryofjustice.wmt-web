const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
    router.get('/archive-date', function (req, res, next) {
      try {
        authorisation.assertUserAuthenticated(req)
        authorisation.hasRole(req, [roles.DATA_ADMIN])
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
  
      var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
  
        return res.render('archive-date', {
          title: 'Archive date',
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          noAuth: authorisedUserRole.noAuth  // used by proposition-link for the admin role
        })
      })
  }