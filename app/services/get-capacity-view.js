const getBreadcrumbs = require('./get-breadcrumbs')
const getWorkloadReports = require('./data/get-workload-report-views')
const getCapacityBreakdown = require('./data/get-capacity-breakdown')
const tableCreator = require('./helpers/table-creator')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationConstant = require('../constants/organisation-unit')
const percentageCalculator = require('./helpers/percentage-calculator')

module.exports = function (id, capacityDateRange, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  if (organisationalUnitType === undefined) {
    throw new Error(organisationLevel + ' should be offender-manager, region, team, ldu or hmpps')
  }

  var result = {}
  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)

  return getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)
  .then(function (results) {
    result.capacityBreakdown = []
    result.capacityTable = tableCreator.createCapacityTable(id, organisationalUnitType, capacityDateRange, results)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText

    if (organisationalUnitType !== organisationConstant.OFFENDER_MANAGER) {
      return getCapacityBreakdown(id, organisationLevel)
      .then(function (memberCapacityBreakdown) {
        result.capacityBreakdown = parseCapacityBreakdown(memberCapacityBreakdown, organisationLevel)
        return result
      })
    }
    return result
  })
}

var parseCapacityBreakdown = function (workloadReports, organisationLevel) {
  var capacityBreakdown = []

  if (organisationLevel === organisationConstant.TEAM.name) {
    workloadReports.forEach(function (workloadReport) {
      capacityBreakdown.push(buildCapacityBreakdownEntry(workloadReport))
    })
  } else if (organisationLevel !== organisationConstant.OFFENDER_MANAGER.name) {
    var organisationMap = new Map()

    workloadReports.forEach(function (workloadReport) {
      var valueToAdd

      if (organisationMap.has(workloadReport.name)) {
        valueToAdd = organisationMap.get(workloadReport.name)
        valueToAdd.push(workloadReport)
      } else {
        valueToAdd = [workloadReport]
      }
      organisationMap.set(workloadReport.name, valueToAdd)
    })

    organisationMap.forEach(function (reports, orgName) {
      var newEntry = {
        name: orgName,
        linkId: reports[0].linkId,
        grades: []
      }

      reports.forEach(function (report) {
        newEntry.grades.push(buildCapacityBreakdownEntry(report))
      })

      capacityBreakdown.push(newEntry)
    })
  }

  return capacityBreakdown
}

var buildCapacityBreakdownEntry = function (workloadReport) {
  return {
    name: workloadReport.name,
    grade: workloadReport.grade,
    totalCases: workloadReport.totalCases,
    linkId: workloadReport.linkId,
    capacityPercentage: percentageCalculator.calculatePercentage(workloadReport.totalPoints, workloadReport.availablePoints),
    gsPercentage: percentageCalculator.calculatePercentage(workloadReport.gsReductionHours, workloadReport.contractedHours),
    cmsPercentage: percentageCalculator.calculatePercentage(workloadReport.cmsReductionHours, workloadReport.contractedHours)
  }
}
