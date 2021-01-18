const knex = require('../../../knex').web

module.exports = function (id) {
  return knex('workload_owner')
    .join('court_reports', 'court_reports.workload_owner_id', 'workload_owner.id')
    .join('court_reports_calculations', 'court_reports_calculations.court_reports_id', 'court_reports.id')
    .join('workload_report', 'court_reports_calculations.workload_report_id', 'workload_report.id')
    .where('workload_owner.id', id)
    .select('workload_report.id AS workloadReportId',
      'court_reports.staging_id AS courtReportsStagingId')
    .whereNotNull('workload_report.effective_from')
    .whereNull('workload_report.effective_to')
    .then(function (result) {
      return result[0]
    })
}
