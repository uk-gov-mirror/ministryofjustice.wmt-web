const getCaseProgress = require('../services/get-case-progress')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')

var lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/case-progress', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    var organisationLevel = req.params.organisationLevel
    var id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    var caseProgressPromise = getCaseProgress(id, organisationLevel)

    return getLastUpdated().then(function(result) {
        lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
    return caseProgressPromise.then(function (result) {
        result.date = lastUpdated
      return res.render('case-progress', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path),
        caseProgressList: result.caseProgressList,
        date: result.date,
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
      })
    }).catch(function (error) {
      next(error)
    })
  })
  })
}
