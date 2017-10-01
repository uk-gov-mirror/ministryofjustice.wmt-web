const workloadPointsService = require('../services/workload-points-service')
const WorkloadPoints = require('../services/domain/workload-points')
const ValidationError = require('../services/errors/validation-error')
const userRoleService = require('../services/user-role-service')

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
    var updatedWorkloadPoints
    try {
      return userRoleService.getUserByUsername(req.user.username)
      .then(function (user) {
        req.body.userId = user.id.toString()
        updatedWorkloadPoints = new WorkloadPoints(req.body)
        return workloadPointsService.updateWorkloadPoints(updatedWorkloadPoints)
          .then(function () {
            return res.redirect(302, '/admin/workload-points?success=true')
          })
      }).catch(function (error) {
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
        next(error)
      })
    } catch (error) {
      next(error)
    }
  })
}
