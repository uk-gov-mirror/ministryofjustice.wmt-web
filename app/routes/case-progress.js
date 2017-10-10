const getCaseProgress = require('../services/get-case-progress')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unathorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get('/:organisationLevel/:id/case-progress', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    var organisationLevel = req.params.organisationLevel
    var id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    var caseProgressPromise = getCaseProgress(id, organisationLevel)

    return caseProgressPromise.then(function (result) {
      return res.render('case-progress', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path),
        caseProgressList: result.caseProgressList
      })
    }).catch(function (error) {
      next(error)
    })
  })
}
