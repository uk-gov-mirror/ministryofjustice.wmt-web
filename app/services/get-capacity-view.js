// TODO: Swap in real breadcrumbs method
const getBreadcrumbs = require('')
const getIndividualWorkloadReports = require('../services/data/get-workload-report-views')
const getWorkloadReports = require('../services/data/get-workload-report-views')
const capacityType = require('../services/constants/capacity-type')
const tableCreator = require('../services/helpers/table-creator')

module.exports = function (id, capacityDateRange, organisationLevel) {
  var breadcrumbsPromise = getBreadcrumbs(id)
  var result
  var workloadReportsPromise
  organisationLevel === capacityType.WORKLOAD_OWNER
    ? workloadReportsPromise = getIndividualWorkloadReports(id, capacityDateRange.fromDate, capacityDateRange.toDate)
    : workloadReportsPromise = getWorkloadReports(id, capacityDateRange.fromDate, capacityDateRange.toDate, organisationLevel)

  return breadcrumbsPromise.then(function (results) {
    // TODO: swap for real method
    result.breadcrumbs = results
    return workloadReportsPromise.then(function (results) {
      result.capacityTable = tableCreator.createCapacityTable(id, 'TABLE TYPE GOES HERE', capacityDateRange, results)
      result.title = organisationLevel + ' Capacity'
      return result
    })
  })
}
