const getCaseProgress = require('../services/get-case-progress')
const orgUnit = require('../constants/organisation-unit')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/case-progress', function (req, res, next) {
    var id = req.params.id
    var organisationLevel = req.params.organisationLevel

    // Currently only dealing with Offender Managers
    if (organisationLevel !== orgUnit.OFFENDER_MANAGER.name) {
      throw new Error(organisationLevel + ' should be offender-manager')
    }

    var caseProgressPromise = getCaseProgress(id, organisationLevel)

    return caseProgressPromise.then(function (result) {
      // TODO Update to new sub nav
      return res.render('case-progress', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: result.subNav,
        caseProgress: result.caseProgress
      })
    })
  })
}
