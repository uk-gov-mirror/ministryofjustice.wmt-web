const percentageCalculator = require('./percentage-calculator')
const caseTypes = require('../../constants/case-type')

module.exports.getCaseloadTierTotalsByTeamByGrade = function (caseloads) {
  return groupCaseload(caseloads, true)
}

module.exports.getCaseloadSummaryTotalsByTeam = function (caseloads) {
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < caseloads.length; idx++) {
    var key = caseloads[idx].linkId
    if (!linkIdToCaseloadMap.has(key)) {
      // Make a copy of the object to ensure the original value isn't affected
      var newValue = {
        name: caseloads[idx].name,
        linkId: caseloads[idx].linkId,
        totalCases: 0,
        custodyTotalCases: 0,
        communityTotalCases: 0,
        licenseTotalCases: 0
      }

      newValue = updateTotals(newValue, caseloads[idx])
      linkIdToCaseloadMap.set(key, newValue)
    } else {
      var existingValue = linkIdToCaseloadMap.get(key)
      existingValue = updateTotals(existingValue, caseloads[idx])
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}

/*
  Transform array of caseloads (one per team per grade) into an
  array of team results (one per team). Each team result contains
  tiered data for each grade in the team. Tiered data is in form of
  total cases
*/
module.exports.aggregateTeamTierTotals = function (caseloadTotalsByTeamByGrade) {
  return transform(caseloadTotalsByTeamByGrade, false)
}

/*
  Transform array of caseloads (one per team per grade) into an
  array of team results (one per team). Each team result contains
  tiered data for each grade in the team. Tiered data is in form of
  percentages of team cases
*/
module.exports.calculateTeamTierPercentages = function (caseloadTotalsByTeamByGrade) {
  return transform(caseloadTotalsByTeamByGrade, true)
}

/*
  Filter the caseloads by the given type parameter.
*/
module.exports.getCaseloadByType = function (caseloads, type) {
  if (Array.isArray(caseloads)) {
    return caseloads.filter(caseload => caseload.caseType === type)
  }
}

/*
  Adds the total cases to create a summary for the list of casesloads.
*/
module.exports.getCaseloadTotalSummary = function (caseloads) {
  if (Array.isArray(caseloads)) {
    return caseloads.reduce((prev, curr) => prev + curr.totalCases, 0)
  }
}

/*
  Used to create the bottom most row in the table
*/
module.exports.calculateTotalsRow = function (caseloads) {
  var totals = {a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, untiered: 0, overall: 0}
  caseloads.forEach(function (val, key) {
    totals.a += val.a
    totals.b1 += val.b1
    totals.b2 += val.b2
    totals.c1 += val.c1
    totals.c2 += val.c2
    totals.d1 += val.d1
    totals.d2 += val.d2
    totals.untiered += val.untiered
    totals.overall += val.totalCases
  })
  return totals
}

var calculateTotalsRow = function (caseloads) {
  var totals = {a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, untiered: 0, overall: 0}
  caseloads.forEach(function (team, key) {
    team.grades.forEach(function (grade, key) {
      totals.a += grade.a
      totals.b1 += grade.b1
      totals.b2 += grade.b2
      totals.c1 += grade.c1
      totals.c2 += grade.c2
      totals.d1 += grade.d1
      totals.d2 += grade.d2
      totals.untiered += grade.untiered
      totals.overall += grade.totalCases
    })
  })
  return totals
}

module.exports.calculateTotalTiersRow = function (summary) {
  var totals = {totalCommunity: 0, totalLicense: 0, totalCustody: 0, totalTotalCases: 0}
  summary.forEach(function (val, key) {
    totals.totalCommunity += val.communityTotalCases
    totals.totalLicense += val.licenseTotalCases
    totals.totalCustody += val.custodyTotalCases
    totals.totalTotalCases += val.totalCases
  })
  return totals
}

var updateTotals = function (entryToUpdate, caseload) {
  entryToUpdate.totalCases += caseload.totalCases

  if (caseload.caseType === caseTypes.LICENSE) {
    entryToUpdate.licenseTotalCases += caseload.totalCases
  } else if (caseload.caseType === caseTypes.COMMUNITY) {
    entryToUpdate.communityTotalCases += caseload.totalCases
  } else if (caseload.caseType === caseTypes.CUSTODY) {
    entryToUpdate.custodyTotalCases += caseload.totalCases
  }

  return entryToUpdate
}

var convertMapToArray = function (map) {
  var arrayResult = []
  map.forEach(function (val, key) {
    arrayResult.push(val)
  })

  return arrayResult
}

var transform = function (caseloadTotalsByGrade, calculatePercentage = false) {
  var transformedData = []
  var caseloadTotalsByTeam = groupCaseload(caseloadTotalsByGrade, false)
  var gradeTotals = {}

  // For each team, create one entry in the new results set with one 'grade' sub-object per grade
  for (var team in caseloadTotalsByTeam) {
    var newTeamEntry = { linkId: caseloadTotalsByTeam[team].linkId, name: caseloadTotalsByTeam[team].name }
    var teamGradeRecords = caseloadTotalsByGrade.filter((row) => row.linkId === caseloadTotalsByTeam[team].linkId)
    var gradeRecords = []
    for (var record in teamGradeRecords) {
      var newGradeRecord
      if (calculatePercentage) {
        newGradeRecord = {
          grade: teamGradeRecords[record].grade,
          a: percentageCalculator.calculatePercentage(teamGradeRecords[record].a, caseloadTotalsByTeam[team].a),
          b1: percentageCalculator.calculatePercentage(teamGradeRecords[record].b1, caseloadTotalsByTeam[team].b1),
          b2: percentageCalculator.calculatePercentage(teamGradeRecords[record].b2, caseloadTotalsByTeam[team].b2),
          c1: percentageCalculator.calculatePercentage(teamGradeRecords[record].c1, caseloadTotalsByTeam[team].c1),
          c2: percentageCalculator.calculatePercentage(teamGradeRecords[record].c2, caseloadTotalsByTeam[team].c2),
          d1: percentageCalculator.calculatePercentage(teamGradeRecords[record].d1, caseloadTotalsByTeam[team].d1),
          d2: percentageCalculator.calculatePercentage(teamGradeRecords[record].d2, caseloadTotalsByTeam[team].d2),
          untiered: percentageCalculator.calculatePercentage(teamGradeRecords[record].untiered, caseloadTotalsByTeam[team].untiered),
          totalCases: percentageCalculator.calculatePercentage(teamGradeRecords[record].totalCases, caseloadTotalsByTeam[team].totalCases)
        }
        gradeTotals = createAndTotalValues(gradeTotals, newGradeRecord)
      } else {
        newGradeRecord = {
          grade: teamGradeRecords[record].grade,
          a: teamGradeRecords[record].a,
          b1: teamGradeRecords[record].b1,
          b2: teamGradeRecords[record].b2,
          c1: teamGradeRecords[record].c1,
          c2: teamGradeRecords[record].c2,
          d1: teamGradeRecords[record].d1,
          d2: teamGradeRecords[record].d2,
          untiered: teamGradeRecords[record].untiered,
          totalCases: teamGradeRecords[record].totalCases
        }
        gradeTotals = createAndTotalValues(gradeTotals, newGradeRecord)
      }
      gradeRecords.push(newGradeRecord)
    }
    newTeamEntry = Object.assign({}, newTeamEntry, {grades: gradeRecords})
    transformedData.push(newTeamEntry)
  }
  if (calculatePercentage) {
    for (var key in gradeTotals) {
      gradeTotals[key].a = gradeTotals[key].a / gradeTotals[key].numberOfType
      gradeTotals[key].b1 = gradeTotals[key].b1 / gradeTotals[key].numberOfType
      gradeTotals[key].b2 = gradeTotals[key].b2 / gradeTotals[key].numberOfType
      gradeTotals[key].c1 = gradeTotals[key].c1 / gradeTotals[key].numberOfType
      gradeTotals[key].c2 = gradeTotals[key].c2 / gradeTotals[key].numberOfType
      gradeTotals[key].d1 = gradeTotals[key].d1 / gradeTotals[key].numberOfType
      gradeTotals[key].d2 = gradeTotals[key].d2 / gradeTotals[key].numberOfType
      gradeTotals[key].untiered = gradeTotals[key].untiered / gradeTotals[key].numberOfType
      gradeTotals[key].totalCases = gradeTotals[key].totalCases / gradeTotals[key].numberOfType
    }
  }
  return { details: transformedData, totals: gradeTotals }
}

var createAndTotalValues = function (gradeTotals, newGradeRecord) {
  if (gradeTotals[newGradeRecord.grade] !== undefined) {
    gradeTotals[newGradeRecord.grade].a += newGradeRecord.a
    gradeTotals[newGradeRecord.grade].b1 += newGradeRecord.b1
    gradeTotals[newGradeRecord.grade].b2 += newGradeRecord.b2
    gradeTotals[newGradeRecord.grade].c1 += newGradeRecord.c1
    gradeTotals[newGradeRecord.grade].c2 += newGradeRecord.c2
    gradeTotals[newGradeRecord.grade].d1 += newGradeRecord.d1
    gradeTotals[newGradeRecord.grade].d2 += newGradeRecord.d2
    gradeTotals[newGradeRecord.grade].untiered += newGradeRecord.untiered
    gradeTotals[newGradeRecord.grade].totalCases += newGradeRecord.totalCases
    gradeTotals[newGradeRecord.grade].numberOfType++
  } else {
    gradeTotals[newGradeRecord.grade] = Object.assign({}, newGradeRecord)
    gradeTotals[newGradeRecord.grade].numberOfType = 1
  }
  return gradeTotals
}

var groupCaseload = function (caseloads, splitByGrade = false) {
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < caseloads.length; idx++) {
    var key = caseloads[idx].linkId
    if (splitByGrade) {
      key += caseloads[idx].grade
    }
    if (!linkIdToCaseloadMap.has(key)) {
      // Make a copy of the object to ensure the original value isn't affected
      var newValue = Object.assign({}, caseloads[idx])
      linkIdToCaseloadMap.set(key, newValue)
    } else {
      var existingValue = linkIdToCaseloadMap.get(key)
      existingValue.untiered += caseloads[idx].untiered
      existingValue.d2 += caseloads[idx].d2
      existingValue.d1 += caseloads[idx].d1
      existingValue.c2 += caseloads[idx].c2
      existingValue.c1 += caseloads[idx].c1
      existingValue.b2 += caseloads[idx].b2
      existingValue.b1 += caseloads[idx].b1
      existingValue.a += caseloads[idx].a
      existingValue.totalCases += caseloads[idx].totalCases
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}
