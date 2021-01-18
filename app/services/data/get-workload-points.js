const knex = require('../../../knex').web

module.exports = function (isT2A = false) {
  isT2A = (isT2A === true)

  // WMT0160: add new tiers
  return knex('workload_points')
    .first('id AS workloadPointsId',
      'comm_tier_1 AS commD2',
      'comm_tier_2 AS commD1',
      'comm_tier_3 AS commC2',
      'comm_tier_4 AS commC1',
      'comm_tier_5 AS commB2',
      'comm_tier_6 AS commB1',
      'comm_tier_7 AS commA',
      'comm_tier_8 AS commE',
      'comm_tier_9 AS commF',
      'comm_tier_10 AS commG',
      'cust_tier_1 AS cusD2',
      'cust_tier_2 AS cusD1',
      'cust_tier_3 AS cusC2',
      'cust_tier_4 AS cusC1',
      'cust_tier_5 AS cusB2',
      'cust_tier_6 AS cusB1',
      'cust_tier_7 AS cusA',
      'cust_tier_8 AS cusE',
      'cust_tier_9 AS cusF',
      'cust_tier_10 AS cusG',
      'lic_tier_1 AS licD2',
      'lic_tier_2 AS licD1',
      'lic_tier_3 AS licC2',
      'lic_tier_4 AS licC1',
      'lic_tier_5 AS licB2',
      'lic_tier_6 AS licB1',
      'lic_tier_7 AS licA',
      'lic_tier_8 AS licE',
      'lic_tier_9 AS licF',
      'lic_tier_10 AS licG',
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
      'effective_from AS effectiveFrom',
      'is_t2a AS isT2A')
    .whereNotNull('effective_from')
    .whereNull('effective_to')
    .where('is_t2a', isT2A)
}
