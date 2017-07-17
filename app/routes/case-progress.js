const getCaseProgress = require('../services/get-case-progress')
const getSubNav = require('../services/get-sub-nav')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/case-progress', function (req, res, next) {
    var id = req.params.id
    var organisationLevel = req.params.organisationLevel

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
