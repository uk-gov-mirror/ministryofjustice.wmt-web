const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id, newReduction) {
  return knex('reductions')
    .insert({
      reduction_reason_id: newReduction.reasonForReductionId,
      workload_owner_id: id,
      hours: newReduction.hours,
      effective_from: newReduction.reductionStartDate,
      effective_to: newReduction.reductionEndDate,
      notes: newReduction.notes
    })
    .returning('id')
    .then(function (result) {
      return result
    })
}
