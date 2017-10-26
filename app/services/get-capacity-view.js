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
    result.capacityTable = tableCreator.createCapacityTable(id, organisationalUnitType.displayText, capacityDateRange, results)
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
  var totals = { name: 'Total/Average', capacity: 0, totalCases: 0, totalARMS: 0, totalGs: 0, totalCMS: 0 }

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

  capacityBreakdown.forEach(function (val, key) {
    totals.capacity += val.capacityPercentage
    totals.totalCases += val.totalCases
    totals.totalARMS += val.armsTotalCases
    totals.totalGs += val.gsPercentage
    totals.totalCMS += val.cmsPercentage
  })
  totals.capacity = totals.capacity / capacityBreakdown.length
  totals.totalGs = totals.totalGs / capacityBreakdown.length
  totals.totalCMS = totals.totalCMS / capacityBreakdown.length
  capacityBreakdown.push(totals)
  return capacityBreakdown
}

var buildCapacityBreakdownEntry = function (workloadReport) {
  var cmsPercentageValue = 0

  if (workloadReport.cmsAdjustmentPoints > 0) {
    cmsPercentageValue = percentageCalculator.calculatePercentage(workloadReport.cmsAdjustmentPoints, workloadReport.totalPoints)
  }

  return {
    name: workloadReport.name,
    grade: workloadReport.grade,
    totalCases: workloadReport.totalCases,
    linkId: workloadReport.linkId,
    capacityPercentage: percentageCalculator.calculatePercentage(workloadReport.totalPoints, workloadReport.availablePoints),
    cmsPercentage: cmsPercentageValue,
    gsPercentage: percentageCalculator.calculatePercentage(-workloadReport.gsAdjustmentPoints, (workloadReport.totalPoints - workloadReport.gsAdjustmentPoints)),
    armsTotalCases: workloadReport.armsTotalCases
  }
}
