const getBreadcrumbs = require('./get-breadcrumbs')
const getCaseload = require('./data/get-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const caseloadHelper = require('./helpers/caseload-helper')
const caseType = require('../constants/case-type')

module.exports = function (id, organisationLevel) {
  var organisationUnitType = getOrganisationUnit('name', organisationLevel)

  return getCaseload(id)
    .then(function (results) {
      var breadcrumbs = getBreadcrumbs(id, organisationLevel)
      // Overall cases
      var overallResults = caseloadHelper.getOverallCaseload(results)
      // Custody cases
      var custodyResults = caseloadHelper.getCaseloadByType(results, caseType.CUSTODY)
      var custodySummary = caseloadHelper.getCaseloadTotalSummary(custodyResults)
      // Community cases
      var communityResults = caseloadHelper.getCaseloadByType(results, caseType.COMMUNITY)
      var communitySummary = caseloadHelper.getCaseloadTotalSummary(communityResults)
      // License cases
      var licenseResults = caseloadHelper.getCaseloadByType(results, caseType.LICENSE)
      var licenseSummary = caseloadHelper.getCaseloadTotalSummary(licenseResults)
      // Return the result set
      return {
        overallCaseloadDetails: overallResults,
        communityCaseloadDetails: communityResults,
        custodyCaseloadDetails: custodyResults,
        licenseCaseloadDetails: licenseResults,
        custodyTotalSummary: custodySummary,
        communityTotalSummary: communitySummary,
        licenseTotalSummary: licenseSummary,
        breadcrumbs: breadcrumbs,
        title: breadcrumbs[0].title,
        subTitle: organisationUnitType.displayText
      }
    })
}
