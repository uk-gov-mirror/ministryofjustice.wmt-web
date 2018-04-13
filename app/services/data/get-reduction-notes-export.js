const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = 'reductions_notes_export_view'
  var whereClause = ''

  if (id !== undefined) {
    whereClause = ' WHERE ' + orgUnit.name + '_id = ' + id
  }

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
    'additional_notes AS additionalNotes'
  ]

  return knex.raw(
        'SELECT ' + selectColumns.join(', ') +
        ' FROM ' + table +
        whereClause)
}
