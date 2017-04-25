const getCapacity = require('./data/get-capacity')
const DisplayTable = require('./domain/display-table')

module.exports = function (orgUnitType, id, capacityDateRange) {
  var headings = []
  var rows = []
  var row = { label: 'orgUnitType ' + id, values: [] }

    // TODO validate orgUnitType, id.
  var capacityResults = getCapacity(
        orgUnitType,
        id,
        capacityDateRange.capacityFromDate.toISOString(),
        capacityDateRange.capacityToDate.toISOString()
    )

  capacityResults.forEach(function (capacity) {
    headings.push(capacity['workload_report_date'])
    row.values.push(capacity['capacity_percentage'])
  })
  rows.push(row)

  return new DisplayTable(headings, rows)
}
