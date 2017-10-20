const DisplayTable = require('../domain/display-table')
const capacityCalculator = require('../helpers/capacity-calculator')

module.exports.createCapacityTable = function (id, rowLabel, capacityDateRange, workloadReports) {
  var headings = []
  var rows = []
  var orgLabel

  if (id !== undefined) {
    orgLabel = rowLabel + ' ' + id
  } else {
    orgLabel = rowLabel
  }

  var capacityPercentageRow = { label: orgLabel + ' Capacity', values: [] }
  var reductionRow = { label: orgLabel + ' Reduction Hours', values: [] }
  var reductionPercentageRow = { label: orgLabel + ' Reduction Hours Percentage', values: [] }

  var capacityResults = capacityCalculator.calculate(workloadReports)
  capacityResults.forEach(function (capacity) {
    headings.push(capacity['workload_report_date'])
    capacityPercentageRow.values.push(Math.round(capacity['capacity_percentage']))
    reductionRow.values.push(capacity['reductions'])
    reductionPercentageRow.values.push(Math.round(capacity['reduction_percentage']))
  })

  rows.push(capacityPercentageRow)
  rows.push(reductionRow)
  rows.push(reductionPercentageRow)

  return new DisplayTable(headings, rows)
}
