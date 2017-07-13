const config = require('../../../knexfile').integrationTests
const knex = require('knex')(config)
var Promise = require('bluebird').Promise

module.exports.addWorkloadCapacitiesForOffenderManager = function () {
  var inserts = []

  var promise = knex('offender_manager_type').returning('id').insert({description: 'test'})
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return knex('offender_manager').returning('id').insert({type_id: ids[0]})
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      return knex('region').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return knex('ldu').returning('id').insert({region_id: ids[0]})
    })
    .then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return knex('team').returning('id').insert({ldu_id: ids[0]})
    })
    .then(function (ids) {
      inserts.push({table: 'team', id: ids[0]})
      return knex('working_hours').returning('id').insert({})
    })
    .then(function (ids) {
      inserts.push({table: 'working_hours', id: ids[0]})
      return knex('workload_owner').returning('id')
        .insert({team_id: inserts.filter((item) => item.table === 'team')[0].id,
          offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[0].id})
    })
    .then(function (ids) {
      inserts.push({table: 'workload_owner', id: ids[0]})
      return knex('workload').returning('id').insert({
        workload_owner_id: ids[0],
        total_cases: 0,
        total_community_cases: 0,
        total_custody_cases: 0,
        total_license_cases: 0,
        monthly_sdrs: 0,
        sdr_due_next_30_days: 0,
        sdr_conversions_last_30_days: 0,
        paroms_completed_last_30_days: 0,
        paroms_due_next_30_days: 0,
        license_last_16_weeks: 9,
        community_last_16_weeks: 10
      })
    })
    .then(function (ids) {
      inserts.push({table: 'workload', id: ids[0]})
      return knex('workload_report').returning('id').insert([
        { effective_from: new Date(2008, 0, 1) },
        { effective_from: new Date(2009, 0, 1), effective_to: new Date(2010, 0, 1) }
      ])
    })
    .then(function (ids) {
      ids.forEach(function (id) {
        inserts.push({table: 'workload_report', id: id})
      })
      return knex('workload_points').returning('id').insert({
        comm_tier_1: 0,
        comm_tier_2: 0,
        comm_tier_3: 0,
        comm_tier_4: 0,
        comm_tier_5: 0,
        comm_tier_6: 0,
        comm_tier_7: 0,
        cust_tier_1: 0,
        cust_tier_2: 0,
        cust_tier_3: 0,
        cust_tier_4: 0,
        cust_tier_5: 0,
        cust_tier_6: 0,
        cust_tier_7: 0,
        lic_tier_1: 0,
        lic_tier_2: 0,
        lic_tier_3: 0,
        lic_tier_4: 0,
        lic_tier_5: 0,
        lic_tier_6: 0,
        lic_tier_7: 0,
        user_id: 0,
        sdr: 0,
        sdr_conversion: 0,
        nominal_target_spo: 0,
        nominal_target_po: 0,
        default_contracted_hours_po: 0,
        default_contracted_hours_pso: 0,
        weighting_o: 0,
        weighting_w: 0,
        weighting_u: 0,
        paroms_enabled: 0,
        parom: 0
      })
    })
    .then(function (ids) {
      inserts.push({table: 'workload_points', id: ids[0]})

      var workloadReports = inserts.filter((item) => item.table === 'workload_report')

      var defaultWorkloadPoints = {
        workload_report_id: workloadReports[1].id,
        workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
        workload_id: inserts.filter((item) => item.table === 'workload')[0].id,
        total_points: 0,
        sdr_points: 0,
        sdr_conversion_points: 0,
        paroms_points: 0,
        nominal_target: 0,
        available_points: 0,
        reduction_hours: 3
      }

      var calculations = []
      calculations.push(Object.assign({}, defaultWorkloadPoints, {
        total_points: 50, available_points: 25, workload_report_id: workloadReports[0].id
      }))
      calculations.push(Object.assign({}, defaultWorkloadPoints, {
        total_points: 20, available_points: 10, workload_report_id: workloadReports[1].id
      }))

      return knex('workload_points_calculations').returning('id').insert(calculations)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'workload_points_calculations', id: id})
      })

      var defaultTier = {
        workload_id: inserts.filter((item) => item.table === 'workload')[0].id,
        tier_number: 1,
        overdue_terminations_total: 10,
        unpaid_work_total: 10,
        warrants_total: 10,
        total_cases: 10,
        location: 'COMMUNITY'}

      var tiers = []
      tiers.push(Object.assign({}, defaultTier, {tier_number: 1, location: 'COMMUNITY'}))
      tiers.push(Object.assign({}, defaultTier, {tier_number: 2, location: 'CUSTODY'}))
      tiers.push(Object.assign({}, defaultTier, {tier_number: 3, location: 'LICENSE'}))
      return knex('tiers').returning('id').insert(tiers)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'tiers', id: id})
      })
      return inserts
    })

  return promise
}

module.exports.selectIdsForWorkloadOwner = function () {
  var results = []

  var promise = knex('workload_owner').first('id', 'team_id')
    .then(function (result) {
      results.push({ table: 'workload_owner', id: result.id }, { table: 'team', id: result.team_id })
      return knex('team').select('ldu_id').where('id', '=', result.team_id)
    })
    .then(function (result) {
      results.push({ table: 'ldu', id: result[0].ldu_id })
      return knex('ldu').select('region_id').where('id', '=', result[0].ldu_id)
    })
    .then(function (result) {
      results.push({ table: 'region', id: result[0].region_id })
      return results
    })
  return promise
}

module.exports.removeWorkloadCapactitiesForOffenderManager = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
