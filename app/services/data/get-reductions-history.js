const knex = require('../../../knex').web
const dateFormatter = require('../date-formatter')

module.exports = function (reductionId) {
  const columns = [
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
    .leftJoin('users', 'reductions_history.user_id', 'users.id')
    .join('reduction_reason', 'reductions_history.reduction_reason_id', 'reduction_reason.id')
    .whereIn('reductions_history.reduction_id', [reductionId])
    .columns(columns.concat(['reductions_history.reduction_id AS reductionId']))
    .unionAll(function () {
      this.columns(columns.concat(['reductions.id AS reductionId']))
        .from('reductions').leftJoin('users', 'reductions.user_id', 'users.id')
        .join('reduction_reason', 'reductions.reduction_reason_id', 'reduction_reason.id')
        .whereIn('reductions.id', [reductionId])
    })
    .then(function (reductions) {
      reductions.forEach(function (reduction) {
        reduction.reductionStartDate = dateFormatter.formatDate(reduction.reductionStartDate, 'DD/MM/YYYY')
        reduction.reductionEndDate = dateFormatter.formatDate(reduction.reductionEndDate, 'DD/MM/YYYY')
        reduction.updatedDate = dateFormatter.formatDate(reduction.updatedDate, 'DD/MM/YYYY HH:mm')
        if (!reduction.notes) {
          reduction.notes = ''
        }
        if (!reduction.name) {
          reduction.name = ''
        }
      })
      return reductions
    })
}
