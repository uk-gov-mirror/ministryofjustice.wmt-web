const getCapacityView = require('../services/data/get-capacity-view')
const dateRangeHelper = require('../services/helpers/date-range-helper')

module.exports = function (router) {
  router.get('/:organisation-level/:id/caseload-capacity', function (req, res, next) {
    var capacityDateRange = dateRangeHelper.createCapacityDateRange(req.query)
    var id = req.params.id
    var organisationLevel = req.params.organisationlevel

    var capacityViewPromise = getCapacityView(id, capacityDateRange, organisationLevel)

    return capacityViewPromise.then(function (result) {
      return res.render('capacity', {
        title: result.title,
        breadcrumbs: result.breadcrumbs,
        capacity: result.capacityTable
      })
    })
  })
}
