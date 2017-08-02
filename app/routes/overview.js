const getOverview = require('../services/get-overview')
const getSubNav = require('../services/get-sub-nav')
const orgUnit = require('../constants/organisation-unit')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/overview', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    // Currently only dealing with Offender Managers
    // if (organisationLevel !== orgUnit.OFFENDER_MANAGER.name) {
    //   throw new Error(organisationLevel + ' should be offender-manager')
    // }

    var overviewPromise = getOverview(id, organisationLevel)

    return overviewPromise.then(function (result) {
      return res.render('overview-team', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path),
        overviewDetails: result.overviewDetails,
        // TODO: Add overview Table for new caseload overview
        overviewTable: result.overviewTable
      })
    })
  })
}
