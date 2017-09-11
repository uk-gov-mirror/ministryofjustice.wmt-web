const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id, fromDate, toDate) {
  return knex('individual_capacity_view')
    .where('workload_report.effective_from', '>=', fromDate)
    .where('workload_report.effective_from', '<=', toDate)
    .where('workload.workload_owner_id', id)
    .select('workload_report.effective_from',
            'workload_points_calculations.total_points',
            'workload_points_calculations.available_points',
            'workload_points_calculations.reduction_hours')
    .orderBy('workload_report.effective_from')
    .then(function (workloadReports) {
      return workloadReports
    })
}
