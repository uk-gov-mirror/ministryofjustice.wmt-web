const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id, fromDate, toDate) {
  return knex('workload_points_calculations')
        .join('workload', 'workload_points_calculations.workload_id', '=', 'workload.id')
        .join('workload_report', 'workload_points_calculations.workload_report_id', '=', 'workload_report.id')
        .where('workload_report.effective_from', '>=', fromDate)
        .where('workload_report.effective_from', '<=', toDate)
        .where('workload.workload_owner_id', id)
        .select('workload_report.effective_from',
                'workload_points_calculations.total_points',
                'workload_points_calculations.sdr_points',
                'workload_points_calculations.sdr_conversion_points',
                'workload_points_calculations.paroms_points',
                'workload_points_calculations.available_points',
                'workload_points_calculations.reduction_hours')
       .then(function (workloadReports) {
         var capacities = []
         workloadReports.forEach(function (report) {
           var allPoints = report.total_points + report.sdr_points +
               report.sdr_conversion_points + report.paroms_points
           var capacityPercentage = (allPoints / report.available_points) * 100

           capacities.push({
             workload_report_date: report.effective_from,
             capacity_percentage: capacityPercentage,
             reductions: report.reduction_hours
           })
         })
         return capacities
       })
}
