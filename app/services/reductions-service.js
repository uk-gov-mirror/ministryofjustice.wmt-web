const addReduction = require('./data/insert-reduction')
// const getReferenceData = require('./data/get-reference-data')
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
  // var getReferenceDataPromise = getReferenceData()
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  result.title = result.breadcrumbs[0].title
  result.subTitle = organisationalUnitType.displayText

  // return getReferenceDataPromise.then(function (results) {
  //  result.referenceData = results
  return result
  // })
}

module.exports.addReduction = function (id, newReduction) {
  var addReductionPromise = addReduction(id, newReduction)
  return addReductionPromise.then(function (result) {
    return result
  })
}
