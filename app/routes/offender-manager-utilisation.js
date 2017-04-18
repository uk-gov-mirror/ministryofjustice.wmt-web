const getUtilisationTable = require('../services/get-utilisation-table')
const UtilisationDate = require('../services/domain/utilisation-date')
const ORG_UNIT_TYPE = require('../constants/organisation-unit-type-enum')
const dateFormatter = require('../services/date-formatter')
const ValidationError = require('../services/errors/validation-error')

module.exports = function (router) {
  router.get(`/caseload-utilisation/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:id/`, function (req, res, next) {

    try {
      var fromUtilisationDate, toUtilisationDate

      if(Object.keys(req.query).length === 0) {
        fromDate = dateFormatter.now().subtract(1, "years")
        toDate = dateFormatter.now()

        fromUtilisationDate = new UtilisationDate(
          fromDate.date(),
          fromDate.month() +1,
          fromDate.year()
        )
        toUtilisationDate = new UtilisationDate(
          toDate.date(),
          toDate.month() +1,
          toDate.year()
        )
      } else {

        fromUtilisationDate = new UtilisationDate(
          req.query['utilisation-from-day'],
          req.query['utilisation-from-month'],
          req.query['utilisation-from-year']
        )
        toUtilisationDate = new UtilisationDate(
          req.query['utilisation-to-day'],
          req.query['utilisation-to-month'],
          req.query['utilisation-to-year']
        )
      }

      return res.render('utilisation', {
        utilisation: getUtilisationTable(ORG_UNIT_TYPE.OFFENDER_MANAGER, req.params.id, fromUtilisationDate, toUtilisationDate)
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
