const getOutstandingReports = require('./data/get-outstanding-reports-view')
const getOrganisationUnit = require('./helpers/org-unit-finder')
const organisationConstant = require('../constants/organisation-unit')

module.exports = function (id, organisationLevel) {
  var organisationalUnitType = getOrganisationUnit('name', organisationLevel)
  if (organisationalUnitType === undefined) {
    throw new Error(organisationLevel + ' should be region, team, ldu or hmpps')
  }

  if (organisationalUnitType === organisationConstant.OFFENDER_MANAGER) {
    return Promise.resolve([])
  }

  return getOutstandingReports(id, organisationLevel)
    .then(function (outstandingReports) {
      var result = []
      if (organisationLevel === organisationConstant.TEAM.name) {
        var totals = {name: 'Total', totalOW: 0, totalOT: 0, totalUPW: 0, totalSL: 0, totalSSO: 0}
        outstandingReports.forEach((report) => {
          result.push(addT2aCases(report))
          addTotals(totals, addT2aCases(report))
        })
        result.push(totals)
      } else if (organisationalUnitType !== organisationConstant.OFFENDER_MANAGER) {
        result = groupReportsByOrgName(outstandingReports)
      }
      return result
    })
}

var addT2aCases = function (report) {
  return {
    name: report.name,
    linkId: report.linkId,
    grade: report.grade,
    ow: report.ow + report.t2aOw,
    ot: report.ot + report.t2aOt,
    upw: report.upw + report.t2aUpw,
    sl: report.sl,
    sso: report.sso
  }
}

var groupReportsByOrgName = function (outstandingReports) {
  var result = []
  var totals = {name: 'Total', totalOW: 0, totalOT: 0, totalUPW: 0, totalSL: 0, totalSSO: 0}
  var organisationMap = new Map()
  outstandingReports.forEach(function (outstandingReport) {
    var report = addT2aCases(outstandingReport)
    var valueToAdd
    if (organisationMap.has(report.name)) {
      valueToAdd = organisationMap.get(report.name)
      valueToAdd.push(report)
    } else {
      valueToAdd = [report]
    }
    organisationMap.set(report.name, valueToAdd)
  })
  organisationMap.forEach(function (outstandingReport, orgName) {
    var newEntry = {
      name: orgName,
      linkId: outstandingReport[0].linkId,
      grades: []
    }
    outstandingReport.forEach(function (outstandingReport) {
      addTotals(totals, outstandingReport)
      newEntry.grades.push(outstandingReport)
    })
    result.push(newEntry)
  })
  result.push(totals)
  return result
}

var addTotals = function (totals, outstandingReports) {
  totals.totalOW += outstandingReports.ow
  totals.totalOT += outstandingReports.ot
  totals.totalUPW += outstandingReports.upw
  totals.totalSL += outstandingReports.sl
  totals.totalSSO += outstandingReports.sso
}
