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
      result.capacityTable = tableCreator.createCapacityTable(id, organisationalUnitType.displayText, results)
      result.title = result.breadcrumbs[0].title
      result.subTitle = organisationalUnitType.displayText

      if (organisationalUnitType !== organisationConstant.OFFENDER_MANAGER) {
        return getCapacityBreakdown(id, organisationLevel)
          .then(function (memberCapacityBreakdown) {
            result.capacityBreakdown = parseCapacityBreakdown(memberCapacityBreakdown, organisationLevel)
            var temp = Object.assign({}, result.capacityBreakdown[result.capacityBreakdown.length - 1])
            result.capacityBreakdown.pop()
            result.capacityBreakdown.sort(function (a, b) { return a.name.localeCompare(b.name) })
            result.capacityBreakdown.push(temp)
            return result
          })
      }
      return result
    })
}

var parseCapacityBreakdown = function (workloadReports, organisationLevel) {
  var capacityBreakdown = []
  var totals = { name: 'Total / Average', capacity: 0, totalCases: 0, totalARMS: 0, totalGs: 0, totalCMS: 0, totalSDRs: 0, totalParoms: 0, totalSdrConversions: 0, totalTotalT2aCases: 0, totalCMSPoints: 0, totalGSPoints: 0, totalPoints: 0, availablePoints: 0 }
  var totalNumberOfGrades = 0

  if (organisationLevel === organisationConstant.TEAM.name) {
    workloadReports.forEach(function (workloadReport) {
      var capacityBreakdownRow = buildCapacityBreakdownEntry(workloadReport)
      totals = addTotals(totals, capacityBreakdownRow)
      capacityBreakdown.push(buildCapacityBreakdownEntry(workloadReport))
    })
    totals = averageTotals(totals, capacityBreakdown.length)
    capacityBreakdown.push(totals)
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
        var capacityBreakdownRow = buildCapacityBreakdownEntry(report)
        totals = addTotals(totals, capacityBreakdownRow)
        newEntry.grades.push(capacityBreakdownRow)
        totalNumberOfGrades++
      })
      capacityBreakdown.push(newEntry)
    })
    totals = averageTotals(totals, totalNumberOfGrades)
    capacityBreakdown.push(totals)
  }
  return capacityBreakdown
}

var addTotals = function (totals, capacityBreakdown) {
  totals.capacity += capacityBreakdown.capacityPercentage
  totals.totalCases += capacityBreakdown.totalCases
  totals.totalARMS += capacityBreakdown.armsTotalCases
  totals.totalGs += capacityBreakdown.gsPercentage
  totals.totalCMS += capacityBreakdown.cmsPercentage
  totals.totalSDRs += capacityBreakdown.sdrs
  totals.totalParoms += capacityBreakdown.paroms
  totals.totalSdrConversions += capacityBreakdown.sdrConversions
  totals.totalTotalT2aCases += capacityBreakdown.totalT2aCases
  totals.totalGSPoints += capacityBreakdown.gsPoints
  totals.totalCMSPoints += capacityBreakdown.cmsPoints
  totals.totalPoints += capacityBreakdown.totalPoints
  totals.availablePoints += capacityBreakdown.availablePoints
  return totals
}

var averageTotals = function (totals, totalNumberOfGrades) {
  totals.capacity = percentageCalculator.calculatePercentage(totals.totalPoints, totals.availablePoints)
  totals.totalGs = percentageCalculator.calculatePercentage(totals.totalGSPoints, totals.totalPoints)
  totals.totalCMS = percentageCalculator.calculatePercentage(totals.totalCMSPoints, totals.availablePoints)
  return totals
}

var buildCapacityBreakdownEntry = function (workloadReport) {
  var cmsPercentageValue = 0
  // changed from "if (workloadReport.cmsAdjustmentPoints > 0)" to allow dividing by negative
  // numbers and allow negative cms adjustment points to be shown for CMS adjsutments
  if (workloadReport.cmsAdjustmentPoints !== 0) {
    cmsPercentageValue = percentageCalculator.calculatePercentage(workloadReport.cmsAdjustmentPoints, workloadReport.availablePoints)
  }

  return {
    name: workloadReport.name,
    grade: workloadReport.grade,
    totalPoints: workloadReport.totalPoints,
    availablePoints: workloadReport.availablePoints,
    totalCases: workloadReport.totalCases,
    armsTotalCases: workloadReport.armsTotalCases,
    paroms: workloadReport.paroms,
    sdrConversions: workloadReport.sdrConversions,
    sdrs: workloadReport.sdrs,
    totalT2aCases: workloadReport.totalT2aCases,
    linkId: workloadReport.linkId,
    capacityPercentage: percentageCalculator.calculatePercentage(workloadReport.totalPoints, workloadReport.availablePoints),
    cmsPercentage: cmsPercentageValue,
    gsPercentage: percentageCalculator.calculatePercentage(-workloadReport.gsAdjustmentPoints, (workloadReport.totalPoints - workloadReport.gsAdjustmentPoints)),
    cmsPoints: workloadReport.cmsAdjustmentPoints,
    gsPoints: workloadReport.gsAdjustmentPoints
  }
}
