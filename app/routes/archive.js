const getArchiveDate = require('../services/__get_archive.js')
const ValidationError = require('../services/errors/validation-error')
const authorisation = require('../authorisation')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')

module.exports = function (router) {

    router.get('/admin/archive-data', function (req, res) {
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
    })
    var success = req.query.success
    .then(function (result) {
        return res.render('archive-data')
    })
}