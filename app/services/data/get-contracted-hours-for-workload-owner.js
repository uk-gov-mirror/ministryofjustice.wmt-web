const knex = require('../../../knex').web

module.exports = function (workloadOwnerId) {
  return knex('workload_owner')
    .first('contracted_hours')
    .where('id', workloadOwnerId)
    .then(function (result) {
      return result.contracted_hours
    })
}
