const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getOrganisationOverview = require('./data/get-organisation-overview')
const getFullOverview = require('./data/get-full-overview')
const orgUnit = require('../constants/organisation-unit')
const calculatePercentage = require('./helpers/percentage-calculator').calculatePercentage
const totalsRounder = require('./helpers/totals-rounder')

module.exports = function (id, organisationLevel, isCSV = false) {
  var result = {}
  var overviewPromise = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  if (organisationLevel === orgUnit.OFFENDER_MANAGER.name) {
    overviewPromise = getIndividualOverview(id, organisationLevel)
  } else {
    if (isCSV) {
      overviewPromise = getFullOverview(id, organisationLevel)
    } else {
      overviewPromise = getOrganisationOverview(id, organisationLevel)
    }
  }

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  return overviewPromise.then(function (results) {
    result.overviewDetails = calculateValues(results, isCSV)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}

var calculateValues = function (results, isCSV) {
  var totals = { name: 'Total / Average', totalCapacityPercentage: 0, totalPoints: 0, totalAvailablePoints: 0, totalContractedHours: 0, totalReduction: 0, totalTotalCases: 0, totalRemainingPoints: 0 }
  var totalsToReturn = {}
  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.remainingPoints = result.availablePoints - result.totalPoints
      result.capacityPercentage = calculatePercentage(result.totalPoints, result.availablePoints)
    })
    totalsToReturn = results
    if (!isCSV) {
      totalsToReturn.forEach(function (val, key) {
        totals.totalPoints += val.totalPoints
        totals.totalAvailablePoints += val.availablePoints
        totals.totalContractedHours += val.contractedHours
        totals.totalReduction += val.reductionHours
        totals.totalTotalCases += val.totalCases
        totals.totalRemainingPoints += val.remainingPoints
      })
      totals = totalsRounder(totals)
      totals.totalCapacityPercentage = calculatePercentage(totals.totalPoints, totals.totalAvailablePoints)
      totalsToReturn.push(totals)
    }
  } else {
    var capacityPercentage = calculatePercentage(results.totalPoints, results.availablePoints)
    totalsToReturn = Object.assign({}, results, {capacity: capacityPercentage})
  }
  return totalsToReturn
}
