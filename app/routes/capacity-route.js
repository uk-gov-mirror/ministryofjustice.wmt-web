const getCapacityView = require('../services/get-capacity-view')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const _ = require('lodash')

module.exports = function (router) {
  router.get(`/:organisationLevel/:id/caseload-capacity`, function (req, res, next) {
    var capacityDateRange = dateRangeHelper.createCapacityDateRange(req.query)
    var id = req.params.id
    var organisationLevel = req.params.organisationLevel

    var capacityViewPromise = getCapacityView(id, capacityDateRange, organisationLevel)

    return capacityViewPromise.then(function (result) {
      var activeIndex = _.findIndex(result.subNav, {link: req.path})
      result.subNav[activeIndex].active = true
      return res.render('capacity', {
        title: result.title,
        subTitle: result.subTitle,
        subnav: result.subNav,
        breadcrumbs: result.breadcrumbs,
        capacity: result.capacityTable
      })
    })
  })
}
