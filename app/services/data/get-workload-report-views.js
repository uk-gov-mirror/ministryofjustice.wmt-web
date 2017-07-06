const config = require('../../../knexfile').web
const knex = require('knex')(config)
const routeType = require('../constants/paths')
const CapacityType = require('../constants/capacity-type')

module.exports = function (id, fromDate, toDate, type) {
  if (type === undefined ||
      (routeType.CAPACITY_LDU !== type &&
      routeType.CAPACITY_REGION !== type &&
      routeType.CAPACITY_TEAM !== type)) {
    throw new Error(type + ' should be REGION, TEAM or LDU')
  }
  var table = ''
  switch (type) {
    case routeType.CAPACITY_LDU:
      table = CapacityType.LDU
      break
    case routeType.CAPACITY_REGION:
      table = CapacityType.REGION
      break
    case routeType.CAPACITY_TEAM:
      table = CapacityType.TEAM
      break
  }

  return knex('app.' + table)
    .where('app.' + table + '.id', id)
    .where('app.' + table + '.effective_from', '>=', fromDate)
    .where('app.' + table + '.effective_from', '<=', toDate)
    .select('app.' + table + '.total_points',
            'app.' + table + '.sdr_points',
            'app.' + table + '.sdr_conversion_points',
            'app.' + table + '.paroms_points',
            'app.' + table + '.available_points',
            'app.' + table + '.effective_from')
    .then(function (results) {
      return results
    })
}
