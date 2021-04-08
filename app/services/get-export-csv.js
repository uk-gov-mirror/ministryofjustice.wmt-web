const organisationUnitConstants = require('../constants/organisation-unit')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const { Parser } = require('json2csv')
const tabs = require('../constants/wmt-tabs')

// WMT0160 - Change next 2 lines
const CASELOAD_FIELDS = ['name', 'gradeCode', 'a3', 'a2', 'a1', 'a0', 'b3', 'b2', 'b1', 'b0', 'c3', 'c2', 'c1', 'c0', 'd3', 'd2', 'd1', 'd0', 'untiered', 'totalCases']
const CASELOAD_TEAM_FIELDS = ['name', 'grade', 'a3', 'a2', 'a1', 'a0', 'b3', 'b2', 'b1', 'b0', 'c3', 'c2', 'c1', 'c0', 'd3', 'd2', 'd1', 'd0', 'untiered', 'totalCases']
const OM_OVERVIEW_FIELDS = ['regionName', 'lduCluster', 'teamName', 'grade', 'capacity', 'cases', 'contractedHours', 'reduction', 'cmsAdjustmentPoints', 'cmsPercentage']
const OM_OVERVIEW_FIELD_NAMES = ['Region', 'Probation Delivery Unit', 'Team Name', 'Grade Code', 'Capacity Percentage', 'Total Cases', 'Contracted Hours', 'Reduction Hours', 'CMS Points', 'CMS Percentage']
const ORG_OVERVIEW_FIELDS = ['lduCluster', 'teamName', 'offenderManager', 'gradeCode', 'capacityPercentage', 'availablePoints', 'totalPoints', 'remainingPoints', 'contractedHours', 'reductionHours', 'totalCases', 'cmsAdjustmentPoints', 'cmsPercentage']
const REDUCTIONS_FIELD_NAMES = ['Region', 'Probation Delivery Unit', 'Team', 'Offender Manager', 'Grade Code', 'Contracted Hours', 'Reason', 'Hours', 'Start Date', 'End Date', 'Status', 'Additional Notes']
const REDUCTIONS_FIELDS = ['regionName', 'lduName', 'teamName', 'offenderManager', 'gradeCode', 'contractedHours', 'reason', 'amount', 'startDate', 'endDate', 'status', 'additionalNotes']
const EXPIRING_REDUCTIONS_FIELD_NAMES = ['Region', 'Probation Delivery Unit', 'Team', 'Offender Manager', 'Grade Code', 'Contracted Hours', 'Reason', 'Hours', 'Start Date', 'End Date', 'Status', 'Additional Notes', 'Manager Responsible']
const EXPIRING_REDUCTIONS_FIELDS = ['regionName', 'lduName', 'teamName', 'offenderManager', 'gradeCode', 'contractedHours', 'reason', 'amount', 'startDate', 'endDate', 'status', 'additionalNotes', 'managerResponsible']
const INACTIVE_CASES_FIELDS = ['lduName', 'teamName', 'name', 'gradeCode', 'inactiveCaseType', 'crn', 'location', 'tier']
const INACTIVE_CASES_FIELD_NAMES = ['Probation Delivery Unit', 'Team Name', 'Name', 'Grade Code', 'Inactive Case Type', 'CRN', 'Location', 'Tier']
// const DAILY_ARCHIVE_FIELD_NAMES = ['Probation Delivery Unit', 'Team Name', 'Offender Manager Name', 'Total Cases', 'Capacity', 'Reductions', 'Comments', 'Reduction Date', 'Reduction Added By']
const DAILY_ARCHIVE_FIELD_NAMES = ['Workload Date', 'Region', 'LDU', 'Team', 'Offender Manager', 'Grade', 'Total Cases', 'Total Points', 'SDR Points', 'SDR Conversion Points', 'PAROMS Points', 'Nominal Target', 'Contracted Hours', 'Reductions', 'Available Points', 'Capacity', 'CMS Points', 'CMS %', 'GS Points', 'GS %', 'ARMS Total Cases']
const DAILY_ARCHIVE_FIELDS = ['workloadDate', 'regionName', 'lduName', 'teamName', 'omName', 'grade', 'totalCases', 'totalPoints', 'sdrPoints', 'sdrConversionPoints', 'paromsPoints', 'nominalTarget', 'contractedHours', 'hoursReduction', 'availablePoints', 'capacity', 'cmsPoints', 'cmsPercentage', 'gsPoints', 'gsPercentage', 'armsTotalCases']

