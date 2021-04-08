module.exports = function (caseloadArray) {
  caseloadArray.details.forEach(function (detail) {
    if (detail.grades.length > 0) {
      const total = { grade: 'Total', a3: 0, a2: 0, a1: 0, a0: 0, b3: 0, b2: 0, b1: 0, b0: 0, c3: 0, c2: 0, c1: 0, c0: 0, d3: 0, d2: 0, d1: 0, d0: 0, untiered: 0, totalCases: 0 }
      detail.grades.forEach(function (grade) {
        total.a3 += grade.a3
        total.a2 += grade.a2
        total.a1 += grade.a1
        total.a0 += grade.a0

        total.b3 += grade.b3
        total.b2 += grade.b2
        total.b1 += grade.b1
        total.b0 += grade.b0

        total.c3 += grade.c3
        total.c2 += grade.c2
        total.c1 += grade.c1
        total.c0 += grade.c0

        total.d3 += grade.d3
        total.d2 += grade.d2
        total.d1 += grade.d1
        total.d0 += grade.d0
        total.untiered += grade.untiered
        total.totalCases += grade.totalCases
      })
      detail.grades.push(total)
    }
  })

  const totalRow = { grade: 'Total', a3: 0, a2: 0, a1: 0, a0: 0, b3: 0, b2: 0, b1: 0, b0: 0, c3: 0, c2: 0, c1: 0, c0: 0, d3: 0, d2: 0, d1: 0, d0: 0, untiered: 0, totalCases: 0 }
  Object.keys(caseloadArray.totals).forEach(function (grade) {
    totalRow.a3 += caseloadArray.totals[grade].a3
    totalRow.a2 += caseloadArray.totals[grade].a2
    totalRow.a1 += caseloadArray.totals[grade].a1
    totalRow.a0 += caseloadArray.totals[grade].a0
    totalRow.b3 += caseloadArray.totals[grade].b3
    totalRow.b2 += caseloadArray.totals[grade].b2
    totalRow.b1 += caseloadArray.totals[grade].b1
    totalRow.b0 += caseloadArray.totals[grade].b0
    totalRow.c3 += caseloadArray.totals[grade].c3
    totalRow.c2 += caseloadArray.totals[grade].c2
    totalRow.c1 += caseloadArray.totals[grade].c1
    totalRow.c0 += caseloadArray.totals[grade].c0
    totalRow.d3 += caseloadArray.totals[grade].d3
    totalRow.d2 += caseloadArray.totals[grade].d2
    totalRow.d1 += caseloadArray.totals[grade].d1
    totalRow.d0 += caseloadArray.totals[grade].d0
    totalRow.untiered += caseloadArray.totals[grade].untiered
    totalRow.totalCases += caseloadArray.totals[grade].totalCases
  })
  caseloadArray.totals.Total = totalRow
}
