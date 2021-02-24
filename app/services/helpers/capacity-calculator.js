const percentageCalculator = require('./percentage-calculator').calculatePercentage

module.exports.calculate = function (workloadReports) {
  const capacities = []
  workloadReports.forEach(function (report) {
    const capacityPercentage = percentageCalculator(report.total_points, report.available_points)
    const reductionPercentage = percentageCalculator(report.reduction_hours, report.contracted_hours)
    capacities.push({
      workload_report_date: report.effective_from,
      capacity_percentage: capacityPercentage,
      reductions: report.reduction_hours,
      reduction_percentage: reductionPercentage
    })
  })

  return capacities
}