const FORTNIGHTLY_ARCHIVE_FIELD_NAMES = ['Start Date', 'End Date', 'Probation Delivery Unit', 'Team Name', 'Offender Manager Name', 'Average Cases', 'Average Capacity', 'Average Reductions']
const FORTNIGHTLY_ARCHIVE_FIELDS = ['startDate', 'endDate', 'lduName', 'teamName', 'omName', 'totalCases', 'capacity', 'hoursReduction']

const REDUCTION_ARCHIVE_FIELD_NAMES = ['Offender Manager Name', 'Reduction Hours', 'Reduction Reason', 'Comments', 'Start Date', 'End Date', 'Date Updated', 'Reduction Updated By']
const REDUCTION_ARCHIVE_FIELDS = ['omName', 'hoursReduced', 'reductionReason', 'comments', 'startDate', 'endDate', 'lastUpdatedDate', 'reductionAddedBy']
// const DAILY_ARCHIVE_FIELDS = ['lduName', 'teamName', 'omName', 'totalCases', 'capacity', 'reduction', 'comments', 'reductionDate', 'reductionAddedBy']

const ARMS_EXPORT_FIELD_NAMES = ['Region Name', 'Probation Delivery Unit', 'Team Name', 'Assessment Date', 'CRN', 'Offender Manager Name', 'Offender Manager Grade', 'Sentence Type', 'Sentence or Release Date', 'Completion Date']
const ARMS_EXPORT_FIELDS = ['regionName', 'lduName', 'teamName', 'assessmentDate', 'CRN', 'omName', 'omGrade', 'sentencetype', 'releaseDate', 'completedDate']
const CASE_DETAILS_EXPORT_FIELD_NAMES = ['Region Name', 'Probation Delivery Unit', 'Team Name', 'Tier Code', 'Row Type', 'CRN', 'Case Type', 'Offender Manager Name', 'Grade Code']
const CASE_DETAILS_EXPORT_FIELDS = ['regionName', 'lduName', 'teamName', 'tierCode', 'rowType', 'caseReferenceNo', 'caseType', 'offenderManagerName', 'gradeCode']

const GROUP_SUPERVISION_EXPORT_FIELD_NAMES = ['Region Name', 'Probation Delivery Unit', 'Team Name', 'Contact Date', 'CRN', 'Offender Manager Name', 'Offender Manager Grade', 'Contact Type Description', 'Contact Code', 'Points']
const GROUP_SUPERVISION_EXPORT_FIELDS = ['regionName', 'lduName', 'teamName', 'contactDate', 'caseRefNo', 'omName', 'omGradeCode', 'contactDescription', 'contactCode', 'points']
const CMS_EXPORT_FIELD_NAMES = ['Contact Region Name', 'Contact Probation Delivery Unit', 'Contact Team Name', 'Contact Date', 'Contact Name', 'Contact Grade', 'OM Region Name', 'OM Probation Delivery Unit', 'OM Team Name', 'CRN', 'OM Name', 'OM Grade', 'Contact Type Description', 'Contact Code', 'Contact Points', 'OM Points']
const CMS_EXPORT_FIELDS = ['contactRegionName', 'contactLduName', 'contactTeamName', 'contactDate', 'contactName', 'contactGradeCode', 'omRegionName', 'omLduName', 'omTeamName', 'caseRefNo', 'omName', 'omGradeCode', 'contactDescription', 'contactCode', 'contactPoints', 'omPoints']
const WORKLOAD_PERCENTAGE_BREAKDOWN_EXPORT_FIELD_NAMES = ['Region Name', 'Probation Delivery Unit', 'Team Name', 'Offender Manager Name', 'Offender Manager Grade', 'Contracted Hours', 'Reduction Hours', 'Capacity', 'Case Contribution', 'CMS Contribution', 'GS Contribution', 'ARMS Contribution', 'PAROMS Contribution', 'SDR Contribution', 'FDR Contribution']
const WORKLOAD_PERCENTAGE_BREAKDOWN_EXPORT_FIELDS = ['regionName', 'lduName', 'teamName', 'omName', 'omGrade', 'contractedHours', 'reductionHours', 'capacity', 'caseContribution', 'cmsContribution', 'gsContribution', 'armsContribution', 'paromsContribution', 'sdrContribution', 'fdrContribution']
const SUSPENDED_LIFERS_EXPORT_FIELD_NAMES = ['Region Name', 'Probation Delivery Unit', 'Team Name', 'Tier Code', 'Row Type', 'CRN', 'Case Type', 'Offender Manager Name', 'Grade Code', 'In Custody?', 'Register Level', 'Register Category', 'Register Category Description', 'Registration Date']
const SUSPENDED_LIFERS_EXPORT_FIELDS = ['regionName', 'lduName', 'teamName', 'tierCode', 'rowType', 'caseReferenceNo', 'caseType', 'offenderManagerName', 'gradeCode', 'inCustody', 'registerLevel', 'registerCategory', 'registerCategoryDescription', 'registrationDate']

