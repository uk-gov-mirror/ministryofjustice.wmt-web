const getBreadcrumbs = require('../services/get-breadcrumbs')
const getIndividualWorkloadReports = require('../services/data/get-individual-workload-reports')
const getWorkloadReports = require('../services/data/get-workload-report-views')
const routeType = require('../constants/organisation-unit')
const tableCreator = require('../services/helpers/table-creator')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')

// TODO Don't do this here
const getOrganisationalHierarchyTree = require('./organisational-hierarchy-tree')

module.exports = function (id, capacityDateRange, organisationLevel) {
  // TODO Move building of OH tree out
  return getOrganisationalHierarchyTree.build().then(function () {
    var tableType = getOrganisationUnit('displayText', organisationLevel)
    var breadcrumbs = getBreadcrumbs(id, organisationLevel)
    var result = {}
    var workloadReportsPromise
    organisationLevel === routeType.OFFENDER_MANAGER.name
    ? workloadReportsPromise = getIndividualWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString())
    : workloadReportsPromise = getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)

    result.breadcrumbs = breadcrumbs

    return workloadReportsPromise.then(function (results) {
      result.capacityTable = tableCreator.createCapacityTable(id, tableType, capacityDateRange, results)
      result.title = tableType + ' Capacity'
      result.subTitle = breadcrumbs[breadcrumbs.length - 1].name
      return result
    })
  })
}
