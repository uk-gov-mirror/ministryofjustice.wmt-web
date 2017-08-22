const getSubNav = require('../services/get-sub-nav')
const organisationUnitConstants = require('../constants/organisation-unit')
const getCaseload = require('../services/get-caseload')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/caseload', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.LDU.name &&
        organisationLevel !== organisationUnitConstants.TEAM.name) {
      throw new Error('Only available for LDU or Team')
    }

    return getCaseload(id, organisationLevel)
      .then(function (result) {
        if (organisationLevel === organisationUnitConstants.LDU.name) {
          return res.render('caseload', {
            title: result.title,
            subTitle: result.subTitle,
            breadcrumbs: result.breadcrumbs,
            subNav: getSubNav(id, organisationLevel, req.path),
            organisationLevel: organisationLevel,
            lduCaseloadDetails: result.lduCaseloadDetails
          })
        } else if (organisationLevel === organisationUnitConstants.TEAM.name) {
          return res.render('caseload', {
            title: result.title,
            subTitle: result.subTitle,
            breadcrumbs: result.breadcrumbs,
            subNav: getSubNav(id, organisationLevel, req.path),
            organisationLevel: organisationLevel,
            custodyTotalSummary: result.custodyTotalSummary,
            communityTotalSummary: result.communityTotalSummary,
            licenseTotalSummary: result.licenseTotalSummary,
            caseTypes: [
              {
                displayName: 'overall',
                array: result.overallCaseloadDetails
              },
              {
                displayName: 'custody',
                array: result.custodyCaseloadDetails
              },
              {
                displayName: 'community',
                array: result.communityCaseloadDetails
              },
              {
                displayName: 'license',
                array: result.licenseCaseloadDetails
              }
            ]
          })
        } // else if
      }) // then
  }) // router
} // export
