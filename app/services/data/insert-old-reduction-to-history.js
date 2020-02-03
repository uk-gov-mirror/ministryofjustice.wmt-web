const knex = require('../../../knex').web
module.exports = function (oldReduction) {
  return knex('reductions_history')
    .insert({
      reduction_id: oldReduction.reductionId,
      reduction_reason_id: oldReduction.reductionReasonId,
      hours: oldReduction.hours,
      effective_from: oldReduction.reductionStartDate,
      effective_to: oldReduction.reductionEndDate,
      status: oldReduction.status,
      notes: oldReduction.notes,
      updated_date: oldReduction.updatedDate,
      user_id: oldReduction.userId
    })
    .returning('id')
}
