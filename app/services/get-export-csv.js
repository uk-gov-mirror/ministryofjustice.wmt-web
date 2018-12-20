const organisationUnitConstants = require('../constants/organisation-unit')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const json2csv = require('json2csv')
const tabs = require('../constants/wmt-tabs')

const CASELOAD_FIELDS = ['name', 'gradeCode', 'a', 'b1', 'b2', 'c1', 'c2', 'd1', 'd2', 'untiered', 'totalCases']
const OM_OVERVIEW_FIELDS = ['regionName', 'lduCluster', 'teamName', 'grade', 'capacity', 'cases', 'contractedHours', 'reduction']
const OM_OVERVIEW_FIELD_NAMES = ['Region', 'LDU Cluster', 'Team Name', 'Grade Code', 'Capacity Percentage', 'Total Cases', 'Contracted Hours', 'Reduction Hours']
const ORG_OVERVIEW_FIELDS = ['lduCluster', 'teamName', 'offenderManager', 'gradeCode', 'capacityPercentage', 'availablePoints', 'remainingPoints', 'contractedHours', 'reductionHours', 'totalCases']
const REDUCTIONS_FIELD_NAMES = ['Region', 'LDU Cluster', 'Team', 'Offender Manager', 'Contracted Hours', 'Reason', 'Hours', 'Start Date', 'End Date', 'Status', 'Additional Notes']
const REDUCTIONS_FIELDS = ['regionName', 'lduName', 'teamName', 'offenderManager', 'contractedHours', 'reason', 'amount', 'startDate', 'endDate', 'status', 'additionalNotes']
const INACTIVE_CASES_FIELDS = ['lduName', 'teamName', 'name', 'gradeCode', 'inactiveCaseType', 'crn', 'location', 'tier']
const INACTIVE_CASES_FIELD_NAMES = ['LDU Cluster', 'Team Name', 'Name', 'Grade Code', 'Inactive Case Type', 'CRN', 'Location', 'Tier']
// const DAILY_ARCHIVE_FIELD_NAMES = ['LDU Cluster', 'Team Name', 'Offender Manager Name', 'Total Cases', 'Capacity', 'Reductions', 'Comments', 'Reduction Date', 'Reduction Added By']
const DAILY_ARCHIVE_FIELD_NAMES = ['Workload Date', 'Workload ID', 'LDU Cluster', 'Team Name', 'Offender Manager Name', 'Total Cases', 'Capacity', 'Reductions']
const DAILY_ARCHIVE_FIELDS = ['workloadDate', 'workloadID', 'lduName', 'teamName', 'omName', 'totalCases', 'capacity', 'hoursReduction']

const FORTNIGHTLY_ARCHIVE_FIELD_NAMES = ['Start Date', 'End Date', 'LDU Cluster', 'Team Name', 'Offender Manager Name', 'Average Cases', 'Average Capacity', 'Average Reductions']
const FORTNIGHTLY_ARCHIVE_FIELDS = ['startDate', 'endDate', 'lduName', 'teamName', 'omName', 'totalCases', 'capacity', 'hoursReduction']

const REDUCTION_ARCHIVE_FIELD_NAMES = ['Offender Manager Name', 'Reduction Hours', 'Reduction Reason', 'Comments', 'Start Date', 'End Date', 'Date Updated', 'Reduction Updated By']
const REDUCTION_ARCHIVE_FIELDS = ['omName', 'hoursReduced', 'reductionReason', 'comments', 'startDate', 'endDate', 'lastUpdatedDate', 'reductionAddedBy']
// const DAILY_ARCHIVE_FIELDS = ['lduName', 'teamName', 'omName', 'totalCases', 'capacity', 'reduction', 'comments', 'reductionDate', 'reductionAddedBy']

module.exports = function (organisationLevel, result, tab) {
  var filename
  if (tab === tabs.ADMIN.DAILY_ARCHIVE || tab === tabs.ADMIN.FORTNIGHTLY_ARCHIVE || tab === tabs.ADMIN.REDUCTION_ARCHIVE) {
    filename = getFilename(organisationLevel, tab)
  } else {
    filename = getFilename(result.title, tab)
  }
  var fieldsObject = getFields(organisationLevel, tab)
  var fields = fieldsObject.fields
  var fieldNames = fieldsObject.fieldNames

  var csv = getCsv(organisationLevel, result, tab, fields, fieldNames)

  return { filename: filename, csv: csv }
}

