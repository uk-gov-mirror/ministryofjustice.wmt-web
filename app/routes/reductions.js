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
    var id = req.params.id
    var fail = req.query.fail

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var failureText = fail ? 'Something went wrong. Please try again.' : null
    var getAddReductionsReferenceDataPromise = reductionsService.getAddReductionsRefData(id, organisationLevel)

    return getAddReductionsReferenceDataPromise.then(function (result) {
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

  router.post('/:organisationLevel/:id/add-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }
    if (!requestDataVerified(req.body)) {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/add-reduction?fail=true')
    }

    var reductionStartDate = new Date(req.body.red_start_year, req.body.red_start_month - 1, req.body.red_start_day)
    var reductionEndDate = new Date(req.body.red_end_year, req.body.red_end_month - 1, req.body.red_end_day)

    var newReduction = new Reduction(
      req.body.reasonForReductionId, req.body.hours, reductionStartDate, reductionEndDate, req.body.notes
    )

    var addReductionsPromise = reductionsService.addReduction(id, newReduction)

    return addReductionsPromise.then(function () {
      return res.redirect(302, '/' + organisationLevel + '/' + id + '/reductions?success=true')
    })
  })

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
}
