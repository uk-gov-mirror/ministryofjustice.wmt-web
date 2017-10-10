const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function(id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.courtReporterOverview
  var whereObject = {}
  if (id !== undefined) {
    whereObject.id = id
  }

  var selectColumns = [
    'id',
    'grade_code AS grade',
    'link_id AS linkId',
    'team_name AS teamName',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reduction'
  ]

  return knex(table)
  .where(whereObject)    
  .select(selectColumns)
}