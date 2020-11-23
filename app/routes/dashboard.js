const getExport = require('../services/get-export')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getDashboardFiles = require('../services/data/get-dashboard-files')
const roles = require('../constants/user-roles')
const Forbidden = require('../services/errors/authentication-error').Forbidden
const messages = require('../constants/messages')

let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/dashboard', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.SYSTEM_ADMIN, roles.MANAGER])
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

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      throw new Error('Only available for National Level')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getLastUpdated().then(function (lastUpdatedDate) {
      lastUpdated = dateFormatter.formatDate(lastUpdatedDate.date_processed, 'DD-MM-YYYY HH:mm')
      const result = getExport(id, organisationLevel)
      result.date = lastUpdated
      return getDashboardFiles().then(function (dashboardFiles) {
        return res.render('dashboard', {
          organisationLevel: organisationLevel,
          dashboardFiles: dashboardFiles,
          linkId: req.params.id,
          title: result.title,
          subTitle: result.subTitle,
          breadcrumbs: result.breadcrumbs,
          subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
          date: result.date,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation // used by proposition-link for the admin role
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/dashboard/download', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
      authorisation.hasRole(req, [roles.DATA_ADMIN, roles.SYSTEM_ADMIN, roles.MANAGER])
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
    const fileId = req.query.id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      throw new Error('Only available for National Level')
    }
    return getDashboardFiles(fileId).then(function (dashboardFile) {
      if (dashboardFile) {
        if (dashboardFile.length > 0) {
          return res.download(dashboardFile[0].filepath)
        } else {
          throw new Error('Unable to find file')
        }
      } else {
        throw new Error('Unable to find file')
      }
    })
      .catch(function (error) {
        next(error)
      })
  })
}
