const getBreadcrumbs = require('./get-breadcrumbs')
const getCaseload = require('./data/get-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const caseloadHelper = require('./helpers/caseload-helper')
const caseloadPercentageCalculator = require('./helpers/caseload-percentage-calculator')
const caseType = require('../constants/case-type')

module.exports = function (id, organisationLevel) {
  var organisationUnitType = getOrganisationUnit('name', organisationLevel)

  return getCaseload(id, organisationLevel)
    .then(function (results) {
      var breadcrumbs = getBreadcrumbs(id, organisationLevel)
      var title = breadcrumbs[0].title
      var subTitle = organisationUnitType.displayText

      var caseloadResults = parseCaseloadResults(organisationLevel, results)

      return {
        breadcrumbs: breadcrumbs,
        title: title,
        subTitle: subTitle,
        caseloadDetails: caseloadResults
      }
    })
}

var parseCaseloadResults = function (organisationLevel, results) {
  var caseloadResults

  if (organisationLevel !== organisationUnitConstants.TEAM.name) {
    caseloadResults = caseloadPercentageCalculator(results)
  } else {
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

    caseloadResults = {
      overallCaseloadDetails: overallResults,
      communityCaseloadDetails: communityResults,
      custodyCaseloadDetails: custodyResults,
      licenseCaseloadDetails: licenseResults,
      custodyTotalSummary: custodySummary,
      communityTotalSummary: communitySummary,
      licenseTotalSummary: licenseSummary
    }
  }

  return caseloadResults
}
