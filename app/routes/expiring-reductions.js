const expiringReductionsService = require('../services/expiring-reductions-service')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getSubNav = require('../services/get-expiring-reductions-nav')
const Link = require('../services/domain/link')

const breadcrumbs = [
  new Link('Expiring Reductions', '/expiring-reductions')
]
const title = breadcrumbs[0].title

module.exports = function (router) {
  router.get('/expiring-reductions', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.MANAGER])
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

    let userId = null
    if (req.user !== undefined && req.user !== null) {
      userId = [req.user.userId]
    }
    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return expiringReductionsService(userId)
      .then(function (reductions) {
        return res.render('expiring-reductions', {
          title: title,
          subTitle: title,
          breadcrumbs: breadcrumbs,
          reductions: reductions,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
          subNav: getSubNav(req.path)
        })
      })
  })
}
