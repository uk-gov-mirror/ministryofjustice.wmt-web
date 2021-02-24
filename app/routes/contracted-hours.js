const contractedHoursService = require('../services/contracted-hours-service')
const getSubNav = require('../services/get-sub-nav')
const organisationUnitConstants = require('../constants/organisation-unit')
const ErrorHandler = require('../services/validators/error-handler')
const FieldValidator = require('../services/validators/field-validator')
const ValidationError = require('../services/errors/validation-error')
const ERROR_MESSAGES = require('../services/validators/validation-error-messages')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const workloadTypeValidator = require('../services/validators/workload-type-validator')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden

module.exports = function (router) {
  router.get('/:workloadType/:organisationLevel/:id/contracted-hours', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.MANAGER, roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.MANAGER_ROLES_REQUIRED
        })
      }
    }

    const organisationLevel = req.params.organisationLevel
    const id = req.params.id
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      return res.sendStatus(404)
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return contractedHoursService.getContractedHours(id, organisationLevel, workloadType)
      .then(function (result) {
        return res.render('contracted-hours', {
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          subNav: getSubNav(id, organisationLevel, req.path, workloadType, authorisedUserRole.authorisation, authorisedUserRole.userRole),
          contractedHours: result.contractedHours,
          woId: id,
          hoursUpdatedSuccess: req.query.hoursUpdatedSuccess,
          workloadType: workloadType,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
        })
      }).catch(function (error) {
        next(error)
      })
  })

  router.post('/:workloadType/:organisationLevel/:id/contracted-hours', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.MANAGER, roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.MANAGER_ROLES_REQUIRED
        })
      }
    }

    const organisationLevel = req.params.organisationLevel
    const id = req.params.id
    const updatedHours = req.body.hours
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      return res.sendStatus(404)
    }

    try {
      isValid(updatedHours, next)
    } catch (error) {
      if (error instanceof ValidationError) {
        return contractedHoursService.getContractedHours(id, organisationLevel, workloadType)
          .then(function (result) {
            const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
            console.log(error.validationErrors)
            return res.render('contracted-hours', {
              errors: error.validationErrors,
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              subNav: getSubNav(id, organisationLevel, req.path, workloadType, authorisedUserRole.authorisation, authorisedUserRole.userRole),
              contractedHours: updatedHours,
              workloadType: workloadType,
              woId: id,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
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
        return res.redirect('/' + workloadType + '/offender-manager/' + id + '/contracted-hours?hoursUpdatedSuccess=true')
      }).catch(function (error) {
        next(error)
      })
  })

  function isValid (updatedHours, next) {
    const errors = ErrorHandler()
    FieldValidator(updatedHours, 'hours', errors)
      .isRequired(ERROR_MESSAGES.getIsRequiredMessage)
      .isFloat(0, 37.5)

    const validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}
