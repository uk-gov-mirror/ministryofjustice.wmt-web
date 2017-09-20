/* eslint-disable no-new */
const expect = require('chai').expect
const WorkloadPoints = require('../../../../app/services/domain/workload-points')
// const ValidationError = require('../../../../app/services/errors/validation-error')

var VALID_WORKLOAD_POINTS = {
  commA: 111,
  commB1: 101,
  commB2: 99,
  commC1: 55,
  commC2: 44,
  commD1: 22,
  commD2: 11,
  cusA: 44,
  cusB1: 34,
  cusB2: 33,
  cusC1: 22,
  cusC2: 21,
  cusD1: 11,
  cusD2: 10,
  licA: 150,
  licB1: 110,
  licB2: 99,
  licC1: 55,
  licC2: 54,
  licD1: 44,
  licD2: 43,
  user_id: 1,
  sdr: 101,
  fdr: 51,
  nominalTargetPso: 2001,
  nominalTargetPo: 2001,
  weightingOverdue: 0.0,
  weightingWarrants: 0.0,
  weightingUpw: 100.0,
  defaultContractedHoursPo: 37,
  defaultContractedHoursPso: 37,
  parom: 121
}

describe('services/domain/workload-points', function () {
  it('should create a valid workloal points object', function () {
    var workloadPoints = new WorkloadPoints(VALID_WORKLOAD_POINTS)
    expect(workloadPoints.commA).to.equal(111)
    expect(workloadPoints.commB1).to.equal(101)
    expect(workloadPoints.commB2).to.equal(99)
    expect(workloadPoints.commC1).to.equal(55)
    expect(workloadPoints.commC2).to.equal(44)
    expect(workloadPoints.commD1).to.equal(22)
    expect(workloadPoints.cusA).to.equal(44)
    expect(workloadPoints.cusB1).to.equal(34)
    expect(workloadPoints.cusB2).to.equal(33)
    expect(workloadPoints.cusC1).to.equal(22)
    expect(workloadPoints.cusC2).to.equal(21)
    expect(workloadPoints.cusD1).to.equal(11)
    expect(workloadPoints.cusD2).to.equal(10)
    expect(workloadPoints.defaultContractedHoursPo).to.equal(37)
    expect(workloadPoints.defaultContractedHoursPso).to.equal(37)
    expect(workloadPoints.fdr).to.equal(51)
    expect(workloadPoints.licA).to.equal(150)
    expect(workloadPoints.licB1).to.equal(110)
    expect(workloadPoints.licB2).to.equal(99)
    expect(workloadPoints.licC1).to.equal(55)
    expect(workloadPoints.licC2).to.equal(54)
    expect(workloadPoints.licD1).to.equal(44)
    expect(workloadPoints.licD2).to.equal(43)
    expect(workloadPoints.nominalTargetPo).to.equal(2001)
    expect(workloadPoints.nominalTargetPso).to.equal(2001)
    expect(workloadPoints.parom).to.equal(121)
    expect(workloadPoints.sdr).to.equal(101)
    expect(workloadPoints.user_id).to.equal(1)
    expect(workloadPoints.weightingOverdue).to.equal(0.0)
    expect(workloadPoints.weightingUpw).to.equal(100.0)
    expect(workloadPoints.weightingWarrants).to.equal(0.0)
  })
})