module.exports = function (organisationLevel, result, tab) {
  let filename
  if (tab === tabs.ADMIN.DAILY_ARCHIVE || tab === tabs.ADMIN.FORTNIGHTLY_ARCHIVE || tab === tabs.ADMIN.REDUCTION_ARCHIVE) {
    filename = getFilename(organisationLevel, tab)
  } else {
    filename = getFilename(result.title, tab)
  }
  const fieldsObject = getFields(organisationLevel, tab)
  const fields = fieldsObject.fields
  const fieldNames = fieldsObject.fieldNames

  const csv = getCsv(organisationLevel, result, tab, fields, fieldNames)

  return { filename: filename, csv: csv }
}

const getFilename = function (orgName, screen) {
  const replaceSpaces = / /g
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
  } else if (screen === tabs.EXPORT.ARMS_EXPORT) {
    if (orgName === null) {
      return 'ARMS_Export.csv'
    } else {
      return (orgName + ' ARMS_Export.csv').replace(replaceSpaces, '_')
    }
  } else if (screen === tabs.EXPORT.CASE_DETAILS_EXPORT) {
    if (orgName === null) {
      return 'Case_Details_Export.csv'
    } else {
      return (orgName + ' Case_Details_Export.csv').replace(replaceSpaces, '_')
    }
  } else if (screen === tabs.EXPORT.GROUP_SUPERVISION_EXPORT) {
    if (orgName === null) {
      return 'Group_Supervision_Export.csv'
    } else {
      return (orgName + ' Group_Supervision_Export.csv').replace(replaceSpaces, '_')
    }
  } else if (screen === tabs.EXPORT.CMS_EXPORT) {
    if (orgName === null) {
      return 'CMS_Export.csv'
    } else {
      return (orgName + ' CMS_Export.csv').replace(replaceSpaces, '_')
    }
  } else if (screen === tabs.EXPORT.WORKLOAD_PERCENTAGE_EXPORT) {
    if (orgName === null) {
      return 'Percentage_Workload_Breakdown_Export.csv'
    } else {
      return (orgName + ' Percentage_Workload_Breakdown_Export.csv').replace(replaceSpaces, '_')
    }
  } else if (screen === tabs.EXPORT.EXPIRING_REDUCTIONS) {
    if (orgName === null) {
      return 'Expiring_Reductions.csv'
    } else {
      return (orgName + ' Expiring_Reductions.csv').replace(replaceSpaces, '_')
    }
  } else {
    return (orgName + ' ' + screen + '.csv').replace(replaceSpaces, '_')
  }
}

