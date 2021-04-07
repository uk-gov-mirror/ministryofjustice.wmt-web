const knex = require('../../../knex').web
const createReductionReasonDBObject = require('../helpers/create-reduction-reason-db-object')

module.exports = function (reductionReason) {
  const insertObject = createReductionReasonDBObject(reductionReason)
  return knex('reduction_reason')
    .insert(insertObject)
    .returning('id')
}
