const getOffenderManagerUtilisationTable = require('../services/get-offender-manager-utilisation-table')

module.exports = function (router) {
  router.get('/offender-manager-utilisation/:userId/:year/', function (req, res, next) {
    return res.render('offender-manager-utilisation', {
      utilisation: getOffenderManagerUtilisationTable(req.params.userId, req.params.year)
    })
  })
}
