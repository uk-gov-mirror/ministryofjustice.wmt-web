const getUtilisationTable = require('../services/get-utilisation-table')
const UtilisationDate = require('../services/domain/utilisation-date')
const ORG_UNIT_TYPE = require('../constants/organisation-unit-type-enum')
const dateFormatter = require('../services/date-formatter')

module.exports = function (router) {
  router.get(`/caseload-utilisation/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:id/`, function (req, res, next) {

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
        req.query['utilisation-from-year'],
        req.query['utilisation-from-month'],
        req.query['utilisation-from-day']
      )
      toUtilisationDate = new UtilisationDate(
        req.query['utilisation-to-year'],
        req.query['utilisation-to-month'],
        req.query['utilisation-to-day']
      )
    }

    return res.render('utilisation', {
      utilisation: getUtilisationTable(ORG_UNIT_TYPE.OFFENDER_MANAGER, req.params.id, fromUtilisationDate, toUtilisationDate)
    })
  })
}
