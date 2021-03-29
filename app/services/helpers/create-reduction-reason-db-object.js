module.exports = function (updatedReductionReason) {
  const insertObject = {
    reason: updatedReductionReason.reason,
    reason_short_name: updatedReductionReason.reasonShortName,
    category_id: updatedReductionReason.category,
    allowance_percentage: updatedReductionReason.allowancePercentage,
    max_allowance_percentage: updatedReductionReason.maxAllowancePercentage,
    months_to_expiry: updatedReductionReason.monthsToExpiry,
    is_enabled: updatedReductionReason.isEnabled
  }
  if (insertObject.max_allowance_percentage === null || isNaN(insertObject.max_allowance_percentage)) {
    delete insertObject.max_allowance_percentage
  }
  if (insertObject.allowance_percentage === null || isNaN(insertObject.allowance_percentage)) {
    delete insertObject.allowance_percentage
  }
  if (insertObject.months_to_expiry === null || isNaN(insertObject.months_to_expiry)) {
    delete insertObject.months_to_expiry
  }
  return insertObject
}
