const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getCaseload = require('../../../../app/services/data/get-caseload')

var inserts = []

describe('services/data/get-caseload', function () {
  before(function () {
    return dataHelper.addOrgHierarchyWithPoAndPso()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve caseload breakdown for each workload owner on a team', function () {
    return getCaseload(inserts.filter((item) => item.table === 'team')[1].id, 'team')
      .then(function (results) {
        expect(results[0].gradeCode).to.eql('PO')
        expect(results[0].untiered).to.eql(0)
        expect(results[0].d2).to.eql(1)
        expect(results[0].d1).to.eql(2)
        expect(results[0].c2).to.eql(3)
        expect(results[0].c1).to.eql(4)
        expect(results[0].b2).to.eql(5)
        expect(results[0].b1).to.eql(6)
        expect(results[0].a).to.eql(7)
        expect(results[0].totalCases).to.eql(5)
      })
  })

  it('should retrieve caseload breakdown for Community, Custody and License cases for each workload owner on a team', function () {
    return getCaseload(inserts.filter((item) => item.table === 'team')[1].id, 'team')
      .then(function (results) {
        expect(results.length).to.eql(3)
        expect(results[0].caseType).to.eql('COMMUNITY')
        expect(results[1].caseType).to.eql('CUSTODY')
        expect(results[2].caseType).to.eql('LICENSE')
      })
  })

  it('should retrieve two rows per team in an ldu - one each for PO and PSO totals', function () {
    var insertedLdus = inserts.filter((item) => item.table === 'ldu')
    return getCaseload(insertedLdus[insertedLdus.length - 1].id, 'ldu')
      .then(function (results) {
        // Sort by team id
        results.sort(function (a, b) {
          return a.linkId - b.linkId
        })
        expect(results.length).to.eql(4)
        expect(results[0].linkId).to.eql(results[1].linkId)
        expect(results[2].linkId).to.eql(results[3].linkId)
        expect(results[0].gradeCode).to.eql(results[2].gradeCode).to.eql('PO')
        expect(results[1].gradeCode).to.eql(results[3].gradeCode).to.eql('PSO')
      })
  })

  it('should retrieve correct caseload breakdown totals for each team in an ldu', function () {
    var insertedLdus = inserts.filter((item) => item.table === 'ldu')
    return getCaseload(insertedLdus[insertedLdus.length - 1].id, 'ldu')
      .then(function (results) {
        expect(results[0].untiered).to.eql(0)
        expect(results[0].d2).to.eql(6)
        expect(results[0].d1).to.eql(12)
        expect(results[0].c2).to.eql(18)
        expect(results[0].c1).to.eql(24)
        expect(results[0].b2).to.eql(30)
        expect(results[0].b1).to.eql(36)
        expect(results[0].a).to.eql(42)
        expect(results[0].totalCases).to.eql(30)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
