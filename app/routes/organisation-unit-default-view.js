module.exports = function (router) {
  router.get('/:organisationlevel/:id/', function (req, res) {
    return res.redirect('/' + req.params.organisationlevel + '/' + req.params.id + '/overview')
  })
}
