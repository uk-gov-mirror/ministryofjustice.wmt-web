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
const heDecode = require('he')
const getReductionsHistory = require('../services/data/get-reductions-history')

let archiveDateRange

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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

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

    let errors

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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const extraCriteria = heDecode.decode(req.body['reductions-multi-search-field-entry'])

    // If date range has errors don't search database
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria)
    }
    return getArchive(archiveOptions.REDUCTIONS, archiveDateRange, extraCriteria, parseInt(req.body.start), parseInt(req.body.length)).then(function (results) {
      results = formatResults(results)
      if (results.length === 0) {
        return res.json({
          draw: 0,
          recordsTotal: 0,
          recordsFiltered: 0,
          reductions: results
        })
      }

      const offset = parseInt(req.body.start)
      const limit = parseInt(req.body.length)

      const reductions = results.slice(offset, Math.min(offset + limit, results.length))
      return res.json({
        draw: req.body.draw,
        recordsTotal: results.length,
        recordsFiltered: results.length,
        reductions: reductions
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/archive-data/reductions-search', function (req, res, next) {
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

    return res.redirect('/archive-data/reductions')
  })

  router.post('/archive-data/reductions-search', function (req, res, next) {
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
      archiveDateRange = dateRangeHelper.createReductionArchiveDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        archiveDateRange = dateRangeHelper.createReductionArchiveDateRange({})
      } else {
        throw error
      }
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const extraCriteria = heDecode.decode(req.body['reductions-multi-search-field-entry'])

    // If date range has errors don't search database
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria)
    }
    let stringifiedBody = Object.assign({}, req.body)
    stringifiedBody['reductions-multi-search-field-entry'] = heDecode.decode(stringifiedBody['reductions-multi-search-field-entry'])
    stringifiedBody = JSON.stringify(stringifiedBody)
    return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria, true, stringifiedBody)
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

    let errors

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

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    const extraCriteria = heDecode.decode(req.body['reductions-multi-search-field-entry'])

    // If date range has errors don't search database
    if (errors) {
      return renderResults(viewTemplate, title, res, errors, null, authorisedUserRole, archiveDateRange, extraCriteria)
    }
    return getArchive(archiveOptions.REDUCTIONS, archiveDateRange, extraCriteria).then(function (results) {
      results = formatResults(results)
      let dateFileName = null
      if (archiveDateRange !== null) {
        dateFileName = archiveDateRange.archiveFromDate.toISOString().substring(0, 10) + ' ' + archiveDateRange.archiveToDate.toISOString().substring(0, 10)
      }
      const exportCsv = getExportCsv(dateFileName, results, tabs.ADMIN.REDUCTION_ARCHIVE)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/archive-data/reductions-history', function (req, res, next) {
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

    const reductionId = heDecode.decode(req.body.reductionId)

    return getReductionsHistory(reductionId).then(function (reductionsHistory) {
      return res.json({
        reductionsHistory: reductionsHistory
      })
    })
  })
}

const formatResults = function (results) {
  results.forEach(function (result) {
    if (result.omName === null || result.omName === ' ') {
      result.omName = 'NO NAME FOR THIS REDUCTION'
    }
    if (result.lastUpdatedDate !== null) {
      result.lastUpdatedDate = dateFormatter.formatDate(result.lastUpdatedDate, 'DD/MM/YYYY')
    }
    if (result.startDate !== null && result.startDate !== 'N/A') {
      result.startDate = dateFormatter.formatDate(result.startDate, 'DD/MM/YYYY')
    }
    if (result.endDate !== null && result.endDate !== 'N/A') {
      result.endDate = dateFormatter.formatDate(result.endDate, 'DD/MM/YYYY')
    }
  })
  return results
}
