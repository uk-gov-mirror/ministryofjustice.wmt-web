const percentageCalculator = require('./percentage-calculator')
const caseTypes = require('../../constants/case-type')

module.exports.getCaseloadTierTotalsByTeamByGrade = function (caseloads) {
  return groupCaseload(caseloads, true)
}

module.exports.totalAllCases = function (caseloads) {
  return totalWholeCaseload(caseloads)
}

module.exports.groupCaseloadByGrade = function (caseloads) {
  return groupOverallCaseloadByGrade(caseloads)
}
module.exports.calculateOverallPercentages = function (overallTotals, overallGradeTotals) {
  return calculateOverallPercentages(overallTotals, overallGradeTotals)
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
  return collectTransformedData(caseloadTotalsByTeamByGrade, false)
}

/*
  Transform array of caseloads (one per team per grade) into an
  array of team results (one per team). Each team result contains
  tiered data for each grade in the team. Tiered data is in form of
  percentages of team cases
*/
module.exports.calculateTeamTierPercentages = function (caseloadTotalsByTeamByGrade) {
  return collectTransformedData(caseloadTotalsByTeamByGrade, true)
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
  // WMT0160: add new tiers
  var totals = {doorstop: 0, contactCentre: 0, phoneCall: 0, untiered: 0, overall: 0}
  caseloads.forEach(function (val, key) {
    totals.doorstop += val.doorstop
    totals.contactCentre += val.contactCentre
    totals.phoneCall += val.phoneCall
    totals.untiered += val.untiered
    totals.overall += val.totalCases
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

var transform = function (caseloadTotalsByGrade, calculatePercentage = false, isCSV = false) {
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
          // WMT0160: add new tiers
          grade: teamGradeRecords[record].grade,
          doorstop: percentageCalculator.calculatePercentage(teamGradeRecords[record].doorstop, caseloadTotalsByTeam[team].doorstop),
          contactCentre: percentageCalculator.calculatePercentage(teamGradeRecords[record].contactCentre, caseloadTotalsByTeam[team].contactCentre),
          phoneCall: percentageCalculator.calculatePercentage(teamGradeRecords[record].phoneCall, caseloadTotalsByTeam[team].phoneCall),
          untiered: percentageCalculator.calculatePercentage(teamGradeRecords[record].untiered, caseloadTotalsByTeam[team].untiered),
          totalCases: percentageCalculator.calculatePercentage(teamGradeRecords[record].totalCases, caseloadTotalsByTeam[team].totalCases)
        }
        if (!isCSV) {
          gradeTotals = addGradeTotals(gradeTotals, newGradeRecord)
        }
      } else {
        newGradeRecord = {
          // WMT0160: add new tiers
          grade: teamGradeRecords[record].grade,
          doorstop: teamGradeRecords[record].doorstop,
          contactCentre: teamGradeRecords[record].contactCentre,
          phoneCall: teamGradeRecords[record].phoneCall,
          untiered: teamGradeRecords[record].untiered,
          totalCases: teamGradeRecords[record].totalCases
        }
        if (!isCSV) {
          gradeTotals = addGradeTotals(gradeTotals, newGradeRecord)
        }
      }
      gradeRecords.push(newGradeRecord)
    }
    newTeamEntry = Object.assign({}, newTeamEntry, {grades: gradeRecords})
    transformedData.push(newTeamEntry)
  }
  if (calculatePercentage) {
    for (var key in gradeTotals) {
      // WMT0160: add new tiers
      gradeTotals[key].doorstop = gradeTotals[key].doorstop / gradeTotals[key].numberOfType
      gradeTotals[key].contactCentre = gradeTotals[key].contactCentre / gradeTotals[key].numberOfType
      gradeTotals[key].phoneCall = gradeTotals[key].phoneCall / gradeTotals[key].numberOfType
      gradeTotals[key].untiered = gradeTotals[key].untiered / gradeTotals[key].numberOfType
      gradeTotals[key].totalCases = gradeTotals[key].totalCases / gradeTotals[key].numberOfType
    }
  }
  return { details: transformedData, totals: gradeTotals }
}

