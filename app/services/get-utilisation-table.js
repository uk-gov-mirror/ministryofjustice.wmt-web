const getUtilisation = require('./data/get-utilisation')
const DisplayTable = require('./domain/display-table')

module.exports = function (orgUnitType, id, date) {

    var headings = []
    var rows = []
    var row = { label: 'orgUnitType ' + id, values: [] }

    //TODO validate orgUnitType, id and date

    //if no date, change to 2017. Needs handled better. Could be a datetime lib
    if(undefined === date) {
      date = '2017-03-01T00:00:00Z'
    }
    utilisationResults = getUtilisation(orgUnitType, id, date)

    utilisationResults.forEach(function (utilisation) {
      headings.push(utilisation['month'])
      row.values.push(utilisation['utilisation_percentage'])
    })
    rows.push(row)

    return new DisplayTable(headings, rows)
}
