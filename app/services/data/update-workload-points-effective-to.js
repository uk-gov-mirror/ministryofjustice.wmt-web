const knex = require('../../../knex').web

module.exports = function (workloadPointsId) {
  return knex('workload_points')
    .where('id', workloadPointsId)
    .update({
      effective_to: knex.fn.now()
    })
    .returning('id')
}
