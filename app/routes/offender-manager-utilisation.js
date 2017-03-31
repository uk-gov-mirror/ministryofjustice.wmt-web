const ViewUtilisation = require('../services/domain/view-utilisation')

module.exports = function (router) {
  router.get('/offender-manager-utilisation/:userId/:year/', function (req, res, next) {
    var viewUtilisation = new ViewUtilisation(req.params.userId, req.params.year)
    return res.render('my-utilisation', {
      utilisation: viewUtilisation.getCaseloadUtilisation()
    })
  })

}