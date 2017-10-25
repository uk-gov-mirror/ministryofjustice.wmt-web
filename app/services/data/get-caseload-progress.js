const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.caseProgressView
  var whereString = ''

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE id = ' + id
  }

  var selectList = [
    'community_last_16_weeks AS communityLast16Weeks',
    'license_last_16_weeks AS licenseLast16Weeks',
    'total_cases AS totalCases',
    'warrants_total AS warrantsTotal',
    'overdue_terminations_total AS overdueTerminationsTotal',
    'unpaid_work_total AS unpaidWorkTotal'
  ]

  var isIndexed =
    (type === ORGANISATION_UNIT.OFFENDER_MANAGER.name ||
    type === ORGANISATION_UNIT.TEAM.name)

  var noExpandHint = ''

  if (isIndexed) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
    noExpandHint = ' WITH (NOEXPAND)'
  } else {
    selectList.push('name')
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint +
      whereString)
}
