
module.exports = function (workloadReports) {
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
}
