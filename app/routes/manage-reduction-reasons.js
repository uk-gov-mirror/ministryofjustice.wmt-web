const authorisation = require('../authorisation')
const messages = require('../constants/messages')
const roles = require('../constants/user-roles')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const Forbidden = require('../services/errors/authentication-error').Forbidden
const getReductionReasons = require('../services/data/get-reduction-reasons')
const getReductionReasonById = require('../services/data/get-reduction-reason-by-id')
const getReductionCategories = require('../services/data/get-reduction-categories')
const ReductionReason = require('../services/domain/reduction-reason')
const ValidationError = require('../services/errors/validation-error')
const updateReductionReason = require('../services/data/update-reduction-reason')
const insertReductionReason = require('../services/data/insert-reduction-reason')
const Link = require('../services/domain/link')

module.exports = function (router) {
  router.get('/manage-reduction-reasons', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.SYSTEM_ADMIN, roles.DATA_ADMIN])
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      } else if (error instanceof Forbidden) {
        return res.status(error.statusCode).render(error.redirect, {
          heading: messages.ACCESS_DENIED,
          message: messages.ADMIN_ROLES_REQUIRED
        })
      }
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    var breadcrumbs = getBreadcrumbs('/manage-reduction-reasons')

    var success = req.query.success
    var successText = success ? 'The Reduction Reason was saved successfully!' : null

    return getReductionReasons(false).then(function (reasons) {
      var reductionReasons = formatReductionReasons(reasons)
      var enabledReductionReasons = reductionReasons.filter(enabledReduction => enabledReduction.isEnabled === true)
      var disabledReductionReasons = reductionReasons.filter(disabledReduction => disabledReduction.isEnabled === false)
      return res.render('manage-reduction-reasons', {
        enabledReductionReasons: enabledReductionReasons,
        disabledReductionReasons: disabledReductionReasons,
        breadcrumbs: breadcrumbs,
        title: 'Manage Reduction Reasons',
        successText: successText,
        subTitle: getSubtitle(true),
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
      })
    })
  })

  router.get('/add-reduction-reason', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
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

    var breadcrumbs = getBreadcrumbs('/add-reduction-reason')

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getReductionCategories().then(function (categories) {
      return res.render('add-reduction-reason', {
        categories: categories,
        breadcrumbs: breadcrumbs,
        title: 'Add Reduction Reason',
        subTitle: getSubtitle(false),
        userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
        authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
      })
    })
  })

  router.get('/edit-reduction-reason', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
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

    var breadcrumbs = getBreadcrumbs('/edit-reduction-reason')

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    var id = req.query.id
    if (!id) {
      return res.redirect('/manage-reduction-reasons')
    }

    return getReductionReasonById(id).then(function (reason) {
      return getReductionCategories().then(function (categories) {
        return res.render('edit-reduction-reason', {
          reduction: reason,
          breadcrumbs: breadcrumbs,
          categories: categories,
          title: 'Edit Reduction Reason',
          subTitle: getSubtitle(false),
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
        })
      })
    })
  })

  router.post('/add-reduction-reason', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
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

    var breadcrumbs = getBreadcrumbs('/add-reduction-reason')
    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    var reductionReason

    return getReductionCategories().then(function (categories) {
      try {
        reductionReason = new ReductionReason(
          req.body.reductionName,
          req.body.reductionShortName,
          req.body.category,
          req.body.allowancePercentage,
          req.body.maxAllowancePercentage,
          req.body.monthsToExpiry,
          req.body.isEnabled
        )
      } catch (error) {
        if (error instanceof ValidationError) {
          return res.status(400).render('add-reduction-reason', {
            reduction: {
              reason: req.body.reductionName,
              reasonShortName: req.body.reductionShortName,
              allowancePercentage: req.body.allowancePercentage,
              maxAllowancePercentage: req.body.maxAllowancePercentage,
              monthsToExpiry: req.body.monthsToExpiry,
              isEnabled: getIsEnabled(req.body.isEnabled),
              category: findCategoryById(categories, req.body.category)
            },
            title: 'Add Reduction Reason',
            subTitle: getSubtitle(false),
            breadcrumbs: breadcrumbs,
            errors: error.validationErrors,
            categories: categories,
            userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
            authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
          })
        } else {
          next(error)
        }
      }
      return insertReductionReason(reductionReason)
        .then(function () {
          return res.redirect(302, '/manage-reduction-reasons?success=true')
        })
    })
  })

  router.post('/edit-reduction-reason', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.SYSTEM_ADMIN])
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

    var breadcrumbs = getBreadcrumbs('/edit-reduction-reason')
    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)
    // var id = req.query.id
    var reductionReason

    return getReductionCategories().then(function (categories) {
      try {
        reductionReason = new ReductionReason(
          req.body.reductionName,
          req.body.reductionShortName,
          req.body.category,
          req.body.allowancePercentage,
          req.body.maxAllowancePercentage,
          req.body.monthsToExpiry,
          req.body.isEnabled
        )
      } catch (error) {
        if (error instanceof ValidationError) {
          return res.status(400).render('edit-reduction-reason', {
            reduction: {
              id: req.body.reasonId,
              reason: req.body.reductionName,
              reasonShortName: req.body.reductionShortName,
              allowancePercentage: req.body.allowancePercentage,
              maxAllowancePercentage: req.body.maxAllowancePercentage,
              monthsToExpiry: req.body.monthsToExpiry,
              isEnabled: getIsEnabled(req.body.isEnabled),
              category: findCategoryById(categories, req.body.category)
            },
            breadcrumbs: breadcrumbs,
            subTitle: getSubtitle(false),
            title: 'Edit Reduction Reason',
            errors: error.validationErrors,
            categories: categories,
            userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
            authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
          })
        } else {
          next(error)
        }
      }
      return updateReductionReason(req.body.reasonId, reductionReason)
        .then(function () {
          return res.redirect(302, '/manage-reduction-reasons?success=true')
        })
    })
  })
}

