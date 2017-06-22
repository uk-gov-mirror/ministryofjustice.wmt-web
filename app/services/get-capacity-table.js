const getCapacity = require('./data/get-capacity-for-individual')
const DisplayTable = require('./domain/display-table')

module.exports = function (id, capacityDateRange) {
  var headings = []
  var rows = []
  var row = { label: 'Workload Owner ' + id, values: [] }

  // TODO validate id.
  return getCapacity(
    id,
    capacityDateRange.capacityFromDate.toISOString(),
    capacityDateRange.capacityToDate.toISOString()
  ).then((capacityResults) => {
    capacityResults.forEach(function (capacity) {
      headings.push(capacity['workload_report_date'])
      row.values.push(capacity['capacity_percentage'])
      row.values.push(capacity['reduction_hours'])
    })
    rows.push(row)

    return new DisplayTable(headings, rows)
  })
}
