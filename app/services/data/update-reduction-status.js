const knex = require('../../../knex').web

module.exports = function (reductionId, reductionStatus) {
  return knex('reductions')
    .update({
      status: reductionStatus
    })
    .where('id', reductionId)
    .returning('id')
}
