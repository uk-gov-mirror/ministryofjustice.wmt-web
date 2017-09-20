const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getCapacityBreakdown = require('../../../../app/services/data/get-capacity-breakdown')

var inserts = []

describe('services/data/get-workload-reports-for-org', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve all workload_owners workloads within a team', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        expect(results.length).to.be.eql(2)
        expect(results[0].name).to.be.eql('Test_Forename Test_Surname')
        expect(results[0].grade).to.be.eql('PO')
        expect(results[0].total_points).to.be.a('Number')
        expect(results[0].reduction_hours).to.be.a('Number')
        expect(results[0].linkId).to.be.a('Number')
        expect(results[0].totalCases).to.be.a('Number')
        expect(results[0].cmsReductionHours).to.be.a('Number')
        expect(results[0].contractedHours).to.be.a('Number')
      })
  })

  it('should retrieve summed capacity breakdown data for teams within ldu', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'ldu')[0].id, 'ldu')
    .then(function (results) {
      expect(results.length).to.be.eql(1)
      expect(results[0].name).to.be.eql('Test Team')
      expect(results[0].grade).to.be.eql('PO')
      expect(results[0].total_points).to.be.a('Number')
      expect(results[0].reduction_hours).to.be.a('Number')
      expect(results[0].linkId).to.be.a('Number')
      expect(results[0].totalCases).to.be.a('Number')
      expect(results[0].cmsReductionHours).to.be.a('Number')
      expect(results[0].contractedHours).to.be.a('Number')
    })
  })

  it('should retrieve summed capacity breakdown data for ldus within region', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'region')[0].id, 'region')
    .then(function (results) {
      expect(results.length).to.be.eql(1)
      expect(results[0].name).to.be.eql('Test LDU')
      expect(results[0].grade).to.be.eql('PO')
      expect(results[0].total_points).to.be.a('Number')
      expect(results[0].reduction_hours).to.be.a('Number')
      expect(results[0].linkId).to.be.a('Number')
      expect(results[0].totalCases).to.be.a('Number')
      expect(results[0].cmsReductionHours).to.be.a('Number')
      expect(results[0].contractedHours).to.be.a('Number')
    })
  })

  it('should retrieve summed capacity breakdown data for regions within national', function () {
    return getCapacityBreakdown(undefined, 'hmpps')
    .then(function (results) {
      var regionNames = []
      results.forEach(function (results) {
        regionNames.push(results.name)
      })
      expect(regionNames.includes('Test Region')).to.be.eql(true)
      expect(results[0].name).to.be.a('String')
      expect(results[0].grade).to.be.a('String')
      expect(results[0].total_points).to.be.a('Number')
      expect(results[0].reduction_hours).to.be.a('Number')
      expect(results[0].linkId).to.be.a('Number')
      expect(results[0].totalCases).to.be.a('Number')
      expect(results[0].cmsReductionHours).to.be.a('Number')
      expect(results[0].contractedHours).to.be.a('Number')
    })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
