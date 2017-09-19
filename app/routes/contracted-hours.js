const contractedHoursService = require('../services/contracted-hours-service')
const getSubNav = require('../services/get-sub-nav')
const organisationUnitConstants = require('../constants/organisation-unit')
const ErrorHandler = require('../services/validators/error-handler')
const FieldValidator = require('../services/validators/field-validator')
const ValidationError = require('../services/errors/validation-error')
const ERROR_MESSAGES = require('../services/validators/validation-error-messages')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/contracted-hours', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      return res.sendStatus(404)
    }

    return contractedHoursService.getContractedHours(id, organisationLevel)
    .then(function (result) {
      return res.render('contracted-hours', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        subNav: getSubNav(id, organisationLevel, req.path),
        contractedHours: result.contractedHours,
        woId: id,
        hoursUpdatedSuccess: req.query.hoursUpdatedSuccess
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/:organisationLevel/:id/contracted-hours', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id
    var updatedHours = req.body.hours

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      return res.sendStatus(404)
    }

    try {
      if (updatedHours) isValid(updatedHours, next)
    } catch (error) {
      if (error instanceof ValidationError) {
        return contractedHoursService.getContractedHours(id, organisationLevel)
          .then(function (result) {
            return res.render('contracted-hours', {
              errors: error.validationErrors,
              title: result.title,
              subTitle: result.subTitle,
              breadcrumbs: result.breadcrumbs,
              subNav: getSubNav(id, organisationLevel, req.path),
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

    return contractedHoursService.updateContractedHours(id, organisationLevel, updatedHours)
    .then(function () {
      return res.redirect('/offender-manager/' + id + '/contracted-hours?hoursUpdatedSuccess=true')
    }).catch(function (error) {
      next(error)
    })
  })

  function isValid (updatedHours, next) {
    var errors = ErrorHandler()
    FieldValidator(updatedHours, 'hours', errors)
            .isRequired(ERROR_MESSAGES.getIsRequired)
            .isFloat(0, 37.5)

    var validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}
