const knex = require('../../../knex').web

module.exports = function (previousWorkloadPointsId, isT2A) {
  let whereColumnName = 'workload_points_calculations.workload_points_id'
  if (isT2A === true) {
    whereColumnName = 'workload_points_calculations.t2a_workload_points_id'
  }
  return knex('workload_report')
    .join('workload_points_calculations', 'workload_report.id', 'workload_points_calculations.workload_report_id')
    .join('workload', 'workload.id', 'workload_points_calculations.workload_id')
    .min('workload.staging_id AS minWorkloadStagingId')
    .max('workload.staging_id AS maxWorkloadStagingId')
    .max('workload_report.id AS workloadReportId')
    .whereNotNull('workload_report.effective_from')
    .whereNull('workload_report.effective_to')
    .where(whereColumnName, previousWorkloadPointsId)
    .then(function (ids) {
      return ids[0]
    })
}
