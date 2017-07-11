const getBreadcrumbs = require('./get-breadcrumbs')
//const getSubNav = require('./get-sub-nav')
const getOrganisationUnit = require('./helpers/org-unit-finder')
// TODO path to actual query file
//const getCaseProgress = require('./data/get-case-progress')

module.exports = function (id, organisationLevel) {
  // TODO Currently only dealing with offender manager. Add Team, LDU and Region
  var result = {}
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  var breadcrumbs = getBreadcrumbs(id, organisationLevel)

  // // TODO Match to query
  // var caseProgressPromise = getCaseProgress(id)

  // return caseProgressPromise.then(function (results) {
  //   result.caseProgress = results

  // TODO remove and use query result
    result.caseProgress = {
      community_last_16_weeks: 1,
      license_last_16_weeks: 2,
      total_cases: 3,
      warrants_total: 4,
      unpaid_work_total: 5,
      overdue_terminations_total: 6
    }

    result.breadcrumbs = breadcrumbs
    result.title = breadcrumbs[0].title
    result.subTitle = organisationalUnitType.displayText

    return result
 // })
}
