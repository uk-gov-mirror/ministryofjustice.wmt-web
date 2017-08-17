const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getOrganisationOverview = require('./data/get-organisation-overview')
const calculateContractedHours = require('wmt-probation-rules').calculateContractedHours
const DefaultContractedHours = require('wmt-probation-rules').DefaultContractedHours
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

  return overviewPromise.then(function (results) {
    result.overviewDetails = calculateValues(results)
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}

var calculateValues = function (results) {
  if (results.length !== undefined) {
    results.forEach(function (result) {
      result.capacityPercentage = (result.totalPoints / result.availablePoints) * 100
      if (result.contractedHours === 0) {
        result.contractedHours = getContractedHours(result)
      }
    })
    return results
  } else {
    var capacityPercentage = (results.totalPoints / results.availablePoints) * 100
    if (results.contractedHours === 0) {
      results.contractedHours = getContractedHours(results)
    }
    return Object.assign({}, results, {capacity: capacityPercentage})
  }
}

var getContractedHours = function (result) {
  var defaultContractedHours = new DefaultContractedHours(result.defaultContractedHoursPo, result.defaultContractedHoursPso)
  var resultHours = calculateContractedHours(result.contractedHours, defaultContractedHours)
  if (resultHours.baseHours !== null) {
    return resultHours.baseHours
  } else {
    return resultHours.defaultContractedHoursForBand
  }
}
