const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.caseProgressView

  return knex(table)
    .where(table + '.id', id)
    .select(table + '.community_last_16_weeks AS communityLast16Weeks',
            table + '.license_last_16_weeks AS licenseLast16Weeks',
            table + '.total_cases AS totalCases',
            table + '.warrants_total AS warrantsTotal',
            table + '.overdue_terminations_total AS overdueTerminationsTotal',
            table + '.unpaid_work_total AS unpaidWorkTotal')
    .then(function (results) {
      return results
    })
}
