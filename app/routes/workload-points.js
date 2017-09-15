const workloadPointsService = require('../services/workload-points-service')

module.exports = function (router) {
  router.get('/admin/workload-points', function (req, res) {
    var success = req.query.success
    var successText = success ? 'You have successfully updated the workload points!' : null

    return workloadPointsService.getWorkloadPoints()
      .then(function (result) {
        return res.render('workload-points', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          wp: result.workloadPoints,
          successText: successText
        })
      })
  })

  router.post('/admin/workload-points', function (req, res, next) {
    var updatedWorkloadPoints = req.body

    return workloadPointsService.updateWorkloadPoints(updatedWorkloadPoints)
      .then(function () {
        return res.redirect(302, '/admin/workload-points?success=true')
      }).catch(function (error) {
        next(error)
      })
  })
}
