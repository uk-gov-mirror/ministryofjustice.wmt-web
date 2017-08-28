const getOverview = require('../services/get-overview')
const getSubNav = require('../services/get-sub-nav')
const getOrganisationUnit = require('../services/helpers/org-unit-finder')
const organisationUnitConstants = require('../constants/organisation-unit')
const json2csv = require('json2csv')

module.exports = function (router) {
  router.get('/:organisationLevel/:id/overview', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var organisationUnit = getOrganisationUnit('name', organisationLevel)
    var id
    var childOrganisationLevel
    var childOrganisationLevelDisplayText

    if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    if (organisationLevel !== organisationUnitConstants.OFFENDER_MANAGER.name) {
      childOrganisationLevel = organisationUnit.childOrganisationLevel
      childOrganisationLevelDisplayText = getOrganisationUnit('name', childOrganisationLevel).displayText
    }

    var overviewPromise = getOverview(id, organisationLevel)

    return overviewPromise.then(function (result) {
      return res.render('overview', {
        title: result.title,
        subTitle: result.subTitle,
        breadcrumbs: result.breadcrumbs,
        organisationLevel: organisationLevel,
        linkId: req.params.id,
        screen: 'overview',
        childOrganisationLevel: childOrganisationLevel,
        childOrganisationLevelDisplayText: childOrganisationLevelDisplayText,
        subNav: getSubNav(id, organisationLevel, req.path),
        overviewDetails: result.overviewDetails
      })
    })
  })
  
  // TODO: Do we need to do this for the underlying tables behind the capacity and case progress graphs?
  router.get('/:organisationLevel/:id/overview/csv', function (req, res, next) {
    var organisationLevel = req.params.organisationLevel
    var id
    if (organisationLevel !== organisationUnitConstants.NATIONAL.name) {
      id = req.params.id
    }

    return getOverview(id, organisationLevel).then(function (result) {
      // TODO: Do we have an agreed naming scheme they would like for these csvs? Org level? Date?
      var replaceSpaces = / /g
      var orgName = result.breadcrumbs[0].title
      var filename = (orgName + ' Overview.csv').replace(replaceSpaces, '_')
      var fields
      var fieldNames

      if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
        fields = ['grade', 'teamName', 'capacity', 'cases', 'contractedHours', 'reduction']
        fieldNames = ['GradeCode', 'TeamName', 'CapacityPercentage', 'TotalCases', 'ContractedHours', 'ReductionHours']
      } else {
        var organisationUnit = getOrganisationUnit('name', organisationLevel)
        var childOrgForColumnName = (getOrganisationUnit('name', organisationUnit.childOrganisationLevel).displayText).replace(replaceSpaces, '')
        
        fields = ['name', 'capacityPercentage', 'availablePoints', 'contractedHours', 'reductionHours', 'totalCases']
        fieldNames = [childOrgForColumnName + 'Name', 'CapacityPercentage', 'CapacityPoints', 'ContractedHours', 'ReductionHours', 'TotalCases']

        if (organisationLevel === organisationUnitConstants.TEAM.name) {
          fields.push('gradeCode')
          fieldNames.push('GradeCode')
        }
      }

      var csv = json2csv({ data: result.overviewDetails, fields: fields, fieldNames: fieldNames })
      res.attachment(filename)
      res.send(csv)
    })
  })
}
