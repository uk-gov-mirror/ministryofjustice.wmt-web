const getSubNav = require('../services/get-sub-nav')
const organisationUnitConstants = require('../constants/organisation-unit')
const getCaseload = require('../services/get-caseload')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')

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
            screen: 'caseload',
            linkId: req.params.id,
            title: result.title,
            subTitle: result.subTitle,
            breadcrumbs: result.breadcrumbs,
            subNav: getSubNav(id, organisationLevel, req.path),
            organisationLevel: organisationLevel,
            lduCaseloadDetails: result.lduCaseloadDetails
          })
        } else if (organisationLevel === organisationUnitConstants.TEAM.name) {
          return res.render('caseload', {
            screen: 'caseload',
            linkId: req.params.id,
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
        }
      }).catch(function (error) {
        next(error)
      })
  })

  router.get('/:organisationLevel/:id/caseload/csv', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.LDU.name &&
        organisationLevel !== organisationUnitConstants.TEAM.name) {
      throw new Error('Only available for LDU or Team')
    }

    return getCaseload(id, organisationLevel).then(function (result) {
      var exportCsv = getExportCsv(organisationLevel, result, tabs.CASELOAD)
      res.attachment(exportCsv.filename)
      return res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}
