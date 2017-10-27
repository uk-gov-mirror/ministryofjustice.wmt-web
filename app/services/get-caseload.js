const getBreadcrumbs = require('./get-breadcrumbs')
const getCaseload = require('./data/get-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const caseloadHelper = require('./helpers/caseload-helper')
const organistaionUnit = require('../constants/organisation-unit')
const caseType = require('../constants/case-type')

module.exports = function (id, organisationLevel, isCSV = false) {
  var organisationUnitType = getOrganisationUnit('name', organisationLevel)

  return getCaseload(id, organisationLevel)
    .then(function (results) {
      var breadcrumbs = getBreadcrumbs(id, organisationLevel)
      var title = breadcrumbs[0].title
      var subTitle = organisationUnitType.displayText

      var caseloadResults = parseCaseloadResults(organisationLevel, results, isCSV)
      return {
        breadcrumbs: breadcrumbs,
        title: title,
        subTitle: subTitle,
        caseloadDetails: caseloadResults
      }
    })
}

var parseCaseloadResults = function (organisationLevel, results, isCSV) {
  // Overall cases
  var overallResults = caseloadHelper.getCaseloadTierTotalsByTeamByGrade(results)
  var overallSummary = caseloadHelper.getCaseloadSummaryTotalsByTeam(results)
  // Custody cases
  var custodyResults = caseloadHelper.getCaseloadByType(results, caseType.CUSTODY)
  var custodySummary = caseloadHelper.getCaseloadTotalSummary(custodyResults)
  // Community cases
  var communityResults = caseloadHelper.getCaseloadByType(results, caseType.COMMUNITY)
  var communitySummary = caseloadHelper.getCaseloadTotalSummary(communityResults)
  // License cases
  var licenseResults = caseloadHelper.getCaseloadByType(results, caseType.LICENSE)
  var licenseSummary = caseloadHelper.getCaseloadTotalSummary(licenseResults)

  if (organisationLevel !== organistaionUnit.TEAM.name) {
    overallResults = caseloadHelper.calculateTeamTierPercentages(overallResults)
    custodyResults = caseloadHelper.aggregateTeamTierTotals(custodyResults)
    communityResults = caseloadHelper.aggregateTeamTierTotals(communityResults)
    licenseResults = caseloadHelper.aggregateTeamTierTotals(licenseResults)
  } else if (!isCSV) {
    overallResults.totals = caseloadHelper.calculateTotalsRow(overallResults)
    communityResults.totals = caseloadHelper.calculateTotalsRow(communityResults)
    custodyResults.totals = caseloadHelper.calculateTotalsRow(custodyResults)
    licenseResults.totals = caseloadHelper.calculateTotalsRow(licenseResults)
  }
  if (!isCSV) {
    overallSummary[0].totals = caseloadHelper.calculateTotalTiersRow(overallSummary)
  }

  var caseloadResults = {
    overallCaseloadDetails: overallResults,
    communityCaseloadDetails: communityResults,
    custodyCaseloadDetails: custodyResults,
    licenseCaseloadDetails: licenseResults,
    overallTotalSummary: overallSummary,
    custodyTotalSummary: custodySummary,
    communityTotalSummary: communitySummary,
    licenseTotalSummary: licenseSummary
  }
  return caseloadResults
}
