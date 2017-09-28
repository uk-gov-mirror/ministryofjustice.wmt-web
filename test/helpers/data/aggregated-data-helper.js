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

module.exports.defaultWorkloadPoints = {
  comm_tier_1: 11,
  comm_tier_2: 12,
  comm_tier_3: 13,
  comm_tier_4: 14,
  comm_tier_5: 15,
  comm_tier_6: 16,
  comm_tier_7: 17,
  cust_tier_1: 21,
  cust_tier_2: 22,
  cust_tier_3: 23,
  cust_tier_4: 24,
  cust_tier_5: 25,
  cust_tier_6: 26,
  cust_tier_7: 27,
  lic_tier_1: 31,
  lic_tier_2: 32,
  lic_tier_3: 33,
  lic_tier_4: 34,
  lic_tier_5: 35,
  lic_tier_6: 36,
  lic_tier_7: 37,
  user_id: 123,
  sdr: 4,
  sdr_conversion: 5,
  nominal_target_spo: 1234,
  nominal_target_po: 5678,
  default_contracted_hours_po: 37,
  default_contracted_hours_pso: 38,
  weighting_o: 10,
  weighting_w: 20,
  weighting_u: 70,
  paroms_enabled: 1,
  parom: 99,
  effective_from: '2017-04-01',
  effective_to: null
}

module.exports.addOrgHierarchyWithPoAndPso = function () {
  return module.exports.addCaseProgressDataForAllOrgUnits()
  .then(function (inserts) {
    return addPOOffenderManager(inserts)
  })
  .then(function (inserts) {
    return addPSOOffenderManager(inserts)
  })
  .then(function (inserts) {
    return addPSOOffenderManager(inserts)
  })
  .then(function (inserts) {
    return addTeam(inserts)
  })
  .then(function (inserts) {
    return addPOOffenderManager(inserts)
  })
  .then(function (inserts) {
    return addPSOOffenderManager(inserts)
  })
}

module.exports.addCaseProgressDataForAllOrgUnits = function () {
  return module.exports.addWorkloadCapacitiesForOffenderManager()
  .then(function (inserts) {
    return addPOOffenderManager(inserts)
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

  var promise = module.exports.addWorkloadPoints(inserts)
    .then(function (inserts) {
      var workloadReports = [
        { effective_from: '2017-01-01', effective_to: '2017-02-01' },
        { effective_from: '2017-02-01' }
      ]
      return knex('workload_report').returning('id').insert(workloadReports)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'workload_report', id: id})
      })
      var offenderManagerTypes = [
        { grade_code: 'PO' },
        { grade_code: 'PSO' }
      ]
      return knex('offender_manager_type').returning('id').insert(offenderManagerTypes)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({table: 'offender_manager_type', id: id})
      })
      return addRegion(inserts)
    })
  return promise
}

module.exports.addWorkloadPoints = function (inserts) {
  if (inserts === undefined) {
    inserts = []
  }

  var workloadPoints = [
    module.exports.defaultWorkloadPoints,
    Object.assign({}, module.exports.defaultWorkloadPoints, {
      comm_tier_1: 111,
      comm_tier_2: 112,
      comm_tier_3: 113,
      effective_from: '2017-01-01',
      effective_to: '2017-02-01'
    })
  ]

  return knex('workload_points').returning('id').insert(workloadPoints)
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({table: 'workload_points', id: id})
    })
    return inserts
  })
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
    return addPOOffenderManager(inserts)
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

var addPOOffenderManager = function (inserts) {
  var poOmType = inserts.filter((item) => item.table === 'offender_manager_type')[0]
  return knex('offender_manager').returning('id').insert(
    {
      type_id: poOmType.id,
      forename: 'Test_Forename',
      surname: 'Test_Surname'
    })
  .then(function (ids) {
    inserts.push({ table: 'offender_manager', id: ids[0] })
    return inserts
  })
  .then(function () {
    return addWorkload(inserts)
  })
}

