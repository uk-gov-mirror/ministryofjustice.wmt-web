const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (workloadOwnerId) {
  var whereObject = {}
  if (workloadOwnerId !== undefined) {
    whereObject.workload_owner_id = workloadOwnerId
  }

  return knex('reductions')
    .join('reduction_reason', 'reductions.reduction_reason_id', 'reduction_reason.id')
    .join('reduction_category', 'reduction_reason.category_id', 'reduction_category.id')
    .where(whereObject)
    .select('reductions.id',
            'workload_owner_id AS workloadOwnerId',
            'hours',
            'reduction_reason_id AS reductionReasonId',
            'reduction_category.id AS categoryId',
            'reduction_reason.reason_short_name AS reasonShortName',
            'reduction_reason.allowance_percentage AS allowancePercentage',
            'effective_from AS reductionStartDate',
            'effective_to AS reductionEndDate',
            'notes',
            'status'
          )
}
