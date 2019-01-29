const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports = function (id, organisationLevel) {
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText
  return result
}
