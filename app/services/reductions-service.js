const addReduction = require('./data/insert-reduction')
const updateReduction = require('./data/update-reduction')
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

  var getReductionsDataPromise = getReductions(id)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText
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

module.exports.upsertReduction = function (id, reductionId, reduction) {
  var reductionPromise
  if (reductionId) {
    reductionPromise = updateReduction(reductionId, id, reduction)
  } else {
    reductionPromise = addReduction(id, reduction)
  }
  var createRecalculationTaskPromise = createWorkloadPointsRecalculationTask(id)
  return reductionPromise.then(function (result) {
    return createRecalculationTaskPromise.then(function (result) {
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
