const getBreadcrumbs = require('./get-breadcrumbs')
const getCaseload = require('./data/get-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const caseloadHelper = require('./helpers/caseload-helper')
const organistaionUnit = require('../constants/organisation-unit')
const caseType = require('../constants/case-type')

module.exports = function (id, organisationLevel, isCSV = false) {
  const organisationUnitType = getOrganisationUnit('name', organisationLevel)

  return getCaseload(id, organisationLevel)
    .then(function (results) {
      const breadcrumbs = getBreadcrumbs(id, organisationLevel)
      const title = breadcrumbs[0].title
      const subTitle = organisationUnitType.displayText

      const caseloadResults = parseCaseloadResults(organisationLevel, results, isCSV)
      return {
        breadcrumbs: breadcrumbs,
        title: title,
        subTitle: subTitle,
        caseloadDetails: caseloadResults
      }
    })
}

const parseCaseloadResults = function (organisationLevel, results, isCSV) {
  if (results.length > 0) {
    // Overall cases
    const allTotals = caseloadHelper.totalAllCases(results)
    const caseloadGroupedByGrade = caseloadHelper.groupCaseloadByGrade(results)
    const overallPercentages = caseloadHelper.calculateOverallPercentages(allTotals, caseloadGroupedByGrade)

    let overallResults = caseloadHelper.getCaseloadTierTotalsByTeamByGrade(results)
    const overallSummary = caseloadHelper.getCaseloadSummaryTotalsByTeam(results)
    // Custody cases
    let custodyResults = caseloadHelper.getCaseloadByType(results, caseType.CUSTODY)
    const custodySummary = caseloadHelper.getCaseloadTotalSummary(custodyResults)
    // Community cases
    let communityResults = caseloadHelper.getCaseloadByType(results, caseType.COMMUNITY)
    const communitySummary = caseloadHelper.getCaseloadTotalSummary(communityResults)
    // License cases
    let licenseResults = caseloadHelper.getCaseloadByType(results, caseType.LICENSE)
    const licenseSummary = caseloadHelper.getCaseloadTotalSummary(licenseResults)

    const custodyTotals = caseloadHelper.totalAllCases(custodyResults)
    const custodyGroupedByGrade = caseloadHelper.groupCaseloadByGrade(custodyResults)
    const custodyPercentages = caseloadHelper.calculateOverallPercentages(custodyTotals, custodyGroupedByGrade)

    const communityTotals = caseloadHelper.totalAllCases(communityResults)
    const communityGroupedByGrade = caseloadHelper.groupCaseloadByGrade(communityResults)
    const communityPercentages = caseloadHelper.calculateOverallPercentages(communityTotals, communityGroupedByGrade)

    const licenseTotals = caseloadHelper.totalAllCases(licenseResults)
    const licenseGroupedByGrade = caseloadHelper.groupCaseloadByGrade(licenseResults)
    const licensePercentages = caseloadHelper.calculateOverallPercentages(licenseTotals, licenseGroupedByGrade)

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

    const caseloadResults = {
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
  } else {
    return undefined
  }
}

const replaceIncorrectPercentageAverages = function (originalPercentageTotals, correctPercentages) {
  // WMT0160: add new tiers
  const keys = Object.keys(originalPercentageTotals)
  keys.forEach(function (key) {
    originalPercentageTotals[key].a3 = correctPercentages[key].a3
    originalPercentageTotals[key].a2 = correctPercentages[key].a2
    originalPercentageTotals[key].a1 = correctPercentages[key].a1
    originalPercentageTotals[key].a0 = correctPercentages[key].a0
    
    originalPercentageTotals[key].b3 = correctPercentages[key].b3
    originalPercentageTotals[key].b2 = correctPercentages[key].b2
    originalPercentageTotals[key].b1 = correctPercentages[key].b1
    originalPercentageTotals[key].b0 = correctPercentages[key].b0

    originalPercentageTotals[key].c3 = correctPercentages[key].c3
    originalPercentageTotals[key].c2 = correctPercentages[key].c2
    originalPercentageTotals[key].c1 = correctPercentages[key].c1
    originalPercentageTotals[key].c0 = correctPercentages[key].c0

    originalPercentageTotals[key].d3 = correctPercentages[key].d3
    originalPercentageTotals[key].d2 = correctPercentages[key].d2
    originalPercentageTotals[key].d1 = correctPercentages[key].d1
    originalPercentageTotals[key].d0 = correctPercentages[key].d0

    originalPercentageTotals[key].untiered = correctPercentages[key].untiered
    originalPercentageTotals[key].totalCases = correctPercentages[key].totalCases
  })
}
