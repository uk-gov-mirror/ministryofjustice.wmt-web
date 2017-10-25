const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getOrganisationOverview = require('./data/get-organisation-overview')
const orgUnit = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  var result = {}
  var overviewPromise = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  if (organisationLevel === orgUnit.OFFENDER_MANAGER.name) {
    overviewPromise = getIndividualOverview(id, organisationLevel)
  } else {
    overviewPromise = getOrganisationOverview(id, organisationLevel)
  }

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  return overviewPromise.then(function (results) {
    result.overviewDetails = calculateValues(results)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}

var calculateValues = function (results) {
  var totals = { name: 'Total/Average', totalPercentage: 0, totalPoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0 }
  var thingToReturn = {}
  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.capacityPercentage = 0
      if (result.availablePoints > 0) {
        result.capacityPercentage = (result.totalPoints / result.availablePoints) * 100
      }
    })
    thingToReturn = results
    thingToReturn.forEach(function (val, key) {
      totals.totalPercentage += val.capacityPercentage
      totals.totalPoints += val.totalPoints
      totals.totalContractedHours += val.contractedHours
      totals.totalReduction += val.reductionHours
      totals.totalTotalCases += val.totalCases
    })
    totals.totalPercentage = totals.totalPercentage / thingToReturn.length - 1
    thingToReturn.push(totals)
  } else {
    var capacityPercentage = (results.totalPoints / results.availablePoints) * 100
    thingToReturn = Object.assign({}, results, {capacity: capacityPercentage})
  }
  return thingToReturn
}
