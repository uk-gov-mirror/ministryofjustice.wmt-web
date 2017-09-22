const caseTypes = require('../../constants/case-type')

module.exports.getOverallCaseloadByTeamByGrade = function (caseloads) {
  return groupCaseload(caseloads, true)
}

module.exports.getOverallCaseloadByTeam = function (caseloads) {
  return groupCaseload(caseloads, false)
}

module.exports.getOverallTotals = function (caseloads) {
  var newEntry = {
    name: 'Total',
    totalCases : 0,
    custodyTotalCases: 0,
    communityTotalCases: 0,
    licenseTotalCases: 0
  }

  caseloads.forEach(function (caseload){
    console.log(caseload)
    newEntry.totalCases += caseload.totalCases
    newEntry.custodyTotalCases += caseload.custodyTotalCases
    newEntry.communityTotalCases += caseload.communityTotalCases
    newEntry.licenseTotalCases += caseload.licenseTotalCases
  })

  return newEntry
}

var groupCaseload = function (caseloads, splitByGrade = false) {
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < caseloads.length; idx++) {
    var key = caseloads[idx].linkId
    if(splitByGrade){
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
