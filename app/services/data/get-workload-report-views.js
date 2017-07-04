const config = require('../../../knexfile').web
const knex = require('knex')(config)
const CapacityType = require('../../constants/capacity-type')

// TODO: Expand with id
module.exports = function (id, fromDate, toDate, type) {
  if (type === undefined ||
      (CapacityType.REGION !== type &&
      CapacityType.TEAM !== type &&
      CapacityType.LDU !== type)) {
    throw new Error(type + ' should be REGION, TEAM or LDU')
  }

  return knex('app.' + type)
    .where('id', '=', id)
    .where('effective_from', '>=', fromDate)
    .where('effective_from', '<=', toDate)
    .select('total_points',
            'sdr_points',
            'sdr_conversion_points',
            'paroms_points',
            'avilable_points',
            'effective_from')
}
