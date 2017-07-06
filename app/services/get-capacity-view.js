// TODO: Swap in real breadcrumbs method
// const getBreadcrumbs = require('../services/data/breadcrumbs/get-breadcrumbs-for-ldu')
const getIndividualWorkloadReports = require('../services/data/get-individual-workload-reports')
const getWorkloadReports = require('../services/data/get-workload-report-views')
const routeType = require('../services/constants/paths')
const tableCreator = require('../services/helpers/table-creator')

module.exports = function (id, capacityDateRange, organisationLevel) {
  // var breadcrumbsPromise = getBreadcrumbs(id)
  var result = {}
  var workloadReportsPromise
  organisationLevel === routeType.CAPACITY_OFFENDER_MANAGER
    ? workloadReportsPromise = getIndividualWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString())
    : workloadReportsPromise = getWorkloadReports(id, capacityDateRange.capacityFromDate.toISOString(), capacityDateRange.capacityToDate.toISOString(), organisationLevel)

  // return breadcrumbsPromise.then(function (results) {
  //   // TODO: swap for real method
  //   result.breadcrumbs = results

  return workloadReportsPromise.then(function (results) {
    result.capacityTable = tableCreator.createCapacityTable(id, 'TABLE TYPE GOES HERE', capacityDateRange, results)
    result.title = organisationLevel + ' Capacity'
    return result
  })
  // })
}
