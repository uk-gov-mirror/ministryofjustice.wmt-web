const getCourtReportOverview = require('../services/get-court-report-overview')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadTypeConstants = require('../constants/workload-type')

module.exports = function (router) {
  router.get('/court-reports/:organisationLevel/:id/overview', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var organisationUnit = getOrganisationUnit('name', organisationLevel)
    var id = req.params.id

    var childOrganisationLevel
    var childOrganisationLevelDisplayText
    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      childOrganisationLevel = organisationUnit.childOrganisationLevel
      childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText
    }

    return getCourtReportOverview(id, organisationLevel)
    .then(function (result) {
      return res.render('court-reports-overview', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        organisationLevel: organisationLevel,
        childOrganisationLevel: childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrganisationLevelDisplayText,
        subNav: getSubNav(id, organisationLevel, req.path, workloadTypeConstants.COURT_REPORTS),
        overviewDetails: result.overviewDetails
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
