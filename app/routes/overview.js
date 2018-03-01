const getOverview = require('../services/get-overview')
const getReductionsExport = require('../services/get-reductions-export')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const roles = require('../constants/user-roles')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const messages = require('../constants/messages')

var lastUpdated

module.exports = function (router) {
  router.get('/', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    if (Object.keys(req.query).length !== 0) {
      return next()
    }
    req.params.id = '0'
    req.params.organisationLevel = 'hmpps'
    return renderOverview(req, res, next)
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    return renderOverview(req, res, next)
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    return renderOverview(req, res, next)
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview/caseload-csv', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    var organisationLevel = req.params.organisationLevel
    var id
    if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    var isCSV = true
    return getOverview(id, organisationLevel, isCSV).then(function (result) {
      var exportCsv = getExportCsv(organisationLevel, result, tabs.OVERVIEW)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview/reductions-csv', function (req, res, next) {
    debugger
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.MANAGER, roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
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
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Not available for offender-manager')
    } else if (organisationLevel === organisationUnitConstants.NATIONAL.name) {
      throw new Error('Not available at national level')
    }

    return getReductionsExport(id, organisationLevel).then(function (result) {
      var reductionsExportCsv = getExportCsv(organisationLevel, result, tabs.REDUCTIONS_EXPORT)
      res.attachment(reductionsExportCsv.filename)
      res.send(reductionsExportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

var renderOverview = function (req, res, next) {
  var organisationLevel = req.params.organisationLevel
  var organisationUnit = getOrganisationUnit('name', organisationLevel)
  var id
  var childOrganisationLevel
  var childOrganisationLevelDisplayText

  if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
    if (req.params.id !== undefined && !isNaN(parseInt(req.params.id, 10))) {
      id = req.params.id
    } else {
      return next()
    }
  }

  if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    childOrganisationLevel = organisationUnit.childOrganisationLevel
    childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText
  }

  var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

  var overviewPromise = getOverview(id, organisationLevel)
  return getLastUpdated().then(function (result) {
    lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
    return overviewPromise.then(function (result) {
      result.date = lastUpdated
      return res.render('overview', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        organisationLevel: organisationLevel,
        linkId: req.params.id,
        screen: 'overview',
        childOrganisationLevel: childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrganisationLevelDisplayText,
        subNav: getSubNav(id, organisationLevel, req.path),
        overviewDetails: result.overviewDetails,
        date: result.date,
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
      })
    })
  }).catch(function (error) {
    next(error)
  })
}
