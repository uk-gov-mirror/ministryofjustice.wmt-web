const getCapacityView = require('../services/get-capacity-view')
const getOutstandingReports = require('../services/get-outstanding-reports')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const ValidationError = require('../services/errors/validation-error')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../../app/constants/workload-type')

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload-capacity', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    var capacityDateRange
    var errors

    try {
      capacityDateRange = dateRangeHelper.createCapacityDateRange(req.query)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        capacityDateRange = dateRangeHelper.createCapacityDateRange({})
      } else {
        throw error
      }
    }

    var organisationLevel = req.params.organisationLevel
    var id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    var orgUnit = getOrganisationUnit('name', organisationLevel)
    var childOrgUnitDisplayText
    if (organisationLevel !== organisationUnit.OFFENDER_MANAGER.name) {
      childOrgUnitDisplayText = getOrganisationUnit('name', orgUnit.childOrganisationLevel).displayText
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getCapacityView(id, capacityDateRange, organisationLevel).then(function (result) {
      var capacityBreakdown = result
      return getOutstandingReports(id, organisationLevel).then(function (result) {
        var outstandingReports = result
        return res.render('capacity', {
          title: capacityBreakdown.title,
          subTitle: capacityBreakdown.subTitle,
          subNav: getSubNav(id, organisationLevel, req.path),
          breadcrumbs: capacityBreakdown.breadcrumbs,
          capacity: capacityBreakdown.capacityTable,
          errors: errors,
          query: req.query,
          capacityBreakdown: capacityBreakdown.capacityBreakdown,
          outstandingReports: outstandingReports,
          childOrganisationLevel: orgUnit.childOrganisationLevel,
          childOrganisationLevelDisplayText: childOrgUnitDisplayText,
          organisationLevel: organisationLevel,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
