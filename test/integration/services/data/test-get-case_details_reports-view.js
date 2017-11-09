const expect = require('chai').expect
const getCaseDetailsReportsView = require('../../../../app/services/data/get-case-details-reports-view')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

var inserts = []
var CASE_DETAILS_TO_INSERT = [
  {
    workload_id: 0,
    row_type: 'U', // U = Unpaid work
    case_ref_no: 'X555555',
    tier_code: 3,
    team_code: 'WMT',
    grade_code: 'C',
    location: 'COMMUNITY'
  }
]

describe('services/data/get-case-details-reports-view', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        CASE_DETAILS_TO_INSERT[0].workload_id = inserts.filter((item) => item.table === 'workload')[1].id
        return dataHelper.addCaseDetails(CASE_DETAILS_TO_INSERT)
          .then(function (ids) {
            inserts.push({ table: 'case_details', id: ids[0] })
          })
      })
  })

  it('should retrieve all the case details report', function () {
    return getCaseDetailsReportsView(undefined)
      .then(function (results) {
        expect(results.length).to.be.greaterThan(0)
      })
  })

  it('should retrieve a case details report for a given team', function () {
    return getCaseDetailsReportsView(inserts.filter((item) => item.table === 'team')[0].id)
      .then(function (results) {
        expect(results.length).to.equal(1)
        expect(results[0].location).to.equal(CASE_DETAILS_TO_INSERT[0].location)
        expect(results[0].inactiveCaseType).to.equal(CASE_DETAILS_TO_INSERT[0].row_type)
        expect(results[0].tierNumber).to.equal(CASE_DETAILS_TO_INSERT[0].tier_code)
        expect(results[0].caseRefNumber).to.equal(CASE_DETAILS_TO_INSERT[0].case_ref_no)
      })
  })

  it('should return empty object for a given invalid team', function () {
    return getCaseDetailsReportsView(0)
      .then(function (results) {
        expect(results).to.be.empty //eslint-disable-line
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
