const knex = require('../../../knex').web

module.exports = function (id) {
  var table = 'individual_case_overview'
  var whereClause = ''

  if (id !== undefined) {
    whereClause = ' WHERE workload_owner_id = ' + id
  }

  var selectColumns = [
    'grade_code AS grade',
    'team_id AS teamId',
    'team_name AS teamName',
    'ldu_name AS lduCluster',
    'region_name AS regionName',
    'available_points AS availablePoints',
    'total_points AS totalPoints',
    'total_cases AS cases',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reduction'
  ]

  return knex.raw(
    'SELECT TOP (1) ' + selectColumns.join(', ') +
    ' FROM ' + table + ' WITH (NOEXPAND)' +
    whereClause
  )
  .then(function (results) {
    return results[0]
  })
}
