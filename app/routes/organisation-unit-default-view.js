module.exports = function (router) {
  router.get('/:organisationLevel/:id/', function (req, res) {
    return res.redirect('/' + req.params.organisationLevel + '/' + req.params.id + '/overview')
  })
}
