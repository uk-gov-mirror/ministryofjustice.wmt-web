const getWorkloadPoints = require('./data/get-workload-points')
const updatePreviousWorkloadPointsEffectiveTo = require('./data/update-workload-points-effective-to')
const insertNewWorkloadPoints = require('./data/insert-workload-points')
const getWorkloadIdsForWpRecalc = require('./data/get-ids-for-workload-points-recalc')
const createCalculateWorkloadPointsTask = require('./data/create-calculate-workload-points-task')
const Link = require('./domain/link')
const dateFormatter = require('./date-formatter')

module.exports.getWorkloadPoints = function (id, organisationLevel) {
  var result = {}

  var breadcrumbs = [
    new Link('Workload Points', '/admin/workload-points'),
    new Link('Admin', '/admin')
  ]

  return getWorkloadPoints().then(function (results) {
    if (results !== undefined) {
      var formattedUpdateDate = dateFormatter.formatDate(results.effectiveFrom, 'DD/MM/YYYY')
      results.effectiveFrom = formattedUpdateDate
    }
    result.title = breadcrumbs[0].title
    result.subTitle = breadcrumbs[1].title
    result.workloadPoints = results
    result.breadcrumbs = breadcrumbs
    return result
  })
}

module.exports.updateWorkloadPoints = function (workloadPoints) {
  return updatePreviousWorkloadPointsEffectiveTo(workloadPoints.previousWpId).then(function (updateResults) {
    return insertNewWorkloadPoints(workloadPoints).then(function (insertResults) {
      return getWorkloadIdsForWpRecalc(workloadPoints.previousWpId).then(function (ids) {
        return createCalculateWorkloadPointsTask(ids.minWorkloadId, ids.workloadReportId, (ids.maxWorkloadId - ids.minWorkloadId))
        .then(function (taskResults) {
          return taskResults
        })
      })
    })
  })
}
