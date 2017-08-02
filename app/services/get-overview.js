const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getTeamOverview = require('./data/get-team-caseload-overview')
const orgUnit = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  var result = {}
  var overviewPromise = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  switch (organisationLevel) {
    case orgUnit.TEAM.name:
      overviewPromise = getTeamOverview(id, organisationLevel)
      break
    case orgUnit.OFFENDER_MANAGER.name:
      overviewPromise = getIndividualOverview(id, organisationLevel)
      break
    default:
      throw new Error('Organisation level must be offender manager or team')
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
