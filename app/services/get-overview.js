const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const getIndividualOverview = require('./data/get-individual-overview')
const getOrganisationOverview = require('./data/get-organisation-overview')
const getFullOverview = require('./data/get-full-overview')
const orgUnit = require('../constants/organisation-unit')
const calculateOverviewValues = require('./helpers/calculate-overview-values')
const workloadTypes = require('../constants/workload-type')

module.exports = function (id, organisationLevel, isCSV = false, workloadType = workloadTypes.PROBATION) {
  const result = {}
  let overviewPromise = {}
  const organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  if (organisationLevel === orgUnit.OFFENDER_MANAGER.name) {
    overviewPromise = getIndividualOverview(id, organisationLevel)
  } else {
    if (isCSV) {
      overviewPromise = getFullOverview(id, organisationLevel, workloadType)
    } else {
      overviewPromise = getOrganisationOverview(id, organisationLevel, workloadType)
    }
  }

  result.breadcrumbs = getBreadcrumbs(id, organisationLevel, workloadType)
  return overviewPromise.then(function (results) {
    result.overviewDetails = calculateOverviewValues(results, isCSV, workloadType)
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}
