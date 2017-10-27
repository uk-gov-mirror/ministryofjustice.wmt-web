const workloadPointsService = require('../services/workload-points-service')
const WorkloadPoints = require('../services/domain/workload-points')
const ValidationError = require('../services/errors/validation-error')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const logger = require('../logger')

module.exports = function (router) {
  router.get('/admin/workload-points', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
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
    var authorisedUserRole = authorisation.getAuthoriseddUserRole(req)
    return workloadPointsService.getWorkloadPoints(false)
      .then(function (result) {
        return res.render('workload-points', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          wp: result.workloadPoints,
          updatedBy: result.updatedBy,
          successText: successText,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          noAuth: authorisedUserRole.noAuth  // used by proposition-link for the admin role
        })
      })
  })

  router.get('/admin/workload-points/t2a', function (req, res) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
    var success = req.query.success
    var successText = success ? 'You have successfully updated the workload points for transition to adulthood cases!' : null
    var authorisedUserRole = authorisation.getAuthoriseddUserRole(req)
    return workloadPointsService.getWorkloadPoints(true)
      .then(function (result) {
        return res.render('workload-points', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          wp: result.workloadPoints,
          updatedBy: result.updatedBy,
          successText: successText,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          noAuth: authorisedUserRole.noAuth  // used by proposition-link for the admin role
        })
      })
  })

  router.post('/admin/workload-points', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
    try {
      if (req.user) {
        req.body.userId = req.user.userId.toString()
      }
      var updatedWorkloadPoints = new WorkloadPoints(req.body)
      return workloadPointsService.updateWorkloadPoints(updatedWorkloadPoints)
        .then(function () {
          return res.redirect(302, '/admin/workload-points?success=true')
        })
    } catch (error) {
      logger.error(error)
      if (error instanceof ValidationError) {
        var authorisedUserRole = authorisation.getAuthoriseddUserRole(req)
        return workloadPointsService.getWorkloadPoints(false)
          .then(function (result) {
            return res.status(400).render('workload-points', {
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              wp: req.body,
              updatedBy: result.updatedBy,
              errors: error.validationErrors,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              noAuth: authorisedUserRole.noAuth  // used by proposition-link for the admin role
            })
          })
      }
      next(error)
    }
  })

  router.post('/admin/workload-points/t2a', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }
    try {
      if (req.user) {
        req.body.userId = req.user.userId.toString()
      }
      var updatedT2aWorkloadPoints = new WorkloadPoints(req.body)
      return workloadPointsService.updateWorkloadPoints(updatedT2aWorkloadPoints)
        .then(function () {
          return res.redirect(302, '/admin/workload-points/t2a?success=true')
        })
    } catch (error) {
      logger.error(error)
      if (error instanceof ValidationError) {
        var authorisedUserRole = authorisation.getAuthoriseddUserRole(req)
        return workloadPointsService.getWorkloadPoints(true)
          .then(function (result) {
            return res.status(400).render('workload-points', {
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              wp: req.body,
              updatedBy: result.updatedBy,
              errors: error.validationErrors,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              noAuth: authorisedUserRole.noAuth  // used by proposition-link for the admin role
            })
          })
      }
      next(error)
    }
  })
}
