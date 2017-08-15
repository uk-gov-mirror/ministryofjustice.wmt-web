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

function getOverallCaseload(caseloads) {
  // Create a mapping for the linkId to do the aggregation
  var linkIdToCaseloadMap = new Map()
  for (var idx = 0; idx < caseloads.length; idx++){
    var key = caseloads[idx].linkId
    if (!linkIdToCaseloadMap.has(key)){
      // Make a copy of the object to ensure the original value isn't affected
      var value = Object.assign({}, caseloads[idx])
      linkIdToCaseloadMap.set(key, value)
    } else {
      var value = linkIdToCaseloadMap.get(key)
      value.untiered += caseloads[idx].untiered
      value.d2 += caseloads[idx].d2
      value.d1 += caseloads[idx].d1
      value.c2 += caseloads[idx].c2
      value.c1 += caseloads[idx].c1
      value.b2 += caseloads[idx].b2
      value.b1 += caseloads[idx].b1
      value.a += caseloads[idx].a
      value.totalCases += caseloads[idx].totalCases
    }
  }
  // Convert the map back to array of object
  var overall = [];
  linkIdToCaseloadMap.forEach(function(val, key) {
    overall.push(val);
  })
  return overall
}

/*
  Filter the caseloads by the given type parameter.
*/
function getCaseloadByType(caseloads, type) {
  var caseloadByType = []
  for (var idx = 0; idx < caseloads.length; idx++){
    if (caseloads[idx].caseType === type) {
      caseloadByType.push(caseloads[idx])
    }
  }  
  return caseloadByType
}