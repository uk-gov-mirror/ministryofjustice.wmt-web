const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getArchive = require('../services/archive-service')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const ValidationError = require('../services/errors/validation-error')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const dateFormatter = require('../services/date-formatter')
const archiveOptions = require('../constants/archive-options')
const renderResults = require('../helpers/render-results')
const viewTemplate = 'reduction-archive-data'
const title = 'Archived Reductions'

var archiveDateRange

module.exports = function (router) {
  router.get('/archive-data/reductions', function (req, res, next) {
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

    return renderResults(viewTemplate, title, res, null, null, authorisedUserRole)
  })

  router.post('/archive-data/reductions', function (req, res, next) {
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

    var errors

    try {
      archiveDateRange = dateRangeHelper.createReductionArchiveDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createReductionArchiveDateRange({})
      } else {
        throw error
      }
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    // If date range has errors don't search database
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange)
    }
    return getArchive(archiveOptions.REDUCTIONS, archiveDateRange).then(function (results) {
      results = formatResults(results)
      return renderResults(viewTemplate, title, res, errors, results, authorisedUserRole, archiveDateRange)
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/archive-data/reductions/archive-csv', function (req, res, next) {
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

    var errors

    try {
      archiveDateRange = dateRangeHelper.createReductionArchiveDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createReductionArchiveDateRange({})
      } else {
        throw error
      }
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    // If date range has errors don't search database
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole)
    }
    return getArchive(archiveOptions.REDUCTIONS, archiveDateRange).then(function (results) {
      results = formatResults(results)
      let dateFileName = null
      if (archiveDateRange !== null) {
        dateFileName = archiveDateRange.archiveFromDate.toISOString().substring(0, 10) + ' ' + archiveDateRange.archiveToDate.toISOString().substring(0, 10)
      }
      var exportCsv = getExportCsv(dateFileName, results, tabs.ADMIN.REDUCTION_ARCHIVE)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

var formatResults = function (results) {
  results.forEach(function (result) {
    if (result.omName === null || result.omName === ' ') {
      result.omName = 'NO NAME FOR THIS REDUCTION'
    }
    if (result.lastUpdatedDate !== null) {
      result.lastUpdatedDate = dateFormatter.formatDate(result.lastUpdatedDate, 'DD-MM-YYYY')
    }
  })
  return results
}
