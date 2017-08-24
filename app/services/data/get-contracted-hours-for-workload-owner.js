const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (workloadOwnerId) {
  return knex('workload_owner')
    .select('contracted_hours')
    .where('id', workloadOwnerId)
    .then(function (results) {
      return results[0].contracted_hours
    })
}