const getFields = function (organisationLevel, tab) {
  let childOrgForFieldName
  let fields
  let fieldNames

  switch (tab) {
    case tabs.CASELOAD:
      childOrgForFieldName = getChildOrgForFieldName(organisationLevel)
      if (organisationLevel === organisationUnitConstants.TEAM.name) {
        fields = CASELOAD_TEAM_FIELDS
      } else {
        fields = CASELOAD_FIELDS
      }
      // WMT0160 - Change this
      fieldNames = [childOrgForFieldName + ' Name', 'Grade', 'A3', 'A2', 'A1', 'A0', 'B3', 'B2', 'B1', 'B0', 'C3', 'C2', 'C1', 'C0', 'D3', 'D2', 'D1', 'D0', 'Untiered', 'Overall']
      break
    case tabs.OVERVIEW:
      if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
        fields = OM_OVERVIEW_FIELDS
        fieldNames = OM_OVERVIEW_FIELD_NAMES
      } else {
        childOrgForFieldName = getChildOrgForFieldName(organisationLevel)
        fields = Object.assign([], ORG_OVERVIEW_FIELDS)
        fieldNames = ['Probation Delivery Unit', 'Team Name', 'Offender Manager', 'Grade Code', 'Capacity Percentage', 'Capacity Points', 'Total Points Used', 'Remaining Points', 'Contracted Hours', 'Reduction Hours', 'Total Cases', 'CMS Points', 'CMS Percentage']

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
    case tabs.EXPORT.ARMS_EXPORT:
      fields = ARMS_EXPORT_FIELDS
      fieldNames = ARMS_EXPORT_FIELD_NAMES
      break
    case tabs.EXPORT.CASE_DETAILS_EXPORT:
      fields = CASE_DETAILS_EXPORT_FIELDS
      fieldNames = CASE_DETAILS_EXPORT_FIELD_NAMES
      break
    case tabs.EXPORT.GROUP_SUPERVISION_EXPORT:
      fields = GROUP_SUPERVISION_EXPORT_FIELDS
      fieldNames = GROUP_SUPERVISION_EXPORT_FIELD_NAMES
      break
    case tabs.EXPORT.CMS_EXPORT:
      fields = CMS_EXPORT_FIELDS
      fieldNames = CMS_EXPORT_FIELD_NAMES
      break
    case tabs.EXPORT.WORKLOAD_PERCENTAGE_EXPORT:
      fields = WORKLOAD_PERCENTAGE_BREAKDOWN_EXPORT_FIELDS
      fieldNames = WORKLOAD_PERCENTAGE_BREAKDOWN_EXPORT_FIELD_NAMES
      break
    case tabs.EXPORT.SUSPENDED_LIFERS_EXPORT:
      fields = SUSPENDED_LIFERS_EXPORT_FIELDS
      fieldNames = SUSPENDED_LIFERS_EXPORT_FIELD_NAMES
      break
    case tabs.EXPORT.EXPIRING_REDUCTIONS:
      fields = EXPIRING_REDUCTIONS_FIELDS
      fieldNames = EXPIRING_REDUCTIONS_FIELD_NAMES
      break
  }
  return { fields: fields, fieldNames: fieldNames }
}

