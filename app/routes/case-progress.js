const getCaseProgress = require('../services/get-case-progress')

module.exports = function (router) {
  // TODO Double check URL
  router.get('/:organisationLevel/:id/case-progress', function (req, res, next) {
    var id = req.params.id
    var organisationLevel = req.params.organisationLevel

    // TODO Currently only dealing with offender manager. Add Team, LDU and Region
    // if (organisationLevel !== ) {
        // Only dealing with offendermanager
    // }

    var result = getCaseProgress(id, organisationLevel)

  //  return caseProgressPromise.then(function (result) {
    return res.render('case-progress', {
      title: result.title,
      subTitle: result.subTitle,
      breadcrumbs: result.breadcrumbs,
      caseProgress: result.caseProgress
    })
    // })
  })
}
