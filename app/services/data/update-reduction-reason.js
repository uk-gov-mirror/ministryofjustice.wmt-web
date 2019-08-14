const knex = require('../../../knex').web

module.exports = function (id, updatedReductionReason) {
  return knex('reduction_reason')
    .update({
      reason: updatedReductionReason.reason,
      reason_short_name: updatedReductionReason.reasonShortName,
      category_id: updatedReductionReason.category,
      allowance_percentage: updatedReductionReason.allowancePercentage,
      max_allowance_percentage: updatedReductionReason.maxAllowancePercentage,
      months_to_expiry: updatedReductionReason.monthsToExpiry,
      is_enabled: updatedReductionReason.isEnabled
    })
    .where('id', parseInt(id))
}
