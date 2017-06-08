const getCapacityTable = require('../services/get-capacity-table')
const CapacityDateRange = require('../services/domain/capacity-date-range')
const ORG_UNIT_TYPE = require('../constants/organisation-unit-type-enum')
const dateFormatter = require('../services/date-formatter')

module.exports = function (router) {
  router.get(`/caseload-capacity/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:id/`, function (req, res, next) {
    var capacityDateRange

    if (Object.keys(req.query).length === 0) {
      var fromDate = dateFormatter.now().subtract(1, 'years')
      var toDate = dateFormatter.now()

      capacityDateRange = new CapacityDateRange(
        fromDate.date(),
        fromDate.month() + 1,
        fromDate.year(),
        toDate.date(),
        toDate.month() + 1,
        toDate.year()
      )
    } else {
      capacityDateRange = new CapacityDateRange(
        req.query['capacity-from-day'],
        req.query['capacity-from-month'],
        req.query['capacity-from-year'],
        req.query['capacity-to-day'],
        req.query['capacity-to-month'],
        req.query['capacity-to-year']
      )
    }

    getCapacityTable(req.params.id, capacityDateRange).then((capacityTable) => {
      return res.render('capacity', {
        capacity: capacityTable
      })
    })
  })
}
