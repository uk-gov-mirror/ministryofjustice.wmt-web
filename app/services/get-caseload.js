const getBreadcrumbs = require('./get-breadcrumbs')
const getTeamCaseload = require('./data/get-team-caseload')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports = function (id, organisationLevel) {
  var organisationUnitType = getOrganisationUnit('name', organisationLevel)

  return getTeamCaseload(id)
  .then(function (results) {
    var breadcrumbs = getBreadcrumbs(id, organisationLevel)
    var overallResults = getOverallCaseload(results)
    var communityResults = getCaseloadByType(results, 'COMMUNITY')
    var custodyResults = getCaseloadByType(results, 'CUSTODY')
    var licenseResults = getCaseloadByType(results, 'LICENSE')
    return {
      overallCaseloadDetails: overallResults,
      communityCaseloadDetails: communityResults,
      custodyCaseloadDetails: custodyResults,
      licenseCaseloadDetails: licenseResults,
      breadcrumbs: breadcrumbs,
      title: breadcrumbs[0].title,
      subTitle: organisationUnitType.displayText
    }
  })
}

function getOverallCaseload (caseloads) {
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < caseloads.length; idx++) {
    var key = caseloads[idx].linkId
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
function getCaseloadByType (caseloads, type) {
  return caseloads.filter(caseload => caseload.caseType === type)
}
