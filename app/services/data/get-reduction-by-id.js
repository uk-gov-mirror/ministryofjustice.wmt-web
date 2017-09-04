const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  var whereObject = {}
  if (id !== undefined) {
    whereObject.id = id
  }

  return knex('reductions')
    .where(whereObject)
    .select('id',
            'workload_owner_id AS workloadOwnerId',
            'hours',
            'reduction_reason_id AS reductionReasonId',
            'effective_from AS reductionStartDate',
            'effective_to AS reductionEndDate',
            'notes')
    .then(function (reduction) {
      return reduction[0]
    })
}
