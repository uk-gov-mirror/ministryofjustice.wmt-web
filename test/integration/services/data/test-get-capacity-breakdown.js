const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getCapacityBreakdown = require('../../../../app/services/data/get-capacity-breakdown')

var inserts = []

var teamCapacityBreakdown = {
  totalPoints: 50,
  availablePoints: 25,
  reductionHours: 3,
  name: 'Test_Forename Test_Surname',
  grade: 'PO',
  totalCases: 5,
  cmsReductionHours: 0,
  gsReductionHours: -2,
  contractedHours: 37.5
}

var lduAndAboveExpectedCapacity = {
  totalPoints: 70,
  availablePoints: 35,
  reductionHours: 6,
  grade: 'PO',
  totalCases: 10,
  cmsReductionHours: 0,
  gsReductionHours: -4,
  contractedHours: 75
}

describe('services/data/get-capacity-breakdown', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve all workload_owners workloads within a team', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'team')[0].id, 'team')
      .then(function (results) {
        var expectedEntry = Object.assign(teamCapacityBreakdown, { linkId: inserts.filter((item) => item.table === 'workload_owner')[0].id })
        expect(results.length).to.be.eql(2)
        expect(results).to.contain(expectedEntry)
      })
  })

  it('should retrieve summed capacity breakdown data for teams within ldu', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'ldu')[0].id, 'ldu')
    .then(function (results) {
      var expectedEntry = Object.assign(lduAndAboveExpectedCapacity,
        {
          linkId: inserts.filter((item) => item.table === 'team')[0].id,
          name: 'Test Team'
        })
      expect(results.length).to.be.eql(1)
      expect(results).to.contain(expectedEntry)
    })
  })

  it('should retrieve summed capacity breakdown data for ldus within region', function () {
    return getCapacityBreakdown(inserts.filter((item) => item.table === 'region')[0].id, 'region')
    .then(function (results) {
      var expectedEntry = Object.assign(lduAndAboveExpectedCapacity,
        {
          linkId: inserts.filter((item) => item.table === 'ldu')[0].id,
          name: 'Test LDU'
        })
      expect(results.length).to.be.eql(1)
      expect(results).to.contain(expectedEntry)
    })
  })

  it('should retrieve summed capacity breakdown data for regions within national', function () {
    return getCapacityBreakdown(undefined, 'hmpps')
    .then(function (results) {
      var expectedEntry = Object.assign(lduAndAboveExpectedCapacity,
        {
          linkId: inserts.filter((item) => item.table === 'region')[0].id,
          name: 'Test Region'
        })
      expect(results).to.contain(expectedEntry)
    })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