var getFilename = function (orgName, screen) {
  var replaceSpaces = / /g
  if (screen === tabs.REDUCTIONS_EXPORT) {
    return (orgName + ' Reductions Notes.csv').replace(replaceSpaces, '_')
  } else if (screen === tabs.ADMIN.DAILY_ARCHIVE) {
    if (orgName === null) {
      return 'Daily_Archive_Data.csv'
    } else {
      return (orgName + ' Daily_Archive_Data.csv').replace(replaceSpaces, '_')
    }
  } else if (screen === tabs.ADMIN.FORTNIGHTLY_ARCHIVE) {
    if (orgName === null) {
      return 'Fortnightly_Archive_Data.csv'
    } else {
      return (orgName + ' Fortnightly_Archive_Data.csv').replace(replaceSpaces, '_')
    }
  } else if (screen === tabs.ADMIN.REDUCTION_ARCHIVE) {
    if (orgName === null) {
      return 'Archived_Reductions.csv'
    } else {
      return (orgName + ' Archived_Reductions.csv').replace(replaceSpaces, '_')
    }
  } else {
    return (orgName + ' ' + screen + '.csv').replace(replaceSpaces, '_')
  }
}

var getFields = function (organisationLevel, tab) {
  var childOrgForFieldName
  var fields
  var fieldNames

  switch (tab) {
    case tabs.CASELOAD:
      childOrgForFieldName = getChildOrgForFieldName(organisationLevel)
      fields = CASELOAD_FIELDS
      fieldNames = [childOrgForFieldName + ' Name', 'Grade', 'A', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'Untiered', 'Overall']
      break
    case tabs.OVERVIEW:
      if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
        fields = OM_OVERVIEW_FIELDS
        fieldNames = OM_OVERVIEW_FIELD_NAMES
      } else {
        childOrgForFieldName = getChildOrgForFieldName(organisationLevel)
        fields = Object.assign([], ORG_OVERVIEW_FIELDS)
        fieldNames = ['LDU Cluster', 'Team Name', 'Offender Manager', 'Grade Code', 'Capacity Percentage', 'Capacity Points', 'Remaining Points', 'Contracted Hours', 'Reduction Hours', 'Total Cases']

        if (organisationLevel === organisationUnitConstants.REGION.name || organisationLevel === organisationUnitConstants.NATIONAL.name) {
          fields.unshift('regionName')
          fieldNames.unshift('Region')
        }
      }
      break
    case tabs.REDUCTIONS_EXPORT:
      fields = REDUCTIONS_FIELDS
      fieldNames = REDUCTIONS_FIELD_NAMES
      break
    case tabs.CAPACITY.INACTIVE:
      fields = INACTIVE_CASES_FIELDS
      fieldNames = INACTIVE_CASES_FIELD_NAMES
      break
    case tabs.ADMIN.DAILY_ARCHIVE:
      fields = DAILY_ARCHIVE_FIELDS
      fieldNames = DAILY_ARCHIVE_FIELD_NAMES
      break
    case tabs.ADMIN.FORTNIGHTLY_ARCHIVE:
      fields = FORTNIGHTLY_ARCHIVE_FIELDS
      fieldNames = FORTNIGHTLY_ARCHIVE_FIELD_NAMES
      break
    case tabs.ADMIN.REDUCTION_ARCHIVE:
      fields = REDUCTION_ARCHIVE_FIELDS
      fieldNames = REDUCTION_ARCHIVE_FIELD_NAMES
      break
  }
  return { fields: fields, fieldNames: fieldNames }
}