var addPSOOffenderManager = function (inserts) {
  var psoOmType = inserts.filter((item) => item.table === 'offender_manager_type')[1]
  return knex('offender_manager').returning('id').insert(
    {
      type_id: psoOmType.id,
      forename: 'Test_Forename',
      surname: 'Test_Surname'
    })
  .then(function (ids) {
    inserts.push({ table: 'offender_manager', id: ids[0] })
    return inserts
  })
  .then(function () {
    return addWorkload(inserts)
  })
}

var addWorkload = function (inserts) {
  var teams = inserts.filter((item) => item.table === 'team')
  var offenderManagers = inserts.filter((item) => item.table === 'offender_manager')
  return knex('workload_owner').returning('id').insert(
    {team_id: teams[teams.length - 1].id,
      offender_manager_id: offenderManagers[offenderManagers.length - 1].id,
      contracted_hours: 37.5})
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

    var workloads = inserts.filter((item) => item.table === 'workload')
    var workloadReports = inserts.filter((item) => item.table === 'workload_report')

    var defaultWorkloadPointsCalculations = {
      workload_report_id: workloadReports[1].id,
      workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
      workload_id: workloads[workloads.length - 1].id,
      total_points: 0,
      sdr_points: 0,
      sdr_conversion_points: 0,
      paroms_points: 0,
      nominal_target: 0,
      available_points: 0,
      contracted_hours: 37.5,
      reduction_hours: 3,
      cms_reduction_hours: 0,
      gs_reduction_hours: -2
    }

    var calculations = []
    calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
      total_points: 50, available_points: 25
    }))
    calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
      total_points: 20,
      available_points: 10,
      workload_id: inserts.filter((item) => item.table === 'workload')[0].id
    }))
    calculations.push(Object.assign({}, defaultWorkloadPointsCalculations, {
      total_points: 20,
      available_points: 10,
      workload_report_id: workloadReports[0].id,
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
    var locations = ['COMMUNITY', 'CUSTODY', 'LICENSE']
    locations.forEach(function (location) {
      for (var tierNumber = 0, totalCases = 0; tierNumber < 8; tierNumber++, totalCases++) {
        tiers.push(Object.assign({}, defaultTier, {tier_number: tierNumber, location: location, total_cases: totalCases}))
      }
    })
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

module.exports.getAnyExistingWorkloadOwnerId = function () {
  var promise = knex('workload_owner')
      .first('id')
      .then(function (result) {
        return result.id
      })
  return promise
}

module.exports.getAnyExistingWorkloadReportId = function () {
  return knex('workload_report')
    .first('id')
    .then(function (result) {
      return result.id
    })
}

module.exports.getAnyExistingReductionReasonId = function () {
  var promise = knex('reduction_reason')
      .first('id')
      .then(function (result) {
        return result.id
      })
  return promise
}

module.exports.selectGradeForWorkloadOwner = function (workloadOwnerId) {
  var promise = knex('workload_owner')
    .join('offender_manager', 'offender_manager.id', 'offender_manager_id')
    .join('offender_manager_type', 'offender_manager.type_id', 'offender_manager_type.id')
    .first('offender_manager_type.grade_code')
    .where('workload_owner.id', workloadOwnerId)
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
      .orderBy('id', 'desc')
}

module.exports.getAnyExistingWorkloadOwnerIdWithActiveReduction = function () {
  return knex('workload_owner')
      .join('reductions', 'workload_owner.id', 'workload_owner_id')
      .where('effective_to', '>', knex.raw('GETDATE()'))
      .andWhereNot('status', 'DELETED')
      .first('workload_owner.id AS workloadOwnerId',
       'reductions.id AS reductionId')
}

module.exports.generateNonExistantWorkloadOwnerId = function () {
  return knex('workload_owner')
  .max('id AS maxId')
  .then(function (maxId) {
    return maxId[0].maxId + 1
  })
}

module.exports.getAllTasks = function () {
  return knex('tasks')
    .select('submitting_agent',
            'type',
            'additional_data',
            'workload_report_id',
            'status'
    )
}

module.exports.getAllWorkloadPointsForTest = function () {
  return knex('workload_points')
    .select(
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
      'effective_to AS effectiveTo'
    )
}
