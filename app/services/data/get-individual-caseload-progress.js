const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  return knex('workload').withSchema('app')
    .leftJoin('workload_points_calculations', 'workload_points_calculations.workload_id', 'workload.id')
    .leftJoin('workload_report', 'workload_report.id', 'workload_points_calculations.workload_report_id')
    .leftJoin('tiers', 'workload.id', 'tiers.workload_id')
    .where('workload_owner_id', id)
    .whereNotNull('workload_report.effective_from')
    .whereNull('workload_report.effective_to')
    .max('workload.community_last_16_weeks AS communityLast16Weeks')
    .max('workload.license_last_16_weeks AS licenseLast16Weeks')
    .max('workload.total_cases AS totalCases')
    .sum('tiers.warrants_total AS warrantsTotal')
    .sum('tiers.overdue_terminations_total AS overdueTerminationsTotal')
    .sum('tiers.unpaid_work_total AS unpaidWorkTotal')
    .groupBy('workload.id')
    .first()
    .then(function (caseloadProgress) {
      return caseloadProgress
    })
}
