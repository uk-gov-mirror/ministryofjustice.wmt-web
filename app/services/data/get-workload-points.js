const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function () {
  return knex('workload_points')
    .first('id AS workloadPointsId',
            'comm_tier_1 AS commA',
            'comm_tier_2 AS commB1',
            'comm_tier_3 AS commB2',
            'comm_tier_4 AS commC1',
            'comm_tier_5 AS commC2',
            'comm_tier_6 AS commD1',
            'comm_tier_7 AS commD2',
            'cust_tier_1 AS cusA',
            'cust_tier_2 AS cusB1',
            'cust_tier_3 AS cusB2',
            'cust_tier_4 AS cusC1',
            'cust_tier_5 AS cusC2',
            'cust_tier_6 AS cusD1',
            'cust_tier_7 AS cusD2',
            'lic_tier_1 AS licA',
            'lic_tier_2 AS licB1',
            'lic_tier_3 AS licB2',
            'lic_tier_4 AS licC1',
            'lic_tier_5 AS licC2',
            'lic_tier_6 AS licD1',
            'lic_tier_7 AS licD2',
            'user_id AS updatedByUserId',
            'sdr AS sdr',
            'sdr_conversion AS sdrConversion',
            'nominal_target_spo AS nominalTargetPso',
            'nominal_target_po AS nominalTargetPo',
            'default_contracted_hours_po AS defaultContractedHoursPo',
            'default_contracted_hours_pso AS defaultContractedHoursPso',
            'weighting_o AS weightingOverdue',
            'weighting_w AS weightingWarrants',
            'weighting_u AS weightingUpw',
            'parom AS parom',
            'effective_from AS effectiveFrom')
    .whereNotNull('effective_from')
    .whereNull('effective_to')
}
