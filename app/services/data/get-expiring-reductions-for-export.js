const knex = require('../../../knex').web
const dateFormatter = require('../date-formatter')
// const log = require('../../logger')

module.exports = function (id, organisationLevel) {
  const columns = [
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'workload_owner_id AS workloadOwnerId',
    'name AS offenderManager',
    'contracted_hours AS contractedHours',
    'reduction_reason AS reason',
    'amount',
    'start_date AS startDate',
    'end_date AS endDate',
    'reduction_id AS reductionId',
    'workload_type AS workloadType',
    'manager_responsible AS managerResponsible',
    'reduction_status AS status',
    'additional_notes AS additionalNotes',
    'grade_code AS gradeCode'
  ]

  return knex('expiring_reductions_export_view')
    .columns(columns)
    .where(organisationLevel + '_id', id)
    .then(function (records) {
      records.forEach(function (record) {
        record.startDate = dateFormatter.formatDate(record.startDate, 'DD/MM/YYYY')
        record.endDate = dateFormatter.formatDate(record.endDate, 'DD/MM/YYYY')
      })
      return records
    })
}
