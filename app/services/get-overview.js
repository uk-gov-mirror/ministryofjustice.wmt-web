const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getOrganisationOverview = require('./data/get-organisation-overview')
const orgUnit = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  var result = {}
  var overviewPromise = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  if (organisationLevel === orgUnit.OFFENDER_MANAGER.name) {
    overviewPromise = getIndividualOverview(id, organisationLevel)
  } else {
    overviewPromise = getOrganisationOverview(id, organisationLevel)
  }

  return overviewPromise.then(function (results) {
    if (results.length !== undefined) {
      results.forEach(function (result) {
        result.capacityPercentage = (result.totalPoints / result.availablePoints) * 100
      })
      result.overviewDetails = results
    } else {
      var capacityPercentage = (results.totalPoints / results.availablePoints) * 100
      result.overviewDetails = Object.assign({}, results, {capacity: capacityPercentage})
    }
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}
