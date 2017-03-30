const getOffenderManagerUtilisation = require('./data/get-offender-manager-utilisation')
const DisplayTable = require('./domain/display-table')

module.exports = function (userId, year) {
    var headings = []
    var rows = []
    var row = { label: "Offender Manager " + userId, values: [] }

    //TODO validate userId and year

    offenderManagerUtilisation = getOffenderManagerUtilisation(userId, year)
    
    offenderManagerUtilisation.forEach(function (utilisation) {
      headings.push(utilisation['month'])
      row.values.push(utilisation['utilisation_percentage'])
    })
    rows.push(row)

    return new DisplayTable(headings, rows)
}
