const getExport = require('../services/get-export')
const getSubNav = require('../services/get-sub-nav')
const organisationUnit = require('../constants/organisation-unit')
const authorisation = require('../authorisation')
const Unauthorized = require('../services/errors/authentication-error').Unauthorized
const workloadTypes = require('../../app/constants/workload-type')
const getLastUpdated = require('../services/data/get-last-updated')
const dateFormatter = require('../services/date-formatter')
const getArmsExport = require('../services/data/get-arms-export') 
const getCaseDetailsExport = require('../services/data/get-case-details-export') 
const getGroupSupervisionExport = require('../services/data/get-group-supervision-export') 
const getExportCsv = require('../services/get-export-csv')
const tabs = require('../constants/wmt-tabs')
const logger = require('../logger')
const moment = require('moment')

var lastUpdated

module.exports = function (router) {
    router.get('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/export', function (req, res, next) {
        try {
            authorisation.assertUserAuthenticated(req)
        } catch (error) {
            if (error instanceof Unauthorized) {
                return res.status(error.statusCode).redirect(error.redirect)
            }
        }
        var organisationLevel = req.params.organisationLevel
        var id

        if (organisationLevel !== organisationUnit.NATIONAL.name) {
            id = req.params.id
        }

        var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

        var exportPromise = getExport(id, organisationLevel)

        return getLastUpdated().then(function (lastUpdatedDate) {
            lastUpdated = dateFormatter.formatDate(lastUpdatedDate.date_processed, 'DD-MM-YYYY HH:mm')
            result = getExport(id, organisationLevel)
            result.date = lastUpdated
            return res.render('export', {
                organisationLevel: organisationLevel,
                linkId: req.params.id,
                title: result.title,
                subTitle: result.subTitle,
                breadcrumbs: result.breadcrumbs,
                subNav: getSubNav(id, organisationLevel, req.path),
                date: result.date,
                userRole: authorisedUserRole.userRole, // used by proposition-link for the admin role
                authorisation: authorisedUserRole.authorisation  // used by proposition-link for the admin role
            })
        }).catch(function (error) {
            next(error)
        })
    })

    router.post('/' + workloadTypes.PROBATION + '/:organisationLevel/:id/export', function (req, res, next) {
        try {
            authorisation.assertUserAuthenticated(req)
        } catch (error) {
            if (error instanceof Unauthorized) {
                return res.status(error.statusCode).redirect(error.redirect)
            }
        }
        var organisationLevel = req.params.organisationLevel
        var id
        var exportPromise

        if (organisationLevel !== organisationUnit.NATIONAL.name) {
            id = req.params.id
        }

        var authorisedUserRole = authorisation.getAuthorisedUserRole(req)

        var radioButton = req.body.radioInlineGroup

        var armsPromise = getArmsExport(id, organisationLevel)
        var caseDetailsPromise = getCaseDetailsExport(id, organisationLevel)
        var groupSupervisionPromise = getGroupSupervisionExport(id, organisationLevel)

        var tabType


        switch (radioButton) {
            case "1":
                exportPromise = armsPromise
                tabType = tabs.EXPORT.ARMS_EXPORT
                break
            case "2":
                exportPromise = caseDetailsPromise
                tabType = tabs.EXPORT.CASE_DETAILS_EXPORT
                break
            //    case 3:
            //        exportPromise = 
            case "4":
                exportPromise = groupSupervisionPromise
                tabType = tabs.EXPORT.GROUP_SUPERVISION_EXPORT
                break
            default:
                exportPromise = Promise.resolve()
        }

        return getLastUpdated().then(function (result) {
            lastUpdated = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY HH:mm')
            return exportPromise.then(function (results) {
                formatResults(results, tabType)
                result.date = lastUpdated
                results.title = dateFormatter.formatDate(result.date_processed, 'DD-MM-YYYY')
                let dateFileName = null
                dateFileName = result.title
                var exportCsv = getExportCsv(dateFileName, results, tabType)
                res.attachment(exportCsv.filename)
                res.send(exportCsv.csv)
            })
        }).catch(function (error) {
            next(error)
        })
    })
}

var formatResults = function (results, tabType) {
    results.forEach(function (result) {
        if (tabType === tabs.EXPORT.ARMS_EXPORT)
        {                
                result.assessmentDate = dateFormatter.formatDate(moment(result.assessmentDate), 'DD-MM-YYYY')
                result.releaseDate = dateFormatter.formatDate(moment(result.releaseDate), 'DD-MM-YYYY')
        }

        if (tabType === tabs.EXPORT.CASE_DETAILS_EXPORT) {
            result.contactDate = moment(result.contactDate, 'DD-MM-YYYY')
        }
    })
    return results
}