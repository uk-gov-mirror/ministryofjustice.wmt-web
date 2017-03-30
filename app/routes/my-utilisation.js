const ViewUtilisation = require('../services/domain/view-utilisation')

module.exports = function (router) {
  router.get('/my-utilisation/:userId/:year/', function (req, res, next) {
    // When the user session stories are played the user id will be attached
    // to the req or res object
    console.log(req.params.userId + " " +req.params.year)
    var viewUtilisation = new ViewUtilisation(req.params.userId, req.params.year)
    return res.render('my-utilisation', {
      utilisation: viewUtilisation.getCaseloadUtilisation()
    })
  })

}