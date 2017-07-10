const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, fromDate, toDate, type) {
  var orgUnit = orgUnitFinder('name', type)
  if (orgUnit === undefined) {
    throw new Error(type + ' should be REGION, TEAM or LDU')
  }
  var table = orgUnit.capacityView

  return knex(table)
    .where(table + '.id', id)
    .where(table + '.effective_from', '>=', fromDate)
    .where(table + '.effective_from', '<=', toDate)
    .select(table + '.total_points',
            table + '.sdr_points',
            table + '.sdr_conversion_points',
            table + '.paroms_points',
            table + '.available_points',
            table + '.effective_from',
            table + '.reduction_hours')
    .then(function (results) {
      return results
    })
}
