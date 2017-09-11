const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (workloadReportId) {
  return knex('workload_points_calculations')
    .join('workload_report', 'workload_report.id', 'workload_points_calculations.workload_report_id')
    .join('workload', 'workload.id', 'workload_points_calculations.workload_id')
    .select('MIN(workload.id) AS workloadId',
            '')
}
