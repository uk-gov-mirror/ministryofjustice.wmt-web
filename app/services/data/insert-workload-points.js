const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (workloadPoints) {
  return knex('workload_points')
    .insert({
      comm_tier_1: workloadPoints.commD2,
      comm_tier_2: workloadPoints.commD1,
      comm_tier_3: workloadPoints.commC2,
      comm_tier_4: workloadPoints.commC1,
      comm_tier_5: workloadPoints.commB2,
      comm_tier_6: workloadPoints.commB1,
      comm_tier_7: workloadPoints.commA,
      cust_tier_1: workloadPoints.cusD2,
      cust_tier_2: workloadPoints.cusD1,
      cust_tier_3: workloadPoints.cusC2,
      cust_tier_4: workloadPoints.cusC1,
      cust_tier_5: workloadPoints.cusB2,
      cust_tier_6: workloadPoints.cusB1,
      cust_tier_7: workloadPoints.cusA,
      lic_tier_1: workloadPoints.licD2,
      lic_tier_2: workloadPoints.licD1,
      lic_tier_3: workloadPoints.licC2,
      lic_tier_4: workloadPoints.licC1,
      lic_tier_5: workloadPoints.licB2,
      lic_tier_6: workloadPoints.licB1,
      lic_tier_7: workloadPoints.licA,
      user_id: workloadPoints.userId,
      sdr: workloadPoints.sdr,
      sdr_conversion: workloadPoints.sdrConversion,
      nominal_target_spo: workloadPoints.nominalTargetPso,
      nominal_target_po: workloadPoints.nominalTargetPo,
      weighting_o: workloadPoints.weightingOverdue,
      weighting_w: workloadPoints.weightingWarrants,
      weighting_u: workloadPoints.weightingUpw,
      weighting_arms_comm: workloadPoints.weightingArmsCommunity,
      weighting_arms_lic: workloadPoints.weightingArmsLicense,
      default_contracted_hours_po: workloadPoints.defaultContractedHoursPo,
      default_contracted_hours_pso: workloadPoints.defaultContractedHoursPso,
      parom: workloadPoints.parom,
      paroms_enabled: 1
    })
    .returning('id')
}
