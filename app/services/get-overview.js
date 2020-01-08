const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getOrganisationOverview = require('./data/get-organisation-overview')
const getFullOverview = require('./data/get-full-overview')
const orgUnit = require('../constants/organisation-unit')
const calculateOverviewValues = require('./helpers/calculate-overview-values')

module.exports = function (id, organisationLevel, isCSV = false, workloadType = 'probation') {
  var result = {}
  var overviewPromise = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  if (organisationLevel === orgUnit.OFFENDER_MANAGER.name) {
    overviewPromise = getIndividualOverview(id, workloadType)
  } else {
    if (isCSV) {
      overviewPromise = getFullOverview(id, organisationLevel, workloadType)
    } else {
      overviewPromise = getOrganisationOverview(id, organisationLevel, workloadType)
    }
  }

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel)
  return overviewPromise.then(function (results) {
    result.overviewDetails = calculateOverviewValues(results, isCSV)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}
