const knex = require('../../../knex').web
// Data Service to get the CMS or GS config
module.exports = function (adjustmentType) {
  const columns = [
    'id as adjustmentId',
    'contact_code AS contactCode',
    'contact_description AS contactDescription',
    'category_id AS categoryId',
    'points'
  ]
  return knex('adjustment_reason')
    .columns(columns)
    .where('category_id', adjustmentType)
    .orderBy('contact_code', 'asc')
}
