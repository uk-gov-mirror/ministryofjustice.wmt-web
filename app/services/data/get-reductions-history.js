const knex = require('../../../knex').web
const dateFormatter = require('../date-formatter')

module.exports = function (reductionId) {
  var whereObject = {}
  if (reductionId !== undefined) {
    whereObject.reduction_id = reductionId
  }

  var columns = [
    'reduction_reason.reason_short_name AS reasonShortName',
    'hours',
    'notes',
    'effective_from AS reductionStartDate',
    'effective_to AS reductionEndDate',
    'status',
    'updated_date AS updatedDate',
    'users.name'
  ]
  return knex('reductions_history')
    .join('users', 'reductions_history.user_id', 'users.id')
    .join('reduction_reason', 'reductions_history.reduction_reason_id', 'reduction_reason.id')
    .where(whereObject)
    .columns(columns)
    .then(function (reductions) {
      reductions.forEach(function (reduction) {
        reduction.reductionStartDate = dateFormatter.formatDate(reduction.reductionStartDate, 'DD/MM/YYYY')
        reduction.reductionEndDate = dateFormatter.formatDate(reduction.reductionEndDate, 'DD/MM/YYYY')
        reduction.updatedDate = dateFormatter.formatDate(reduction.updatedDate, 'DD/MM/YYYY HH:mm')
      })
      return reductions
    })
}
