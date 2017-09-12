const getWorkloadPoints = require('./data/get-workload-points')
const updatePreviousWorkloadPointsEffectiveTo = require('./data/update-workload-points-effective-to')
const insertNewWorkloadPoints = require('./data/insert-workload-points')
// const getWorkloadBatchIdsAndWorkloadReport = require('./data/get-workload-batch-ids-and-workload-report-id')
// const createCalculateWorkloadPointsTaskForWorkloads = require('./data/get-workload-ids-for-workload')
const Link = require('./domain/link')
const dateFormatter = require('./date-formatter')

module.exports.getWorkloadPoints = function (id, organisationLevel) {
  var result = {}

  var breadcrumbs = [
    new Link('Workload Points', '/admin/workload-points'),
    new Link('Admin', '/admin')
  ]

  return getWorkloadPoints().then(function (results) {
    var formattedDate = dateFormatter.formatDate(results.effectiveFrom, 'DD/MM/YYYY')
    results.effectiveFrom = formattedDate
    result.title = 'Workload Points'
    result.subTitle = 'Admin'
    result.workloadPoints = results
    result.breadcrumbs = breadcrumbs
    return result
  })
}

module.exports.updateWorkloadPoints = function (workloadPoints) {
  return updatePreviousWorkloadPointsEffectiveTo(workloadPoints.previousWpId).then(function (updateResults) {
    return insertNewWorkloadPoints(workloadPoints).then(function (insertResults) {
      // return getWorkloadBatchIdsAndWorkloadReport(workloadPoints.previousWpId).then(function (result) {
        // return createCalculateWorkloadPointsTaskForWorkloads(insertResults.workloadId, result.workloadReportId, result.numOfWorkloads).then(function (taskResults) {
      return updateResults
        // })
      // })
    })
  })
}
