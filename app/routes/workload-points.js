module.exports = function (router) {
  router.get('/workload-points', function (req, res) {
    return res.render('workload-points', {
      title: 'Workload Points'
    })
  })

  router.post('/workload-points', function (req, res, next) {
    return res.send(req.body.workloadPoints)
  })
}
