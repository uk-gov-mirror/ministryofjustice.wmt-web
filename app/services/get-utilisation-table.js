const getUtilisation = require('./data/get-utilisation')
const DisplayTable = require('./domain/display-table')

module.exports = function (orgUnitType, id, year) {
    var headings = []
    var rows = []
    var row = { label: "orgUnitType " + id, values: [] }

    //TODO validate orgUnitType, id and year

    utilisationResults = getUtilisation(id, year)

    utilisationResults.forEach(function (utilisation) {
      headings.push(utilisation['month'])
      row.values.push(utilisation['utilisation_percentage'])
    })
    rows.push(row)

    return new DisplayTable(headings, rows)
}
