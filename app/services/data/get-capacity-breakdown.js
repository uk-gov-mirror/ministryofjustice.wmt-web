const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)

  var table = orgUnit.capacityBreakdownView
  var whereObject = {}

  if (id !== undefined) {
    whereObject.id = id
  }

  return knex(table)
    .where(whereObject)
    .select('total_points AS totalPoints',
            'available_points AS availablePoints',
            'reduction_hours AS reductionHours',
            'link_id AS linkId',
            'name',
            'grade_code AS grade',
            'total_cases AS totalCases',
            'cms_adjustment_points AS cmsAdjustmentPoints',
            'contracted_hours AS contractedHours')
    .then(function (results) {
      return results
    })
}
