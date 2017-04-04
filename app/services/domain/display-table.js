class DisplayTable {
  constructor (headings, rows) {
    this.headings = headings
    this.rows = rows
    this.isValid()
  }

  isValid () {
    var valid = true 
    if(this.headings.length < 1) {
      throw new Error("No headings found");
    }
  }
}

module.exports = DisplayTable

function convertResultsToTableData (results) {
    var utilisationTable = {}
    utilisationTable.headings = []
    utilisationTable.values = []

    results.forEach(function (result) {
      utilisationTable.headings.push(result['month'])
      utilisationTable.values.push(result['utilisation_percentage'])
    })

    return utilisationTable
}
