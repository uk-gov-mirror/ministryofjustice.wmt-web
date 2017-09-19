const organisationUnitConstants = require('../constants/organisation-unit')
const reductionsService = require('../services/reductions-service')
const getSubNav = require('../services/get-sub-nav')
const Reduction = require('../services/domain/reduction')
const reductionStatusType = require('../constants/reduction-status-type')
const ValidationError = require('../services/errors/validation-error')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/reductions', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    var successText = getStatusText(req)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }
    var getReductionsPromise = reductionsService.getReductions(id, organisationLevel)

    return getReductionsPromise.then(function (result) {
      return res.render('reductions', {
        breadcrumbs: result.breadcrumbs,
        linkId: id,
        title: result.title,
        subTitle: result.subTitle,
        subNav: getSubNav(id, organisationLevel, req.path),
        activeReductions: result.activeReductions,
        scheduledReductions: result.scheduledReductions,
        archivedReductions: result.archivedReductions,
        successText: successText
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/:organisationLevel/:id/add-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = parseInt(req.params.id)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var getAddReductionsReferenceDataPromise = reductionsService.getAddReductionsRefData(id, organisationLevel)

    return getAddReductionsReferenceDataPromise
      .then(function (result) {
        var errors = req.session.addReductionErrors
        delete req.session.addReductionErrors
        return res.render('add-reduction', {
          breadcrumbs: result.breadcrumbs,
          linkId: id,
          title: result.title,
          subTitle: result.subTitle,
          subNav: getSubNav(id, organisationLevel, req.path),
          referenceData: result.referenceData,
          errors: errors
        })
      }).catch(function (error) {
        next(error)
      })
  })

  router.get('/:organisationLevel/:id/edit-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = parseInt(req.params.id)
    var reductionId = parseInt(req.query.reductionId)

    reductionsService.getAddReductionsRefData(id, organisationLevel)
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
              subNav: getSubNav(id, organisationLevel, req.path),
              referenceData: result.referenceData,
              reduction: mapReductionToViewModel(reduction)
            })
          }).catch(function (error) {
            next(error)
          })
      })
  })

  router.post('/:organisationLevel/:id/add-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = req.params.id
    var reduction
    try {
      reduction = generateNewReductionFromRequest(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        return reductionsService.getAddReductionsRefData(id, organisationLevel)
          .then(function (result) {
            return res.status(400).render('add-reduction', {
              breadcrumbs: result.breadcrumbs,
              linkId: id,
              title: result.title,
              subTitle: result.subTitle,
              subNav: getSubNav(id, organisationLevel, req.path),
              referenceData: result.referenceData,
              reduction: {
                id: req.body.reductionId,
                reasonId: req.body.reasonForReductionId,
                hours: req.body['reduction-hours'],
                start_day: req.body.red_start_day,
                start_month: req.body.red_start_month,
                start_year: req.body.red_start_year,
                end_day: req.body.red_end_day,
                end_month: req.body.red_end_month,
                end_year: req.body.red_end_year,
                notes: req.body.notes
              },
              errors: error.validationErrors
            })
          }).catch(function (error) {
            next(error)
          })
      } else {
        next(error)
      }
    }

    var addReductionsPromise = reductionsService.addReduction(id, reduction)

    return addReductionsPromise.then(function () {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions?success=true')
    }).catch(function (error) {
      next(error)
    })
  })

  router.post('/:organisationLevel/:id/edit-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = req.params.id
    var reductionId = req.body.reductionId

    var reduction
    try {
      reduction = generateNewReductionFromRequest(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        return reductionsService.getAddReductionsRefData(id, organisationLevel)
        .then(function (result) {
          return res.status(400).render('add-reduction', {
            breadcrumbs: result.breadcrumbs,
            linkId: id,
            title: result.title,
            subTitle: result.subTitle,
            subNav: getSubNav(id, organisationLevel, req.path),
            referenceData: result.referenceData,
            reduction: {
              reasonId: req.body.reasonForReductionId,
              hours: req.body['reduction-hours'],
              start_day: req.body.red_start_day,
              start_month: req.body.red_start_month,
              start_year: req.body.red_start_year,
              end_day: req.body.red_end_day,
              end_month: req.body.red_end_month,
              end_year: req.body.red_end_year,
              notes: req.body.notes
            },
            errors: error.validationErrors
          })
        }).catch(function (error) {
          next(error)
        })
      }
    }

    return reductionsService.updateReduction(id, reductionId, reduction)
      .then(function () {
        return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions?edited=true')
      }).catch(function (error) {
        next(error)
      })
  })

  router.post('/:organisationLevel/:id/update-reduction-status', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel

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

    return reductionsService.updateReductionStatus(id, reductionId, reductionStatus)
      .then(function () {
        return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions' + successType)
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

  var generateNewReductionFromRequest = function (requestBody) {
    var reductionStartDate = [ requestBody.red_start_day, requestBody.red_start_month, requestBody.red_start_year ]
    var reductionEndDate = [ requestBody.red_end_day, requestBody.red_end_month, requestBody.red_end_year ]
    var reasonId = !requestBody.reasonForReductionId ? 'select' : requestBody.reasonForReductionId
    return new Reduction(reasonId, requestBody['reduction-hours'], reductionStartDate, reductionEndDate, requestBody.notes)
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
        notes: reduction.notes
      }
    }
    return viewModel
  }
}
