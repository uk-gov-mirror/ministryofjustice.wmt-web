const getCapacityView = require('../services/get-capacity-view')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')

module.exports = function (router) {
  router.get(`/:organisationLevel/:id/caseload-capacity`, function (req, res, next) {
    var capacityDateRange = dateRangeHelper.createCapacityDateRange(req.query)
    var organisationLevel = req.params.organisationLevel
    var id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    var capacityViewPromise = getCapacityView(id, capacityDateRange, organisationLevel)

    return capacityViewPromise.then(function (result) {
      return res.render('capacity', {
        title: result.title,
        subTitle: result.subTitle,
        subNav: getSubNav(id, organisationLevel, req.path),
        breadcrumbs: result.breadcrumbs,
        capacity: result.capacityTable
      })
    })
  })
}
