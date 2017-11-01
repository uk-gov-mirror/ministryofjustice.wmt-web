const getOverview = require('../services/get-overview')
const getReductionsExportCsv = require('../services/get-reductions-export-csv')
const getReductionsExport = require('../services/get-reduction-notes-export')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../../app/constants/workload-type')

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

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/overview/reductions-csv', function(req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch(error) {
      if(error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } 
    }
    var organisationLevel = req.params.organisationLevel
    var id
    if(organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    return getReductionsExport(id, organisationLevel).then(function (result) {
        var reductionsExportCsv = getReductionsExportCsv(result)
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
  return overviewPromise.then(function (result) {
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
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      noAuth: authorisedUserRole.noAuth  // used by proposition-link for the admin role
    })
  }).catch(function (error) {
    next(error)
  })
}
