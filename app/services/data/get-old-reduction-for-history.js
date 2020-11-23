const knex = require('../../../knex').web

module.exports = function (id) {
  let whereObject = {}
  if (id !== undefined) {
    whereObject = { 'reductions.id': id }
  }

  return knex('reductions')
    .where(whereObject)
    .select('reductions.id AS reductionId',
      'reduction_reason_id AS reductionReasonId',
      'hours',
      'effective_from AS reductionStartDate',
      'effective_to AS reductionEndDate',
      'status',
      'notes',
      'updated_date AS updatedDate',
      'user_id AS userId')
    .then(function (reduction) {
      return reduction[0]
    })
}
