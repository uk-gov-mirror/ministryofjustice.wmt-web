const config = require('../../../knexfile').web
const knex = require('knex')(config)
const CapacityType = require('../../constants/capacity-type')

module.exports = function (type) {
  if (type === undefined ||
      (CapacityType.REGION !== type &&
      CapacityType.TEAM !== type &&
      CapacityType.LDU !== type)) {
    throw new Error(type + ' should be a location of REGION, TEAM or LDU')
  }
  var sql = 'SELECT * from app.' + type
  return knex.schema
    .raw(sql)
}
