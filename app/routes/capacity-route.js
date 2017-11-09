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

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload-capacity', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    var capacityDateRange
    var errors

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

    var organisationLevel = req.params.organisationLevel
    var id

    if (organisationLevel !== organisationUnit.NATIONAL.name) {
      id = req.params.id
    }

    var orgUnit = getOrganisationUnit('name', organisationLevel)
    var childOrgUnitDisplayText
    if (organisationLevel !== organisationUnit.OFFENDER_MANAGER.name) {
      childOrgUnitDisplayText = getOrganisationUnit('name', orgUnit.childOrganisationLevel).displayText
    }

    var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    return getCapacityView(id, capacityDateRange, organisationLevel).then(function (result) {
      var capacityBreakdown = result
      return getOutstandingReports(id, organisationLevel).then(function (result) {
        var outstandingReports = result
        return res.render('capacity', {
          screen: 'capacity',
          linkId: id,
          title: capacityBreakdown.title,
          subTitle: capacityBreakdown.subTitle,
          subNav: getSubNav(id, organisationLevel, req.path),
          breadcrumbs: capacityBreakdown.breadcrumbs,
          capacity: capacityBreakdown.capacityTable,
          errors: errors,
          query: req.query,
          capacityBreakdown: capacityBreakdown.capacityBreakdown,
          outstandingReports: outstandingReports,
          childOrganisationLevel: orgUnit.childOrganisationLevel,
          childOrganisationLevelDisplayText: childOrgUnitDisplayText,
          organisationLevel: organisationLevel,
          userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
          authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
        })
      })
    }).catch(function (error) {
      next(error)
    })
  })

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/capacity/csv', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.TEAM.name) {
      throw new Error('Only available for a team')
    }

    return getCaseDetailsReports(id, organisationLevel).then(function (caseDetails) {
      var formatedCaseDetails = formatCaseDetailsForExport(caseDetails)
      var result = {
        title: 'Inactive_&_UPW_Cases',
        inactiveCaseDetails: formatedCaseDetails
      }
      var exportCsv = getExportCsv(organisationLevel, result, tabs.CAPACITY.INACTIVE)
      res.attachment(exportCsv.filename)
      return res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })
}

var formatCaseDetailsForExport = function (caseDetails) {
  var result = []
  caseDetails.forEach(function (caseDetail) {
    var caseType = getCaseTypeDescription(caseDetail.inactiveCaseType)
    var tier = getTier(caseDetail.tierNumber)
    var formattedCaseDetails = {
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

var getCaseTypeDescription = function (inactiveCaseType) {
  var description
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
      description = 'Suspended Lifers'
      break
  }
  return description
}

var getTier = function (tierNumber) {
  var tier
  switch (tierNumber) {
    case 1:
      tier = 'D2'
      break
    case 2:
      tier = 'D1'
      break
    case 3:
      tier = 'C2'
      break
    case 4:
      tier = 'C1'
      break
    case 5:
      tier = 'B2'
      break
    case 6:
      tier = 'B1'
      break
    case 7:
      tier = 'A'
      break
  }
  return tier
}
