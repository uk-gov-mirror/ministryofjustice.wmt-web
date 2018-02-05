const organisationUnitConstants = require('../constants/organisation-unit')
const reductionsService = require('../services/reductions-service')
const getSubNav = require('../services/get-sub-nav')
const Reduction = require('../services/domain/reduction')
const reductionStatusType = require('../constants/reduction-status-type')
const ValidationError = require('../services/errors/validation-error')
const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const workloadTypeValidator = require('../services/validators/workload-type-validator')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')

var lastUpdated

module.exports = function (router) {
  router.get('/:workloadType/:organisationLevel/:id/reductions', function (req, res, next) {
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

    var organisationLevel = req.params.organisationLevel
    var id = req.params.id
    var workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    var successText = getStatusText(req)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return reductionsService.getReductions(id, organisationLevel, workloadType).then(function (result) {
        result.date = lastUpdated
        return res.render('reductions', {
          breadcrumbs: result.breadcrumbs,
          linkId: id,
          title: result.title,
          subTitle: result.subTitle,
          subNav: getSubNav(id, organisationLevel, req.path, workloadType),
          activeReductions: result.activeReductions,
          scheduledReductions: result.scheduledReductions,
          archivedReductions: result.archivedReductions,
          successText: successText,
          workloadType: workloadType,
          date: result.date,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/:workloadType/:organisationLevel/:id/add-reduction', function (req, res, next) {
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

    var organisationLevel = req.params.organisationLevel
    var id = parseInt(req.params.id)
    var workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
      .then(function (result) {
        var errors = req.session.addReductionErrors
        delete req.session.addReductionErrors
        return res.render('add-reduction', {
          breadcrumbs: result.breadcrumbs,
          linkId: id,
          title: result.title,
          subTitle: result.subTitle,
          subNav: getSubNav(id, organisationLevel, req.path, workloadType),
          referenceData: result.referenceData,
          errors: errors,
          workloadType: workloadType,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
        })
      }).catch(function (error) {
        next(error)
      })
  })

  router.get('/:workloadType/:organisationLevel/:id/edit-reduction', function (req, res, next) {
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

    var organisationLevel = req.params.organisationLevel
    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = parseInt(req.params.id)
    var reductionId = parseInt(req.query.reductionId)
    var workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
      .then(function (result) {
        return reductionsService.getReductionByReductionId(reductionId)
          .then(function (reduction) {
            if (reduction !== undefined && reduction.workloadOwnerId !== id) {
              reduction = undefined
            }
            return res.render('add-reduction', {
              breadcrumbs: result.breadcrumbs,
              linkId: id,
              title: result.title,
              subTitle: result.subTitle,
              subNav: getSubNav(id, organisationLevel, req.path, workloadType),
              referenceData: result.referenceData,
              reduction: mapReductionToViewModel(reduction),
              workloadType: workloadType,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
            })
          }).catch(function (error) {
            next(error)
          })
      })
  })

  router.post('/:workloadType/:organisationLevel/:id/add-reduction', function (req, res, next) {
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

    var organisationLevel = req.params.organisationLevel
    var workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = req.params.id
    var reduction
    var reductionReason

    return reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
    .then(function (result) {
      try {
        // Find the index in the array of reasons where this reason occurs
        var index = result.referenceData.findIndex(reason => reason.id === req.body.reasonForReductionId)
        console.log('Passed findIndex')
        reductionReason = result.referenceData[index]
        reduction = generateNewReductionFromRequest(req.body, reductionReason)
      } catch (error) {
        if (error instanceof ValidationError) {
          var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
          return res.status(400).render('add-reduction', {
            breadcrumbs: result.breadcrumbs,
            linkId: id,
            title: result.title,
            subTitle: result.subTitle,
            subNav: getSubNav(id, organisationLevel, req.path, workloadType),
            referenceData: result.referenceData,
            reduction: {
              id: req.body.reductionId,
              reasonId: req.body.reasonForReductionId,
              hours: req.body.reductionHours,
              start_day: req.body.redStartDay,
              start_month: req.body.redStartMonth,
              start_year: req.body.redStartYear,
              end_day: req.body.redEndDay,
              end_month: req.body.redEndMonth,
              end_year: req.body.redEndYear,
              notes: req.body.notes
            },
            errors: error.validationErrors,
            workloadType: workloadType,
            userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
            authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
          })
        } else {
          next(error)
        }
      }

      return reductionsService.addReduction(id, reduction, workloadType).then(function () {
        return res.redirect(302, '/' + workloadType + '/' + organisationLevel + '/' + id)
      }).catch(function (error) {
        next(error)
      })
    })
    .catch(function (error) {
      next(error)
    })
  })

  router.post('/:workloadType/:organisationLevel/:id/edit-reduction', function (req, res, next) {
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
    var organisationLevel = req.params.organisationLevel
    var workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = req.params.id
    var reductionId = req.body.reductionId
    var reduction
    var reductionReason

    return reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
    .then(function (result) {
      try {
        // Find the index in the array of reasons where this reason occurs
        var index = result.referenceData.findIndex(reason => reason.id === req.body.reasonForReductionId)
        console.log('Passed findIndex')
        reductionReason = result.referenceData[index]
        reduction = generateNewReductionFromRequest(req.body, reductionReason)
      } catch (error) {
        if (error instanceof ValidationError) {
          var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
          return res.status(400).render('add-reduction', {
            breadcrumbs: result.breadcrumbs,
            linkId: id,
            title: result.title,
            subTitle: result.subTitle,
            subNav: getSubNav(id, organisationLevel, req.path, workloadType),
            referenceData: result.referenceData,
            reduction: {
              id: req.body.reductionId,
              reasonId: req.body.reasonForReductionId,
              hours: req.body.reductionHours,
              start_day: req.body.redStartDay,
              start_month: req.body.redStartMonth,
              start_year: req.body.redStartYear,
              end_day: req.body.redEndDay,
              end_month: req.body.redEndMonth,
              end_year: req.body.redEndYear,
              notes: req.body.notes
            },
            errors: error.validationErrors,
            userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
            authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
          })
        } else {
          next(error)
        }
      }

      return reductionsService.updateReduction(id, reductionId, reduction, workloadType)
      .then(function () {
        return res.redirect(302, '/' + workloadType + '/' + organisationLevel + '/' + id)
      }).catch(function (error) {
        next(error)
      })
    })
    .catch(function (error) {
      next(error)
    })
  })

  router.post('/:workloadType/:organisationLevel/:id/update-reduction-status', function (req, res, next) {
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
    var organisationLevel = req.params.organisationLevel
    var workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var reductionStatus = req.body.status
    var id = req.params.id
    var reductionId = req.body.reductionId

    if (!requestStatusVerified(reductionStatus)) {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions')
    }

    var successType
    if (reductionStatus === reductionStatusType.ARCHIVED) {
      successType = '?archived=true'
    } else if (reductionStatus === reductionStatusType.DELETED) {
      successType = '?deleted=true'
    }

    return reductionsService.updateReductionStatus(id, reductionId, reductionStatus, workloadType)
    .then(function () {
      return res.redirect(302, '/' + workloadType + '/' + organisationLevel + '/' + id + '/reductions' + successType)
    }).catch(function (error) {
      next(error)
    })
  })

  var getStatusText = function (request) {
    var successText = null
    if (request.query.success) {
      successText = 'You have successfully added a new reduction!'
    } else if (request.query.edited) {
      successText = 'You have successfully updated the reduction!'
    } else if (request.query.archived) {
      successText = 'You have successfully archived the reduction!'
    } else if (request.query.deleted) {
      successText = 'You have successfully deleted the reduction!'
    }
    return successText
  }

  var generateNewReductionFromRequest = function (requestBody, reductionReason) {
    var reductionStartDate = [requestBody.redStartDay, requestBody.redStartMonth, requestBody.redStartYear]
    var reductionEndDate = [requestBody.redEndDay, requestBody.redEndMonth, requestBody.redEndYear]
    var reasonId = requestBody.reasonForReductionId
    return new Reduction(reasonId, requestBody.reductionHours, reductionStartDate, reductionEndDate, requestBody.notes, reductionReason)
  }

  var requestStatusVerified = function (reductionStatus) {
    var result = true

    var status = [
      reductionStatusType.ACTIVE,
      reductionStatusType.SCHEDULED,
      reductionStatusType.ARCHIVED,
      reductionStatusType.DELETED
    ]

    if (!status.includes(reductionStatus)) {
      result = false
    }

    return result
  }

  var mapReductionToViewModel = function (reduction) {
    var viewModel
    if (reduction !== undefined) {
      viewModel = {
        id: reduction.id,
        reasonId: reduction.reductionReasonId,
        hours: reduction.hours,
        start_day: reduction.reductionStartDate.getDate(),
        start_month: reduction.reductionStartDate.getMonth() + 1,
        start_year: reduction.reductionStartDate.getFullYear(),
        end_day: reduction.reductionEndDate.getDate(),
        end_month: reduction.reductionEndDate.getMonth() + 1,
        end_year: reduction.reductionEndDate.getFullYear(),
        notes: reduction.notes,
        status: reduction.status
      }
    }
    return viewModel
  }
}
