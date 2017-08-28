module.exports.generateLduCaseloadTable = function (lduResults) {
  var lduTable = []
  var team
  var teamGrade

  for (linkId in lduResults) {
    team = lduResults[linkId]
    for (grade in team.grades) {
      teamGrade = team.grades[grade]
      lduTable.push({
        name: team.name, 
        gradeCode: teamGrade.gradeCode, 
        totalCases: teamGrade.totalCases, 
        untiered: teamGrade.untiered,
        d2: teamGrade.d2,
        d1: teamGrade.d1,
        c2: teamGrade.c2,
        c1: teamGrade.c1,
        b2: teamGrade.b2,
        b1: teamGrade.b1,
        a: teamGrade.a
      })
    }
  }
  return lduTable
}