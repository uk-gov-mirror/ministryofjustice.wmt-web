const locations = require('../../constants/case-type')

class Scenario {
  constructor (results) {
    this.name = results[0].om_name
    this.grade = results[0].grade_code
    this.contractedHours = results[0].contracted_hours
    this.reductionHours = results[0].reduction_hours
    this.nominalTarget =  results[0].nominal_target
    this.licenceCaseNumbers = collateCaseTypes(results.filter(result =>  result.location === locations.LICENSE))
    this.custodyCaseNumbers = collateCaseTypes(results.filter(result =>  result.location === locations.CUSTODY))
    this.communityCaseNumbers = collateCaseTypes(results.filter(result =>  result.location === locations.COMMUNITY))
  }
}

var collateCaseTypes = function (results) {
  var caseNumbers = []
  results.forEach(function (result) {
    caseNumbers.push({
      'tier': result.tier_number,
      'location': result.location,
      'totalCases': result.total_cases,
      't2aTotalCases': result.t2a_total_cases,
      'warrantsTotal': result.warrants_total,
      't2aWarrantsTotal': result.t2a_warrants_total,
      'overdueTerminationsTotal': result.overdue_terminations_total,
      't2aOverdueTerminationsTotal': result.t2a_overdue_terminations_total,
      'UPW': result.unpaid_work_total,
      't2aUPW': result.t2a_unpaid_work_total
    })
  })
  return caseNumbers
}

module.exports = Scenario
