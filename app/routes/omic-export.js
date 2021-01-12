const getExport = require('../services/get-export')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getScenarioExport = require('../services/get-omic-scenario')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.OMIC + '/:organisationLevel/:id/export', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    const organisationLevel = req.params.organisationLevel
    let id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getLastUpdated().then(function (lastUpdatedDate) {
      lastUpdated = dateFormatter.formatDate(lastUpdatedDate.date_processed, 'DD-MM-YYYY HH:mm')
      const result = getExport(id, organisationLevel)
      result.date = lastUpdated
      return res.render('omic-export', {
        organisationLevel: organisationLevel,
        linkId: req.params.id,
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.OMIC, authorisedUserRole.authorisation, authorisedUserRole.userRole),
        date: result.date,
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/' + workloadTypes.OMIC + '/:organisationLevel/:id/export', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    const organisationLevel = req.params.organisationLevel
    let id
    let exportPromise

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const radioButton = req.body.radioInlineGroup
    const scenarioPromise = getScenarioExport(id, organisationLevel)

    switch (radioButton) {
      case '1':
        exportPromise = scenarioPromise
        break
      default:
        exportPromise = Promise.resolve()
    }

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return exportPromise.then(function (results) {
        if (radioButton === '1') {
          const scenarioFileName = organisationLevel + '_Scenario_' + dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY') + '.xlsx'
          results.write(scenarioFileName, res)
        }
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
