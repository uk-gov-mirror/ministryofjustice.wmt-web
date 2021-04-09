const getCapacityView = require('../services/get-capacity-view')
const getOutstandingReports = require('../services/get-outstanding-reports')
const getCaseDetailsReports = require('../services/data/get-case-details-reports-view')
const dateRangeHelper = require('../services/helpers/date-range-helper')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const ValidationError = require('../services/errors/validation-error')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../../app/constants/workload-type')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const tierHelper = require('../services/helpers/tier-helper')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getCaseDetailsView = require('../services/get-case-details-view')
const getBreadcrumbs = require('../services/get-breadcrumbs')
const renderWMTUpdatingPage = require('../helpers/render-wmt-updating-page')
let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload-capacity', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    let capacityDateRange
    let errors

    try {
      capacityDateRange = dateRangeHelper.createCapacityDateRange(req.query)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        capacityDateRange = dateRangeHelper.createCapacityDateRange({})
      } else {
        throw error
      }
    }

    const organisationLevel = req.params.organisationLevel
    let id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const orgUnit = getOrganisationUnit('name', organisationLevel)
    let childOrgUnitDisplayText
    if (organisationLevel !== organisationUnit.OFFENDER_MANAGER.name) {
      childOrgUnitDisplayText = getOrganisationUnit('name', orgUnit.childOrganisationLevel).displayText
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getCapacityView(id, capacityDateRange, organisationLevel).then(function (result) {
      const capacityBreakdown = result
      return getOutstandingReports(id, organisationLevel).then(function (result) {
        const outstandingReports = result
        return getCaseDetailsView(id, organisationLevel).then(function (result) {
          const caseDetails = result
          return getLastUpdated().then(function (result) {
            lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
            result.date = lastUpdated
            return res.render('capacity', {
              screen: 'capacity',
              linkId: id,
              title: capacityBreakdown.title,
              subTitle: capacityBreakdown.subTitle,
              subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
              breadcrumbs: capacityBreakdown.breadcrumbs,
              capacity: capacityBreakdown.capacityTable,
              stringifiedCapacity: stringifyCapacityData(capacityBreakdown.capacityTable),
              errors: errors,
              capacityBreakdown: capacityBreakdown.capacityBreakdown,
              outstandingReports: outstandingReports,
              caseDetails: caseDetails,
              childOrganisationLevel: orgUnit.childOrganisationLevel,
              childOrganisationLevelDisplayText: childOrgUnitDisplayText,
              organisationLevel: organisationLevel,
              date: result.date,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
              workloadType: workloadTypes.PROBATION
            })
          })
        })
      })
    }).catch(function (error) {
      if (error.message.includes("Hint 'noexpand'") && error.message.includes('is invalid')) {
        const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        renderWMTUpdatingPage(res, authorisedUserRole.userRole, authorisedUserRole.authorisation, subNav)
      } else {
        next(error)
      }
    })
  })

  router.post('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload-capacity', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    let capacityDateRange
    let errors

    try {
      capacityDateRange = dateRangeHelper.createCapacityDateRange(req.body)
    } catch (error) {
      if (error instanceof ValidationError) {
        errors = error.validationErrors
        capacityDateRange = dateRangeHelper.createCapacityDateRange({})
      } else {
        throw error
      }
    }

    const organisationLevel = req.params.organisationLevel
    let id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    const orgUnit = getOrganisationUnit('name', organisationLevel)
    let childOrgUnitDisplayText
    if (organisationLevel !== organisationUnit.OFFENDER_MANAGER.name) {
      childOrgUnitDisplayText = getOrganisationUnit('name', orgUnit.childOrganisationLevel).displayText
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getCapacityView(id, capacityDateRange, organisationLevel).then(function (result) {
      const capacityBreakdown = result
      return getOutstandingReports(id, organisationLevel).then(function (result) {
        const outstandingReports = result
        return getCaseDetailsView(id, organisationLevel).then(function (result) {
          const caseDetails = result
          return getLastUpdated().then(function (result) {
            lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
            result.date = lastUpdated
            return res.render('capacity', {
              screen: 'capacity',
              linkId: id,
              title: capacityBreakdown.title,
              subTitle: capacityBreakdown.subTitle,
              subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
              breadcrumbs: capacityBreakdown.breadcrumbs,
              capacity: capacityBreakdown.capacityTable,
              stringifiedCapacity: stringifyCapacityData(capacityBreakdown.capacityTable),
              errors: errors,
              capacityBreakdown: capacityBreakdown.capacityBreakdown,
              outstandingReports: outstandingReports,
              caseDetails: caseDetails,
              childOrganisationLevel: orgUnit.childOrganisationLevel,
              childOrganisationLevelDisplayText: childOrgUnitDisplayText,
              organisationLevel: organisationLevel,
              date: result.date,
              userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
              authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
              workloadType: workloadTypes.PROBATION
            })
          })
        })
      })
    }).catch(function (error) {
      if (error.message.includes("Hint 'noexpand'") && error.message.includes('is invalid')) {
        const subNav = getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole)
        renderWMTUpdatingPage(res, authorisedUserRole.userRole, authorisedUserRole.authorisation, subNav)
      } else {
        next(error)
      }
    })
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/capacity/outstanding-csv', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    const organisationLevel = req.params.organisationLevel
    const id = req.params.id

    if (organisationLevel !== organisationUnitConstants.TEAM.name) {
      throw new Error('Only available for a team')
    }

    const breadcrumbs = getBreadcrumbs(id, organisationLevel)

    return getCaseDetailsReports(id, organisationLevel).then(function (caseDetails) {
      const formatedCaseDetails = formatCaseDetailsForExport(caseDetails)
      const result = {
        title: breadcrumbs[0].title,
        inactiveCaseDetails: formatedCaseDetails
      }
      const exportCsv = getExportCsv(organisationLevel, result, tabs.CAPACITY.INACTIVE)
      res.attachment(exportCsv.filename)
      return res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

const formatCaseDetailsForExport = function (caseDetails) {
  const result = []
  caseDetails.forEach(function (caseDetail) {
    const caseType = getCaseTypeDescription(caseDetail.inactiveCaseType)
    const tier = tierHelper.getTierType(caseDetail.tierNumber)
    const formattedCaseDetails = {
      lduName: caseDetail.lduDescription,
      teamName: caseDetail.teamDescription,
      name: caseDetail.name,
      gradeCode: caseDetail.grade,
      inactiveCaseType: caseType,
      crn: caseDetail.caseRefNumber,
      location: caseDetail.location,
      tier: tier
    }
    result.push(formattedCaseDetails)
  })
  return result
}

const getCaseTypeDescription = function (inactiveCaseType) {
  let description
  switch (inactiveCaseType) {
    case 'U':
      description = 'Unpaid Work'
      break
    case 'O':
      description = 'Overdue Terminations'
      break
    case 'W':
      description = 'Active Warrants'
      break
    case 'S':
      description = 'Suspended Sentence Orders'
      break
    case 'L':
      description = 'Suspended Lifers'
      break
  }
  return description
}

const stringifyCapacityData = function (capacity) {
  const capacityData = Object.assign({}, capacity)
  return JSON.stringify(capacityData)
}