var collectTransformedData = function (caseloadTotalsByGrade, isCsv = false) {
  var data = {}
  data.details = transform(caseloadTotalsByGrade, false, false).details
  data.totals = transform(caseloadTotalsByGrade, false, false).totals
  data.detailsPercentages = transform(caseloadTotalsByGrade, true, false).details
  data.percentageTotals = transform(caseloadTotalsByGrade, true, false).totals
  return data
}

var addGradeTotals = function (gradeTotals, newGradeRecord) {
  // WMT0160: add new tiers
  if (gradeTotals[newGradeRecord.grade] !== undefined) {
    gradeTotals[newGradeRecord.grade].doorstop += newGradeRecord.doorstop
    gradeTotals[newGradeRecord.grade].contactCentre += newGradeRecord.contactCentre
    gradeTotals[newGradeRecord.grade].phoneCall += newGradeRecord.phoneCall
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
  // WMT0160: add new tiers
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
      existingValue.phoneCall += caseloads[idx].phoneCall
      existingValue.contactCentre += caseloads[idx].contactCentre
      existingValue.doorstop += caseloads[idx].doorstop
      existingValue.totalCases += caseloads[idx].totalCases
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}

var groupOverallCaseloadByGrade = function (caseloads) {
  // WMT0160: add new tiers to selectList
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < caseloads.length; idx++) {
    var key = caseloads[idx].grade
    if (!linkIdToCaseloadMap.has(key)) {
      // Make a copy of the object to ensure the original value isn't affected
      var newValue = Object.assign({}, caseloads[idx])
      linkIdToCaseloadMap.set(key, newValue)
    } else {
      var existingValue = linkIdToCaseloadMap.get(key)
      existingValue.untiered += caseloads[idx].untiered
      existingValue.phoneCall += caseloads[idx].phoneCall
      existingValue.contactCentre += caseloads[idx].contactCentre
      existingValue.doorstop += caseloads[idx].doorstop
      existingValue.totalCases += caseloads[idx].totalCases
    }
  }

  return convertMapToArray(linkIdToCaseloadMap)
}

var totalWholeCaseload = function (caseloads) {
  // WMT0160: add new tiers to tierTotals
  var tierTotals = {doorstop: 0, contactCentre: 0, phoneCall: 0, untiered: 0, totalCases: 0}
  if (caseloads.length > 0) {
    caseloads.forEach(function (caseload) {
      tierTotals['doorstop'] += caseload.doorstop
      tierTotals['contactCentre'] += caseload.contactCentre
      tierTotals['phoneCall'] += caseload.phoneCall
      tierTotals['untiered'] += caseload.untiered
      tierTotals['totalCases'] += caseload.totalCases
    })
  }
  return tierTotals
}

var calculateOverallPercentages = function (overallTotals, overallGradeTotals) {
  // WMT0160: add new tiers
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < overallGradeTotals.length; idx++) {
    var key = overallGradeTotals[idx].grade
    var newValue = Object.assign({}, overallGradeTotals[idx])
    linkIdToCaseloadMap.set(key, newValue)
    var existingValue = linkIdToCaseloadMap.get(key)
    existingValue.untiered = percentageCalculator.calculatePercentage(existingValue.untiered, overallTotals.untiered)
    existingValue.phoneCall = percentageCalculator.calculatePercentage(existingValue.phoneCall, overallTotals.phoneCall)
    existingValue.contactCentre = percentageCalculator.calculatePercentage(existingValue.contactCentre, overallTotals.contactCentre)
    existingValue.doorstop = percentageCalculator.calculatePercentage(existingValue.doorstop, overallTotals.doorstop)
    existingValue.totalCases = percentageCalculator.calculatePercentage(existingValue.totalCases, overallTotals.totalCases)
  }
  var array = convertMapToArray(linkIdToCaseloadMap)
  var objects = {}
  array.forEach(function (obj) {
    objects[obj.grade] = obj
  })
  return objects
}
