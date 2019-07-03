const knex = require('../../../knex').web

module.exports = function () {
  return knex('reduction_category')
    .select('id', 'category')
    .orderBy('id')
}
