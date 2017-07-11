const getBreadcrumbs = require('./get-breadcrumbs')
const getSubNav = require('./get-sub-nav')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getCaseProgress = require('./data/get-individual-caseload-progress')

module.exports = function (id, organisationLevel) {
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  var caseProgressPromise = getCaseProgress(id)

  return caseProgressPromise.then(function (results) {
    result.caseProgress = results
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    result.subNav = getSubNav(id, organisationLevel)

    return result
  })
}
