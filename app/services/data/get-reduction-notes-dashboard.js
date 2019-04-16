const knex = require('../../../knex').web
const dateFormatter = require('../../services/date-formatter')

module.exports = function () {
  var table = 'reductions_notes_export_view'

  var selectColumns = [
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'name AS offenderManager',
    'contracted_hours AS contractedHours',
    'reduction_reason AS reason',
    'amount',
    'start_date AS startDate',
    'end_date AS endDate',
    'reduction_status AS status',
    'additional_notes AS additionalNotes',
    'grade_code AS gradeCode'
  ]

  return knex(table)
    .columns(selectColumns)
    .where(status, 'ACTIVE')
    .then(function (results) {
      results.forEach(function (record) {
        record.startDate = dateFormatter.formatDate(record.startDate, 'DD MM YYYY, HH:mm')
        record.endDate = dateFormatter.formatDate(record.endDate, 'DD MM YYYY, HH:mm')
      })
    })
}
