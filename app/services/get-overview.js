const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getOverview = require('./data/get-team-overview')
const orgUnit = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  var result = {}
  var overviewPromise = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  switch (organisationLevel) {
    case orgUnit.TEAM.name:
      overviewPromise = getOverview(id, organisationLevel)
      break
    case orgUnit.OFFENDER_MANAGER.name:
      overviewPromise = getIndividualOverview(id, organisationLevel)
      break
    default:
      throw new Error('Organisation level must be offender manager or team')
  }

  return overviewPromise.then(function (results) {
    var capacityPercentage = (results.totalPoints / results.availablePoints) * 100
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    result.overviewDetails = Object.assign({}, results, {capacity: capacityPercentage})
    result.overviewTable = {}
    return result
  })
}
