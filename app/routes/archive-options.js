const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const Link = require('../services/domain/link')

module.exports = function (router) {
  router.get('/archive-options', function (req, res, next) {
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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const breadcrumbs = [
      new Link('Archive Data Options', '/archive-options'),
      new Link('Admin', '/admin')
    ]
    return res.render('archive-options', {
      subTitle: 'Admin',
      title: 'Archive Data Options',
      breadcrumbs: breadcrumbs,
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
    })
  })
}
