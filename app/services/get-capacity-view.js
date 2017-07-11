const getBreadcrumbs = require('./get-breadcrumbs')
const getSubNav = require('./get-sub-nav')
const getIndividualWorkloadReports = require('./data/get-individual-workload-reports')
const getWorkloadReports = require('./data/get-workload-report-views')
const routeType = require('../constants/organisation-unit')
const tableCreator = require('./helpers/table-creator')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports = function (id, capacityDateRange, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  var result = {}
  var workloadReportsPromise

  if (organisationLevel === routeType.OFFENDER_MANAGER.name) {
    workloadReportsPromise = getIndividualWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString())
  } else {
    workloadReportsPromise = getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)
  }

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  result.subNav = getSubNav(id, organisationLevel)

  return workloadReportsPromise.then(function (results) {
    result.capacityTable = tableCreator.createCapacityTable(id, organisationalUnitType, capacityDateRange, results)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}
