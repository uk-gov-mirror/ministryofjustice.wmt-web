const getCapacityView = require('../services/get-capacity-view')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const ValidationError = require('../services/errors/validation-error')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const authorisation = require('../authorisation')
const Unathorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get(`/:organisationLevel/:id/caseload-capacity`, function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unathorized) {
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

    var capacityViewPromise = getCapacityView(id, capacityDateRange, organisationLevel)

    return capacityViewPromise.then(function (result) {
      return res.render('capacity', {
        title: result.title,
        subTitle: result.subTitle,
        subNav: getSubNav(id, organisationLevel, req.path),
        breadcrumbs: result.breadcrumbs,
        capacity: result.capacityTable,
        errors: errors,
        query: req.query,
        capacityBreakdown: result.capacityBreakdown,
        childOrganisationLevel: orgUnit.childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrgUnitDisplayText,
        organisationLevel: organisationLevel
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
