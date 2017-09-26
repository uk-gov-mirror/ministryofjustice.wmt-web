const caseloadHelper = require('./caseload-helper.js')
const percentageCalculator = require('./percentage-calculator')

module.exports.calculateTotals = function (caseloadTotalsByGrade) {
  return transform(caseloadTotalsByGrade, false)
}

module.exports.calculatePercentages = function (caseloadTotalsByGrade) {
  return transform(caseloadTotalsByGrade, true)
}

var transform = function (caseloadTotalsByGrade, calculatePercentage = false) {
  var percentageResults = []
  var caseloadTotalsByTeam = caseloadHelper.getOverallCaseloadByTeam(caseloadTotalsByGrade)

  // For each team, create one entry in the new results set with one 'grade' sub-object per grade
  for (var team in caseloadTotalsByTeam) {
    var newTeamEntry = { linkId: caseloadTotalsByTeam[team].linkId, name: caseloadTotalsByTeam[team].name }
    var teamGradeRecords = caseloadTotalsByGrade.filter((row) => row.linkId === caseloadTotalsByTeam[team].linkId)

    var percentageGradeRecords = []
    for (var record in teamGradeRecords) {
      var newGradeRecord
      if (calculatePercentage) {
        newGradeRecord = {
          gradeCode: teamGradeRecords[record].grade,
          untiered: percentageCalculator.calculatePercentage(teamGradeRecords[record].untiered, caseloadTotalsByTeam[team].untiered),
          d2: percentageCalculator.calculatePercentage(teamGradeRecords[record].d2, caseloadTotalsByTeam[team].d2),
          d1: percentageCalculator.calculatePercentage(teamGradeRecords[record].d1, caseloadTotalsByTeam[team].d1),
          c2: percentageCalculator.calculatePercentage(teamGradeRecords[record].c2, caseloadTotalsByTeam[team].c2),
          c1: percentageCalculator.calculatePercentage(teamGradeRecords[record].c1, caseloadTotalsByTeam[team].c1),
          b2: percentageCalculator.calculatePercentage(teamGradeRecords[record].b2, caseloadTotalsByTeam[team].b2),
          b1: percentageCalculator.calculatePercentage(teamGradeRecords[record].b1, caseloadTotalsByTeam[team].b1),
          a: percentageCalculator.calculatePercentage(teamGradeRecords[record].a, caseloadTotalsByTeam[team].a),
          totalCases: percentageCalculator.calculatePercentage(teamGradeRecords[record].totalCases, caseloadTotalsByTeam[team].totalCases)
        }
      } else {
        newGradeRecord = {
          gradeCode: teamGradeRecords[record].grade,
          untiered: teamGradeRecords[record].untiered,
          d2: teamGradeRecords[record].d2,
          d1: teamGradeRecords[record].d1,
          c2: teamGradeRecords[record].c2,
          c1: teamGradeRecords[record].c1,
          b2: teamGradeRecords[record].b2,
          b1: teamGradeRecords[record].b1,
          a: teamGradeRecords[record].a,
          totalCases: teamGradeRecords[record].totalCases
        }
      }
      percentageGradeRecords.push(newGradeRecord)
    }
    newTeamEntry = Object.assign({}, newTeamEntry, {grades: percentageGradeRecords})
    percentageResults.push(newTeamEntry)
  }
  return percentageResults
}
