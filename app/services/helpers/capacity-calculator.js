
module.exports.calculate = function (workloadReports) {
  var capacities = []
  workloadReports.forEach(function (report) {
    var capacityPercentage = (report.total_points / report.available_points) * 100
    capacities.push({
      workload_report_date: report.effective_from,
      capacity_percentage: capacityPercentage,
      reductions: report.reduction_hours
    })
  })

  return capacities
}
