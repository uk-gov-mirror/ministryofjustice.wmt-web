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
  var allTotals = caseloadHelper.totalAllCases(results)
  var caseloadGroupedByGrade = caseloadHelper.groupCaseloadByGrade(results)
  var overallPercentages = caseloadHelper.calculateOverallPercentages(allTotals, caseloadGroupedByGrade)

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

  var custodyTotals = caseloadHelper.totalAllCases(custodyResults)
  var custodyGroupedByGrade = caseloadHelper.groupCaseloadByGrade(custodyResults)
  var custodyPercentages = caseloadHelper.calculateOverallPercentages(custodyTotals, custodyGroupedByGrade)

  var communityTotals = caseloadHelper.totalAllCases(communityResults)
  var communityGroupedByGrade = caseloadHelper.groupCaseloadByGrade(communityResults)
  var communityPercentages = caseloadHelper.calculateOverallPercentages(communityTotals, communityGroupedByGrade)

  var licenseTotals = caseloadHelper.totalAllCases(licenseResults)
  var licenseGroupedByGrade = caseloadHelper.groupCaseloadByGrade(licenseResults)
  var licensePercentages = caseloadHelper.calculateOverallPercentages(licenseTotals, licenseGroupedByGrade)

  if (organisationLevel !== organistaionUnit.TEAM.name) {
    overallResults = caseloadHelper.calculateTeamTierPercentages(overallResults)
    replaceIncorrectPercentageAverages(overallResults.percentageTotals, overallPercentages)

    custodyResults = caseloadHelper.aggregateTeamTierTotals(custodyResults)
    replaceIncorrectPercentageAverages(custodyResults.percentageTotals, custodyPercentages)

    communityResults = caseloadHelper.aggregateTeamTierTotals(communityResults)
    replaceIncorrectPercentageAverages(communityResults.percentageTotals, communityPercentages)

    licenseResults = caseloadHelper.aggregateTeamTierTotals(licenseResults)
    replaceIncorrectPercentageAverages(licenseResults.percentageTotals, licensePercentages)
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

var replaceIncorrectPercentageAverages = function (originalPercentageTotals, correctPercentages) {
  var keys = Object.keys(originalPercentageTotals)
  keys.forEach(function (key) {
    originalPercentageTotals[key].a = correctPercentages[key].a
    originalPercentageTotals[key].b1 = correctPercentages[key].b1
    originalPercentageTotals[key].b2 = correctPercentages[key].b2
    originalPercentageTotals[key].c1 = correctPercentages[key].c1
    originalPercentageTotals[key].c2 = correctPercentages[key].c2
    originalPercentageTotals[key].d1 = correctPercentages[key].d1
    originalPercentageTotals[key].d2 = correctPercentages[key].d2
    originalPercentageTotals[key].untiered = correctPercentages[key].untiered
    originalPercentageTotals[key].totalCases = correctPercentages[key].totalCases
  })
}
