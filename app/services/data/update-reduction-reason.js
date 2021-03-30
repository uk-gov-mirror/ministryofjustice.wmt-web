const knex = require('../../../knex').web
const createReductionReasonDBObject = require('../helpers/create-reduction-reason-db-object')

module.exports = function (id, reductionReason) {
  const updateObject = createReductionReasonDBObject(reductionReason)
  return knex('reduction_reason')
    .update(updateObject)
    .where('id', parseInt(id))
}
