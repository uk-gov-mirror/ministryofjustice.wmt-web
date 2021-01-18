const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/court-reports-aggregated-data-helper')
const getCourtReportOverview = require('../../../../app/services/data/get-court-report-overview')
const orgUnits = require('../../../../app/constants/organisation-unit')
let inserts = []

describe('services/data/get-court-reports-overview', function () {
  before(function () {
    return dataHelper.addCourtReportWorkloadsForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve data for specified workload_owner', function () {
    const woId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    return getCourtReportOverview(woId, orgUnits.OFFENDER_MANAGER.name)
      .then(function (results) {
        expect(results.length).to.be.eql(1)
        expect(results[0].id).to.be.equal(woId)
        expect(results[0].linkId).to.be.equal(inserts.filter((item) => item.table === 'team')[0].id)
        expect(results[0].name).to.be.equal('Test Team')
      })
  })

  it('should retrieve data for all workload_owners in a team', function () {
    const teamId = inserts.filter((item) => item.table === 'team')[0].id
    return getCourtReportOverview(teamId, orgUnits.TEAM.name)
      .then(function (results) {
        expect(results.length).to.be.eql(2)
        expect(results[0].linkId).to.be.equal(inserts.filter((item) => item.table === 'workload_owner')[0].id)
        expect(results[0].name).to.be.eql('Test_Forename Test_Surname')
        expect(results[0].totalSdrs).to.be.eql(12)
        expect(results[0].totalFdrs).to.be.eql(13)
        expect(results[0].totalOralReports).to.be.eql(14)
      })
  })

  it('should retrieve data for all workload_owners in a ldu', function () {
    const lduId = inserts.filter((item) => item.table === 'ldu')[0].id
    return getCourtReportOverview(lduId, orgUnits.LDU.name)
      .then(function (results) {
        expect(results.length).to.be.eql(1)
        expect(results[0].linkId).to.be.equal(inserts.filter((item) => item.table === 'team')[0].id)
        expect(results[0].name).to.be.eql('Test Team')
        expect(results[0].totalSdrs).to.be.eql(24)
        expect(results[0].totalFdrs).to.be.eql(26)
        expect(results[0].totalOralReports).to.be.eql(28)
      })
  })

  it('should retrieve data for all workload_owners in a region', function () {
    const regionId = inserts.filter((item) => item.table === 'region')[0].id
    return getCourtReportOverview(regionId, orgUnits.REGION.name)
      .then(function (results) {
        expect(results.length).to.be.eql(1)
        expect(results[0].linkId).to.be.equal(inserts.filter((item) => item.table === 'ldu')[0].id)
        expect(results[0].name).to.be.eql('Test LDU')
        expect(results[0].totalSdrs).to.be.eql(24)
        expect(results[0].totalFdrs).to.be.eql(26)
        expect(results[0].totalOralReports).to.be.eql(28)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
