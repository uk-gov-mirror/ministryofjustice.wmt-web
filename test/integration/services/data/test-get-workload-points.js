const expect = require('chai').expect
const knex = require('../../../knex').integrationTests

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadPoints = require('../../../../app/services/data/get-workload-points')

var inserts = []
var expectedWorkloadPoints
var expectedWorkloadPointsT2A

var insertedWorkloadPoints = dataHelper.defaultWorkloadPoints

var expectedInsertedWorkloadPoints = {
  'commD2': insertedWorkloadPoints.comm_tier_1,
  'commD1': insertedWorkloadPoints.comm_tier_2,
  'commC2': insertedWorkloadPoints.comm_tier_3,
  'commC1': insertedWorkloadPoints.comm_tier_4,
  'commB2': insertedWorkloadPoints.comm_tier_5,
  'commB1': insertedWorkloadPoints.comm_tier_6,
  'commA': insertedWorkloadPoints.comm_tier_7,
  'cusD2': insertedWorkloadPoints.cust_tier_1,
  'cusD1': insertedWorkloadPoints.cust_tier_2,
  'cusC2': insertedWorkloadPoints.cust_tier_3,
  'cusC1': insertedWorkloadPoints.cust_tier_4,
  'cusB2': insertedWorkloadPoints.cust_tier_5,
  'cusB1': insertedWorkloadPoints.cust_tier_6,
  'cusA': insertedWorkloadPoints.cust_tier_7,
  'licD2': insertedWorkloadPoints.lic_tier_1,
  'licD1': insertedWorkloadPoints.lic_tier_2,
  'licC2': insertedWorkloadPoints.lic_tier_3,
  'licC1': insertedWorkloadPoints.lic_tier_4,
  'licB2': insertedWorkloadPoints.lic_tier_5,
  'licB1': insertedWorkloadPoints.lic_tier_6,
  'licA': insertedWorkloadPoints.lic_tier_7,
  'updatedByUserId': insertedWorkloadPoints.user_id,
  'sdr': insertedWorkloadPoints.sdr,
  'sdrConversion': insertedWorkloadPoints.sdr_conversion,
  'nominalTargetPso': insertedWorkloadPoints.nominal_target_spo,
  'nominalTargetPo': insertedWorkloadPoints.nominal_target_po,
  'defaultContractedHoursPo': insertedWorkloadPoints.default_contracted_hours_po,
  'defaultContractedHoursPso': insertedWorkloadPoints.default_contracted_hours_pso,
  'defaultContractedHoursSpo': insertedWorkloadPoints.default_contracted_hours_spo,
  'weightingOverdue': insertedWorkloadPoints.weighting_o,
  'weightingWarrants': insertedWorkloadPoints.weighting_w,
  'weightingUpw': insertedWorkloadPoints.weighting_u,
  'parom': insertedWorkloadPoints.parom,
  'isT2A': insertedWorkloadPoints.is_t2a
}

var getExistingActiveWorkloadPointsT2A = function () {
  return getExistingActiveWorkloadPoints(true)
}

var getExistingActiveWorkloadPoints = function (isT2A = false) {
  var whereObject = {
    is_t2a: (isT2A === true)
  }
  return knex('workload_points')
    .first('id AS workloadPointsId',
    'comm_tier_1 AS commD2',
    'comm_tier_2 AS commD1',
    'comm_tier_3 AS commC2',
    'comm_tier_4 AS commC1',
    'comm_tier_5 AS commB2',
    'comm_tier_6 AS commB1',
    'comm_tier_7 AS commA',
    'cust_tier_1 AS cusD2',
    'cust_tier_2 AS cusD1',
    'cust_tier_3 AS cusC2',
    'cust_tier_4 AS cusC1',
    'cust_tier_5 AS cusB2',
    'cust_tier_6 AS cusB1',
    'cust_tier_7 AS cusA',
    'lic_tier_1 AS licD2',
    'lic_tier_2 AS licD1',
    'lic_tier_3 AS licC2',
    'lic_tier_4 AS licC1',
    'lic_tier_5 AS licB2',
    'lic_tier_6 AS licB1',
    'lic_tier_7 AS licA',
    'user_id AS updatedByUserId',
    'sdr AS sdr',
    'sdr_conversion AS sdrConversion',
    'nominal_target_spo AS nominalTargetPso',
    'nominal_target_po AS nominalTargetPo',
    'default_contracted_hours_po AS defaultContractedHoursPo',
    'default_contracted_hours_pso AS defaultContractedHoursPso',
    'default_contracted_hours_spo AS defaultContractedHoursSpo',
    'weighting_o AS weightingOverdue',
    'weighting_w AS weightingWarrants',
    'weighting_u AS weightingUpw',
    'weighting_arms_comm AS weightingArmsCommunity',
    'weighting_arms_lic AS weightingArmsLicense',
    'parom AS parom',
    'is_t2a AS isT2A')
    .whereNotNull('effective_from')
    .whereNull('effective_to')
    .where(whereObject)
}

describe('services/data/get-workload-points', function () {
  before(function () {
    return getExistingActiveWorkloadPoints().then(function (results) {
      expectedWorkloadPoints = results
      return getExistingActiveWorkloadPointsT2A().then(function (results) {
        expectedWorkloadPointsT2A = results
        if (expectedWorkloadPoints === undefined) {
          return dataHelper.addWorkloadPoints()
            .then(function (builtInserts) {
              inserts = builtInserts
              expectedWorkloadPoints = expectedInsertedWorkloadPoints
              if (expectedWorkloadPointsT2A === undefined) {
                return dataHelper.addWorkloadPointsT2A(builtInserts)
                  .then(function (builtInserts) {
                    inserts.concat(builtInserts)
                    expectedWorkloadPointsT2A = Object.assign({}, expectedInsertedWorkloadPoints, { isT2A: true })
                  })
              }
            })
        } else if (expectedWorkloadPointsT2A === undefined) {
          return dataHelper.addWorkloadPointsT2A()
            .then(function (builtInserts) {
              inserts = builtInserts
              expectedWorkloadPointsT2A = Object.assign({}, expectedInsertedWorkloadPoints, { isT2A: true })
            })
        }
      })
    })
  })

  it('should retrieve the latest workload points details', function () {
    return getWorkloadPoints(false).then(function (results) {
      expect(results).to.contains(expectedWorkloadPoints)
    })
  })

  it('should retrieve the latest workload points details for T2A', function () {
    return getWorkloadPoints(true).then(function (results) {
      expect(results).to.contains(expectedWorkloadPointsT2A)
    })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
