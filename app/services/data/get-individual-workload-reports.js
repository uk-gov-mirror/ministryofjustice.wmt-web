const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id, fromDate, toDate) {
  return knex('workload_points_calculations')
        .join('workload', 'workload_points_calculations.workload_id', '=', 'workload.id')
        .where('workload_points_calculations.effective_from', '>=', fromDate)
        .where('workload_points_calculations.effective_from', '<=', toDate)
        .where('workload.workload_owner_id', id)
        .select('workload_points_calculations.effective_from',
                'workload_points_calculations.total_points',
                'workload_points_calculations.sdr_points',
                'workload_points_calculations.sdr_conversion_points',
                'workload_points_calculations.paroms_points',
                'workload_points_calculations.available_points',
                'workload_points_calculations.reduction_hours')
       .then(function (workloadReports) {
         return workloadReports
       })
}
