const getBreadcrumbs = require('../services/get-breadcrumbs')
const getIndividualWorkloadReports = require('../services/data/get-individual-workload-reports')
const getWorkloadReports = require('../services/data/get-workload-report-views')
const routeType = require('../constants/organisation-unit')
//require('../services/constants/paths')
const tableCreator = require('../services/helpers/table-creator')

// TODO Don't do this here
const getOrganisationalHierarchyTree = require('./organisational-hierarchy-tree')

module.exports = function (id, capacityDateRange, organisationLevel) {

  return getOrganisationalHierarchyTree.build().then( function () {

  var tree = getOrganisationalHierarchyTree.get()

  var breadcrumbs = getBreadcrumbs(id, organisationLevel)
  var result = {}
  var workloadReportsPromise
  organisationLevel === routeType.OFFENDER_MANAGER.name
    ? workloadReportsPromise = getIndividualWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString())
    : workloadReportsPromise = getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)

    result.breadcrumbs = breadcrumbs

    return workloadReportsPromise.then(function (results) {
      result.capacityTable = tableCreator.createCapacityTable(id, 'TABLE TYPE GOES HERE', capacityDateRange, results)
      result.title = organisationLevel + ' Capacity'
      return result
    })


  })
}
