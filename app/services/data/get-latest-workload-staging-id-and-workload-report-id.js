const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  return knex('workload_owner')
    .join('workload', 'workload.workload_owner_id', 'workload_owner.id')
    .join('workload_points_calculations', 'workload_points_calculations.workload_id', 'workload.id')
    .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
    .where('workload_owner.id', id)
    .select('workload_report.id AS workloadReportId',
            'workload.staging_id AS workloadStagingId')
    .whereNotNull('workload_report.effective_from')
    .whereNull('workload_report.effective_to')
    .then(function (result) {
      return result[0]
    })
}

// TODO: Rename
