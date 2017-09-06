const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (reductionId, workloadOwnerId, newReduction) {
  return knex('reductions')
    .update({
      reduction_reason_id: newReduction.reasonForReductionId,
      workload_owner_id: workloadOwnerId,
      hours: newReduction.hours,
      effective_from: newReduction.reductionStartDate,
      effective_to: newReduction.reductionEndDate,
      notes: newReduction.notes,
      status: newReduction.status
    })
    .where('id', reductionId)
    .returning('id')
}
