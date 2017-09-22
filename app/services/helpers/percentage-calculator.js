const caseloadHelper = require('./caseload-helper.js')

module.exports = function (caseloadTotalsByGrade, percentage = true) {
  var percentageResults = []
  var caseloadTotalsByTeam = caseloadHelper.getOverallCaseloadByTeam(caseloadTotalsByGrade)

  // For each team, create one entry in the new results set with one 'grade' sub-object per grade
  for (var team in caseloadTotalsByTeam) {
    var newTeamEntry = { linkId: caseloadTotalsByTeam[team].linkId, name: caseloadTotalsByTeam[team].name }
    var teamGradeRecords = caseloadTotalsByGrade.filter((row) => row.linkId === caseloadTotalsByTeam[team].linkId)

    var percentageGradeRecords = []
    for (var record in teamGradeRecords) {
      var newGradeRecord = {
        gradeCode: teamGradeRecords[record].grade,
        untiered: calculatePercentage(teamGradeRecords[record].untiered, caseloadTotalsByTeam[team].untiered),
        d2: calculatePercentage(teamGradeRecords[record].d2, caseloadTotalsByTeam[team].d2),
        d1: calculatePercentage(teamGradeRecords[record].d1, caseloadTotalsByTeam[team].d1),
        c2: calculatePercentage(teamGradeRecords[record].c2, caseloadTotalsByTeam[team].c2),
        c1: calculatePercentage(teamGradeRecords[record].c1, caseloadTotalsByTeam[team].c1),
        b2: calculatePercentage(teamGradeRecords[record].b2, caseloadTotalsByTeam[team].b2),
        b1: calculatePercentage(teamGradeRecords[record].b1, caseloadTotalsByTeam[team].b1),
        a: calculatePercentage(teamGradeRecords[record].a, caseloadTotalsByTeam[team].a),
        totalCases: calculatePercentage(teamGradeRecords[record].totalCases, caseloadTotalsByTeam[team].totalCases)
      }
      percentageGradeRecords.push(newGradeRecord)
    }
    newTeamEntry = Object.assign({}, newTeamEntry, {grades: percentageGradeRecords})
    percentageResults.push(newTeamEntry)
  }
  return percentageResults
}

var calculatePercentage = function (value, total, percentage = false) {
  var result = 0

  if (total !== 0) {
    result = value / total * 100
  }
  return result
}
