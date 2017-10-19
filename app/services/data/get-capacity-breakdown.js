const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)

  var table = orgUnit.capacityBreakdownView
  var whereString = ""

  if (id !== undefined && (NaN !== parseInt(id, 10))) {
    whereString = " WHERE id = " + id
  }

  var selectList = [
    'total_points AS totalPoints',
    'available_points AS availablePoints',
    'reduction_hours AS reductionHours',
    'link_id AS linkId',
    'name',
    'grade_code AS grade',
    'total_cases AS totalCases',
    'cms_adjustment_points AS cmsAdjustmentPoints',
    'gs_adjustment_points AS gsAdjustmentPoints',
    'arms_total_cases AS armsTotalCases',
    'contracted_hours AS contractedHours'
  ]

  return knex.schema.raw("SELECT " + selectList.join(', ') +
          " FROM " + table +
          " WITH (NOEXPAND) " +
          whereString)
    .then(function (results) {
      return results
    })
}
