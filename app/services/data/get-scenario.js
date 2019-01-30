const knex = require('../../../knex').web
const Scenario = require('../domain/scenario')

module.exports = function () {
  var columns = [
    'region_name',
    'ldu_name',
    'team_name',
    'om_name',
    'workload_owner_id',
    'grade_code',
    'location',
    'total_cases',
    'tier_number',
    't2a_total_cases',
    'warrants_total',
    't2a_warrants_total',
    'overdue_terminations_total',
    't2a_overdue_terminations_total',
    'unpaid_work_total',
    't2a_unpaid_work_total',
    'workload_id',
    'arms_community_cases',
    'arms_license_cases',
    'nominal_target',
    'contracted_hours',
    'reduction_hours',
    'default_contracted_hours_po',
    'default_contracted_hours_pso',
    'default_contracted_hours_spo',
    'cms_points',
    'gs_points',
    'sdr_total',
    'sdr_conversions_total',
    'paroms_total'
  ]
  var scenarioArray = []
  return knex('scenario_view')
    .columns(columns)
    .then(function (results) {
      scenarioArray = groupScenarioData(results)
      return scenarioArray
    })
}

var groupScenarioData = function (results) {
  var scenarioMap = new Map()
  var localScenarioArray = []
  results.forEach(function (result) {
    scenarioMap.set(result['workload_id'], [])
  })
  results.forEach(function (result) {
    var temporaryMappedItems = []
    temporaryMappedItems = scenarioMap.get(result['workload_id'])
    temporaryMappedItems.push(result)
    scenarioMap.set(result['workload_id'], temporaryMappedItems)
  })
  for (var value of scenarioMap.values()) {
    var scenarioObj = new Scenario(value)
    localScenarioArray.push(scenarioObj)
  }
  return localScenarioArray
}
