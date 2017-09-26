const percentageCalculator = require('./percentage-calculator')
const caseTypes = require('../../constants/case-type')

module.exports.getCaseloadTierTotalsByTeamByGrade = function (caseloads) {
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < caseloads.length; idx++) {
    var key = caseloads[idx].linkId + caseloads[idx].grade
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

var transform = function (caseloadTotalsByGrade, calculatePercentage = false) {
  var percentageResults = []
  var caseloadTotalsByTeam = groupCaseload(caseloadTotalsByGrade, false)

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
      newValue.custodyTotalCases = 0
      newValue.communityTotalCases = 0
      newValue.licenseTotalCases = 0

      if (caseloads[idx].caseType === caseTypes.LICENSE) {
        newValue.licenseTotalCases += caseloads[idx].totalCases
      } else if (caseloads[idx].caseType === caseTypes.COMMUNITY) {
        newValue.communityTotalCases += caseloads[idx].totalCases
      } else if (caseloads[idx].caseType === caseTypes.CUSTODY) {
        newValue.custodyTotalCases += caseloads[idx].totalCases
      }

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

      if (caseloads[idx].caseType === caseTypes.LICENSE) {
        existingValue.licenseTotalCases += caseloads[idx].totalCases
      } else if (caseloads[idx].caseType === caseTypes.COMMUNITY) {
        existingValue.communityTotalCases += caseloads[idx].totalCases
      } else if (caseloads[idx].caseType === caseTypes.CUSTODY) {
        existingValue.custodyTotalCases += caseloads[idx].totalCases
      }
    }
  }
  // Convert the map back to array of object
  var overall = []
  linkIdToCaseloadMap.forEach(function (val, key) {
    overall.push(val)
  })
  return overall
}
