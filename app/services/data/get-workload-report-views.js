const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, fromDate, toDate, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.capacityView

  var whereObject = {}

  if (id !== undefined) {
    whereObject.id = id
  }

  return knex(table)
    .where(whereObject)
    .where('effective_from', '>=', fromDate)
    .where('effective_from', '<=', toDate)
    .select('total_points',
            'available_points',
            'effective_from',
            'reduction_hours')
    .orderBy('effective_from')
    .then(function (results) {
      return results
    })
}
