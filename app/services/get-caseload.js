const getBreadcrumbs = require('./get-breadcrumbs')
const getCaseload = require('./data/get-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const caseloadHelper = require('./helpers/caseload-helper')

module.exports = function (id, organisationLevel) {
  var organisationUnitType = getOrganisationUnit('name', organisationLevel)

  return getCaseload(id)
  .then(function (results) {
    var breadcrumbs = getBreadcrumbs(id, organisationLevel)
    var overallResults = caseloadHelper.getOverallCaseload(results)
    var communityResults = caseloadHelper.getCaseloadByType(results, 'COMMUNITY')
    var custodyResults = caseloadHelper.getCaseloadByType(results, 'CUSTODY')
    var licenseResults = caseloadHelper.getCaseloadByType(results, 'LICENSE')
    return {
      overallCaseloadDetails: overallResults,
      communityCaseloadDetails: communityResults,
      custodyCaseloadDetails: custodyResults,
      licenseCaseloadDetails: licenseResults,
      breadcrumbs: breadcrumbs,
      title: breadcrumbs[0].title,
      subTitle: organisationUnitType.displayText
    }
  })
}
