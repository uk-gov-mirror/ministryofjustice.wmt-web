const workloadPointsService = require('../services/workload-points-service.js')

module.exports = function (router) {
  router.get('/admin/workload-points', function (req, res) {
    return workloadPointsService.getWorkloadPoints().then(function (result) {
      return res.render('workload-points', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        wp: result.workloadPoints
      })
    })
  })

  router.post('/admin/workload-points', function (req, res, next) {
    // var updatedWorkloadPoints = req.body

    // return updateWorkloadPoints(updatedWorkloadPoints).then(function () {
      // TODO: Add in success message?
    return res.redirect('/admin/workload-points')
    // })
  })
}
