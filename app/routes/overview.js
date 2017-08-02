const getOverview = require('../services/get-overview')
const getSubNav = require('../services/get-sub-nav')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/overview', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    var overviewPromise = getOverview(id, organisationLevel)

    return overviewPromise.then(function (result) {
      return res.render('overview', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        organisationLevel: organisationLevel,
        subNav: getSubNav(id, organisationLevel, req.path),
        overviewDetails: result.overviewDetails
      })
    })
  })
}
