const getCourtReportOverview = require('../services/get-court-report-overview')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadTypeConstants = require('../constants/workload-type')
const workloadTypes = require('../../app/constants/workload-type')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const getLastUpdated = require('../services/data/get-last-updated-court-reports.js')


module.exports = function (router) {
  router.get('/' + workloadTypes.COURT_REPORTS + '/:organisationLevel/:id/overview', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    return renderOverview(req, res, next)
  })

  router.get('/' + workloadTypes.COURT_REPORTS + '/:organisationLevel/:id', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    return renderOverview(req, res, next)
  })
}

var renderOverview = function (req, res, next) {
  var organisationLevel = req.params.organisationLevel
  var organisationUnit = getOrganisationUnit('name', organisationLevel)
  var id
  if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
    if (req.params.id !== undefined && !isNaN(parseInt(req.params.id, 10))) {
      id = req.params.id
    }
  }

  var childOrganisationLevel
  var childOrganisationLevelDisplayText
  if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    childOrganisationLevel = organisationUnit.childOrganisationLevel
    childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText
  }

  var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
  var lastUpdated = getLastUpdated

  return getCourtReportOverview(id, organisationLevel)
  .then(function (result) {
      result.date = lastUpdated
      console.log(result)
    return res.render('court-reports-overview', {
      title: result.title,
      subTitle: result.subTitle,
      breadcrumbs: result.breadcrumbs,
      organisationLevel: organisationLevel,
      childOrganisationLevel: childOrganisationLevel,
      childOrganisationLevelDisplayText: childOrganisationLevelDisplayText,
      subNav: getSubNav(id, organisationLevel, req.path, workloadTypeConstants.COURT_REPORTS),
      overviewDetails: result.overviewDetails,
      date: lastUpdated,
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
    })
  }).catch(function (error) {
    next(error)
  })
}
