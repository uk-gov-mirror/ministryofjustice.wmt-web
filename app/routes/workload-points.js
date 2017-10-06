const workloadPointsService = require('../services/workload-points-service')
const WorkloadPoints = require('../services/domain/workload-points')
const ValidationError = require('../services/errors/validation-error')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unathorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
  router.get('/admin/workload-points', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
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
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
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
