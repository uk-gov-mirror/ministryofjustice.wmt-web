const getOffenderManagerUtilisationTable = require('../services/get-offender-manager-utilisation-table')

module.exports = function (router) {
  router.get('/my-utilisation/:userId/:year/', function (req, res, next) {
    return res.render('my-utilisation', {
      utilisation: getOffenderManagerUtilisationTable(req.params.userId, req.params.year)
    })
  })
}
