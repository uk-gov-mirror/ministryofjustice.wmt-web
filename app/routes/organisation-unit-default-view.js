const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../constants/workload-type')

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    return res.redirect('/' + workloadTypes.PROBATION + '/' + req.params.organisationLevel + '/' + req.params.id + '/overview')
  })

  router.get('/' + workloadTypes.COURT_REPORTS + '/:organisationLevel/:id/', function (req, res) {
    return res.redirect('/' + workloadTypes.COURT_REPORTS + '/' + req.params.organisationLevel + '/' + req.params.id + '/overview')
  })
}
