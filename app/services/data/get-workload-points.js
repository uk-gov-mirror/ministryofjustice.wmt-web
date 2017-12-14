const knex = require('../../../knex').web

module.exports = function (isT2A = false) {
  isT2A = (isT2A === true)

  return knex('workload_points')
    .join('workload_points_calculations', 'workload_points.id', 'workload_points_calculations.workload_points_id')
    .first('workload_points.id AS workloadPointsId',
            'workload_points.comm_tier_1 AS commD2',
            'workload_points.comm_tier_2 AS commD1',
            'workload_points.comm_tier_3 AS commC2',
            'workload_points.comm_tier_4 AS commC1',
            'workload_points.comm_tier_5 AS commB2',
            'workload_points.comm_tier_6 AS commB1',
            'workload_points.comm_tier_7 AS commA',
            'workload_points.cust_tier_1 AS cusD2',
            'workload_points.cust_tier_2 AS cusD1',
            'workload_points.cust_tier_3 AS cusC2',
            'workload_points.cust_tier_4 AS cusC1',
            'workload_points.cust_tier_5 AS cusB2',
            'workload_points.cust_tier_6 AS cusB1',
            'workload_points.cust_tier_7 AS cusA',
            'workload_points.lic_tier_1 AS licD2',
            'workload_points.lic_tier_2 AS licD1',
            'workload_points.lic_tier_3 AS licC2',
            'workload_points.lic_tier_4 AS licC1',
            'workload_points.lic_tier_5 AS licB2',
            'workload_points.lic_tier_6 AS licB1',
            'workload_points.lic_tier_7 AS licA',
            'workload_points.user_id AS updatedByUserId',
            'workload_points.sdr AS sdr',
            'workload_points.sdr_conversion AS sdrConversion',
            'workload_points.nominal_target_spo AS nominalTargetPso',
            'workload_points.nominal_target_po AS nominalTargetPo',
            'workload_points.default_contracted_hours_po AS defaultContractedHoursPo',
            'workload_points.default_contracted_hours_pso AS defaultContractedHoursPso',
            'workload_points.weighting_o AS weightingOverdue',
            'workload_points.weighting_w AS weightingWarrants',
            'workload_points.weighting_u AS weightingUpw',
            'workload_points.weighting_arms_comm AS weightingArmsCommunity',
            'workload_points.weighting_arms_lic AS weightingArmsLicense',
            'workload_points.parom AS parom',
            'workload_points.effective_from AS effectiveFrom',
            'workload_points.is_t2a AS isT2A',
            'workload_points_calculations.gs_adjustment_points AS gsPoints',
            'workload_points_calculations.cms_adjustment_points AS cmsPoints')
    .whereNotNull('workload_points.effective_from')
    .whereNull('workload_points.effective_to')
    .where('workload_points.is_t2a', isT2A)
}
