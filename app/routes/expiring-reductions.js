const expiringReductionsService = require('../services/expiring-reductions-service')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const log = require('../logger')

module.exports = function (router) {
  router.get('/admin/expiring-reductions', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN,roles.MANAGER])
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

    var userId = 0
    if (req.user !== undefined && req.user !== null) {
      userId = req.user.userId
    }
    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return expiringReductionsService.getExpiringReductions(userId)
      .then(function (result) {
        log.info(result.reductions)
        return res.render('expiring-reductions', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          reductions: result.reductions,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
        })
      })
  })
}
