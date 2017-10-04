const authorisation = require('../authorisation')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/', function (req, res) {
    if (!authorisation.isUserAuthenticated(req)) {
      return res.redirect('/login')
    }
    return res.redirect('/' + req.params.organisationLevel + '/' + req.params.id + '/overview')
  })
}
