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
const viewTemplate = 'fortnightly-caseload-data'
const title = 'Archived Fortnightly Caseload Data'
const log = require('../logger')
const heDecode = require('he')

let archiveDateRange

module.exports = function (router) {
  router.get('/archive-data/fortnightly-caseload-data', function (req, res, next) {
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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    return renderResults(viewTemplate, title, res, null, null, authorisedUserRole)
  })

  router.post('/archive-data/fortnightly-caseload-data', function (req, res, next) {
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

    let errors

    try {
      archiveDateRange = dateRangeHelper.createFortnightlyArchiveDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createFortnightlyArchiveDateRange({})
      } else {
        throw error
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    const extraCriteria = heDecode.decode(req.body['fortnightly-multi-search-field-entry'])
    // If date range has errors don't search database
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria)
    }

    return getArchive(archiveOptions.FORTNIGHTLY, archiveDateRange, extraCriteria).then(function (results) {
      results = formatResults(results)
      return renderResults(viewTemplate, title, res, errors, results, authorisedUserRole, archiveDateRange, extraCriteria)
    }).catch(function (error) {
      log.error(error)
      next(error)
    })
  })

  router.post('/archive-data/fortnightly-caseload-data/archive-csv', function (req, res, next) {
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

    let errors

    try {
      archiveDateRange = dateRangeHelper.createFortnightlyArchiveDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createFortnightlyArchiveDateRange({})
      } else {
        throw error
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    const extraCriteria = heDecode.decode(req.body['fortnightly-multi-search-field-entry'])
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria)
    }

    return getArchive(archiveOptions.FORTNIGHTLY, archiveDateRange, extraCriteria).then(function (results) {
      results = formatResults(results)
      let dateFileName = null
      if (archiveDateRange !== null) {
        dateFileName = archiveDateRange.archiveFromDate.toISOString().substring(0, 10) + ' ' + archiveDateRange.archiveToDate.toISOString().substring(0, 10)
      }
      const exportCsv = getExportCsv(dateFileName, results, tabs.ADMIN.FORTNIGHTLY_ARCHIVE)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

const formatResults = function (results) {
  results.forEach(function (result) {
    if (result.startDate !== null) {
      result.startDate = dateFormatter.formatDate(result.startDate, 'DD-MM-YYYY')
    }
    if (result.endDate !== null) {
      result.endDate = dateFormatter.formatDate(result.endDate, 'DD-MM-YYYY')
    }
    if (result.hoursReduction !== null) {
      result.hoursReduction = Number(result.hoursReduction.toFixed(1))
    } else {
      result.hoursReduction = 0
    }
  })
  return results
}
