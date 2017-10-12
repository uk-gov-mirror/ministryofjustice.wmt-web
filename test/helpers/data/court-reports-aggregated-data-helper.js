const config = require('../../../knexfile').integrationTests
const knex = require('knex')(config)
var Promise = require('bluebird').Promise

module.exports.addCourtReportWorkloadsForOffenderManager = function () {
  var inserts = []

  // Add workload_owners and cr workloads
  var offenderManagerTypes = [
    { grade_code: 'PO' },
    { grade_code: 'PSO' }
  ]
  return knex('offender_manager_type')
  .returning('id')
  .insert(offenderManagerTypes)
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({table: 'offender_manager_type', id: id})
    })

    return addRegion(inserts)
    .then(function (inserts) {
      var workloadReports = [
        { effective_from: '2017-02-01' }
      ]

      return knex('workload_report').returning('id').insert(workloadReports)
      .then(function (ids) {
        ids.forEach((id) => {
          inserts.push({table: 'workload_report', id: id})
        })
        return addCourtReportWorkloadPoints(inserts)
        .then(function (inserts) {
          return addCrWorkloadPointsCalculation(inserts)
        })
      })
    })
  })
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

module.exports.selectIdsForCourtReporterWorkloadOwner = function (inserts) {
  var results = []

  var promise = knex('workload_owner')
  .join('court_reports_workload', 'court_reports_workload.workload_owner_id', 'workload_owner.id')
  .join('court_reports_workload_points_calculation', 'court_reports_workload_points_calculation.court_reports_workload_id', 'court_reports_workload.id')
  .join('workload_report', 'court_reports_workload_points_calculation.workload_report_id', 'workload_report.id')
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

module.exports.getAnyExistingWorkloadOwnerIdWithActiveReduction = function () {
  return knex('workload_owner')
      .join('reductions', 'workload_owner.id', 'workload_owner_id')
      .join('court_reports_workload', 'court_reports_workload.workload_owner_id', 'workload_owner.id')
      .where('reductions.effective_to', '>', knex.raw('GETDATE()'))
      .andWhereNot('status', 'DELETED')
      .first('workload_owner.id AS workloadOwnerId',
       'reductions.id AS reductionId')
}

var addCrWorkloadPointsCalculation = function (inserts) {
  // Add workload points calc
  var crWorkloadIdFrist = inserts.filter((item) => item.table === 'court_reports_workload')[0].id
  var crWorkloadIdSecond = inserts.filter((item) => item.table === 'court_reports_workload')[1].id

  var crWorkloadPointsIdFirst = inserts.filter((item) => item.table === 'court_reports_workload_points')[0].id
  var crWorkloadPointsIdSecond = inserts.filter((item) => item.table === 'court_reports_workload_points')[1].id

  var workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

  var crWPCEntries = [
    {
      workload_report_id: workloadReportId,
      court_reports_workload_id: crWorkloadIdFrist,
      court_reports_workload_points_id: crWorkloadPointsIdFirst,
      reduction_hours: 4,
      contracted_hours: 37
    },
    {
      workload_report_id: workloadReportId,
      court_reports_workload_id: crWorkloadIdSecond,
      court_reports_workload_points_id: crWorkloadPointsIdSecond,
      reduction_hours: 5,
      contracted_hours: 38
    }
  ]

  return knex('court_reports_workload_points_calculation').returning('id')
  .insert(crWPCEntries)
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({table: 'court_reports_workload_points_calculation', id: id})
    })
    return inserts
  })
}

var addCourtReportWorkloadPoints = function (inserts) {
  if (inserts === undefined) {
    inserts = []
  }
  var crWorkloadPoints = [
    {default_contracted_hours: 37.5},
    {default_contracted_hours: 38.5}
  ]

  return knex('court_reports_workload_points').returning('id')
  .insert(crWorkloadPoints)
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({table: 'court_reports_workload_points', id: id})
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
  .then(function (inserts) {
    return addPOOffenderManager(inserts)
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
    return addCrWorkload(inserts)
  })
}

var addCrWorkload = function (inserts) {
  // Add the workload_owner
  var numberOfOffenderManagers = inserts.filter((item) => item.table === 'offender_manager').length
  var workloadOwner = {
    team_id: inserts.filter((item) => item.table === 'team')[0].id,
    offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[numberOfOffenderManagers - 1].id
  }

  return knex('workload_owner').returning('id').insert(workloadOwner)
  .then(function (ids) {
    inserts.push({table: 'workload_owner', id: ids[0]})
    return inserts
  })
  .then(function () {
    // new crworkload
    var numberOfWorkloadOwners = inserts.filter((item) => item.table === 'workload_owner').length
    var crWorkload = {
      workload_owner_id: inserts.filter((item) => item.table === 'workload_owner')[numberOfWorkloadOwners - 1].id,
      total_cases_sdr: 12,
      total_cases_fdr: 13,
      total_cases_oral_reports: 14
    }

    return knex('court_reports_workload').returning('id').insert(crWorkload)
    .then(function (ids) {
      inserts.push({table: 'court_reports_workload', id: ids[0]})
      return inserts
    })
  })
}
