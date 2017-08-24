const organisationUnitConstants = require('../constants/organisation-unit')
const reductionsService = require('../services/reductions-service')
const getSubNav = require('../services/get-sub-nav')
const Reduction = require('../services/domain/reduction')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/reductions', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id
    var successText = req.body.successText ? req.params.successText : null

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }

    var reductionsPromise = reductionsService.getReductions(id)

    return reductionsPromise.then(function (result) {
      return res.render('reductions', {
        breadcrumbs: result.breadcrumbs,
        linkId: id,
        title: result.title,
        subTitle: result.subTitle,
        subNav: getSubNav(id, organisationLevel, req.path),
        active: [],
        scheduled: [],
        archived: [],
        successText: successText
      })
    })
  })

  router.get('/:organisationLevel/:id/add-reduction', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Only available for offender manager')
    }
    var failureText = req.body.failureText ? req.params.failureText : null
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
    var newReduction = new Reduction(
      req.body.reasonForReduction, req.body.hours, req.body.reductionStartDate, req.body.reductionEndDate, req.body.notes
    )
    var addReductionsPromise = reductionsService.addReduction(id, newReduction)

    return addReductionsPromise.then(function () {
      return res.redirect('/' + organisationLevel + '/' + id + '/reductions', {
        successText: 'You have successfully added a new reduction'
      })
    })
    .catch(function (err) {
      console.log(err)
      return res.redirect('/' + organisationLevel + '/' + id + '/reductions', {
        failureText: 'Something went wrong when adding the reduction. Please try again later.'
      })
    })
  })
}
