const locations = require('../../constants/case-type')
const grades = require('../../constants/grade')

class Scenario {
  constructor (results) {
    this.name = results[0].om_name
    this.division = results[0].region_name
    this.ldu = results[0].ldu_name
    this.team = results[0].team_name
    this.grade = results[0].grade_code
    this.contractedHours = results[0].contracted_hours
    this.reductionHours = results[0].reduction_hours
    this.nominalTarget = results[0].nominal_target
    this.cms = results[0].cms_points
    this.gs = results[0].gs_points
    this.sdrTotal = results[0].sdr_total
    this.sdrConversionsTotal = results[0].sdr_conversions_total
    this.paromsTotal = results[0].paroms_total
    this.armsCommunity = results[0].arms_community_cases
    this.armsLicense = results[0].arms_license_cases
    this.defaultContractedHours = determineDefaultContractedHours(results[0])
    this.licenceCaseNumbers = collateCaseTypes(results.filter(result => result.location === locations.LICENSE))
    this.custodyCaseNumbers = collateCaseTypes(results.filter(result => result.location === locations.CUSTODY))
    this.communityCaseNumbers = collateCaseTypes(results.filter(result => result.location === locations.COMMUNITY))
  }
}

var collateCaseTypes = function (results) {
  var caseNumbers = []
  results.forEach(function (result) {
    caseNumbers.push({
      tier: result.tier_number,
      location: result.location,
      totalCases: result.total_cases,
      t2aTotalCases: result.t2a_total_cases,
      warrantsTotal: result.warrants_total,
      t2aWarrantsTotal: result.t2a_warrants_total,
      overdueTerminationsTotal: result.overdue_terminations_total,
      t2aOverdueTerminationsTotal: result.t2a_overdue_terminations_total,
      UPW: result.unpaid_work_total,
      t2aUPW: result.t2a_unpaid_work_total
    })
  })
  return caseNumbers
}

var determineDefaultContractedHours = function (result) {
  var defaultContractedHours = 37
  switch (result.grade_code) {
    case grades.DMY:
      defaultContractedHours = 0
      break
    case grades.SPO:
      defaultContractedHours = result.default_contracted_hours_spo
      break
    case grades.PSO:
      defaultContractedHours = result.default_contracted_hours_pso
      break
    case grades.PO:
    case grades.TPO:
      defaultContractedHours = result.default_contracted_hours_po
      break
  }
  return defaultContractedHours
}

module.exports = Scenario
