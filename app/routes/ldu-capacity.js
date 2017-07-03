// TODO: swap in real breadcrumbs call when its completed
const getBreadcrumbs = require('')
const getLDUWorkloadReports = require('../services/data/get-workload-reports-views')
const CapacityTypes = require('../constants/capacity-type')
const tableCreator = require('../services/helpers/table-creator')
const dateRangeHelper = require('../services/helpers/date-range-helper')

module.exports = function (router) {
  router.get('/ldu/:id', function (req, res, next) {
    var capacityDateRange = dateRangeHelper.createCapacityDateRange(req.query)

    var breadcrumbsPromise = getBreadcrumbs(req.params.id)
    var lduWorkloadReportsPromise = getLDUWorkloadReports(req.params.id, capacityDateRange, CapacityTypes.LDU)

    return breadcrumbsPromise.then(function (results) {
      // TODO: parse result
      var breadcrumbResults = results
      return lduWorkloadReportsPromise.then(function (workloadReports) {
        var capacityTable = tableCreator.createCapacityTable(req.params.id, 'LDU', capacityDateRange, workloadReports)

        return res.render('capacity', {
          title: 'LDU Capacity',
          breadcrumbs: breadcrumbResults,
          capacity: capacityTable
        })
      })
    })
  })
}
