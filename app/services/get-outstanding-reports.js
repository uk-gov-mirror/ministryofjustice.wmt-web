const getOutstandingReports = require('./data/get-outstanding-reports-view')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationConstant = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  if (organisationalUnitType === undefined) {
    throw new Error(organisationLevel + ' should be offender-manager, region, team, ldu or hmpps')
  }

  return getOutstandingReports(id, organisationLevel)
    .then(function (outstandingReports) {
      var result = []
      if (organisationLevel === organisationConstant.TEAM.name) {
        result = outstandingReports
      } else if (organisationalUnitType !== organisationConstant.OFFENDER_MANAGER) {
        result = groupReportsByOrgName(outstandingReports)
      }
      return result
    })
}

var groupReportsByOrgName = function (outstandingReports) {
  var result = []
  var organisationMap = new Map()
  outstandingReports.forEach(function (outstandingReport) {
    var valueToAdd
    if (organisationMap.has(outstandingReport.name)) {
      valueToAdd = organisationMap.get(outstandingReport.name)
      valueToAdd.push(outstandingReport)
    } else {
      valueToAdd = [outstandingReport]
    }
    organisationMap.set(outstandingReport.name, valueToAdd)
  })
  organisationMap.forEach(function (reports, orgName) {
    var newEntry = {
      name: orgName,
      linkId: reports[0].linkId,
      grades: []
    }
    reports.forEach(function (report) {
      newEntry.grades.push(report)
    })
    result.push(newEntry)
  })

  return result
}
