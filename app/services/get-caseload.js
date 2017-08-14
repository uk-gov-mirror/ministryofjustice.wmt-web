const getBreadcrumbs = require('./get-breadcrumbs')
const getTeamCaseload = require('./data/get-team-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports = function (id, organisationLevel) {
  var organisationUnitType = getOrganisationUnit('name', organisationLevel)

  return getTeamCaseload(id)
  .then(function (results) {
    var breadcrumbs = getBreadcrumbs(id, organisationLevel)
    return {
      caseloadDetails: results,
      breadcrumbs: breadcrumbs,
      title: breadcrumbs[0].title,
      subTitle: organisationUnitType.displayText
    }
  })
}
