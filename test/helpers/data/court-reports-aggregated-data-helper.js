const config = require('../../../knexfile').integrationTests
const knex = require('knex')(config)
const Promise = require('bluebird').Promise
const helper = require('./aggregated-data-helper')

module.exports.addCourtReportWorkloadsForOffenderManager = function () {
  const inserts = []

  // Add workload_owners and cr workloads
  const offenderManagerTypes = [
    { grade_code: 'PO' },
    { grade_code: 'PSO' }
  ]
  return knex('offender_manager_type')
    .returning('id')
    .insert(offenderManagerTypes)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'offender_manager_type', id: id })
      })

      return addRegion(inserts)
        .then(function (inserts) {
          const workloadReports = [
            { effective_from: '2017-02-01' }
          ]

          return knex('workload_report').returning('id').insert(workloadReports)
            .then(function (ids) {
              ids.forEach((id) => {
                inserts.push({ table: 'workload_report', id: id })
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
  const results = []

  const promise = knex('workload_owner')
    .join('court_reports', 'court_reports.workload_owner_id', 'workload_owner.id')
    .join('court_reports_calculations', 'court_reports_calculations.court_reports_id', 'court_reports.id')
    .join('workload_report', 'court_reports_calculations.workload_report_id', 'workload_report.id')
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
    .join('court_reports', 'court_reports.workload_owner_id', 'workload_owner.id')
    .where('reductions.effective_to', '>', knex.raw('GETDATE()'))
    .andWhereNot('status', 'DELETED')
    .first('workload_owner.id AS workloadOwnerId',
      'reductions.id AS reductionId')
}

module.exports.getAnyExistingWorkloadOwnerId = function () {
  return knex('workload_owner')
    .join('court_reports', 'court_reports.workload_owner_id', 'workload_owner.id')
    .first()
    .then(function (result) {
      return result.workload_owner_id
    })
}

module.exports.getAnyExistingCourtReporterId = function () {
  return knex('individual_court_reporter_overview')
    .where('contracted_hours', '>', 0)
    .first()
    .then(function (result) {
      return result.id
    })
}

module.exports.getLastRecordFromTable = function (table) {
  return knex(table)
    .orderBy('id', 'desc')
    .first()
    .then((results) => {
      return results
    })
}

module.exports.deleteLastRecordFromTables = function (tables) {
  return Promise.each(tables, function (table) {
    return knex(table)
      .orderBy('id', 'desc')
      .first()
      .del()
  })
}

const addCrWorkloadPointsCalculation = function (inserts) {
  // Add workload points calc
  const crWorkloadIdFrist = inserts.filter((item) => item.table === 'court_reports')[0].id
  const crWorkloadIdSecond = inserts.filter((item) => item.table === 'court_reports')[1].id

  const workloadPointsId = inserts.filter((item) => item.table === 'workload_points')[0].id
  const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

  const crWPCEntries = [
    {
      workload_report_id: workloadReportId,
      court_reports_id: crWorkloadIdFrist,
      workload_points_id: workloadPointsId,
      reduction_hours: 4,
      contracted_hours: 37
    },
    {
      workload_report_id: workloadReportId,
      court_reports_id: crWorkloadIdSecond,
      workload_points_id: workloadPointsId,
      reduction_hours: 5,
      contracted_hours: 38
    }
  ]

  return knex('court_reports_calculations').returning('id')
    .insert(crWPCEntries)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'court_reports_calculations', id: id })
      })
      return inserts
    })
}

const addCourtReportWorkloadPoints = function (inserts) {
  if (inserts === undefined) {
    inserts = []
  }

  return knex('workload_points').returning('id')
    .insert(helper.defaultWorkloadPoints)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'workload_points', id: id })
      })
      return inserts
    })
}

const addRegion = function (inserts) {
  return knex('region').returning('id').insert({ description: 'Test Region' })
    .then(function (ids) {
      inserts.push({ table: 'region', id: ids[0] })
      return inserts
    })
    .then(function (inserts) {
      return addLdu(inserts)
    })
}

const addLdu = function (inserts) {
  const regions = inserts.filter((item) => item.table === 'region')
  return knex('ldu').returning('id').insert({ region_id: regions[regions.length - 1].id, description: 'Test LDU' })
    .then(function (ids) {
      inserts.push({ table: 'ldu', id: ids[0] })
      return inserts
    })
    .then(function (inserts) {
      return addTeam(inserts)
    })
}

const addTeam = function (inserts) {
  const ldus = inserts.filter((item) => item.table === 'ldu')
  return knex('team').returning('id').insert({ ldu_id: ldus[ldus.length - 1].id, description: 'Test Team' })
    .then(function (ids) {
      inserts.push({ table: 'team', id: ids[0] })
      return inserts
    })
    .then(function (inserts) {
      return addPOOffenderManager(inserts)
    })
    .then(function (inserts) {
      return addPOOffenderManager(inserts)
    })
}

const addPOOffenderManager = function (inserts) {
  const poOmType = inserts.filter((item) => item.table === 'offender_manager_type')[0]
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

const addCrWorkload = function (inserts) {
  // Add the workload_owner
  const numberOfOffenderManagers = inserts.filter((item) => item.table === 'offender_manager').length
  const workloadOwner = {
    team_id: inserts.filter((item) => item.table === 'team')[0].id,
    offender_manager_id: inserts.filter((item) => item.table === 'offender_manager')[numberOfOffenderManagers - 1].id
  }

  return knex('workload_owner').returning('id').insert(workloadOwner)
    .then(function (ids) {
      inserts.push({ table: 'workload_owner', id: ids[0] })
      return inserts
    })
    .then(function () {
    // new crworkload
      const numberOfWorkloadOwners = inserts.filter((item) => item.table === 'workload_owner').length
      const crWorkload = {
        workload_owner_id: inserts.filter((item) => item.table === 'workload_owner')[numberOfWorkloadOwners - 1].id,
        total_sdrs: 12,
        total_fdrs: 13,
        total_oral_reports: 14,
        staging_id: 1
      }

      return knex('court_reports').returning('id').insert(crWorkload)
        .then(function (ids) {
          inserts.push({ table: 'court_reports', id: ids[0] })
          return inserts
        })
    })
}
