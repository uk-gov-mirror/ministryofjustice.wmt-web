const getBreadcrumbs = require('./get-breadcrumbs')
const getWorkloadReports = require('./data/get-workload-report-views')
const getWorkloadReportsForOrg = require('./data/get-workload-reports-for-org')
const tableCreator = require('./helpers/table-creator')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationConstant = require('../constants/organisation-unit')
const percentageCalculator = require('./helpers/percentage-calculator')

module.exports = function (id, capacityDateRange, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  if (organisationalUnitType === undefined) {
    throw new Error(organisationLevel + ' should be offender-manager, region, team, ldu or hmpps')
  }

  var childOrganisationName
  try {
    childOrganisationName = getOrganisationUnit('name', organisationalUnitType.childOrganisationLevel).name
  } catch (err) {}

  var result = {}
  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)

  return getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)
  .then(function (results) {
    result.capacityBreakdown = []
    result.capacityTable = tableCreator.createCapacityTable(id, organisationalUnitType, capacityDateRange, results)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText

    if (organisationalUnitType === organisationConstant.TEAM) {
      return getWorkloadReportsForOrg(id, childOrganisationName)
      .then(function (memberWorkloadReports) {
        result.capacityBreakdown = getCapacityBreakdown(memberWorkloadReports, organisationLevel)
        return result
      })
    }
    return result
  })
}

var getCapacityBreakdown = function (workloadReports, organisationLevel) {
  var capacityBreakdown = []

  if (organisationLevel === organisationConstant.TEAM.name) {
    workloadReports.forEach(function (workloadReport) {
      var newEntry = {
        name: workloadReport.name,
        grade: workloadReport.grade,
        totalCases: workloadReport.totalCases,
        linkId: workloadReport.linkId,
        capacityPercentage: percentageCalculator.calculatePercentage(workloadReport.total_points, workloadReport.available_points),
        cmsPercentage: percentageCalculator.calculatePercentage(workloadReport.cmsReductionHours, workloadReport.contractedHours)
      }
      capacityBreakdown.push(newEntry)
    })
  }

  return capacityBreakdown
}
