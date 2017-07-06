const DisplayTable = require('../domain/display-table')
const capacityCalculator = require('../helpers/capacity-calculator')

module.exports.createCapacityTable = function (id, rowLabel, capacityDateRange, workloadReports) {
  var headings = []
  var rows = []
  var row = { label: rowLabel + id, values: [] }
  var reductionRow = {label: rowLabel + 'Reduction Hours' + id, values: []}

  var capacityResults = capacityCalculator.calculate(workloadReports)
  capacityResults.forEach(function (capacity) {
    headings.push(capacity['workload_report_date'])
    row.values.push(capacity['capacity_percentage'])
    reductionRow.values.push(capacity['reductions'])
  })

  rows.push(row)
  rows.push(reductionRow)

  return new DisplayTable(headings, rows)
}
