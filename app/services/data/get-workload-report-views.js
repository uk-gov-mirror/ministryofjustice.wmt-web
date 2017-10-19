const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, fromDate, toDate, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.capacityView

  var selectList = [
    'total_points',
    'available_points',
    'effective_from',
    'reduction_hours'
  ]

  var whereString = " WHERE effective_from >= " + fromDate
  whereString += " AND effective_from <= " + toDate

  if (id !== undefined && (NaN !== parseInt(id, 10))) {
    whereString += " AND id = " + id
  }

  var noExpandHint = " WITH (NOEXPAND)"
  var orderBy = " ORDER BY effective_from"

  return knex.schema.raw("SELECT " + selectList.join(', ')
          + " FROM " + table
          + noExpandHint
          + whereString
          + orderBy)
    .then(function (results) {
      return results
    })
}
