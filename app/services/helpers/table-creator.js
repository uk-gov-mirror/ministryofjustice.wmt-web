const DisplayTable = require('../domain/display-table')
const capacityCalculator = require('../helpers/capacity-calculator')
const customRound = require('./custom-round')

module.exports.createCapacityTable = function (id, rowLabel, workloadReports) {
  const headings = []
  const rows = []
  let orgLabel

  if (id !== undefined) {
    orgLabel = rowLabel + ' ' + id
  } else {
    orgLabel = rowLabel
  }

  const capacityPercentageRow = { label: orgLabel + ' Capacity', values: [] }
  const reductionRow = { label: orgLabel + ' Reduction Hours', values: [] }
  const reductionPercentageRow = { label: orgLabel + ' Reduction Hours Percentage', values: [] }

  const capacityResults = capacityCalculator.calculate(workloadReports)
  capacityResults.forEach(function (capacity) {
    headings.push(capacity.workload_report_date)
    capacityPercentageRow.values.push(customRound(capacity.capacity_percentage))
    reductionRow.values.push(capacity.reductions)
    reductionPercentageRow.values.push(customRound(capacity.reduction_percentage))
  })

  rows.push(capacityPercentageRow)
  rows.push(reductionRow)
  rows.push(reductionPercentageRow)

  return new DisplayTable(headings, rows)
}
