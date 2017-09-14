const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (workloadPoints) {
  return knex('workload_points')
    .insert({
      comm_tier_1: workloadPoints.commA,
      comm_tier_2: workloadPoints.commB1,
      comm_tier_3: workloadPoints.commB2,
      comm_tier_4: workloadPoints.commC1,
      comm_tier_5: workloadPoints.commC2,
      comm_tier_6: workloadPoints.commD1,
      comm_tier_7: workloadPoints.commD2,
      cust_tier_1: workloadPoints.cusA,
      cust_tier_2: workloadPoints.cusB1,
      cust_tier_3: workloadPoints.cusB2,
      cust_tier_4: workloadPoints.cusC1,
      cust_tier_5: workloadPoints.cusC2,
      cust_tier_6: workloadPoints.cusD1,
      cust_tier_7: workloadPoints.cusD2,
      lic_tier_1: workloadPoints.licA,
      lic_tier_2: workloadPoints.licB1,
      lic_tier_3: workloadPoints.licB2,
      lic_tier_4: workloadPoints.licC1,
      lic_tier_5: workloadPoints.licC2,
      lic_tier_6: workloadPoints.licD1,
      lic_tier_7: workloadPoints.licD2,
      // TODO: Insert the actual id of the logged in user who changed the points 
      user_id: 35,
      sdr: workloadPoints.sdr,
      sdr_conversion: workloadPoints.fdr,
      nominal_target_spo: workloadPoints.nominalTargetPso,
      nominal_target_po: workloadPoints.nominalTargetPo,
      weighting_o: workloadPoints.weightingOverdue,
      weighting_w: workloadPoints.weightingWarrants,
      weighting_u: workloadPoints.weightingUpw,
      default_contracted_hours_po: workloadPoints.defaultContractedHoursPo,
      default_contracted_hours_pso: workloadPoints.defaultContractedHoursPso,
      parom: workloadPoints.parom,
      paroms_enabled: 1
    })
    .returning('id')
}