const getCsv = function (organisationLevel, result, tab, fields, fieldNames) {
  let csv
  let overallCsv, custodyCsv, communityCsv, licenseCsv
  switch (tab) {
    case tabs.CASELOAD:
      if (organisationLevel === organisationUnitConstants.TEAM.name) {
        overallCsv = generateCsv(result.caseloadDetails.overallCaseloadDetails, fields, fieldNames)
        custodyCsv = generateCsv(result.caseloadDetails.custodyCaseloadDetails, fields, fieldNames)
        communityCsv = generateCsv(result.caseloadDetails.communityCaseloadDetails, fields, fieldNames)
        licenseCsv = generateCsv(result.caseloadDetails.licenseCaseloadDetails, fields, fieldNames)

        csv = ('OVERALL\n' + overallCsv + '\n\n\nCUSTODY\n' + custodyCsv +
        '\n\n\nCOMMUNITY\n' + communityCsv + '\n\n\nLICENSE\n' + licenseCsv)
      } else {
        const overallTable = parseTotalSummaryTable(result.caseloadDetails.overallTotalSummary)
        const custodyTable = parseCaseloadDetailsTable(result.caseloadDetails.custodyCaseloadDetails.details)
        const communityTable = parseCaseloadDetailsTable(result.caseloadDetails.communityCaseloadDetails.details)
        const licenseTable = parseCaseloadDetailsTable(result.caseloadDetails.licenseCaseloadDetails.details)

        overallCsv = generateCsv(overallTable)
        custodyCsv = generateCsv(custodyTable, fields, fieldNames)
        communityCsv = generateCsv(communityTable, fields, fieldNames)
        licenseCsv = generateCsv(licenseTable, fields, fieldNames)

        const overallByGradeTable = parseCaseloadDetailsTable(result.caseloadDetails.overallCaseloadDetails.detailsPercentages)

        overallByGradeTable.forEach(function (row) {
          row.totalCases = row.totalCases.toFixed(2) + '%'
          row.untiered = row.untiered.toFixed(2) + '%'
          row.d0 = row.d0.toFixed(2) + '%'
          row.d1 = row.d1.toFixed(2) + '%'
          row.d2 = row.d2.toFixed(2) + '%'
          row.d3 = row.d3.toFixed(2) + '%'

          row.c0 = row.c0.toFixed(2) + '%'
          row.c1 = row.c1.toFixed(2) + '%'
          row.c2 = row.c2.toFixed(2) + '%'
          row.c3 = row.c3.toFixed(2) + '%'

          row.b0 = row.b0.toFixed(2) + '%'
          row.b1 = row.b1.toFixed(2) + '%'
          row.b2 = row.b2.toFixed(2) + '%'
          row.b3 = row.b3.toFixed(2) + '%'

          row.a0 = row.a0.toFixed(2) + '%'
          row.a1 = row.a1.toFixed(2) + '%'
          row.a2 = row.a2.toFixed(2) + '%'
          row.a3 = row.a3.toFixed(2) + '%'
        })
        const overallByGradeCsv = generateCsv(overallByGradeTable, fields, fieldNames)

        csv = ('OVERALL\n' + overallCsv + '\n\n\nCUSTODY\n' + custodyCsv +
        '\n\n\nCOMMUNITY\n' + communityCsv + '\n\n\nLICENSE\n' + licenseCsv +
        '\n\n\nOVERALL: PERCENTAGE SPLIT OF CASES BY GRADE\n' + overallByGradeCsv)
      }
      break
    case tabs.OVERVIEW:
      if (organisationLevel === organisationUnitConstants.OFFENDER_MANAGER.name) {
        result.overviewDetails.lduCluster = result.breadcrumbs[2].title
        result.overviewDetails.capacity = formatCapacityValue(result.overviewDetails.capacity)
        result.overviewDetails.cmsPercentage = formatCMSPercentage(result.overviewDetails.cmsPercentage)
      } else {
        result.overviewDetails.forEach(function (team) {
          team.capacityPercentage = formatCapacityValue(team.capacityPercentage)
          team.cmsPercentage = formatCMSPercentage(team.cmsPercentage)
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
    case tabs.EXPORT.ARMS_EXPORT:
    case tabs.EXPORT.CASE_DETAILS_EXPORT:
    case tabs.EXPORT.GROUP_SUPERVISION_EXPORT:
    case tabs.EXPORT.CMS_EXPORT:
    case tabs.EXPORT.WORKLOAD_PERCENTAGE_EXPORT:
    case tabs.EXPORT.SUSPENDED_LIFERS_EXPORT:
    case tabs.EXPORT.EXPIRING_REDUCTIONS:
      csv = generateCsv(result, fields, fieldNames)
      break
  }
  return csv
}

const getChildOrgForFieldName = function (organisationLevel) {
  const organisationUnit = getOrganisationUnit('name', organisationLevel)
  return (getOrganisationUnit('name', organisationUnit.childOrganisationLevel).displayText)
}

const generateCsv = function (data, fields, fieldNames) {
  const fieldObjects = combineFieldAndFieldName(fields, fieldNames)
  let json2csvParser
  if (fieldObjects) {
    json2csvParser = new Parser({ fields: fieldObjects })
  } else {
    json2csvParser = new Parser()
  }
  return json2csvParser.parse(data)
}

const parseCaseloadDetailsTable = function (caseloadDetails) {
  const table = []
  let team
  let teamGrade

  for (const linkId in caseloadDetails) {
    team = caseloadDetails[linkId]
    for (const grade in team.grades) {
      teamGrade = team.grades[grade]
      table.push({
        name: team.name,
        gradeCode: teamGrade.grade,
        totalCases: teamGrade.totalCases,
        untiered: teamGrade.untiered,
        d0: teamGrade.d0,
        d1: teamGrade.d1,
        d2: teamGrade.d2,
        d3: teamGrade.d3,
        c0: teamGrade.c0,
        c1: teamGrade.c1,
        c2: teamGrade.c2,
        c3: teamGrade.c3,
        b0: teamGrade.b0,
        b1: teamGrade.b1,
        b2: teamGrade.b2,
        b3: teamGrade.b3,
        a0: teamGrade.a0,
        a1: teamGrade.a1,
        a2: teamGrade.a2,
        a3: teamGrade.a3
      })
    }
  }
  return table
}

const parseTotalSummaryTable = function (totalSummary) {
  const table = []
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

const formatCapacityValue = function (capacity) {
  return capacity.toFixed(1) + '%'
}

const formatCMSPercentage = function (cms) {
  return cms.toFixed(1) + '%'
}

const combineFieldAndFieldName = function (fields, fieldNames) {
  const fieldObjects = []
  if (fields && fieldNames) {
    for (let i = 0; i < fields.length; i++) {
      fieldObjects.push({ label: fieldNames[i], value: fields[i] })
    }
    return fieldObjects
  } else {
    return null
  }
}
