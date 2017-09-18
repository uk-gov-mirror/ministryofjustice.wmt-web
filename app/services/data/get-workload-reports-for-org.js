const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (orgId, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.capacityView

  var whereObject = {}

  if (orgId !== undefined) {
    whereObject.org_id = orgId
    whereObject.effective_to = null
  }

  return knex(table)
    .where(whereObject)
    .select('total_points',
            'available_points',
            'reduction_hours',
            'id AS linkId',
            'name',
            'grade_code AS grade',
            'total_cases AS totalCases',
            'cms_reduction_hours AS cmsReductionHours',
            'contracted_hours AS contractedHours')
    .then(function (results) {
      return results
    })
}
