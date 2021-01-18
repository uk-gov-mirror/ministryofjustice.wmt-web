const knex = require('../../../knex').web

module.exports = function (id) {
  const table = 'individual_case_overview'
  let whereClause = ''

  if (id !== undefined) {
    whereClause = ' WHERE workload_owner_id = ' + id
  }

  const selectColumns = [
    'grade_code AS grade',
    'team_id AS teamId',
    'team_name AS teamName',
    'ldu_name AS lduCluster',
    'region_name AS regionName',
    'available_points AS availablePoints',
    'total_points AS totalPoints',
    'total_cases AS cases',
    'contracted_hours AS contractedHours',
    'cms_adjustment_points as cmsAdjustmentPoints',
    'reduction_hours AS reduction'
  ]

  return knex.raw(
    'SELECT TOP (1) ' + selectColumns.join(', ') +
    ' FROM ' + table + ' WITH (NOEXPAND)' +
    whereClause
  )
    .then(function (results) {
      if (results.length > 0) {
        return results[0]
      } else {
        return knex('workload_owner')
          .join('offender_manager', 'workload_owner.offender_manager_id', 'offender_manager.id')
          .join('offender_manager_type', 'offender_manager.type_id', 'offender_manager_type.id')
          .join('team', 'workload_owner.team_id', 'team.id')
          .join('ldu', 'team.ldu_id', 'ldu.id')
          .join('region', 'ldu.region_id', 'region.id')
          .first('offender_manager_type.grade_code AS grade', 'team.id AS teamId', 'team.description AS teamName', 'ldu.description AS lduCluster', 'region.description AS regionName', 'workload_owner.contracted_hours AS contractedHours')
          .then(function (results) {
            results.noCaseload = true
            return results
          })
      }
    })
}
