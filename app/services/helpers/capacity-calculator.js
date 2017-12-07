
module.exports.calculate = function (workloadReports) {
  var capacities = []
  workloadReports.forEach(function (report) {
    var capacityPercentage
    var reductionPercentage
    if (report.available_points === 0) {
      capacityPercentage = 0
    } else {
      capacityPercentage = (report.total_points / report.available_points) * 100
    }
    if (report.contracted_hours === 0) {
      reductionPercentage = 0
    } else {
      reductionPercentage = (report.reduction_hours / report.contracted_hours) * 100
    }
    capacities.push({
      workload_report_date: report.effective_from,
      capacity_percentage: capacityPercentage,
      reductions: report.reduction_hours,
      reduction_percentage: reductionPercentage
    })
  })

  return capacities
}
