const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (previousWorkloadPointsId) {
  return knex('workload_report')
    .join('workload_points_calculations', 'workload_report.id', 'workload_points_calculations.workload_report_id')
    .join('workload', 'workload.id', 'workload_points_calculations.workload_id')
    .min('workload.staging_id AS minWorkloadStagingId')
    .max('workload.staging_id AS maxWorkloadStagingId')
    .max('workload_report.id AS workloadReportId')
    .whereNotNull('workload_report.effective_from')
    .whereNull('workload_report.effective_to')
    .where('workload_points_calculations.workload_points_id', previousWorkloadPointsId)
    .then(function (ids) {
      return ids[0]
    })
}
