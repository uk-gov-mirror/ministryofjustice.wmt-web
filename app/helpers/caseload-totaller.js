module.exports = function (caseloadArray) {
  caseloadArray.details.forEach(function (detail) {
    if (detail.grades.length > 0) {
      var total = {grade: 'Total', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0}
      detail.grades.forEach(function (grade) {
        total.a += grade.a
        total.b1 += grade.b1
        total.b2 += grade.b2
        total.c1 += grade.c1
        total.c2 += grade.c2
        total.d1 += grade.d1
        total.d2 += grade.d2
        total.e += grade.e
        total.f += grade.f
        total.g += grade.g
        total.untiered += grade.untiered
        total.totalCases += grade.totalCases
      })
      detail.grades.push(total)
    }
  })
  
  var totalRow = {grade: 'Total', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0}
  Object.keys(caseloadArray.totals).forEach(function (grade) {
    totalRow.a += caseloadArray.totals[grade].a
    totalRow.b1 += caseloadArray.totals[grade].b1
    totalRow.b2 += caseloadArray.totals[grade].b2
    totalRow.c1 += caseloadArray.totals[grade].c1
    totalRow.c2 += caseloadArray.totals[grade].c2
    totalRow.d1 += caseloadArray.totals[grade].d1
    totalRow.d2 += caseloadArray.totals[grade].d2
    totalRow.e += caseloadArray.totals[grade].e
    totalRow.f += caseloadArray.totals[grade].f
    totalRow.g += caseloadArray.totals[grade].g
    totalRow.untiered += caseloadArray.totals[grade].untiered
    totalRow.totalCases += caseloadArray.totals[grade].totalCases
  })
  caseloadArray.totals.Total = totalRow
}
