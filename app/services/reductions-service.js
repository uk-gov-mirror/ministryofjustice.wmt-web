const addReduction = require('./data/insert-reduction')
const updateReduction = require('./data/update-reduction')
const updateReductionStatus = require('./data/update-reduction-status')
const getReductions = require('./data/get-reductions')
const getReductionReasons = require('./data/get-reduction-reasons')
const getContractedHoursForWorkloadOwner = require('./data/get-contracted-hours-for-workload-owner')
const createWorkloadPointsRecalculationTask = require('./data/create-calculate-workload-points-task')
const getLatestIdsForWorkloadPointsRecalc = require('./data/get-latest-workload-staging-id-and-workload-report-id')
const reductionsCalculator = require('./helpers/reduction-hours-calculator')
const getReductionById = require('./data/get-reduction-by-id')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const reductionHelper = require('./helpers/reduction-helper')
const workloadTypes = require('../../app/constants/workload-type')

module.exports.getReductions = function (id, organisationLevel, workloadType) {
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel, workloadType)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText

  return getReductions(id).then(function (results) {
    var reductionsByStatus = reductionHelper.getReductionsByStatus(results)
    result.activeReductions = reductionsByStatus.activeReductions
    result.scheduledReductions = reductionsByStatus.scheduledReductions
    result.archivedReductions = reductionsByStatus.archivedReductions
    return result
  })
}

module.exports.getAddReductionsRefData = function (id, organisationLevel, workloadType) {
  var result = {}
  var getReductionReasonsPromise = getReductionReasons()
  var getContractedHoursPromise = getContractedHoursForWorkloadOwner(id)
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel, workloadType)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText

  return getContractedHoursPromise.then(function (hours) {
    return getReductionReasonsPromise.then(function (results) {
      result.contractedHours = hours
      result.referenceData = reductionsCalculator(results, hours)
      return result
    })
  })
}

module.exports.addReduction = function (id, reduction, workloadType) {
  return addReduction(id, reduction)
  .then(function () {
    if (workloadType === workloadTypes.PROBATION) {
      return getLatestIdsForWorkloadPointsRecalc(id)
      .then(function (ids) {
        return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
        .then(function (result) {
          return result
        })
      })
    } else {

      // TODO kick off new court reports workload task
    }
  })
}

module.exports.updateReduction = function (id, reductionId, reduction, workloadType) {
  return updateReduction(reductionId, id, reduction)
  .then(function (result) {
    if (workloadType === workloadTypes.PROBATION) {
      return getLatestIdsForWorkloadPointsRecalc(id)
      .then(function (ids) {
        return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
        .then(function (result) {
          return result
        })
      })
    } else {

      // TODO kick off new court reports workload task
    }
  })
}

module.exports.updateReductionStatus = function (id, reductionId, reductionStatus, workloadType) {
  return updateReductionStatus(reductionId, reductionStatus)
  .then(function (result) {
    if (workloadType === workloadTypes.PROBATION) {
      return getLatestIdsForWorkloadPointsRecalc(id)
      .then(function (ids) {
        return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
        .then(function (result) {
          return result
        })
      })
    }
  })
}

module.exports.getReductionByReductionId = function (reductionId) {
  var reduction = Promise.resolve(undefined)
  if (reductionId) {
    reduction = getReductionById(reductionId)
  }
  return reduction
}
