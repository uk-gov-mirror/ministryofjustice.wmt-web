const knex = require('../../../knex').web

module.exports = function (isT2A = false) {
  isT2A = (isT2A === true)

  // WMT0160: add new tiers
  return knex('workload_points')
    .first('comm_tier_10 AS commG',
      'comm_tier_9 AS commF',
      'comm_tier_8 AS commE',
      'comm_tier_1 AS commD2',
      'comm_tier_2 AS commD1',
      'comm_tier_3 AS commC2',
      'comm_tier_4 AS commC1',
      'comm_tier_5 AS commB2',
      'comm_tier_6 AS commB1',
      'comm_tier_7 AS commA',
      'lic_tier_10 AS licG',
      'lic_tier_9 AS licF',
      'lic_tier_8 AS licE',
      'lic_tier_1 AS licD2',
      'lic_tier_2 AS licD1',
      'lic_tier_3 AS licC2',
      'lic_tier_4 AS licC1',
      'lic_tier_5 AS licB2',
      'lic_tier_6 AS licB1',
      'lic_tier_7 AS licA',
      'cust_tier_10 AS cusG',
      'cust_tier_9 AS cusF',
      'cust_tier_8 AS cusE',
      'cust_tier_1 AS cusD2',
      'cust_tier_2 AS cusD1',
      'cust_tier_3 AS cusC2',
      'cust_tier_4 AS cusC1',
      'cust_tier_5 AS cusB2',
      'cust_tier_6 AS cusB1',
      'cust_tier_7 AS cusA',
      'sdr AS sdr',
      'sdr_conversion AS sdrConversion',
      'parom AS parom',
      'weighting_arms_comm AS weightingArmsCommunity',
      'weighting_arms_lic AS weightingArmsLicense',
      'is_t2a AS isT2A')
    .whereNotNull('effective_from')
    .whereNull('effective_to')
    .where('is_t2a', isT2A)
}
