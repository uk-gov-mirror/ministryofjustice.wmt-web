const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getOverview = require('./data/get-individual-overview')

module.exports = function (id, organisationLevel) {
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  var overviewPromise = getOverview(id, organisationLevel)

  return overviewPromise.then(function (results) {
    var capacityPercentage = (results.totalPoints / results.availablePoints) * 100
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    result.overviewDetails = Object.assign({}, results, {capacity: capacityPercentage})
    return result
  })
}
