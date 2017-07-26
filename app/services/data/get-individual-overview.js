const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  return knex('workload_owner')
    .join('team', 'workload_owner.team_id', 'team.id')
    .join('workload', 'workload.workload_owner_id', 'workload_owner.id')
    .join('workload_points_calculations', 'workload_points_calculations.workload_id', 'workload.id')
    .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
    .join('offender_manager', 'offender_manager.id', 'workload_owner.offender_manager_id')
    .first('offender_manager.grade_code AS grade',
           'team.id AS teamId',
           'team.description AS teamName',
           'workload_points_calculations.available_points AS availablePoints',
           'workload_points_calculations.total_points AS totalPoints',
           'workload.total_cases AS cases',
           'workload_owner.contracted_hours AS contractedHours',
           'workload_points_calculations.reduction_hours AS reduction')
    .where('workload_owner.id', id)
    .whereNot('workload_report.effective_from', null)
    .where('workload_report.effective_to', null)
    .then(function (results) {
      return results
    })
}
