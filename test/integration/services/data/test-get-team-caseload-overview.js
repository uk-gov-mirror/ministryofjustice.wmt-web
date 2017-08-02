const expect = require('chai').expect

const workloadCapacityHelper = require('../../../helpers/data/aggregated-data-helper')
const getTeamCaseloadOverview = require('../../../../app/services/data/get-team-caseload-overview')

var inserts = []

describe('services/data/get-team-caseload-overview', function () {
  before(function (done) {
    workloadCapacityHelper.addCaseProgressDataForAllOrgUnits()
    .then(function (builtInserts) {
      inserts = builtInserts
      done()
    })
  })

  it('should retrieve all members for a given team', function (done) {
    getTeamCaseloadOverview(inserts.filter((item) => item.table === 'team')[0].id)
    .then(function (results) {
      expect(results.length).to.equal(2)
      expect(results[0].name).to.equal('Test_Forename Test_Surname')
      expect(results[1].name).to.equal('Test_Forename Test_Surname')
      done()
    })
  })

  it('should return an empty list when team does not exist', function (done) {
    getTeamCaseloadOverview(9999999)
    .then(function (results) {
      expect(results).to.be.empty //eslint-disable-line
      done()
    })
  })

  after(function (done) {
    workloadCapacityHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
