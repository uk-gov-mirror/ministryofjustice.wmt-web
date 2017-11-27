const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getArchive = require('../services/archive-service')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const ValidationError = require('../services/errors/validation-error')

module.exports = function (router) {
  router.get('/archive-data', function (req, res, next) {
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

    var archiveDateRange
    var errors

    try {
      archiveDateRange = dateRangeHelper.createArchiveDateRange(req.query)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createArchiveDateRange({})
      } else {
        throw error
      }
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getArchive(archiveDateRange).then(function (results) {
      return res.render('archive-data', {
        title: 'Archive',
        results: results,
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        noAuth: authorisedUserRole.noAuth  // used by proposition-link for the admin role
      })
    })
  })
}
