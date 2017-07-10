module.exports = function (router) {
  // Redirecting to caseload capacity for now until view for each unit is implemented
  router.get('/:organisationlevel/:id/', function (req, res) {
    return res.redirect('/' + req.params.organisationlevel + '/' + req.params.id + '/caseload-capacity')
  })
}
