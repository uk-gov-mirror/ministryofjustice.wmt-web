const caseloadHelper = require('./caseload-helper.js')

// Rename basically everything
module.exports = function (object) {
  var percentageResults = []

  var teamTotals = caseloadHelper.getOverallCaseload(object)

  for (var team in teamTotals) {
    var entry = {linkId: teamTotals[team].linkId, name: teamTotals[team].name}

    var gradeRecords = object.filter((row) => row.linkId === teamTotals[team].linkId)
    var newGradeRecords = []
    for (var record in gradeRecords) {
      var newGradeRecord = {
        gradeCode: gradeRecords[record].gradeCode,
        untiered: calculatePercentage(gradeRecords[record].untiered, teamTotals[team].untiered),
        d2: calculatePercentage(gradeRecords[record].d2, teamTotals[team].d2),
        d1: calculatePercentage(gradeRecords[record].d1, teamTotals[team].d1),
        c2: calculatePercentage(gradeRecords[record].c2, teamTotals[team].c2),
        c1: calculatePercentage(gradeRecords[record].c1, teamTotals[team].c1),
        b2: calculatePercentage(gradeRecords[record].b2, teamTotals[team].b2),
        b1: calculatePercentage(gradeRecords[record].b1, teamTotals[team].b1),
        a: calculatePercentage(gradeRecords[record].a, teamTotals[team].a),
        totalCases: calculatePercentage(gradeRecords[record].totalCases, teamTotals[team].totalCases)
      }
      newGradeRecords.push(newGradeRecord)
    }

    entry = Object.assign({}, entry, {grades: newGradeRecords})

    percentageResults.push(entry)
  }

  return percentageResults
}

var calculatePercentage = function (value, total) {
  if (total === 0) {
    return 0
  } else {
    return value / total * 100
  }
}
