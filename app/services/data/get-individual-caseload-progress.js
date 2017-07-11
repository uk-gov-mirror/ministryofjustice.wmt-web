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
    .max('workload.community_last_16_weeks AS community_last_16_weeks')
    .max('workload.license_last_16_weeks AS license_last_16_weeks')
    .max('workload.total_cases AS total_cases')
    .sum('tiers.warrants_total AS warrants_total')
    .sum('tiers.overdue_terminations_total AS overdue_terminations_total')
    .sum('tiers.unpaid_work_total AS unpaid_work_total')
    .groupBy('workload.id')
    .then(function (caseloadProgress) {
      return caseloadProgress
    })
}
