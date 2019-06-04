const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
  router.get('/manage-reduction-reasons', function (req, res, next) {
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

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return res.render('manage-reduction-reasons', {
      title: 'Manage Reduction Reasons',
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
    })
  })

  router.get('/add-reduction-reason', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.MANAGER_ROLES_REQUIRED
        })
      }
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    
    return res.render('add-reduction-reason', {
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
    })
})
}
