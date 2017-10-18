const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
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
    'name AS name',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reduction',
    'total_sdrs AS totalSdrs',
    'total_fdrs AS totalFdrs',
    'total_oral_reports AS totalOralReports'
  ]

  return knex(table)
  .where(whereObject)
  .select(selectColumns)
}
