const getUtilisationTable = require('../services/get-utilisation-table')
const CapacityDateRange = require('../services/domain/capacity-date-range')
const ORG_UNIT_TYPE = require('../constants/organisation-unit-type-enum')
const dateFormatter = require('../services/date-formatter')
const ValidationError = require('../services/errors/validation-error')

module.exports = function (router) {
  router.get(`/caseload-utilisation/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:id/`, function (req, res, next) {
    try {
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
          req.query['utilisation-from-day'],
          req.query['utilisation-from-month'],
          req.query['utilisation-from-year'],
          req.query['utilisation-to-day'],
          req.query['utilisation-to-month'],
          req.query['utilisation-to-year']
        )
      }

      return res.render('utilisation', {
        utilisation: getUtilisationTable(ORG_UNIT_TYPE.OFFENDER_MANAGER, req.params.id, capacityDateRange)
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).render('utilisation', {
          errors: error.validationErrors
        })
      } else {
        throw error
      }
    }
  })
}
