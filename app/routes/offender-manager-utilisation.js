const getUtilisationTable = require('../services/get-utilisation-table')
const ORG_UNIT_TYPE = require('../constants/organisation-unit-type-enum')

module.exports = function (router) {
  router.get(`/caseload-utilisation/${ORG_UNIT_TYPE.OFFENDER_MANAGER}/:id/`, function (req, res, next) {

    fromDate = [
      req.query['utilisation-from-year'],
      req.query['utilisation-from-month'],
      req.query['utilisation-from-day']
    ]

    toDate = [
      req.query['utilisation-to-year'],
      req.query['utilisation-to-month'],
      req.query['utilisation-to-day']
    ]

    return res.render('utilisation', {
      utilisation: getUtilisationTable(ORG_UNIT_TYPE.OFFENDER_MANAGER, req.params.id, fromDate, toDate)
    })
  })
}
