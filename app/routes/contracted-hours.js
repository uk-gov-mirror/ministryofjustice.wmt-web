const contractedHoursService = require('../services/contracted-hours-service')
const getSubNav = require('../services/get-sub-nav')
const organisationUnitConstants = require('../constants/organisation-unit')
const workloadTypeContants = require('../constants/workload-type')
const ErrorHandler = require('../services/validators/error-handler')
const FieldValidator = require('../services/validators/field-validator')
const ValidationError = require('../services/errors/validation-error')
const ERROR_MESSAGES = require('../services/validators/validation-error-messages')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unathorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
  router.get('/:workloadType/:organisationLevel/:id/contracted-hours', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.MANAGER])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.MANAGER_ROLES_REQUIRED
        })
      }
    }

    var organisationLevel = req.params.organisationLevel
    var id = req.params.id
    var workloadType = req.params.workloadType

    if (workloadType !== undefined && workloadType !== workloadTypeContants.COURT_REPORTS && workloadType !== workloadTypeContants.PROBATION) {
      return res.sendStatus(404)
    }

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      return res.sendStatus(404)
    }

    return contractedHoursService.getContractedHours(id, organisationLevel, workloadType)
    .then(function (result) {
      return res.render('contracted-hours', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path, workloadType),
        contractedHours: result.contractedHours,
        woId: id,
        hoursUpdatedSuccess: req.query.hoursUpdatedSuccess,
        workloadType: workloadType
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/:workloadType/:organisationLevel/:id/contracted-hours', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.MANAGER])
    } catch (error) {
      if (error instanceof Unathorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.MANAGER_ROLES_REQUIRED
        })
      }
    }

    var organisationLevel = req.params.organisationLevel
    var id = req.params.id
    var updatedHours = req.body.hours
    var workloadType = req.params.workloadType

    if (workloadType !== undefined && workloadType !== workloadTypeContants.COURT_REPORTS && workloadType !== workloadTypeContants.PROBATION) {
      return res.sendStatus(404)
    }

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      return res.sendStatus(404)
    }

    try {
      isValid(updatedHours, next)
    } catch (error) {
      if (error instanceof ValidationError) {
        return contractedHoursService.getContractedHours(id, organisationLevel, workloadType)
          .then(function (result) {
            return res.render('contracted-hours', {
              errors: error.validationErrors,
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              subNav: getSubNav(id, organisationLevel, req.path, workloadType),
              contractedHours: updatedHours,
              woId: id
            })
          }).catch(function (error) {
            next(error)
          })
      } else {
        next(error)
      }
    }

    return contractedHoursService.updateContractedHours(id, organisationLevel, updatedHours, workloadType)
    .then(function () {
      var linkPrefix = ''
      if (workloadType === workloadTypeContants.COURT_REPORTS) {
        linkPrefix = '/court-reports'
      }
      return res.redirect(linkPrefix + '/offender-manager/' + id + '/contracted-hours?hoursUpdatedSuccess=true')
    }).catch(function (error) {
      next(error)
    })
  })

  function isValid (updatedHours, next) {
    var errors = ErrorHandler()
    FieldValidator(updatedHours, 'hours', errors)
      .isRequired(ERROR_MESSAGES.getIsRequiredMessage)
      .isFloat(0, 37.5)

    var validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}
