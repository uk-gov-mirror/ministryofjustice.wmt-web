const getSubNav = require('../services/get-sub-nav')
const organisationUnitConstants = require('../constants/organisation-unit')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const getCaseload = require('../services/get-caseload')
const exportTableHelper = require('../services/helpers/export-tables-helper.js')
const json2csv = require('json2csv')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/caseload', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.LDU.name &&
        organisationLevel !== organisationUnitConstants.TEAM.name) {
      throw new Error('Only available for LDU or Team')
    }

    return getCaseload(id, organisationLevel)
      .then(function (result) {
        console.log(result)
        if (organisationLevel === organisationUnitConstants.LDU.name) {
          return res.render('caseload', {
            screen: 'caseload',
            linkId: req.params.id,
            title: result.title,
            subTitle: result.subTitle,
            breadcrumbs: result.breadcrumbs,
            subNav: getSubNav(id, organisationLevel, req.path),
            organisationLevel: organisationLevel,
            lduCaseloadDetails: result.lduCaseloadDetails
          })
        } else if (organisationLevel === organisationUnitConstants.TEAM.name) {
          return res.render('caseload', {
            screen: 'caseload',
            linkId: req.params.id,
            title: result.title,
            subTitle: result.subTitle,
            breadcrumbs: result.breadcrumbs,
            subNav: getSubNav(id, organisationLevel, req.path),
            organisationLevel: organisationLevel,
            custodyTotalSummary: result.custodyTotalSummary,
            communityTotalSummary: result.communityTotalSummary,
            licenseTotalSummary: result.licenseTotalSummary,
            caseTypes: [
              {
                displayName: 'overall',
                array: result.overallCaseloadDetails
              },
              {
                displayName: 'custody',
                array: result.custodyCaseloadDetails
              },
              {
                displayName: 'community',
                array: result.communityCaseloadDetails
              },
              {
                displayName: 'license',
                array: result.licenseCaseloadDetails
              }
            ]
          })
        } // else if
      }) // then
  }) // router

  router.get('/:organisationLevel/:id/caseload/csv', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id = req.params.id

    if (organisationLevel !== organisationUnitConstants.LDU.name &&
        organisationLevel !== organisationUnitConstants.TEAM.name) {
      throw new Error('Only available for LDU or Team')
    }

    return getCaseload(id, organisationLevel).then(function (result) {
      var replaceSpaces = / /g
      var orgName = result.breadcrumbs[0].title
      var filename = (orgName + ' Caseload.csv').replace(replaceSpaces, '_')

      var organisationUnit = getOrganisationUnit('name', organisationLevel)
      var childOrgForColumnName = (getOrganisationUnit('name', organisationUnit.childOrganisationLevel).displayText).replace(replaceSpaces, '')
      var fields = ['name', 'gradeCode', 'totalCases', 'untiered', 'd2', 'd1', 'c2', 'c1', 'b2', 'b1', 'a']
      var fieldNames = [childOrgForColumnName + 'Name', 'Grade', 'Overall', 'Untiered', 'D2', 'D1', 'C2', 'C1', 'B2', 'B1', 'A']

      if (organisationLevel === organisationUnitConstants.TEAM.name) {
        overallCsv = json2csv({ data: result.overallCaseloadDetails, fields: fields, fieldNames: fieldNames })
        custodyCsv = json2csv({ data: result.custodyCaseloadDetails, fields: fields, fieldNames: fieldNames })
        communityCsv = json2csv({ data: result.communityCaseloadDetails, fields: fields, fieldNames: fieldNames })
        licenseCsv = json2csv({ data: result.licenseCaseloadDetails, fields: fields, fieldNames: fieldNames })
        res.attachment(filename)
        // TODO: Do they want this in one csv file, or four? Currently one
        res.send('OVERALL \n' + overallCsv + '\n\n\nCUSTODY \n' + custodyCsv + '\n\n\nCOMMUNITY \n' + communityCsv + '\n\n\nLICENSE \n' + licenseCsv)
      } else if (organisationLevel === organisationUnitConstants.LDU.name) {
        var table = exportTableHelper.generateLduCaseloadTable(result.lduCaseloadDetails)
        var csv = json2csv({ data: table, fields: fields, fieldNames: fieldNames })
        res.attachment(filename)
        res.send(csv)
      }
    })
  })
} 
