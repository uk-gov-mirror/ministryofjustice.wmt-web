const expiringReductionsService = require('../services/expiring-reductions-service')
const userSearchService = require('../services/user-search-service')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getSubNav = require('../services/get-expiring-reductions-nav')
const Link = require('../services/domain/link')

const breadcrumbs = [
  new Link('Other Managers\' Expiring Reductions', '/expiring-reductions-other')
]
const title = breadcrumbs[0].title

module.exports = function (router) {
  router.get('/expiring-reductions-other', function (req, res) {
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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return userSearchService()
      .then(function (users) {
        return res.render('expiring-reductions-other', {
          title: title,
          users: users,
          subTitle: title,
          breadcrumbs: breadcrumbs,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
          subNav: getSubNav(req.path)
        })
      })
  })

  router.post('/expiring-reductions-other', function (req, res) {
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

    const userId = req.body['expiring-reductions-search-field-entry']
    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return userSearchService()
      .then(function (users) {
        return expiringReductionsService(userId)
          .then(function (reductions) {
            return res.render('expiring-reductions-other', {
              title: title,
              subTitle: title,
              breadcrumbs: breadcrumbs,
              reductions: reductions,
              users: users,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
              userId: req.body['expiring-reductions-search-field-entry'],
              subNav: getSubNav(req.path)
            })
          })
      })
  })
}
