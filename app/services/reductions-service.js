const addReduction = require('./data/insert-reduction')
const getReferenceData = require('./data/get-reduction-reasons')
const getContractedHoursForWorkloadOwner = require('./data/get-contracted-hours-for-workload-owner')
const reductionsCalculator = require('./helpers/reduction-hours-calculator')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')

module.exports.getReductions = function (id, organisationLevel) {
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText
  return result
}

module.exports.getAddReductionsRefData = function (id, organisationLevel) {
  var result = {}
  var getReferenceDataPromise = getReferenceData()
  var getContractedHoursPromise = getContractedHoursForWorkloadOwner(id)
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText

  return getContractedHoursPromise.then(function (hours) {
    return getReferenceDataPromise.then(function (results) {
      result.contractedHours = hours
      result.referenceData = reductionsCalculator(results, hours)
      return result
    })
  })
}

module.exports.addReduction = function (id, newReduction) {
  var addReductionPromise = addReduction(id, newReduction)
  return addReductionPromise.then(function (result) {
    return result
  })
}
