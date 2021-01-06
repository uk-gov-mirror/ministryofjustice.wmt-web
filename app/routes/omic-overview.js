const getOverview = require('../services/get-overview')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const renderWMTUpdatingPage = require('../helpers/render-wmt-updating-page')

var lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.OMIC + '/:organisationLevel/:id/overview', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    return renderOverview(req, res, next)
  })

  router.get('/' + workloadTypes.OMIC + '/:organisationLevel/:id/', function (req, res, next) {
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

  if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name || organisationLevel === organisationUnitConstants.TEAM.name) {
    throw new Error('Only available at National, Divisional and LDU Cluster level')
  }

  var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

  var overviewPromise = getOverview(id, organisationLevel, false, workloadTypes.OMIC)
  return getLastUpdated().then(function (result) {
    lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
    return overviewPromise.then(function (result) {
      result.date = lastUpdated
      if (childOrganisationLevelDisplayText === 'LDU Cluster' && result.title === 'NPS Kent Surrey Sussex Region') {
        childOrganisationLevelDisplayText = 'PDU Cluster'
      }
      return res.render('omic-overview', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        organisationLevel: organisationLevel,
        linkId: req.params.id,
        screen: 'overview',
        childOrganisationLevel: childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrganisationLevelDisplayText,
        subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.OMIC, authorisedUserRole.authorisation, authorisedUserRole.userRole),
        overviewDetails: result.overviewDetails,
        date: result.date,
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation,  // used by proposition-link for the admin role
        workloadType: workloadTypes.OMIC
      })
    })
  }).catch(function (error) {
    if (error.message.includes("Hint 'noexpand'") && error.message.includes('is invalid')) {
      var subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.OMIC, authorisedUserRole.authorisation, authorisedUserRole.userRole)
      return renderWMTUpdatingPage(res, authorisedUserRole.userRole, authorisedUserRole.authorisation, subNav)
    } else {
      next(error)
    }
  })
}
