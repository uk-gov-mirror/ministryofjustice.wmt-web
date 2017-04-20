const getUtilisation = require('./data/get-utilisation')
const DisplayTable = require('./domain/display-table')
const dateFormatter = require('./date-formatter')


module.exports = function (orgUnitType, id, capacityDateRange) {

    var headings = []
    var rows = []
    var row = { label: 'orgUnitType ' + id, values: [] }

    //TODO validate orgUnitType, id.
    utilisationResults = getUtilisation(
        orgUnitType,
        id,
        capacityDateRange.capacityFromDate.toISOString(),
        capacityDateRange.capacityToDate.toISOString()
    )

    utilisationResults.forEach(function (utilisation) {
      headings.push(utilisation['workload_report_date'])
      row.values.push(utilisation['capacity_percentage'])
    })
    rows.push(row)

    return new DisplayTable(headings, rows)
}
