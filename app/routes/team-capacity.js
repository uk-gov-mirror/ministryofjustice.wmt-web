const getBreadcrumbs = require('')
const getTeamCapacity = require('../services/data/get-capacity-views')
const CapacityDateRange = require('../services/domain/capacity-date-range')
const CapacityTypes = require('../constants/capacity-type')
const dateFormatter = require('../services/date-formatter')
const DisplayTable = require('../services/domain/display-table')

module.exports = function (router) {
  router.get('/team/:id', function (req, res, next) {
    var capacityDateRange
    // Do we need an identifier to say if LDU etc?
    var breadcrumbsPromise = getBreadcrumbs(req.params.id)
    var capacityPromise = getTeamCapacity(req.params.id, capacityDateRange, CapacityTypes.TEAM)

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

    return breadcrumbsPromise.then(function (results) {
        // TODO: parse result
      return capacityPromise.then(function (capacityResults) {
        // TODO: parse result
        var headings = []
        var rows = []
        var row = { label: 'LDU ' + req.params.id, values: [] }
        var capacityTable
        capacityResults.forEach(function (capacity) {
          headings.push(capacity['workload_report_date'])
          row.values.push(capacity['capacity_percentage'])
          row.values.push(capacity['reduction_hours'])
        })
        rows.push(row)

        capacityTable = new DisplayTable(headings, rows)

        return res.render('capacity', {
          title: 'LDU Capacity',
          // TODO: change to breadcrumbs object
          breadcrumbs: results,
          capacity: capacityTable
        })
      })
    })
  })
}
