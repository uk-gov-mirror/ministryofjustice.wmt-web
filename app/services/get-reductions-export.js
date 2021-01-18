const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getReductionsData = require('./data/get-reduction-notes-export')
const dateFormatter = require('../services/date-formatter')

module.exports = function (id, organisationLevel) {
  const result = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  return getReductionsData(id, organisationLevel).then(function (results) {
    results.forEach(function (record) {
      record.startDate = dateFormatter.formatDate(record.startDate, 'DD MM YYYY, HH:mm')
      record.endDate = dateFormatter.formatDate(record.endDate, 'DD MM YYYY, HH:mm')
    })
    result.reductionNotes = results
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}
