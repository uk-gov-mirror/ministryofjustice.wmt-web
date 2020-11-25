const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getCapacityBreakdown = require('../../../../app/services/data/get-capacity-breakdown')

let inserts = []

const capacityBreakdown = {
  totalPoints: 50,
  availablePoints: 25,
  reductionHours: 3,
  name: 'Test_Forename Test_Surname',
  grade: 'PO',
  totalCases: 5,
  totalT2aCases: 3,
  sdrs: 10,
  sdrConversions: 9,
  paroms: 8,
  cmsAdjustmentPoints: 0,
  gsAdjustmentPoints: -2,
  contractedHours: 37.5,
  armsTotalCases: 5
}

describe('services/data/get-capacity-breakdown', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve all workload owners\' active workloads for a given team', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        const expectedEntry = Object.assign(capacityBreakdown, { linkId: inserts.filter((item) => item.table === 'workload_owner')[0].id })
        expect(results.length).to.be.eql(1)
        expect(results[0]).to.eql(expectedEntry)
      })
  })

  it('should retrieve summed capacity breakdown data for teams within ldu', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'ldu')[0].id, 'ldu')
      .then(function (results) {
        const expectedEntry = Object.assign(capacityBreakdown,
          {
            linkId: inserts.filter((item) => item.table === 'team')[0].id,
            name: 'Test Team'
          })
        expect(results.length).to.be.eql(1)
        expect(results).to.deep.contain(expectedEntry)
      })
  })

  it('should retrieve summed capacity breakdown data for ldus within region', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'region')[0].id, 'region')
      .then(function (results) {
        const expectedEntry = Object.assign(capacityBreakdown,
          {
            linkId: inserts.filter((item) => item.table === 'ldu')[0].id,
            name: 'Test LDU'
          })
        expect(results.length).to.be.eql(1)
        expect(results).to.deep.contain(expectedEntry)
      })
  })

  it('should retrieve summed capacity breakdown data for regions within national', function () {
    return getCapacityBreakdown(undefined, 'hmpps')
      .then(function (results) {
        const expectedEntry = Object.assign(capacityBreakdown,
          {
            linkId: inserts.filter((item) => item.table === 'region')[0].id,
            name: 'Test Region'
          })
        expect(results).to.deep.contain(expectedEntry)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
