const getBreadcrumbs = require('./get-breadcrumbs')
const getCaseload = require('./data/get-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const caseloadHelper = require('./helpers/caseload-helper')
const percentageCalculator = require('./helpers/percentage-calculator')
const organistaionUnit = require('../constants/organisation-unit')
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
  // Overall cases
  var overallResults = caseloadHelper.getOverallCaseloadByTeamByGrade(results)
  var overallSummary = caseloadHelper.getOverallCaseloadByTeam(results)
  // Custody cases
  var custodyResults = caseloadHelper.getCaseloadByType(results, caseType.CUSTODY)
  var custodySummary = caseloadHelper.getCaseloadTotalSummary(custodyResults)
  // Community cases
  var communityResults = caseloadHelper.getCaseloadByType(results, caseType.COMMUNITY)
  var communitySummary = caseloadHelper.getCaseloadTotalSummary(communityResults)
  // License cases
  var licenseResults = caseloadHelper.getCaseloadByType(results, caseType.LICENSE)
  var licenseSummary = caseloadHelper.getCaseloadTotalSummary(licenseResults)

  if(organisationLevel === organistaionUnit.LDU.name){
    overallResults = percentageCalculator(overallResults)
    overallSummary.push(caseloadHelper.getOverallTotals(overallSummary))
    custodyResults = percentageCalculator(custodyResults)
    communityResults = percentageCalculator(communityResults)
    licenseResults = percentageCalculator(licenseResults)
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
