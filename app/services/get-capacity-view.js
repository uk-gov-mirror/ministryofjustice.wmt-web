const getBreadcrumbs = require('../services/get-breadcrumbs')
const getIndividualWorkloadReports = require('./data/get-individual-workload-reports')
const getWorkloadReports = require('./data/get-workload-report-views')
const routeType = require('../constants/organisation-unit')
const tableCreator = require('./helpers/table-creator')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports = function (id, capacityDateRange, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  var breadcrumbs = getBreadcrumbs(id, organisationLevel)
  var result = {}
  var workloadReportsPromise
  organisationLevel === routeType.OFFENDER_MANAGER.name

    ? workloadReportsPromise = getIndividualWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString())
    : workloadReportsPromise = getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)

  result.breadcrumbs = breadcrumbs

  return workloadReportsPromise.then(function (results) {
    result.capacityTable = tableCreator.createCapacityTable(id, organisationalUnitType, capacityDateRange, results)
    result.title = organisationalUnitType.displayText + ' Capacity'
    result.subTitle = breadcrumbs[0].title
    return result
  })
}