var getCsv = function (organisationLevel, result, tab, fields, fieldNames) {
  var csv

  switch (tab) {
    case tabs.CASELOAD:
      var overallCsv, custodyCsv, communityCsv, licenseCsv
      if (organisationLevel === organisationUnitConstants.TEAM.name) {
        overallCsv = generateCsv(result.caseloadDetails.overallCaseloadDetails, fields, fieldNames)
        custodyCsv = generateCsv(result.caseloadDetails.custodyCaseloadDetails, fields, fieldNames)
        communityCsv = generateCsv(result.caseloadDetails.communityCaseloadDetails, fields, fieldNames)
        licenseCsv = generateCsv(result.caseloadDetails.licenseCaseloadDetails, fields, fieldNames)

        csv = ('OVERALL\n' + overallCsv + '\n\n\nCUSTODY\n' + custodyCsv +
        '\n\n\nCOMMUNITY\n' + communityCsv + '\n\n\nLICENSE\n' + licenseCsv)
      } else {
        var overallTable = parseTotalSummaryTable(result.caseloadDetails.overallTotalSummary)
        var custodyTable = parseCaseloadDetailsTable(result.caseloadDetails.custodyCaseloadDetails.details)
        var communityTable = parseCaseloadDetailsTable(result.caseloadDetails.communityCaseloadDetails.details)
        var licenseTable = parseCaseloadDetailsTable(result.caseloadDetails.licenseCaseloadDetails.details)

        overallCsv = generateCsv(overallTable)
        custodyCsv = generateCsv(custodyTable, fields, fieldNames)
        communityCsv = generateCsv(communityTable, fields, fieldNames)
        licenseCsv = generateCsv(licenseTable, fields, fieldNames)

        var overallByGradeTable = parseCaseloadDetailsTable(result.caseloadDetails.overallCaseloadDetails.detailsPercentages)
        overallByGradeTable.forEach(function (row) {
          row.totalCases = row.totalCases.toFixed(2) + '%'
          row.untiered = row.untiered.toFixed(2) + '%'
          row.d2 = row.d2.toFixed(2) + '%'
          row.d1 = row.d1.toFixed(2) + '%'
          row.c2 = row.c2.toFixed(2) + '%'
          row.c1 = row.c1.toFixed(2) + '%'
          row.b2 = row.b2.toFixed(2) + '%'
          row.b1 = row.b1.toFixed(2) + '%'
          row.a = row.a.toFixed(2) + '%'
        })
        var overallByGradeCsv = generateCsv(overallByGradeTable, fields, fieldNames)

        csv = ('OVERALL\n' + overallCsv + '\n\n\nCUSTODY\n' + custodyCsv +
        '\n\n\nCOMMUNITY\n' + communityCsv + '\n\n\nLICENSE\n' + licenseCsv +
        '\n\n\nOVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' + overallByGradeCsv)
      }
      break
    case tabs.OVERVIEW:
      if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
        result.overviewDetails.lduCluster = result.breadcrumbs[2].title
        result.overviewDetails.capacity = formatCapacityValue(result.overviewDetails.capacity)
      } else {
        result.overviewDetails.forEach(function (team) {
          team.capacityPercentage = formatCapacityValue(team.capacityPercentage)
        })
      }

      csv = generateCsv(result.overviewDetails, fields, fieldNames)
      break
    case tabs.REDUCTIONS_EXPORT:
      csv = generateCsv(result.reductionNotes, fields, fieldNames)
      break
    case tabs.CAPACITY.INACTIVE:
      if (organisationLevel === organisationUnitConstants.TEAM.name) {
        csv = generateCsv(result.inactiveCaseDetails, fields, fieldNames)
      }
      break
    case tabs.ADMIN.DAILY_ARCHIVE:
    case tabs.ADMIN.FORTNIGHTLY_ARCHIVE:
    case tabs.ADMIN.REDUCTION_ARCHIVE:
      csv = generateCsv(result, fields, fieldNames)
      break
  }
  return csv
}

var getChildOrgForFieldName = function (organisationLevel) {
  var organisationUnit = getOrganisationUnit('name', organisationLevel)
  return (getOrganisationUnit('name', organisationUnit.childOrganisationLevel).displayText)
}

var generateCsv = function (data, fields, fieldNames) {
  return json2csv({ data: data, fields: fields, fieldNames: fieldNames })
}

var parseCaseloadDetailsTable = function (caseloadDetails) {
  var table = []
  var team
  var teamGrade

  for (var linkId in caseloadDetails) {
    team = caseloadDetails[linkId]
    for (var grade in team.grades) {
      teamGrade = team.grades[grade]
      table.push({
        name: team.name,
        gradeCode: teamGrade.grade,
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
  return table
}

var parseTotalSummaryTable = function (totalSummary) {
  var table = []
  totalSummary.forEach(function (member) {
    table.push({
      name: member.name,
      custodyCases: member.custodyTotalCases,
      communityCases: member.communityTotalCases,
      licenseCases: member.licenseTotalCases,
      totalCases: member.totalCases
    })
  })

  return table
}

var formatCapacityValue = function (capacity) {
  return Math.round(capacity) + '%'
}
