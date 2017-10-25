const expect = require('chai').expect

const insertWorkloadPoints = require('../../../../app/services/data/insert-workload-points')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

var workloadPointsResult = {
  table: 'workload_points',
  id: 0
}

var defaultWorkloadPoints = {
  commA: 11,
  commB1: 12,
  commB2: 13,
  commC1: 14,
  commC2: 15,
  commD1: 16,
  commD2: 17,
  cusA: 21,
  cusB1: 22,
  cusB2: 23,
  cusC1: 24,
  cusC2: 25,
  cusD1: 26,
  cusD2: 27,
  licA: 31,
  licB1: 32,
  licB2: 33,
  licC1: 34,
  licC2: 35,
  licD1: 36,
  licD2: 37,
  sdr: 4,
  userId: 35,
  sdrConversion: 5,
  nominalTargetPso: 1234,
  nominalTargetPo: 5678,
  defaultContractedHoursPo: 37,
  defaultContractedHoursPso: 38,
  weightingOverdue: 10,
  weightingWarrants: 20,
  weightingUpw: 70,
  parom: 99,
  effectiveTo: null
}

describe('services/data/insert-new-workload-points', function () {
  it('should return an id when a valid workload points object has been added, and the row should exist in the DB', function () {
    return insertWorkloadPoints(defaultWorkloadPoints)
      .then(function (id) {
        workloadPointsResult.id = id
        expect(id[0]).to.be.a('number')
        return dataHelper.getAllWorkloadPointsForTest()
        .then(function (workloadPoints) {
          expect(workloadPoints).to.contain(defaultWorkloadPoints)
        })
      })
  })

  after(function () {
    return dataHelper.removeInsertedData([workloadPointsResult])
  })
})
