module.exports = function (caseloadArray) {
  caseloadArray.details.forEach(function (detail) {
    if (detail.grades.length > 0) {
      var total = {grade: 'Total', doorstop: 0, contactCentre: 0, phoneCall: 0, untiered: 0, totalCases: 0}
      detail.grades.forEach(function (grade) {
        total.doorstop += grade.doorstop
        total.contactCentre += grade.contactCentre
        total.phoneCall += grade.phoneCall
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

  var totalRow = {grade: 'Total', doorstop: 0, contactCentre: 0, phoneCall: 0,untiered: 0, totalCases: 0}
  Object.keys(caseloadArray.totals).forEach(function (grade) {
    totalRow.doorstop += caseloadArray.totals[grade].doorstop
    totalRow.contactCentre += caseloadArray.totals[grade].contactCentre
    totalRow.phoneCall += caseloadArray.totals[grade].phoneCall
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
