const getCaseProgress = require('../services/get-case-progress')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const renderWMTUpdatingPage = require('../helpers/render-wmt-updating-page')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/case-progress', function (req, res, next) {
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

    const caseProgressPromise = getCaseProgress(id, organisationLevel)

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return caseProgressPromise.then(function (result) {
        result.date = lastUpdated
        let stringifiedCaseProgressList = Object.assign([], result.caseProgressList)
        stringifiedCaseProgressList = JSON.stringify(stringifiedCaseProgressList)
        return res.render('case-progress', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
          caseProgressList: result.caseProgressList,
          stringifiedCaseProgressList: stringifiedCaseProgressList,
          date: result.date,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
          workloadType: workloadTypes.PROBATION
        })
      })
    }).catch(function (error) {
      if ((error.message.includes("Hint 'noexpand'") && error.message.includes('is invalid')) || (error.message.includes('Could not use view or function') && error.message.includes('because of binding errors'))) {
        const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        renderWMTUpdatingPage(res, authorisedUserRole.userRole, authorisedUserRole.authorisation, subNav)
      } else {
        next(error)
      }
    })
  })
}
