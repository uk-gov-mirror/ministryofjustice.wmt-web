const knex = require('../../../knex').web

module.exports = function (isT2A = false) {
  isT2A = (isT2A === true)

  // WMT0160: add new tiers
  return knex('workload_points')
    .first(
      'comm_tier_16 AS commD0',
      'comm_tier_15 AS commD1',
      'comm_tier_14 AS commD2',
      'comm_tier_13 AS commD3',
      'comm_tier_12 AS commC0',
      'comm_tier_11 AS commC1',
      'comm_tier_10 AS commC2',
      'comm_tier_9 AS commC3',
      'comm_tier_8 AS commB0',
      'comm_tier_7 AS commB1',
      'comm_tier_6 AS commB2',
      'comm_tier_5 AS commB3',
      'comm_tier_4 AS commA0',
      'comm_tier_3 AS commA1',
      'comm_tier_2 AS commA2',
      'comm_tier_1 AS commA3',
      'lic_tier_16 AS licD0',
      'lic_tier_15 AS licD1',
      'lic_tier_14 AS licD2',
      'lic_tier_13 AS licD3',
      'lic_tier_12 AS licC0',
      'lic_tier_11 AS licC1',
      'lic_tier_10 AS licC2',
      'lic_tier_9 AS licC3',
      'lic_tier_8 AS licB0',
      'lic_tier_7 AS licB1',
      'lic_tier_6 AS licB2',
      'lic_tier_5 AS licB3',
      'lic_tier_4 AS licA0',
      'lic_tier_3 AS licA1',
      'lic_tier_2 AS licA2',
      'lic_tier_1 AS licA3',
      'cust_tier_16 AS cusD0',
      'cust_tier_15 AS cusD1',
      'cust_tier_14 AS cusD2',
      'cust_tier_13 AS cusD3',
      'cust_tier_12 AS cusC0',
      'cust_tier_11 AS cusC1',
      'cust_tier_10 AS cusC2',
      'cust_tier_9 AS cusC3',
      'cust_tier_8 AS cusB0',
      'cust_tier_7 AS cusB1',
      'cust_tier_6 AS cusB2',
      'cust_tier_5 AS cusB3',
      'cust_tier_4 AS cusA0',
      'cust_tier_3 AS cusA1',
      'cust_tier_2 AS cusA2',
      'cust_tier_1 AS cusA3',
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
