const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (reductionId, workloadOwnerId, reductionStatus) {
  return knex('reductions')
    .update({
      status: reductionStatus
    })
    .where('id', reductionId)
    .returning('id')
}
