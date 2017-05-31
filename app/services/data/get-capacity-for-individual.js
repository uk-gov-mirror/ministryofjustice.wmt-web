const config = require('../../../knexfile')
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
                'workload_points_calculations.available_points')
       .then(function (workloadReports) {
         var capacities = []
         workloadReports.forEach(function (report) {
           var allPoints = report.total_points + report.sdr_points +
               report.sdr_conversion_points + report.paroms_points
           var capacityPercentage = (allPoints / report.available_points) * 100

           capacities.push({
             workload_report_date: report.effective_from,
             capacity_percentage: capacityPercentage
           })
         })
         return capacities
       })
}
