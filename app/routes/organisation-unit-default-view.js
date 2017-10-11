const authorisation = require('../authorisation')
const Unathorized = require('../services/errors/authentication-error').Unauthorized

module.exports = function (router) {
  router.get('/:organisationLevel/:id/', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    return res.redirect('/' + req.params.organisationLevel + '/' + req.params.id + '/overview')
  })

  router.get('/court-reports/:organisationLevel/:id/', function (req, res) {
    return res.redirect('/court-reports/' + req.params.organisationLevel + '/' + req.params.id + '/overview')
  })
}
