const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getCaseProgress = require('./data/get-caseload-progress')

module.exports = function (id, organisationLevel) {
  const result = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  const caseProgressPromise = getCaseProgress(id, organisationLevel)

  return caseProgressPromise.then(function (results) {
    result.caseProgressList = results
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    result.caseProgressList.sort(function (a, b) { return b.name.localeCompare(a.name) }) // sorted backwards as the plot displays backwards, table is incorrect
    return result
  })
}
