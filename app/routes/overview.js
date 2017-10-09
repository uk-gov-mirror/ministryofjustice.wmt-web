const getOverview = require('../services/get-overview')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const authorisation = require('../authorisation')
const Unathorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get('/:organisationLevel/:id/overview', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    var organisationLevel = req.params.organisationLevel
    var organisationUnit = getOrganisationUnit('name', organisationLevel)
    var id
    var childOrganisationLevel
    var childOrganisationLevelDisplayText

    if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      childOrganisationLevel = organisationUnit.childOrganisationLevel
      childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText
    }

    var overviewPromise = getOverview(id, organisationLevel)

    return overviewPromise.then(function (result) {
      return res.render('overview', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        organisationLevel: organisationLevel,
        linkId: req.params.id,
        screen: 'overview',
        childOrganisationLevel: childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrganisationLevelDisplayText,
        subNav: getSubNav(id, organisationLevel, req.path),
        overviewDetails: result.overviewDetails
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/:organisationLevel/:id/overview/csv', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    var organisationLevel = req.params.organisationLevel
    var id
    if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    return getOverview(id, organisationLevel).then(function (result) {
      var exportCsv = getExportCsv(organisationLevel, result, tabs.OVERVIEW)
      res.attachment(exportCsv.filename)
      res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}
