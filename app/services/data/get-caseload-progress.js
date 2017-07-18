const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.caseProgressView

  return knex(table)
    .where('id', id)
    .select('name',
            'community_last_16_weeks AS communityLast16Weeks',
            'license_last_16_weeks AS licenseLast16Weeks',
            'total_cases AS totalCases',
            'warrants_total AS warrantsTotal',
            'overdue_terminations_total AS overdueTerminationsTotal',
            'unpaid_work_total AS unpaidWorkTotal')
    .then(function (results) {
      return results
    })
}
