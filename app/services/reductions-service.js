const addReduction = require('./data/insert-reduction')
const updateReduction = require('./data/update-reduction')
const updateReductionStatus = require('./data/update-reduction-status')
const getReductions = require('./data/get-reductions')
const getReductionReasons = require('./data/get-reduction-reasons')
const getContractedHoursForWorkloadOwner = require('./data/get-contracted-hours-for-workload-owner')
const createWorkloadPointsRecalculationTask = require('./data/create-calculate-workload-points-task')
const reductionsCalculator = require('./helpers/reduction-hours-calculator')
const getReductionById = require('./data/get-reduction-by-id')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const reductionHelper = require('./helpers/reduction-helper')

module.exports.getReductions = function (id, organisationLevel) {
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText

  var getReductionsDataPromise = getReductions(id)
  return getReductionsDataPromise.then(function (results) {
    var reductionsByStatus = reductionHelper.getReductionsByStatus(results)
    result.activeReductions = reductionsByStatus.activeReductions
    result.scheduledReductions = reductionsByStatus.scheduledReductions
    result.archivedReductions = reductionsByStatus.archivedReductions
    return result
  })
}

module.exports.getAddReductionsRefData = function (id, organisationLevel) {
  var result = {}
  var getReductionReasonsPromise = getReductionReasons()
  var getContractedHoursPromise = getContractedHoursForWorkloadOwner(id)
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
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

module.exports.addReduction = function (id, reduction) {
  var reductionPromise = addReduction(id, reduction)
  var createRecalculationTaskPromise = createWorkloadPointsRecalculationTask(id)
  return reductionPromise.then(function (result) {
    return createRecalculationTaskPromise.then(function (result) {
      return result
    })
  })
}

module.exports.updateReduction = function (id, reductionId, reduction) {
  return updateReduction(reductionId, id, reduction)
  .then(function (result) {
    return createWorkloadPointsRecalculationTask(id)
    .then(function (result) {
      return result
    })
  })
}

module.exports.updateReductionStatus = function (id, reductionId, reductionStatus) {
  return updateReductionStatus(reductionId, reductionStatus)
  .then(function (result) {
    return createWorkloadPointsRecalculationTask(id)
    .then(function (result) {
      return result
    })
  })
}

module.exports.getReductionByReductionId = function (reductionId) {
  var reduction = Promise.resolve(undefined)
  if (reductionId) {
    reduction = getReductionById(reductionId)
  }
  return reduction
}
