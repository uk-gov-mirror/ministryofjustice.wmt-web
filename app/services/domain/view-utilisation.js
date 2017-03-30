const getUtilisationData = require('../data/get-utilisation')

class ViewUtilisation {
  constructor (userId, year) {
    this.userId = userId
    this.year = year
    this.isValid()
  }

  getCaseloadUtilisation () {
    return convertResultsToTableData(getUtilisationData(this.userId, this.year))
  }

  isValid () {
    //check year isn't in future
    // year range?
    // userId format?

    return true
  }
}

module.exports = ViewUtilisation

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