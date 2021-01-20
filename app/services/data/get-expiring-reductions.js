const knex = require('../../../knex').web

module.exports = function (userId) {
  const columns = [
    'workload_owner_id AS workloadOwnerId',
    'name AS omName',
    'reduction_reason AS reductionReason',
    'amount AS hours', 'start_date AS startDate',
    'end_date AS endDate',
    'reduction_id AS reductionId',
    'workload_type AS workloadType',
    'manager_responsible AS managerResponsible'
  ]

  return knex('expiring_reductions_view')
    .columns(columns)
    .whereIn('user_id', userId)
}
