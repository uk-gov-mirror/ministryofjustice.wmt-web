const workloadPointsService = require('../services/workload-points-service')
const WorkloadPoints = require('../services/domain/workload-points')
const ValidationError = require('../services/errors/validation-error')
const authorisation = require('../authorisation')

module.exports = function (router) {
  router.get('/admin/workload-points', function (req, res) {
    authorisation.assertUserAuthenticated(req, res)
    
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
    authorisation.assertUserAuthenticated(req, res)
    
    var updatedWorkloadPoints
    try {
      updatedWorkloadPoints = new WorkloadPoints(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        return workloadPointsService.getWorkloadPoints()
          .then(function (result) {
            return res.status(400).render('workload-points', {
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              wp: req.body,
              errors: error.validationErrors
            })
          })
      }
    }

    return workloadPointsService.updateWorkloadPoints(updatedWorkloadPoints)
      .then(function () {
        return res.redirect(302, '/admin/workload-points?success=true')
      }).catch(function (error) {
        next(error)
      })
  })
}