var formatReductionReasons = function (reasons) {
  if (reasons) {
    if (reasons.length > 0) {
      reasons.forEach(function (reason) {
        if (!reason.monthsToExpiry) {
          reason.monthsToExpiry = 'N/A'
        }
      })
    }
  }
  return reasons
}

var findCategoryById = function (categories, id) {
  var categoryName = null
  if (id) {
    categoryName = categories.filter(category => category.id === parseInt(id))[0].category
  }
  return categoryName
}

var getIsEnabled = function (isEnabled) {
  if (isEnabled === null || isEnabled === undefined || isEnabled === '') {
    return isEnabled
  } else {
    return isEnabled === 'true'
  }
}

var getBreadcrumbs = function (currentRoute) {
  var breadcrumbs
  switch (currentRoute) {
    case '/manage-reduction-reasons':
      breadcrumbs = [
        new Link('Manage Reduction Reasons', '/manage-reduction-reasons'),
        new Link('Admin', '/admin')
      ]
      break
    case '/edit-reduction-reason':
      breadcrumbs = [
        new Link('Edit Reduction Reason', '/edit-reduction-reason'),
        new Link('Manage Reduction Reasons', '/manage-reduction-reasons'),
        new Link('Admin', '/admin')
      ]
      break
    case '/add-reduction-reason':
      var breadcrumbs = [
        new Link('Add Reduction Reason', '/add-reduction-reason'),
        new Link('Manage Reduction Reasons', '/manage-reduction-reasons'),
        new Link('Admin', '/admin')
      ]
      break
  }
  return breadcrumbs
}

var getSubtitle = function (isListPage) {
  if (isListPage) {
    return 'Admin'
  } else {
    return 'Manage Reduction Reasons'
  }
}
