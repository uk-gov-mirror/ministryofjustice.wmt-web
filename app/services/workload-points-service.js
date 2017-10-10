const getWorkloadPoints = require('./data/get-workload-points')
const updatePreviousWorkloadPointsEffectiveTo = require('./data/update-workload-points-effective-to')
const insertNewWorkloadPoints = require('./data/insert-workload-points')
const getWorkloadIdsForWpRecalc = require('./data/get-ids-for-workload-points-recalc')
const createCalculateWorkloadPointsTask = require('./data/create-calculate-workload-points-task')
const Link = require('./domain/link')
const dateFormatter = require('./date-formatter')
const userRoleService = require('../services/user-role-service')

module.exports.getWorkloadPoints = function (id, organisationLevel) {
  var result = {}

  var breadcrumbs = [
    new Link('Workload Points', '/admin/workload-points'),
    new Link('Admin', '/admin')
  ]

  return getWorkloadPoints().then(function (workloadPoints) {
    if (workloadPoints !== undefined) {
      var formattedUpdateDate = dateFormatter.formatDate(workloadPoints.effectiveFrom, 'DD/MM/YYYY')
      workloadPoints.effectiveFrom = formattedUpdateDate
    }
    return userRoleService.getUserById(workloadPoints.updatedByUserId)
    .then(function (user) {
      var updatedBy = workloadPoints.updatedByUserId // Default to the user id
      if (user) {
        if (user.name) { // If there is a valid use that
          updatedBy = user.name
        } else {
          updatedBy = user.username
        }
      }
      result.title = breadcrumbs[0].title
      result.subTitle = breadcrumbs[1].title
      result.workloadPoints = workloadPoints
      result.updatedBy = updatedBy
      result.breadcrumbs = breadcrumbs
      return result
    })
  })
}

module.exports.updateWorkloadPoints = function (workloadPoints) {
  return updatePreviousWorkloadPointsEffectiveTo(workloadPoints.previousWpId).then(function (updateResults) {
    return insertNewWorkloadPoints(workloadPoints).then(function (insertResults) {
      return getWorkloadIdsForWpRecalc(workloadPoints.previousWpId).then(function (ids) {
        return createCalculateWorkloadPointsTask(ids.minWorkloadStagingId, ids.workloadReportId, (ids.maxWorkloadStagingId - ids.minWorkloadStagingId + 1))
        .then(function (taskResults) {
          return taskResults
        })
      })
    })
  })
}
