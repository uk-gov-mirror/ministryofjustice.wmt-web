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
const ErrorHandler = require('../services/validators/error-handler')
const ERROR_MESSAGES = require('../services/validators/validation-error-messages')
let lastUpdated

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

    const organisationLevel = req.params.organisationLevel
    const id = req.params.id
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    const successText = getStatusText(req)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    let reductionsResultData

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return reductionsService.getReductions(id, organisationLevel, workloadType).then(function (result) {
        result.date = lastUpdated
        reductionsResultData = result

        if (req.session.ContractedHoursIsZero === true) {
          delete req.session.ContractedHoursIsZero
          const errors = ErrorHandler()
          errors.add('headingActive', ERROR_MESSAGES.getContractedHoursAreZero)
          throw new ValidationError(errors.get())
        } else {
          return renderReductionsMainPage(req, res, reductionsResultData, successText, workloadType, id, organisationLevel, authorisedUserRole)
        }
      })
    }).catch(function (error) {
      if (error instanceof ValidationError) {
        return renderReductionsMainPage(req, res, reductionsResultData, successText, workloadType, id, organisationLevel, authorisedUserRole, error)
      } else {
        next(error)
      }
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

    const organisationLevel = req.params.organisationLevel
    const id = parseInt(req.params.id)
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
      .then(function (result) {
        const errors = req.session.addReductionErrors
        delete req.session.addReductionErrors

        if (result.contractedHours === 0) {
          req.session.ContractedHoursIsZero = true
          const routeToReductionPage = '/' + workloadType + '/' + organisationLevel + '/' + id + '/reductions'
          res.redirect(routeToReductionPage)
        } else {
          return res.render('add-reduction', {
            breadcrumbs: result.breadcrumbs,
            linkId: id,
            title: result.title,
            subTitle: result.subTitle,
            subNav: getSubNav(id, organisationLevel, req.path, workloadType, authorisedUserRole.authorisation, authorisedUserRole.userRole),
            referenceData: result.referenceData,
            stringifiedReferenceData: stringifyReductionsData(result.referenceData),
            errors: errors,
            workloadType: workloadType,
            reductionToPopulate: false,
            reductionEnabled: false,
            userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
            authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
          })
        }
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

    const organisationLevel = req.params.organisationLevel
    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const id = parseInt(req.params.id)
    const reductionId = parseInt(req.query.reductionId)
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
      .then(function (result) {
        return reductionsService.getReductionByReductionId(reductionId)
          .then(function (reduction) {
            return reductionsService.getReductionsHistory(reductionId).then(function (reductionsHistory) {
              if (reduction !== undefined && reduction.workloadOwnerId !== id) {
                reduction = undefined
              }
              let reductionEnabled, reductionStatus
              if (!reduction) {
                reductionEnabled = false
                reductionStatus = ''
              } else {
                reductionEnabled = reduction.isEnabled
                reductionStatus = reduction.status
              }
              return res.render('add-reduction', {
                breadcrumbs: result.breadcrumbs,
                linkId: id,
                title: result.title,
                subTitle: result.subTitle,
                subNav: getSubNav(id, organisationLevel, req.path, workloadType),
                referenceData: result.referenceData,
                stringifiedReferenceData: stringifyReductionsData(result.referenceData),
                reduction: mapReductionToViewModel(reduction),
                reductionToPopulate: true,
                reductionEnabled: reductionEnabled,
                reductionStatus: reductionStatus,
                workloadType: workloadType,
                userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
                authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
                reductionsHistory: reductionsHistory
              })
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

    const organisationLevel = req.params.organisationLevel
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const id = req.params.id
    let reduction
    let reductionReason

    return reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
      .then(function (result) {
        try {
        // Find the index in the array of reasons where this reason occurs
          const index = result.referenceData.findIndex(reason => reason.id === parseInt(req.body.reasonForReductionId))
          reductionReason = result.referenceData[index]
          let userId = null
          if (req.user !== undefined && req.user !== null) {
            userId = req.user.userId
          }
          reduction = generateNewReductionFromRequest(req.body, reductionReason, userId)
        } catch (error) {
          if (error instanceof ValidationError) {
            const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
            return res.status(400).render('add-reduction', {
              breadcrumbs: result.breadcrumbs,
              linkId: id,
              title: result.title,
              subTitle: result.subTitle,
              subNav: getSubNav(id, organisationLevel, req.path, workloadType),
              referenceData: result.referenceData,
              stringifiedReferenceData: stringifyReductionsData(result.referenceData),
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
                notes: req.body.notes,
                isEnabled: reductionReason.isEnabled
              },
              reductionToPopulate: true,
              reductionEnabled: reductionReason.isEnabled,
              errors: error.validationErrors,
              workloadType: workloadType,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
            })
          } else {
            next(error)
          }
        }

        return reductionsService.addReduction(id, reduction, workloadType).then(function () {
          return res.redirect(302, '/' + workloadType + '/' + organisationLevel + '/' + id + '/reductions')
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
    const organisationLevel = req.params.organisationLevel
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const id = req.params.id
    const reductionId = req.body.reductionId
    let reduction
    let reductionReason

    return reductionsService.getReductionsHistory(reductionId).then(function (reductionsHistory) {
      return reductionsService.getAddReductionsRefData(id, organisationLevel, workloadType)
        .then(function (result) {
          try {
          // Find the index in the array of reasons where this reason occurs
            const index = result.referenceData.findIndex(reason => reason.id === parseInt(req.body.reasonForReductionId))
            reductionReason = result.referenceData[index]
            let userId = null
            if (req.user !== undefined && req.user !== null) {
              userId = req.user.userId
            }
            reduction = generateNewReductionFromRequest(req.body, reductionReason, userId)
          } catch (error) {
            if (error instanceof ValidationError) {
              const authorisedUserRole = authorisation.getAuthorisedUserRole(req)
              return res.status(400).render('add-reduction', {
                breadcrumbs: result.breadcrumbs,
                linkId: id,
                title: result.title,
                subTitle: result.subTitle,
                subNav: getSubNav(id, organisationLevel, req.path, workloadType),
                referenceData: result.referenceData,
                stringifiedReferenceData: stringifyReductionsData(result.referenceData),
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
                  notes: req.body.notes,
                  isEnabled: reductionReason.isEnabled
                },
                reductionToPopulate: true,
                reductionEnabled: reductionReason.isEnabled,
                errors: error.validationErrors,
                workloadType: workloadType,
                userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
                authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
                reductionsHistory: reductionsHistory
              })
            } else {
              next(error)
            }
          }

          return reductionsService.getOldReductionForHistory(reductionId).then(function (oldReduction) {
            return reductionsService.addOldReductionToHistory(oldReduction).then(function () {
              return reductionsService.updateReduction(id, reductionId, reduction, workloadType)
                .then(function () {
                  return res.redirect(302, '/' + workloadType + '/' + organisationLevel + '/' + id + '/reductions')
                }).catch(function (error) {
                  next(error)
                })
            })
          })
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
    const organisationLevel = req.params.organisationLevel
    const workloadType = req.params.workloadType

    workloadTypeValidator.validate(workloadType)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    const reductionStatus = req.body.status
    const id = req.params.id
    const reductionId = req.body.reductionId

    if (!requestStatusVerified(reductionStatus)) {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions')
    }

    let successType
    if (reductionStatus === reductionStatusType.ARCHIVED) {
      successType = '?archived=true'
    } else if (reductionStatus === reductionStatusType.DELETED) {
      successType = '?deleted=true'
    }

    return reductionsService.getOldReductionForHistory(reductionId).then(function (oldReduction) {
      return reductionsService.addOldReductionToHistory(oldReduction).then(function () {
        return reductionsService.updateReductionStatus(id, reductionId, reductionStatus, workloadType)
          .then(function () {
            return res.redirect(302, '/' + workloadType + '/' + organisationLevel + '/' + id + '/reductions' + successType)
          }).catch(function (error) {
            next(error)
          })
      })
    })
  })

  const getStatusText = function (request) {
    let successText = null
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

  const generateNewReductionFromRequest = function (requestBody, reductionReason, submitterId) {
    const reductionStartDate = [requestBody.redStartDay, requestBody.redStartMonth, requestBody.redStartYear]
    const reductionEndDate = [requestBody.redEndDay, requestBody.redEndMonth, requestBody.redEndYear]
    const reasonId = requestBody.reasonForReductionId
    return new Reduction(reasonId, requestBody.reductionHours, reductionStartDate, reductionEndDate, requestBody.notes, reductionReason, submitterId)
  }

  const requestStatusVerified = function (reductionStatus) {
    let result = true

    const status = [
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

  const mapReductionToViewModel = function (reduction) {
    let viewModel
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
        status: reduction.status,
        isEnabled: reduction.isEnabled
      }
    }
    return viewModel
  }

  const renderReductionsMainPage = function (req, res, results, successText, workloadType, id, organisationLevel, authorisedUserRole, error = null) {
    const displayJson = {
      breadcrumbs: results.breadcrumbs,
      linkId: id,
      title: results.title,
      subTitle: results.subTitle,
      subNav: getSubNav(id, organisationLevel, req.path, workloadType),
      activeReductions: results.activeReductions,
      scheduledReductions: results.scheduledReductions,
      archivedReductions: results.archivedReductions,
      successText: successText,
      workloadType: workloadType,
      date: results.date,
      userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
      authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
    }
    if (error) {
      displayJson.errors = error.validationErrors
    }
    return res.render('reductions', displayJson)
  }

  const stringifyReductionsData = function (reductionsRefData) {
    const reductionsData = Object.assign([], reductionsRefData)
    return JSON.stringify(reductionsData)
  }
}
