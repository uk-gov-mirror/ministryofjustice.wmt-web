const getContractedHoursForWorkloadOwner = require('./data/get-contracted-hours-for-workload-owner')
const updateContractedHoursForWorkloadOwner = require('./data/update-contracted-hours-for-workload-owner')
const createWorkloadPointsRecalculationTask = require('./data/create-calculate-workload-points-task')
const getLatestIdsForWorkloadPointsRecalc = require('./data/get-latest-workload-staging-id-and-workload-report-id')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')

module.exports.getContractedHours = function (id, organisationLevel) {
  if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    throw new Error('Can only get contracted hours for an offender manager')
  }

  var breadcrumbs = getBreadcrumbs(id, organisationLevel)
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getContractedHoursForWorkloadOwner(id)
    .then(function (result) {
      return {
        breadcrumbs: breadcrumbs,
        title: breadcrumbs[0].title,
        subTitle: organisationalUnitType.displayText,
        contractedHours: result
      }
    })
}

module.exports.updateContractedHours = function (id, organisationLevel, hours) {
  if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
    throw new Error('Can only update contracted hours for an offender manager')
  }

  return updateContractedHoursForWorkloadOwner(id, hours)
  .then(function (count) {
    if (count === 0) {
      throw new Error('Offender manager with id: ' + id + ' has not had contracted hours updated')
    }
    return getLatestIdsForWorkloadPointsRecalc(id)
    .then(function (ids) {
      return createWorkloadPointsRecalculationTask(ids.workloadStagingId, ids.workloadReportId, 1)
    })
  }).catch(function (err) {
    throw err
  })
}
