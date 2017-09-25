const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (previousWorkloadPointsId) {
  return knex('workload_report')
    .join('workload_points_calculations', 'workload_report.id', 'workload_points_calculations.workload_report_id')
    .min('workload_points_calculations.workload_id AS minWorkloadId')
    .max('workload_points_calculations.workload_id AS maxWorkloadId')
    .max('workload_report.id AS workloadReportId')
    .whereNotNull('workload_report.effective_from')
    .whereNull('workload_report.effective_to')
    .where('workload_points_calculations.workload_points_id', previousWorkloadPointsId)
    .then(function (ids) {
      return ids[0]
    })
}
