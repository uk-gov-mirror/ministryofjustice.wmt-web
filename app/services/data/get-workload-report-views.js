const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, fromDate, toDate, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.capacityView

  const selectList = [
    'total_points',
    'available_points',
    'effective_from',
    'reduction_hours',
    'contracted_hours'
  ]

  let whereString = ' WHERE effective_from >= \'' + fromDate + '\''
  whereString += ' AND effective_from <= \'' + toDate + '\''

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString += ' AND id = ' + id
  }

  const noExpandHint = ' WITH (NOEXPAND)'
  const orderBy = ' ORDER BY effective_from'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
          ' FROM ' + table +
          noExpandHint +
          whereString +
          orderBy)
    .then(function (results) {
      return results
    })
}
