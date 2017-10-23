const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')
const Promise = require('bluebird').Promise

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.caseProgressView
  var whereObject = {}

  if (id !== undefined) {
    whereObject.id = id
  }

  var selectList = [
    'community_last_16_weeks AS communityLast16Weeks',
    'license_last_16_weeks AS licenseLast16Weeks',
    'total_cases AS totalCases',
    'warrants_total AS warrantsTotal',
    'overdue_terminations_total AS overdueTerminationsTotal',
    'unpaid_work_total AS unpaidWorkTotal'
  ]

  var requiresWorkloadOwnerName =
    (type === ORGANISATION_UNIT.OFFENDER_MANAGER.name ||
    type === ORGANISATION_UNIT.TEAM.name)

  if (requiresWorkloadOwnerName) {
    selectList.push('workload_owner_id')
  } else {
    selectList.push('name')
  }

  return knex(table)
    .where(whereObject)
    .select(selectList)
    .then(function (results) {
      if (requiresWorkloadOwnerName) {
        return Promise.each(results, function (result) {
          return knex('workload_owner')
          .join('offender_manager', 'workload_owner.offender_manager_id', '=', 'offender_manager.id')
          .first('forename', 'surname')
          .where('workload_owner.id', result.workload_owner_id)
          .then(function (nameResult) {
            result.name = nameResult.forename + ' ' + nameResult.surname
            delete result.workload_owner_id
          })
        }).then(() => results)
      }
      return results
    })
}
