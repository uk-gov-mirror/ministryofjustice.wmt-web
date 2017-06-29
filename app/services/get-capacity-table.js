const getCapacity = require('./data/get-capacity-for-individual')
const DisplayTable = require('./domain/display-table')

module.exports = function (id, capacityDateRange) {
  var headings = []
  var rows = []
  var capacityRow = { label: 'Workload Owner ' + id, values: [] }
  var reductionRow = { label: 'Workload Owner ' + id, values: [] }

  // TODO validate id.
  return getCapacity(
    id,
    capacityDateRange.capacityFromDate.toISOString(),
    capacityDateRange.capacityToDate.toISOString()
  ).then((capacityResults) => {
    capacityResults.forEach(function (capacity) {
      headings.push(capacity['workload_report_date'])
      capacityRow.values.push(capacity['capacity_percentage'])
      reductionRow.values.push(capacity['reductions'])
    })
    rows.push(capacityRow)
    rows.push(reductionRow)

    return new DisplayTable(headings, rows)
  })
}
