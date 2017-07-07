const getBreadcrumbs = require('../services/get-breadcrumbs')
const getIndividualWorkloadReports = require('../services/data/get-individual-workload-reports')
const getWorkloadReports = require('../services/data/get-workload-report-views')
const routeType = require('../constants/organisation-unit')
const tableCreator = require('../services/helpers/table-creator')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')

module.exports = function (id, capacityDateRange, organisationLevel) {
  var tableType = getOrganisationUnit('name', organisationLevel)
  var breadcrumbs = getBreadcrumbs(id, organisationLevel)
  var result = {}
  var workloadReportsPromise
  organisationLevel === routeType.OFFENDER_MANAGER.name

    ? workloadReportsPromise = getIndividualWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString())
    : workloadReportsPromise = getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)

  result.breadcrumbs = breadcrumbs

  return workloadReportsPromise.then(function (results) {
    result.capacityTable = tableCreator.createCapacityTable(id, tableType, capacityDateRange, results)
    result.title = tableType.displayText + ' Capacity'
    result.subTitle = breadcrumbs[0].title
    return result
  })
}
