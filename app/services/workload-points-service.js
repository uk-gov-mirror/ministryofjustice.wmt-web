const getWorkloadPoints = require('./data/get-workload-points')
const updatePreviousWorkloadPointsEffectiveTo = require('./data/update-workload-points-effective-to')
const insertNewWorkloadPoints = require('./data/insert-workload-points')
const getWorkloadIdsForWpRecalc = require('./data/get-ids-for-workload-points-recalc')
const createCalculateWorkloadPointsTask = require('./data/create-calculate-workload-points-task')
const Link = require('./domain/link')
const dateFormatter = require('./date-formatter')
const userRoleService = require('../services/user-role-service')

module.exports.getWorkloadPoints = function (isT2A) {
  const result = {}

  const breadcrumbs = [
    new Link('Workload Points', '/admin/workload-points'),
    new Link('Admin', '/admin')
  ]

  return getWorkloadPoints(isT2A).then(function (workloadPoints) {
    let userId = null
    if (workloadPoints !== undefined) {
      const formattedUpdateDate = dateFormatter.formatDate(workloadPoints.effectiveFrom, 'DD/MM/YYYY HH:mm')
      workloadPoints.effectiveFrom = formattedUpdateDate
      userId = workloadPoints.updatedByUserId
    } else {
      workloadPoints = {}
      workloadPoints.isT2A = isT2A
    }
    if (isT2A) {
      breadcrumbs[0].title += ' (T2A)'
    }
    return userRoleService.getUserById(userId)
      .then(function (user) {
        let updatedBy = userId // Default to the user id
        const title = breadcrumbs[0].title
        if (user) {
          updatedBy = (user.name) ? user.name : user.username
        }
        result.title = title
        result.subTitle = breadcrumbs[1].title
        result.workloadPoints = workloadPoints
        result.updatedBy = updatedBy
        result.breadcrumbs = breadcrumbs
        return result
      })
  })
}

module.exports.updateWorkloadPoints = function (workloadPoints, isT2A = false) {
  return updatePreviousWorkloadPointsEffectiveTo(workloadPoints.previousWpId).then(function (updateResults) {
    return insertNewWorkloadPoints(workloadPoints).then(function (insertResults) {
      return getWorkloadIdsForWpRecalc(workloadPoints.previousWpId, isT2A).then(function (ids) {
        return createCalculateWorkloadPointsTask(ids.minWorkloadStagingId, ids.workloadReportId, (ids.maxWorkloadStagingId - ids.minWorkloadStagingId + 1))
          .then(function (taskResults) {
            return taskResults
          })
      })
    })
  })
}
