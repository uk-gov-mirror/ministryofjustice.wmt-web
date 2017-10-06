const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const getCaseload = require('../services/get-caseload')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const authorisation = require('../authorisation')
const Unathorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get('/:organisationLevel/:id/caseload', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Not available for offender-manager')
    }

    var orgUnit = getOrganisationUnit('name', organisationLevel)
    var childOrgUnit = getOrganisationUnit('name', orgUnit.childOrganisationLevel)

    return getCaseload(id, organisationLevel)
      .then(function (result) {
        return res.render('caseload', {
          screen: 'caseload',
          linkId: req.params.id,
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          subNav: getSubNav(id, organisationLevel, req.path),
          organisationLevel: organisationLevel,
          childOrganisationLevel: orgUnit.childOrganisationLevel,
          childOrganisationLevelDisplayText: childOrgUnit.displayText,
          caseloadDetails: caseloadDetails(organisationLevel, result)
        })
      }).catch(function (error) {
        next(error)
      })
  })

  router.get('/:organisationLevel/:id/caseload/csv', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Not available for offender-manager')
    }

    return getCaseload(id, organisationLevel).then(function (result) {
      var exportCsv = getExportCsv(organisationLevel, result, tabs.CASELOAD)
      res.attachment(exportCsv.filename)
      return res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })

  var caseloadDetails = function (organisationLevel, result) {
    var details

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      details = [
        {
          displayName: 'Overall',
          array: result.caseloadDetails.overallCaseloadDetails,
          totalSummary: result.caseloadDetails.overallTotalSummary
        },
        {
          displayName: 'Custody',
          array: result.caseloadDetails.custodyCaseloadDetails,
          totalSummary: result.caseloadDetails.custodyTotalSummary
        },
        {
          displayName: 'Community',
          array: result.caseloadDetails.communityCaseloadDetails,
          totalSummary: result.caseloadDetails.communityTotalSummary
        },
        {
          displayName: 'License',
          array: result.caseloadDetails.licenseCaseloadDetails,
          totalSummary: result.caseloadDetails.licenseTotalSummary
        }
      ]
    } else {
      details = result.caseloadDetails
    }

    return details
  }
}
