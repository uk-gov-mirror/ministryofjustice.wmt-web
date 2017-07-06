const DisplayTable = require('../domain/display-table')
const capacityCalculator = require('../helpers/capacity-calculator')

module.exports.createCapacityTable = function (id, rowLabel, capacityDateRange, workloadReports) {
  var headings = []
  var rows = []
  var row = { label: rowLabel + id, values: [] }

  var capacityResults = capacityCalculator.calculate(workloadReports)

  capacityResults.forEach(function (capacity) {
    headings.push(capacity['workload_report_date'])
    row.values.push(capacity['capacity_percentage'])
    row.values.push(capacity['reduction_hours'])
  })

  rows.push(row)

  return new DisplayTable(headings, rows)
}
