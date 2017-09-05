const organisationUnitConstants = require('../constants/organisation-unit')
const reductionsService = require('../services/reductions-service')
const getSubNav = require('../services/get-sub-nav')
const Reduction = require('../services/domain/reduction')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/reductions', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id
    var success = req.query.success
    var successText = success ? 'You have successfully added a new reduction!' : null

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
    })
  })

  router.get('/:organisationLevel/:id/add-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = parseInt(req.params.id)
    var fail = req.query.fail
    var reductionId = parseInt(req.query.reductionId)

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var failureText = fail ? 'Something went wrong. Please try again.' : null
    var getAddReductionsReferenceDataPromise = reductionsService.getAddReductionsRefData(id, organisationLevel)

    return getAddReductionsReferenceDataPromise
    .then(function (result) {
      return res.render('add-reduction', {
        breadcrumbs: result.breadcrumbs,
        linkId: id,
        title: result.title,
        subTitle: result.subTitle,
        subNav: getSubNav(id, organisationLevel, req.path),
        referenceData: result.referenceData,
        failureText: failureText
      })
    })
  })

  router.get('/:organisationLevel/:id/edit-reduction', function (req, res, next){
    var organisationLevel = req.params.organisationLevel
    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = parseInt(req.params.id)
    var reductionId = parseInt(req.query.reductionId)
    var fail = req.query.fail
    
    var failureText = fail ? 'Something went wrong. Please try again.' : null

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
          failureText: failureText,
          reduction: mapReductionToViewModel(reduction)
        })
      })
    })
  })

  router.post('/:organisationLevel/:id/add-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = req.params.id

    if (!requestDataVerified(req.body)) {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/add-reduction?fail=true')
    }

    var reduction = generateNewReductionFromRequest(req.body)

    var addReductionsPromise = reductionsService.addReduction(id, reduction)

    return addReductionsPromise.then(function () {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions?success=true')
    })
  })

  router.post('/:organisationLevel/:id/edit-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var id = req.params.id
    var reductionId = req.body.reductionId

    if (!requestDataVerified(req.body)) {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/add-reduction?fail=true')
    }

    var reduction = generateNewReductionFromRequest(req.body)
    console.log(reduction)
    return reductionsService.updateReduction(id, reductionId, reduction)
    .then(function () {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions?success=true')
    })
  })
  
  var generateNewReductionFromRequest = function(requestBody) {
    var reductionStartDate = new Date(requestBody.red_start_year, requestBody.red_start_month - 1, requestBody.red_start_day)
    var reductionEndDate = new Date(requestBody.red_end_year, requestBody.red_end_month - 1, requestBody.red_end_day)

    return new Reduction(
      requestBody.reasonForReductionId, requestBody.hours, reductionStartDate, reductionEndDate, requestBody.notes
    )
  }

  var requestDataVerified = function (requestBody) {
    var result
    if (requestBody.reasonForReductionId === '' || requestBody.reasonForReductionId === undefined ||
      requestBody.red_start_year === '' || requestBody.red_start_year === undefined ||
      requestBody.red_start_month === '' || requestBody.red_start_month === undefined ||
      requestBody.red_start_day === '' || requestBody.red_start_day === undefined ||
      requestBody.red_end_year === '' || requestBody.red_end_year === undefined ||
      requestBody.red_end_month === '' || requestBody.red_end_month === undefined ||
      requestBody.red_end_day === '' || requestBody.red_end_day === undefined ||
      requestBody.hours === '' || requestBody.hours === undefined) {
      result = false
    } else {
      result = true
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
