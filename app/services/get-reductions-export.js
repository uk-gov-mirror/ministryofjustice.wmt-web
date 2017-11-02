const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getReductionsData = require('./data/get-reduction-notes-export')

module.exports = function (id, organisationLevel) {
  var result = {}
  var reductionPromise = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  reductionPromise = getReductionsData(id, organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  return reductionPromise.then(function (results) {
    result.reductionNotes = results
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}
