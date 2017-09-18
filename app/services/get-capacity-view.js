const getBreadcrumbs = require('./get-breadcrumbs')
const getWorkloadReports = require('./data/get-workload-report-views')
const getWorkloadReportsForOrg = require('./data/get-workload-reports-for-org')
const tableCreator = require('./helpers/table-creator')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const capacityCalculator = require('./helpers/capacity-calculator')
const percentageCalculator = require('./helpers/percentage-calculator')

module.exports = function (id, capacityDateRange, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  var result = {}
  var workloadReportsPromise

  if (organisationalUnitType === undefined) {
    throw new Error(organisationLevel + ' should be offender-manager, region, team, ldu or hmpps')
  }

  workloadReportsPromise = getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)

  return workloadReportsPromise
  .then(function (results) {
    return getWorkloadReportsForOrg(id, 'offender-manager')
    .then(function (memberWorkloadReports) {       
      result.capacityBreakdown = getCapacityBreakdown(memberWorkloadReports)
      result.capacityTable = tableCreator.createCapacityTable(id, organisationalUnitType, capacityDateRange, results)
      result.title = result.breadcrumbs[0].title
      result.subTitle = organisationalUnitType.displayText
      return result
    })  
  })
}

var getCapacityBreakdown = function (workloadReports) {
  var capacityBreakdown = []        
  
  workloadReports.forEach(function (workloadReport){
    var newEntry = {
      name: workloadReport.name,
      grade: workloadReport.grade,
      totalCases: workloadReport.totalCases,
      capacityPercentage: percentageCalculator.calculatePercentage(workloadReport.total_points, workloadReport.available_points),
      cmsPercentage: percentageCalculator.calculatePercentage(workloadReport.cmsReductionHours, workloadReport.contractedHours) 
    }
    capacityBreakdown.push(newEntry)
  })

  return capacityBreakdown
}
