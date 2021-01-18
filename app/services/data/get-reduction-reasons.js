const knex = require('../../../knex').web

module.exports = function (enabledOnly = true) {
  let isEnabledValues
  if (enabledOnly) {
    isEnabledValues = [true]
  } else {
    isEnabledValues = [true, false]
  }
  return knex('reduction_reason')
    .join('reduction_category', 'reduction_reason.category_id', 'reduction_category.id')
    .select('reduction_reason.id',
      'category',
      'reason',
      'reason_short_name AS reasonShortName',
      'allowance_percentage AS allowancePercentage',
      'max_allowance_percentage AS maxAllowancePercentage',
      'months_to_expiry AS monthsToExpiry',
      'reduction_reason.is_enabled AS isEnabled')
    .whereIn('reduction_reason.is_enabled', isEnabledValues)
    .orderBy('reason_short_name')
}
