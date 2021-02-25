const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const getCaseload = require('../services/get-caseload')
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const caseloadTotaller = require('../helpers/caseload-totaller')
const renderWMTUpdatingPage = require('../helpers/render-wmt-updating-page')
let lastUpdated

module.exports = function (router) {
  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }

    const organisationLevel = req.params.organisationLevel
    const id = req.params.id

    if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Not available for offender-manager')
    }

    const authorisedUserRole = authorisation.getAuthorisedUserRole(req)

    const orgUnit = getOrganisationUnit('name', organisationLevel)
    const childOrgUnit = getOrganisationUnit('name', orgUnit.childOrganisationLevel)

    return getLastUpdated().then(function (result) {
      lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
      return getCaseload(id, organisationLevel)
        .then(function (result) {
          let caseloadDetailsData
          if (result.caseloadDetails) {
            caseloadDetailsData = caseloadDetails(organisationLevel, result)
          } else {
            if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name && organisationLevel !== organisationUnitConstants.TEAM.name) {
              caseloadDetailsData = defaultCaseload
            } else {
              caseloadDetailsData = defaultTeamCaseload
              caseloadDetailsData[0].array.totals = defaultTotals
              caseloadDetailsData[1].array.totals = defaultTotals
              caseloadDetailsData[2].array.totals = defaultTotals
              caseloadDetailsData[3].array.totals = defaultTotals
            }
          }
          return res.render('caseload', {
            screen: 'caseload',
            linkId: req.params.id,
            title: result.title,
            subTitle: result.subTitle,
            breadcrumbs: result.breadcrumbs,
            subNav: getSubNav(id, organisationLevel, req.path, workloadTypes.PROBATION, authorisedUserRole.authorisation, authorisedUserRole.userRole),
            organisationLevel: organisationLevel,
            childOrganisationLevel: orgUnit.childOrganisationLevel,
            childOrganisationLevelDisplayText: childOrgUnit.displayText,
            caseloadDetails: caseloadDetailsData,
            date: lastUpdated,
            userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
            authorisation: authorisedUserRole.authorisation, // used by proposition-link for the admin role
            workloadType: workloadTypes.PROBATION
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

  router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/caseload/caseload-csv', function (req, res, next) {
    try {
      authorisation.assertUserAuthenticated(req)
    } catch (error) {
      if (error instanceof Unauthorized) {
        return res.status(error.statusCode).redirect(error.redirect)
      }
    }
    const organisationLevel = req.params.organisationLevel
    const id = req.params.id

    if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
      throw new Error('Not available for offender-manager')
    }

    const isCSV = true
    return getCaseload(id, organisationLevel, isCSV).then(function (result) {
      const exportCsv = getExportCsv(organisationLevel, result, tabs.CASELOAD)
      res.attachment(exportCsv.filename)
      return res.send(exportCsv.csv)
    }).catch(function (error) {
      next(error)
    })
  })

  const caseloadDetails = function (organisationLevel, result) {
    let details

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      details = [
        {
          displayName: 'Overall',
          array: result.caseloadDetails.overallCaseloadDetails,
          totalSummary: result.caseloadDetails.overallTotalSummary
        },
        {
          displayName: 'Community',
          array: result.caseloadDetails.communityCaseloadDetails,
          totalSummary: result.caseloadDetails.communityTotalSummary
        },
        {
          displayName: 'License',
          array: result.caseloadDetails.licenseCaseloadDetails,
          totalSummary: result.caseloadDetails.licenseTotalSummary
        },
        {
          displayName: 'Custody',
          array: result.caseloadDetails.custodyCaseloadDetails,
          totalSummary: result.caseloadDetails.custodyTotalSummary
        }
      ]
    } else {
      details = result.caseloadDetails
    }
    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name && organisationLevel !== organisationUnitConstants.TEAM.name) {
      details[0].array.details.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[0].array.detailsPercentages.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[0].totalsRow = details[0].totalSummary[0].totals
      details[0].totalSummary.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[1].array.details.sort(function (a, b) { return a.name.localeCompare(b.name) })
      caseloadTotaller(details[1].array)
      details[1].array.detailsPercentages.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[2].array.details.sort(function (a, b) { return a.name.localeCompare(b.name) })
      caseloadTotaller(details[2].array)
      details[2].array.detailsPercentages.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[3].array.details.sort(function (a, b) { return a.name.localeCompare(b.name) })
      caseloadTotaller(details[3].array)
      details[3].array.detailsPercentages.sort(function (a, b) { return a.name.localeCompare(b.name) })
    } else if (organisationLevel === organisationUnitConstants.TEAM.name) {
      details[0].array.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[0].totalsRow = details[0].totalSummary[0].totals
      details[0].totalSummary.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[1].array.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[2].array.sort(function (a, b) { return a.name.localeCompare(b.name) })
      details[3].array.sort(function (a, b) { return a.name.localeCompare(b.name) })
    }
    return details
  }
}

const defaultTeamCaseload = [
  { displayName: 'Overall', array: [], totalSummary: [], totalsRow: { totalCommunity: 0, totalLicense: 0, totalCustody: 0, totalTotalCases: 0 } },
  { displayName: 'Community', totalSummary: 0, array: [] },
  { displayName: 'License', totalSummary: 0, array: [] },
  { displayName: 'Custody', totalSummary: 0, array: [] }
]

const defaultTotals = { a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, overall: 0 }

const defaultCaseload = [
  {
    displayName: 'Overall',
    array: { details: [], totals: {}, detailsPercentages: [], percentageTotals: { '': { grade: '', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0, numberOfType: 0 } } },
    totalSummary: [],
    totalsRow: { totalCommunity: 0, totalLicense: 0, totalCustody: 0, totalTotalCases: 0 }
  },
  {
    displayName: 'Community',
    totalSummary: 0,
    array: {
      details: [],
      totals: { '': { grade: 'Total', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0, numberOfType: 0 } },
      detailsPercentages: [],
      percentageTotals: { '': { grade: '', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0, numberOfType: 0 } }
    }
  },
  {
    displayName: 'License',
    totalSummary: 0,
    array: {
      details: [],
      totals: { '': { grade: 'Total', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0, numberOfType: 0 } },
      detailsPercentages: [],
      percentageTotals: { '': { grade: '', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0, numberOfType: 0 } }
    }
  },
  {
    displayName: 'Custody',
    totalSummary: 0,
    array: {
      details: [],
      totals: { '': { grade: 'Total', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0, numberOfType: 0 } },
      detailsPercentages: [],
      percentageTotals: { '': { grade: '', a: 0, b1: 0, b2: 0, c1: 0, c2: 0, d1: 0, d2: 0, e: 0, f: 0, g: 0, untiered: 0, totalCases: 0, numberOfType: 0 } }
    }
  }
]
