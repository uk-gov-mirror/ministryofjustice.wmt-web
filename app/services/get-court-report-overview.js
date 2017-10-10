const getCourtReportOverview = require('./data/get-court-report-overview')
const getBreadcrumbs = require('./get-breadcrumbs')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const orgUnit = require('../constants/organisation-unit')
const workloadTypeConst = require('../constants/workload-type')

module.exports = function(id, organisationLevel) {
  var result = {}  
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)

  return getCourtReportOverview(id, organisationLevel)
  .then(function (courtReportOverview) {
    result.breadcrumbs = getBreadcrumbs(id, organisationLevel, workloadTypeConst.COURT_REPORTS)
    result.overviewDetails = courtReportOverview
    result.title = result.breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText
    return result
  })
}