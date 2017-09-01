const contractedHoursService = require('../services/contracted-hours-service')
const getSubNav = require('../services/get-sub-nav')
const organisationUnitConstants = require('../constants/organisation-unit')

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
    })
  })

  router.post('/:organisationLevel/:id/contracted-hours', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id
    var updatedHours = req.body.hours

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      return res.sendStatus(404)
    }

    return contractedHoursService.updateContractedHours(id, organisationLevel, updatedHours)
    .then(function () {
      return res.redirect('/offender-manager/' + id + '/contracted-hours?hoursUpdatedSuccess=true')
    })
  })
}
