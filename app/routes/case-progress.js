const getCaseProgress = require('../services/get-case-progress')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/case-progress', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id

<<<<<<< HEAD
    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

=======
>>>>>>> f08fb13... 636: Updating non js version and graph table to accept arrays of data.
    var caseProgressPromise = getCaseProgress(id, organisationLevel)

    return caseProgressPromise.then(function (result) {
      return res.render('case-progress', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path),
        caseProgressList: result.caseProgressList
      })
    })
  })
}
