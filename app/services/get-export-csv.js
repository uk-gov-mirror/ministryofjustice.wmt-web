const organisationUnitConstants = require('../constants/organisation-unit')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const json2csv = require('json2csv')
const tabs = require('../constants/wmt-tabs')

const CASELOAD_FIELDS = ['name', 'gradeCode', 'totalCases', 'untiered', 'd2', 'd1', 'c2', 'c1', 'b2', 'b1', 'a']
const OM_OVERVIEW_FIELDS = ['grade', 'teamName', 'capacity', 'cases', 'contractedHours', 'reduction']
const OM_OVERVIEW_FIELD_NAMES = ['GradeCode', 'TeamName', 'CapacityPercentage', 'TotalCases', 'ContractedHours', 'ReductionHours']
const ORG_OVERVIEW_FEILDS = ['name', 'capacityPercentage', 'availablePoints', 'contractedHours', 'reductionHours', 'totalCases']

module.exports = function (organisationLevel, result, tab) {
  var filename = getFilename(result.title, tab)

  var fieldsObject = getFields(organisationLevel, tab)
  var fields = fieldsObject.fields
  var fieldNames = fieldsObject.fieldNames

  var csv = getCsv(organisationLevel, result, tab, fields, fieldNames)

  return { filename: filename, csv: csv }
}

// TODO: Do we have an agreed naming scheme they would like for these csvs? Org level? Date?
var getFilename = function (orgName, screen) {
  var replaceSpaces = / /g
  return (orgName + ' ' + screen + '.csv').replace(replaceSpaces, '_')
}

var getFields = function (organisationLevel, tab) {
  var childOrgForFieldName
  var fields
  var fieldNames

  switch (tab) {
    case tabs.CASELOAD:
      childOrgForFieldName = getChildOrgForFieldName(organisationLevel)
      fields = CASELOAD_FIELDS
      fieldNames = [childOrgForFieldName + 'Name', 'Grade', 'Overall', 'Untiered', 'D2', 'D1', 'C2', 'C1', 'B2', 'B1', 'A']
      break
    case tabs.OVERVIEW:
      if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
        fields = OM_OVERVIEW_FIELDS
        fieldNames = OM_OVERVIEW_FIELD_NAMES
      } else {
        childOrgForFieldName = getChildOrgForFieldName(organisationLevel)
        fields = Object.assign([], ORG_OVERVIEW_FEILDS)
        fieldNames = [childOrgForFieldName + 'Name', 'CapacityPercentage', 'CapacityPoints', 'ContractedHours', 'ReductionHours', 'TotalCases']

        if (organisationLevel === organisationUnitConstants.TEAM.name) {
          fields.push('gradeCode')
          fieldNames.push('GradeCode')
        }
      }
  }
  return { fields: fields, fieldNames: fieldNames }
}

var getCsv = function (organisationLevel, result, tab, fields, fieldNames) {
  var csv

  switch (tab) {
    case tabs.CASELOAD:
      if (organisationLevel === organisationUnitConstants.TEAM.name) {
        var overallCsv = generateCsv(result.caseloadDetails.overallCaseloadDetails, fields, fieldNames)
        var custodyCsv = generateCsv(result.caseloadDetails.custodyCaseloadDetails, fields, fieldNames)
        var communityCsv = generateCsv(result.caseloadDetails.communityCaseloadDetails, fields, fieldNames)
        var licenseCsv = generateCsv(result.caseloadDetails.licenseCaseloadDetails, fields, fieldNames)
        // TODO: Do they want this in one csv file, or four? Currently one
        csv = ('OVERALL\n' + overallCsv + '\n\n\nCUSTODY\n' + custodyCsv + '\n\n\nCOMMUNITY\n' + communityCsv + '\n\n\nLICENSE\n' + licenseCsv)
      } else {
        var table = generateLduCaseloadTable(result.caseloadDetails)
        csv = generateCsv(table, fields, fieldNames)
      }
      break
    case tabs.OVERVIEW:
      csv = generateCsv(result.overviewDetails, fields, fieldNames)
      break
  }
  return csv
}

var getChildOrgForFieldName = function (organisationLevel) {
  var organisationUnit = getOrganisationUnit('name', organisationLevel)
  return (getOrganisationUnit('name', organisationUnit.childOrganisationLevel).displayText).replace(/ /g, '')
}

var generateCsv = function (data, fields, fieldNames) {
  return json2csv({ data: data, fields: fields, fieldNames: fieldNames })
}

var generateLduCaseloadTable = function (lduResults) {
  var lduTable = []
  var team
  var teamGrade

  for (var linkId in lduResults) {
    team = lduResults[linkId]
    for (var grade in team.grades) {
      teamGrade = team.grades[grade]
      lduTable.push({
        name: team.name,
        gradeCode: teamGrade.gradeCode,
        totalCases: teamGrade.totalCases,
        untiered: teamGrade.untiered,
        d2: teamGrade.d2,
        d1: teamGrade.d1,
        c2: teamGrade.c2,
        c1: teamGrade.c1,
        b2: teamGrade.b2,
        b1: teamGrade.b1,
        a: teamGrade.a
      })
    }
  }
  return lduTable
}
