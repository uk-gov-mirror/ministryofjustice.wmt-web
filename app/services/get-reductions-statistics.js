const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getReductionsStatistics = require('./data/get-reductions-statistics')

module.exports = function (id, organisationLevel) {
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  var getReductionsStatisticsPromise = getReductionsStatistics(id, organisationLevel)

  return getReductionsStatisticsPromise.then(function (results) {
    result.reductions = results
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    result.reductions.sort(function (a, b) { return b.reductionReason.localeCompare(a.reductionReason) }) // sorted backwards as the plot displays backwards, table is incorrect
    return result
  })
}
