const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, fromDate, toDate, type) {
  var orgUnit = orgUnitFinder('name', type)
  if (orgUnit === undefined) {
    throw new Error(type + ' should be REGION, TEAM or LDU')
  }
  var table = orgUnit.capacityView

  return knex('app.' + table)
    .where('app.' + table + '.id', id)
    .where('app.' + table + '.effective_from', '>=', fromDate)
    .select('app.' + table + '.total_points',
            'app.' + table + '.sdr_points',
            'app.' + table + '.sdr_conversion_points',
            'app.' + table + '.paroms_points',
            'app.' + table + '.available_points',
            'app.' + table + '.effective_from',
            'app.' + table + '.reduction_hours')
    .then(function (results) {
      return results
    })
}
