// TODO: swap in real breadcrumbs call when its completed
const getBreadcrumbs = require('')
const tableCreator = require('../services/helpers/table-creator')
const ORG_UNIT_TYPE = require('../constants/organisation-unit-type-enum')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const getInvidualWorkloadReports = require('../services/data/get-individual-workload-reports')

module.exports = function (router) {
  router.get(`/caseload-capacity/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:id/`, function (req, res, next) {
    var capacityDateRange = dateRangeHelper.createCapacityDateRange(req.params)

    var breadcrumbsPromise = getBreadcrumbs(req.params.id)
    var individualWorkloadReportsPromise = getInvidualWorkloadReports(req.params.id, capacityDateRange.fromDate, capacityDateRange.toDate)

    return breadcrumbsPromise.then(function (results) {
      // TODO: parse result
      var breadcrumbResults = results
      return individualWorkloadReportsPromise.then(function (workloadReports) {
        var capacityTable = tableCreator.createCapacityTable(req.params.id, 'Workload Owner', capacityDateRange, workloadReports)

        return res.render('capacity', {
          title: 'Individual Capacity',
          breadcrumbs: breadcrumbResults,
          capacity: capacityTable
        })
      })
    })
  })
}
