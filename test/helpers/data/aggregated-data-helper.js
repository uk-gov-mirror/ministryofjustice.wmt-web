const config = require('../../../knexfile').integrationTests
const knex = require('knex')(config)
var Promise = require('bluebird').Promise
const _ = require('lodash')

var defaultWorkload = {
  total_cases: 5,
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
}

var defaultWorkloadPoints = {
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
}

module.exports.addCaseProgressDataForAllOrgUnits = function () {
  return module.exports.addWorkloadCapacitiesForOffenderManager()
  .then(function (inserts) {
    return addOffenderManager(inserts)
  })
  .then(function (inserts) {
    return addTeam(inserts)
  })
  .then(function (inserts) {
    return addLdu(inserts)
  })
  .then(function (inserts) {
    return addRegion(inserts)
  })
}

module.exports.addWorkloadCapacitiesForOffenderManager = function () {
  var inserts = []

  var promise = knex('workload_points').returning('id').insert(defaultWorkloadPoints)
    .then(function (ids) {
      inserts.push({table: 'workload_points', id: ids[0]})
      return knex('offender_manager_type').returning('id').insert({description: 'test'})
    })
    .then(function (ids) {
      inserts.push({ table: 'offender_manager_type', id: ids[0] })
      return addRegion(inserts)
    })
  return promise
}

var addRegion = function (inserts) {
  return knex('region').returning('id').insert({description: 'Test Region'})
  .then(function (ids) {
    inserts.push({ table: 'region', id: ids[0] })
    return inserts
  })
  .then(function (inserts) {
    return addLdu(inserts)
  })
}

var addTeam = function (inserts) {
  var ldus = inserts.filter((item) => item.table === 'ldu')
  return knex('team').returning('id').insert({ldu_id: ldus[ldus.length - 1].id, description: 'Test Team'})
  .then(function (ids) {
    inserts.push({table: 'team', id: ids[0]})
    return inserts
  })
  .then(function (inserts) {
    return addOffenderManager(inserts)
  })
}

var addLdu = function (inserts) {
  var regions = inserts.filter((item) => item.table === 'region')
  return knex('ldu').returning('id').insert({region_id: regions[regions.length - 1].id, description: 'Test LDU'})
  .then(function (ids) {
    inserts.push({ table: 'ldu', id: ids[0] })
    return inserts
  })
  .then(function (inserts) {
    return addTeam(inserts)
  })
}

var addOffenderManager = function (inserts) {
  return knex('offender_manager').returning('id').insert(
    {type_id: inserts.filter((item) => item.table === 'offender_manager_type')[0].id,
      forename: 'Test_Forename',
      surname: 'Test_Surname',
      grade_code: 'PO'})
    .then(function (ids) {
      inserts.push({ table: 'offender_manager', id: ids[0] })
      var teams = inserts.filter((item) => item.table === 'team')
      return knex('workload_owner').returning('id')
        .insert({team_id: teams[teams.length - 1].id,
          offender_manager_id: ids[0],
          contracted_hours: 37.5})
    })
    .then(function (ids) {
      inserts.push({table: 'workload_owner', id: ids[0]})
      var workloads = [
        Object.assign({}, defaultWorkload, {workload_owner_id: ids[0]}),
        Object.assign({}, defaultWorkload, {workload_owner_id: ids[0]})
      ]
      return knex('workload').returning('id').insert(workloads)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'workload', id: id})
      })

      return knex('workload_report').select('id').orderBy('effective_from', 'desc')
    }).then(function (workloadReports) {
      var workloads = inserts.filter((item) => item.table === 'workload')
      var defaultWorkloadPointsCalculations = {
        workload_report_id: workloadReports[0].id,
        workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
        workload_id: workloads[workloads.length - 1].id,
        total_points: 0,
        sdr_points: 0,
        sdr_conversion_points: 0,
        paroms_points: 0,
        nominal_target: 0,
        available_points: 0,
        contracted_hours: 37.5,
        reduction_hours: 3
      }

      var calculations = []
      calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
        total_points: 50, available_points: 25
      }))
      calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
        total_points: 20,
        available_points: 10,
        workload_report_id: workloadReports[1].id,
        workload_id: inserts.filter((item) => item.table === 'workload')[0].id
      }))

      return knex('workload_points_calculations').returning('id').insert(calculations)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'workload_points_calculations', id: id})
      })
      var workloads = inserts.filter((item) => item.table === 'workload')
      var defaultTier = {
        workload_id: workloads[workloads.length - 1].id,
        tier_number: 1,
        overdue_terminations_total: 10,
        unpaid_work_total: 10,
        warrants_total: 10,
        total_cases: 10,
        location: 'COMMUNITY'
      }

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
}

module.exports.selectIdsForWorkloadOwner = function () {
  var results = []

  var promise = knex('workload_owner')
  .join('workload', 'workload.workload_owner_id', 'workload_owner.id')
  .join('workload_points_calculations', 'workload_points_calculations.workload_id', 'workload.id')
  .join('workload_report', 'workload_points_calculations.workload_report_id', 'workload_report.id')
  .whereNull('workload_report.effective_to')
  .orderBy('workload_report.effective_from', 'desc')
  .first('workload_owner.id', 'team_id')
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

module.exports.getTeamId = function () {
  var promise = knex('team')
      .first('id')
      .then(function (result) {
        return result
      })
  return promise
}

module.exports.selectGradeForWorkloadOwner = function (workloadOwnerId) {
  var promise = knex('workload_owner')
    .first('offender_manager.grade_code')
    .where('workload_owner.id', workloadOwnerId)
    .join('offender_manager', 'offender_manager.id', 'offender_manager_id')
    .then(function (results) {
      return results.grade_code
    })
  return promise
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

module.exports.rowGenerator = function (name, baseRow, multiplier) {
  var row = Object.assign({}, baseRow)
  if (multiplier !== undefined) {
    _.forOwn(baseRow, function (value, key) {
      row[key] = value * multiplier
    })
  }
  return Object.assign({}, row, { name: name })
}

module.exports.getWorkloadReportEffectiveFromDate = function () {
  return knex('workload_report')
      .first('effective_from')
      .whereNull('effective_to')
      .orderBy('effective_from', 'desc')
}
