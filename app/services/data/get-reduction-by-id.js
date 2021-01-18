const knex = require('../../../knex').web

module.exports = function (id) {
  let whereObject = {}
  if (id !== undefined) {
    whereObject = { 'reductions.id': id }
  }

  return knex('reductions')
    .join('reduction_reason', 'reductions.reduction_reason_id', 'reduction_reason.id')
    .where(whereObject)
    .select('reductions.id AS id',
      'workload_owner_id AS workloadOwnerId',
      'hours',
      'reduction_reason_id AS reductionReasonId',
      'effective_from AS reductionStartDate',
      'effective_to AS reductionEndDate',
      'notes',
      'status',
      'is_enabled AS isEnabled')
    .then(function (reduction) {
      return reduction[0]
    })
}
