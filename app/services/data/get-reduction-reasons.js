const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function () {
  return knex('reduction_reason')
    .join('reduction_category', 'reduction_reason.category_id', 'reduction_category.id')
    .select('reduction_reason.id',
            'category',
            'reason',
            'reason_short_name AS reasonShortName',
            'allowance_percentage AS allowancePercentage',
            'max_allowance_percentage AS maxAllowancePercentage',
            'months_to_expiry AS monthsToExpiry'
           )
}
