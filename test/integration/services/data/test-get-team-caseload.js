const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getTeamCaseload = require('../../../../app/services/data/get-team-caseload')

var inserts = []

describe('services/data/get-team-caseload', function () {
  before(function () {
    return dataHelper.addCaseProgressDataForAllOrgUnits()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve current caseload overview for a workload owner on a team', function () {
    return getTeamCaseload(inserts.filter((item) => item.table === 'team')[1].id, 'team')
      .then(function (results) {
        expect(results.length).to.eql(1)
        expect(results[0].gradeCode).to.eql('PO')
        expect(results[0].untiered).to.eql(0)
        expect(results[0].d2).to.eql(3)
        expect(results[0].d1).to.eql(6)
        expect(results[0].c2).to.eql(9)
        expect(results[0].c1).to.eql(12)
        expect(results[0].b2).to.eql(15)
        expect(results[0].b1).to.eql(18)
        expect(results[0].a).to.eql(21)
        expect(results[0].totalCases).to.eql(5)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
